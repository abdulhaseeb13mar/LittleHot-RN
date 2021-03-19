/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
  LhremoveFavAction,
  LhsetFavAction,
  LhsetCurrentProductAction,
} from '../LhRedux/LhActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../LhComp/LhHeader';
import WrapperScreen from '../LhComp/WrapperScreen';
import NavigationRef from '../LhComp/RefNavigation';
import Loop from '../LhComp/LhFlatList';
import {LhHorizontalTile} from './LhHome';
import {H_W} from '../LhComp/LhDim';
import {colors} from '../LhComp/LhColor';

const LhFavourites = (props) => {
  const LhGoToSingleProduct = (item) => {
    props.LhsetCurrentProductAction(item);
    NavigationRef.Navigate('LhSP');
  };

  const LhGoBack = () => NavigationRef.Navigate('LhHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <Loop
          ListHeaderComponent={
            <UseHeader
              leftIcon={Entypo}
              leftIconName="chevron-left"
              leftIconAction={LhGoBack}
              Title={`${props.LhFavs.length} Favourites`}
            />
          }
          data={props.LhFavs}
          renderItem={({item}) => (
            <LhHorizontalTile
              item={item}
              LhGoToSingleProduct={LhGoToSingleProduct}
              LhFavs={props.LhFavs}
              LhsetFav={(i) => props.LhsetFavAction(i)}
              LhremoveFav={(i) => props.LhremoveFavAction(i)}
            />
          )}
          horizontal={false}
        />
      </View>
      <Entypo
        name="heart"
        color={`rgba(${colors.rgb_Primary},0.2)`}
        style={{
          position: 'absolute',
          bottom: -H_W.height * 0.07,
          right: -H_W.width * 0.25,
          zIndex: -1,
          transform: [{rotate: '-19deg'}],
        }}
        size={H_W.width * 0.75}
      />
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    LhFavs: state.LhToggleFav,
  };
};

export default connect(mapStateToProps, {
  LhsetFavAction,
  LhsetCurrentProductAction,
  LhremoveFavAction,
})(LhFavourites);
