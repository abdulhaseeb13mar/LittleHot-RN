/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../LhComp/WrapperScreen';
import {colors, textFont} from '../LhComp/LhColor';
import {H_W} from '../LhComp/LhDim';
import Data from '../LhData';
import Loop from '../LhComp/LhFlatList';
import RefNavigation from '../LhComp/RefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  LhsetCurrentProductAction,
  LhremoveFavAction,
  LhsetFavAction,
} from '../LhRedux/LhActions';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

function LhHome(props) {
  useEffect(() => {
    LhchangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Lhcategories, setLhCategories] = useState(Data.category);
  const [LhcurrentCat, setLhCurrentCat] = useState(Data.category[0]);
  const [LhtabProducts, setLhTabProducts] = useState([]);

  const LhchangeTab = (tab) => {
    setLhCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.categoryId,
    );
    setLhTabProducts(filteredProducts);
  };

  const LhGotoFav = () => RefNavigation.Navigate('LhFav');
  const LhGotoCart = () => RefNavigation.Navigate('LhCart');
  // const LhGotoSearch = () => RefNavigation.Navigate('LhSearch');
  const LhGoToSingleProduct = (item) => {
    props.LhsetCurrentProductAction(item);
    RefNavigation.Navigate('LhSP');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <Loop
          ListHeaderComponent={
            <ScrollView bounces={false}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginVertical: HEIGHT * 0.015,
                  paddingHorizontal: H_W.width * 0.03,
                }}>
                <TouchableOpacity
                  onPress={LhGotoFav}
                  style={{
                    padding: H_W.width * 0.02,
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                  }}>
                  <AntDesign name="hearto" color={colors.secondary} size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={LhGotoCart}
                  style={{
                    padding: H_W.width * 0.02,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                  }}>
                  <Feather
                    name="shopping-cart"
                    color={colors.secondary}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: HEIGHT * 0.02,
                  fontWeight: 'bold',
                  color: colors.secondary,
                  fontFamily: 'menlo',
                  marginLeft: H_W.width * 0.03,
                  fontSize: 30,
                }}>
                Hi,Satya
              </Text>
              <Text
                style={{
                  fontFamily: textFont,
                  marginLeft: H_W.width * 0.03,
                  marginTop: HEIGHT * 0.007,
                  fontSize: 20,
                  color: colors.darkGray,
                  fontStyle: 'italic',
                }}>
                Want to order delicious food?
              </Text>
              <View>
                <Loop
                  data={Lhcategories}
                  renderItem={({item}) => (
                    <TabList
                      item={item}
                      changeTab={LhchangeTab}
                      LhcurrentCat={LhcurrentCat}
                    />
                  )}
                />
              </View>
              <Text
                style={{
                  marginLeft: H_W.width * 0.03,
                  fontSize: 24,
                  fontWeight: 'bold',
                  fontFamily: textFont,
                  marginVertical: HEIGHT * 0.015,
                }}>
                Recommended
              </Text>
              <View>
                <Loop
                  data={Data.recommended}
                  renderItem={({item}) => (
                    <LhVerticalTile
                      item={item}
                      LhGoToSingleProduct={LhGoToSingleProduct}
                      LhFavs={props.LhFavs}
                      LhsetFav={(i) => props.LhsetFavAction(i)}
                      LhremoveFav={(i) => props.LhremoveFavAction(i)}
                    />
                  )}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: H_W.width * 0.03,
                  marginVertical: HEIGHT * 0.02,
                }}>
                <View
                  style={{
                    flex: 1,
                    height: HEIGHT * 0.005,
                    backgroundColor: colors.secondary,
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    paddingHorizontal: H_W.width * 0.01,
                  }}>
                  {LhcurrentCat.categoryName}
                </Text>
                <View
                  style={{
                    flex: 1,
                    height: HEIGHT * 0.005,
                    backgroundColor: colors.secondary,
                  }}
                />
              </View>
            </ScrollView>
          }
          data={LhtabProducts}
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
    </WrapperScreen>
  );
}

export const LhVerticalTile = ({
  item,
  LhGoToSingleProduct,
  LhFavs,
  LhremoveFav,
  LhsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let us = 0; us < LhFavs.length; us++) {
      if (LhFavs[us].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? LhremoveFav(item.id) : LhsetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => LhGoToSingleProduct(item)}
      style={{
        position: 'relative',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: H_W.width * 0.45,
        borderRadius: 15,
        marginHorizontal: H_W.width * 0.03,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(197, 95, 17, 0.4)',
          borderRadius: 15,
        }}>
        <View
          style={{
            width: H_W.width * 0.17,
            height: H_W.width * 0.17,
            backgroundColor: 'white',
            borderRadius: 50,
            opacity: 0.2,
            transform: [{scaleX: 3.2}, {scaleY: 3}],
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <View
          style={{
            width: '100%',
            paddingLeft: H_W.width * 0.025,
            paddingTop: H_W.width * 0.03,
            alignSelf: 'stretch',
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              color: colors.secondary,
              width: '70%',
            }}>
            {item.productName}
          </Text>
          <Text
            style={{
              marginTop: HEIGHT * 0.01,
              fontSize: 20,
              color: colors.secondary,
              fontWeight: 'bold',
            }}>
            ${item.price}
          </Text>
        </View>
        <ImageBackground
          source={item.image}
          resizeMode="contain"
          imageStyle={{borderRadius: 15}}
          style={{
            width: H_W.width * 0.32,
            height: HEIGHT * 0.18,
            alignSelf: 'flex-end',
            marginTop: HEIGHT * 0.01,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={toggleFav}
        style={{
          position: 'absolute',
          top: -3,
          right: -5,
          padding: 7,
          backgroundColor: 'white',
          borderRadius: 50,
          zIndex: 10,
        }}>
        <Entypo
          name={fav ? 'heart' : 'heart-outlined'}
          color={colors.secondary}
          size={27}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export const LhHorizontalTile = ({
  item,
  LhGoToSingleProduct,
  LhFavs,
  LhremoveFav,
  LhsetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let us = 0; us < LhFavs.length; us++) {
      if (LhFavs[us].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? LhremoveFav(item.id) : LhsetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: HEIGHT * 0.01,
      }}>
      <TouchableOpacity
        onPress={() => LhGoToSingleProduct(item)}
        style={{
          position: 'relative',
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          width: '90%',
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(197, 95, 17, 0.4)',
            borderRadius: 15,
            paddingVertical: HEIGHT * 0.015,
            paddingHorizontal: H_W.width * 0.03,
          }}>
          <View
            style={{
              width: H_W.width * 0.17,
              height: H_W.width * 0.17,
              backgroundColor: 'white',
              borderRadius: 50,
              opacity: 0.2,
              transform: [{scaleX: 3.2}, {scaleY: 3}],
              position: 'absolute',
              bottom: 0,
              right: 0,
              zIndex: -1,
            }}
          />
          <View
            style={{
              width: H_W.width * 0.45,
              marginLeft: H_W.width * 0.035,
              alignSelf: 'stretch',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 22,
                color: colors.secondary,
              }}>
              {item.productName}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                marginTop: HEIGHT * 0.01,
                color: colors.secondary,
                fontSize: 17,
              }}>
              {item.description}
            </Text>
            <Text
              style={{
                marginTop: HEIGHT * 0.01,
                fontSize: 20,
                color: colors.secondary,
                fontWeight: 'bold',
              }}>
              ${item.price}
            </Text>
          </View>
          <ImageBackground
            source={item.image}
            resizeMode="contain"
            style={{
              width: H_W.width * 0.32,
              height: HEIGHT * 0.18,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={toggleFav}
          style={{
            position: 'absolute',
            top: -3,
            right: -5,
            padding: 7,
            backgroundColor: 'white',
            borderRadius: 50,
            zIndex: 5,
          }}>
          <Entypo
            name={fav ? 'heart' : 'heart-outlined'}
            color={colors.secondary}
            size={27}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export const TabList = ({item, changeTab, LhcurrentCat}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => changeTab(item)}>
      <View
        style={{
          ...styles.LhHome1,
          backgroundColor:
            item.categoryName === LhcurrentCat.categoryName
              ? colors.secondary
              : colors.primary,
        }}>
        <ImageBackground
          source={
            item.categoryName === LhcurrentCat.categoryName
              ? item.whiteIcon
              : item.blackIcon
          }
          style={styles.LhHome2}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  LhHome21: {},
  LhHome20: {},
  LhHome19: {},
  LhHome18: {},
  LhHome17: {},
  LhHome16: {},
  LhHome15: {},
  LhHome14: {},
  LhHome13: {},
  LhHome12: {},
  LhHome11: {},
  LhHome10: {},
  LhHome9: {},
  LhHome8: {},
  LhHome7: {},
  LhHome6: {},
  LhHome5: {},
  LhHome4: {},
  LhHome3: {},
  LhHome2: {width: H_W.width * 0.1, height: H_W.width * 0.1},
  LhHome1: {
    width: H_W.width * 0.18,
    height: H_W.width * 0.18,
    padding: H_W.width * 0.02,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: H_W.width * 0.03,
    paddingTop: H_W.width * 0.02,
  },
});

const mapStateToProps = (state) => {
  return {
    LhtotalItems: state.LhCartReducer.totalItems,
    LhFavs: state.LhToggleFav,
  };
};

export default connect(mapStateToProps, {
  LhsetCurrentProductAction,
  LhremoveFavAction,
  LhsetFavAction,
})(LhHome);
