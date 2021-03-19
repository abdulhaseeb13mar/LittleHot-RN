/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../LhComp/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {H_W} from '../LhComp/LhDim';
import {colors} from '../LhComp/LhColor';
import {Button, Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isFormValid} from '../LhComp/validation';
import NavPointer from '../LhComp/RefNavigation';
import {LhUserAction, LhresetCart} from '../LhRedux/LhActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../LhComp/LhHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ConfirmOrder = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const Confirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.LhUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      position: -60,
      backgroundColor: colors.secondary,
      opacity: 1,
      textColor: 'white',
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            address: address,
            phonenumber: phone,
            email: email,
            appname: 'SweetnSticky',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status
        ? NavPointer.Push('LhConfirmOrder')
        : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    props.LhresetCart();
    NavPointer.Push('LhHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const goBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          Title="Checkout"
          leftIconAction={goBack}
          titleStyle={{
            textShadowColor: '#bcbcbc',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 2,
          }}
          leftIconStyle={{
            textShadowColor: '#bcbcbc',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 2,
          }}
        />
        {/* <View style={{...styles.LhSummaryOverlay, marginBottom: HEIGHT * 0.02}}>
          <View style={styles.LhSm1}>
            <View style={styles.LhSm2}>
              <Text>Total:</Text>
              <Text style={{fontWeight: 'bold'}}>${props.total}</Text>
            </View>
            <View style={styles.LhSm3}>
              <Text style={styles.LhSm4}>Payment Mode:</Text>
              <Text style={styles.LhSm4}>Payment on delivery</Text>
            </View>
          </View>
        </View> */}
        <View style={styles.LhPersonalInfoWrapper}>
          <View style={styles.LhSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.LhPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              FULL NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.LhPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.lightGrey3}
              />
              <Feather
                name="user"
                size={H_W.width * 0.07}
                style={styles.LhInputIcon}
              />
            </View>
          </View>
          <View style={styles.LhSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.LhPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL ADDRESS<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.LhPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="envelope"
                size={H_W.width * 0.07}
                style={styles.LhInputIcon}
              />
            </View>
          </View>
          <View style={styles.LhSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.LhPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              CONTACT<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.LhPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="phone"
                size={H_W.width * 0.07}
                style={styles.LhInputIcon}
              />
            </View>
          </View>
          <View style={styles.LhSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.LhPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.LhPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeAddress}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="map-marker-alt"
                size={H_W.width * 0.07}
                style={styles.LhInputIcon}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.LhConfirmButtonWrapper,
            marginBottom: HEIGHT * 0.02,
          }}>
          <Button
            title="CONFIRM ORDER"
            raised
            containerStyle={styles.LhConfirmButtonContainer}
            buttonStyle={{
              ...styles.LhConfirmButton,
              padding: HEIGHT * 0.018,
            }}
            titleStyle={{color: 'white', fontWeight: 'bold'}}
            loadingProps={{color: 'black'}}
            loading={loading}
            onPress={Confirm}
          />
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.LhModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <Ionicons
              name="ios-ice-cream-sharp"
              size={H_W.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.LhModalHeadText}>THANK YOU!</Text>
            <Text style={styles.LhModalSubText}>
              You will recieve your ice cream shortly!
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
      <MaterialIcons
        name="delivery-dining"
        color={`rgba(${colors.rgb_Primary},0.2)`}
        style={{
          position: 'absolute',
          bottom: -H_W.height * 0.07,
          right: -H_W.width * 0.1,
          zIndex: -1,
          transform: [{rotate: '-19deg'}],
        }}
        size={H_W.width * 0.7}
      />
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.LhCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {LhUserAction, LhresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  LhSm4: {fontSize: H_W.width * 0.03, fontWeight: 'bold'},
  LhSm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LhSm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LhSm1: {
    width: '75%',
    backgroundColor: colors.secondary,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: H_W.width * 0.04,
  },
  LhSummaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LhModalSubText: {
    fontSize: H_W.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  LhModalHeadText: {
    fontSize: H_W.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  LhModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
  },
  LhConfirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  LhConfirmButton: {
    backgroundColor: colors.primary,

    borderRadius: 50,
  },
  LhConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: H_W.width * 0.035,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  LhInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  LhPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGrey4,
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  LhPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  LhSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  LhPersonalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  LhPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
