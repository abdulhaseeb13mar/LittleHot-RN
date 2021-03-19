/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {H_W} from './LhDim';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LhaddCartAction, LhremoveCartAction} from '../LhRedux/LhActions';

const ItemCounterWrapper = ({style, position, Counterlength, ...props}) => {
  return (
    <View
      style={{
        ...style,
        alignItems: 'center',
        flexDirection:
          position === 'top' || position === 'bottom' ? 'column' : 'row',
      }}>
      {(position === 'top' || position === 'left') && (
        <DefaultCounter
          position={position}
          item={props.item}
          LhGoToSingleProduct={props.LhGoToSingleProduct}
          LhaddCart={(i) => props.LhaddCartAction(i)}
          LhremoveCart={(i) => props.LhremoveCartAction(i)}
          Counterlength={Counterlength}
          counterColor={props.counterColor}
          counterContentColor={props.counterContentColor}
        />
      )}
      {props.children}
      {(position === 'bottom' || position === 'right') && (
        <DefaultCounter
          position={position}
          item={props.item}
          LhGoToSingleProduct={props.LhGoToSingleProduct}
          LhaddCart={(i) => props.LhaddCartAction(i)}
          LhremoveCart={(i) => props.LhremoveCartAction(i)}
          Counterlength={Counterlength}
          counterColor={props.counterColor}
          counterContentColor={props.counterContentColor}
        />
      )}
    </View>
  );
};

const DefaultCounter = ({
  item,
  LhremoveCart,
  LhaddCart,
  position,
  Counterlength,
  counterColor,
  counterContentColor,
}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <View
      style={{
        ...styles.itemCounter_CE2,
        paddingVertical: HEIGHT * 0.003,
        backgroundColor: counterColor ? counterColor : 'white',
      }}>
      <View
        style={{
          ...styles.itemCounter_CE1,
          marginVertical: HEIGHT * 0.013,
          ...(position === 'top' || position === 'bottom'
            ? {width: Counterlength}
            : {height: Counterlength}),
          flexDirection:
            position === 'top' || position === 'bottom' ? 'row' : 'column',
        }}>
        <TouchableOpacity onPress={() => LhremoveCart(item)}>
          <Feather
            name="minus-circle"
            size={H_W.width * 0.05}
            color={counterContentColor ? counterContentColor : 'black'}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            color: counterContentColor ? counterContentColor : 'black',
          }}>
          {item.added}
        </Text>
        <TouchableOpacity onPress={() => LhaddCart(item)}>
          <Feather
            name="plus-circle"
            size={H_W.width * 0.05}
            color={counterContentColor ? counterContentColor : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCounter_CE1: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCounter_CE2: {
    borderRadius: 15,
    elevation: 3,
    paddingHorizontal: H_W.width * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default connect(null, {LhaddCartAction, LhremoveCartAction})(
  ItemCounterWrapper,
);
