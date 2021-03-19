/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import WrapperScreen from '../LhComp/WrapperScreen';
import {H_W} from '../LhComp/LhDim';
import NavigationRef from '../LhComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Data from '../LhData';
import {connect} from 'react-redux';
import {LhsetCurrentProductAction} from '../LhRedux/LhActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LhSearchBar from '../LhComp/LhSearchBar';
import {colors} from '../LhComp/LhColor';
import {Avatar} from 'react-native-elements';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const LhGoToSingleProduct = (item) => {
    props.LhsetCurrentProductAction(item);
    NavigationRef.Navigate('LhSP');
  };

  const CardRender = (Arr) => {
    return Arr.map((item, index) => (
      <View
        key={index}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: HEIGHT * 0.02,
        }}>
        <TouchableOpacity onPress={() => LhGoToSingleProduct(item)}>
          <Avatar
            rounded
            size={H_W.width * 0.6}
            source={item.images}
            containerStyle={{
              backgroundColor: colors.secondary,
              elevation: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              marginLeft: H_W.width * 0.04,
            }}
          />
        </TouchableOpacity>
      </View>
    ));
  };
  const LhGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`,
      }}>
      <View
        style={{
          width: H_W.width,
          height: HEIGHT * 0.15,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: colors.primary,
          paddingHorizontal: H_W.width * 0.04,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: HEIGHT * 0.04,
            marginBottom: HEIGHT * 0.05,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={LhGoBack}>
            <Entypo name="chevron-left" color="white" size={H_W.width * 0.06} />
          </TouchableOpacity>
          <View style={{width: '85%', marginLeft: H_W.width * 0.05}}>
            <LhSearchBar changeSearchText={changeSearchText} />
          </View>
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  LhFavs: state.LhToggleFav,
});

export default connect(mapStateToProps, {
  LhsetCurrentProductAction,
})(Search);
