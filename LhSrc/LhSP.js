/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {H_W} from '../LhComp/LhDim';
import WrapperScreen from '../LhComp/WrapperScreen';
import {connect} from 'react-redux';
import {colors, textFont} from '../LhComp/LhColor';
import NavigationRef from '../LhComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LhHeader from '../LhComp/LhHeader';
import {
  LhremoveFavAction,
  LhsetFavAction,
  LhaddCartAction,
  LhremoveCartAction,
} from '../LhRedux/LhActions';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const LhProduct = props.LhProduct;

  const checkIfFav = () => {
    for (let us = 0; us < props.LhFavs.length; us++) {
      if (props.LhFavs[us].id === LhProduct.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav
      ? props.LhremoveFavAction(LhProduct.id)
      : props.LhsetFavAction(LhProduct);
    setFav(!fav);
  };

  const LhAddToCart = () => {
    props.LhaddCartAction({...LhProduct});
  };
  const LhRemoveFromCart = () => {
    props.LhCart[LhProduct.id].added !== 0 &&
      props.LhremoveCartAction(LhProduct);
  };

  // const LhGotoSearch = () => NavigationRef.Navigate('LhSearch');
  const LhGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{
        backgroundColor: 'white',
      }}>
      <KeyboardAwareScrollView bounces={false}>
        <LhHeader
          leftIcon={Entypo}
          rightIcon={Entypo}
          rightIconName={fav ? 'heart' : 'heart-outlined'}
          leftIconName="chevron-left"
          leftIconAction={LhGoBack}
          leftIconColor={colors.secondary}
          rightIconAction={toggleFav}
          rightIconColor={colors.secondary}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageBackground
            source={LhProduct.image}
            style={{width: H_W.width * 0.9, height: HEIGHT * 0.45}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: H_W.width * 0.03,
            marginTop: HEIGHT * 0.02,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.secondary,
              fontFamily: textFont,
              fontSize: 30,
              width: H_W.width * 0.6,
            }}>
            {LhProduct.productName}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Fontisto name="stopwatch" color={colors.secondary} size={24} />
            <Text
              style={{
                fontSize: 17.5,
                marginLeft: H_W.width * 0.02,
                color: colors.darkGray,
                fontFamily: textFont,
              }}>
              20 min
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginLeft: H_W.width * 0.03,
            fontSize: 20.5,
            marginTop: HEIGHT * 0.01,
            fontWeight: 'bold',
            fontFamily: textFont,
          }}>
          Details
        </Text>
        <Text
          style={{
            marginHorizontal: H_W.width * 0.03,
            fontWeight: 'bold',
            fontFamily: textFont,
            color: colors.darkGray,
            fontSize: 17,
            lineHeight: HEIGHT * 0.03,
            marginTop: HEIGHT * 0.01,
          }}>
          {LhProduct.description}
        </Text>
        <View
          style={{
            paddingHorizontal: H_W.width * 0.03,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: HEIGHT * 0.04,
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              fontFamily: textFont,
            }}>
            $ {LhProduct.price}
          </Text>
          {props.LhCart[LhProduct.id] !== undefined &&
          props.LhCart[LhProduct.id].added !== 0 ? (
            <View
              style={{
                width: H_W.width * 0.35,
                paddingHorizontal: H_W.width * 0.01,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 10,
              }}>
              <Button
                onPress={LhRemoveFromCart}
                title=""
                buttonStyle={{backgroundColor: 'transparent'}}
                icon={
                  <AntDesign
                    color={colors.secondary}
                    name="minuscircleo"
                    size={23}
                  />
                }
              />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {props.LhCart[LhProduct.id].added}
              </Text>
              <Button
                onPress={LhAddToCart}
                title=""
                buttonStyle={{backgroundColor: 'transparent'}}
                icon={
                  <AntDesign
                    color={colors.secondary}
                    name="pluscircleo"
                    size={23}
                  />
                }
              />
            </View>
          ) : (
            <Button
              onPress={LhAddToCart}
              title="Add to Cart    "
              titleStyle={{
                fontWeight: 'bold',
                color: colors.secondary,
                fontFamily: textFont,
              }}
              buttonStyle={{backgroundColor: colors.primary, borderRadius: 5}}
              containerStyle={{borderRadius: 5}}
              iconRight
              raised
              icon={
                <AntDesign
                  color={colors.secondary}
                  name="pluscircleo"
                  size={25}
                />
              }
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    LhProduct: state.LhCrntPrdtReducer,
    LhFavs: state.LhToggleFav,
    LhCart: state.LhCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  LhsetFavAction,
  LhremoveFavAction,
  LhremoveCartAction,
  LhaddCartAction,
})(React.memo(SingleProduct));
