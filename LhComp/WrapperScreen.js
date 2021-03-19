/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {colors} from './LhColor';

function WrapperScreen(props) {
  const {
    top,
    bottom,
    statusBar = 'white',
    barStyle = 'dark-content',
    statusColor = 'white',
  } = props;
  return (
    <View style={{flex: 1, backgroundColor: statusBar}}>
      <StatusBar
        // backgroundColor={`rgba(${colors.rgb_Primary}, 0.1)`}
        backgroundColor={statusColor}
        barStyle={barStyle}
      />
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View
            style={{
              flex: 1,
              marginTop: top === 0 ? top : insets.top,
              paddingBottom: bottom === 0 ? bottom : insets.bottom,
              backgroundColor: 'white',
              ...props.style,
            }}>
            {props.children}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </View>
  );
}

export default WrapperScreen;
