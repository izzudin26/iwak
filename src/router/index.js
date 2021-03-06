import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Splash,
  Login,
  Signup,
  Home,
  Chat,
  Wishlist,
  Product,
  Account,
  Auction,
  Sale,
  DetailProduct,
  Cart,
  Shipping,
  Payment,
  AboutUs,
  EditEmail,
  EditName,
  EditPassword,
  EditAddress,
  EditPhone,
  Notification,
  SettingStore,
  MyStore,
  CreateStore,
  EditNameToko,
  ListProduct,
  AddProduct,
  DetailProductStore,
  EditProduct,
  OpenBidding,
  ChatPerson,
  Feedback,
  ProductFeedback,
  IncomingOrder,
  ListBidAuction,
  DetailProductAuction,
  PaymentAuction,
  InputFeedback,
  Report,
} from '../pages';
import BottomNavigator from '../components/BottomNavigator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LogoTitle = () => {
  return (
    <Image source={require('../assets/images/Logo.png')} style={styles.Image} />
  );
};

const MainApp = () => {
  const cart = useSelector(state => state.cart.length);

  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomNavigator
          {...props}
          state={{...props.state, routes: props.state.routes.slice(0, 5)}}
        />
      )}
      backBehavior="history">
      <Tab.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          // unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: props => (
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
              <LogoTitle {...props} />
            </TouchableOpacity>
          ),
          headerBackVisible: false,
          headerTitleAlign: 'left',
          headerRight: () => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <FontAwesome5
                  name="bell"
                  solid
                  size={23}
                  color="#F0C341"
                  onPress={() => navigation.navigate('Notification')}
                />
                <View style={{flexDirection: 'column'}}>
                  <FontAwesome5
                    name="shopping-cart"
                    solid
                    size={23}
                    style={{marginHorizontal: 15}}
                    color="#F0C341"
                    onPress={() => navigation.navigate('Cart')}
                  />
                  {cart != 0 && (
                    <Badge
                      containerStyle={{
                        position: 'absolute',
                        right: 7,
                        bottom: -9,
                      }}
                      value={cart}></Badge>
                  )}
                </View>
              </View>
            );
          },
        })}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> CHAT </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> WISHLIST </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: props => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> P R O D U C T </Text>
            </View>
          ),
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Account </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="Sale"
        component={Sale}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> S A L E </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Product')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <FontAwesome5
                  name="bell"
                  solid
                  size={23}
                  color="#F0C341"
                  onPress={() => navigation.navigate('Notification')}
                />
                <View style={{flexDirection: 'column'}}>
                  <FontAwesome5
                    name="shopping-cart"
                    solid
                    size={23}
                    style={{marginHorizontal: 15}}
                    color="#F0C341"
                    onPress={() => navigation.navigate('Cart')}
                  />
                  {cart != 0 && (
                    <Badge
                      containerStyle={{
                        position: 'absolute',
                        right: 7,
                        bottom: -9,
                      }}
                      value={cart}></Badge>
                  )}
                </View>
              </View>
            );
          },
        })}
      />

      <Tab.Screen
        name="Auction"
        component={Auction}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> A U C T I O N </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Product')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <FontAwesome5
                  name="bell"
                  solid
                  size={23}
                  color="#F0C341"
                  onPress={() => navigation.navigate('Notification')}
                />
                <View style={{flexDirection: 'column'}}>
                  <FontAwesome5
                    name="shopping-cart"
                    solid
                    size={23}
                    style={{marginHorizontal: 15}}
                    color="#F0C341"
                    onPress={() => navigation.navigate('Cart')}
                  />
                  {cart != 0 && (
                    <Badge
                      containerStyle={{
                        position: 'absolute',
                        right: 7,
                        bottom: -9,
                      }}
                      value={cart}></Badge>
                  )}
                </View>
              </View>
            );
          },
        })}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}>
                {' '}
                N O T I F I C A T I O N{' '}
              </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{flexDirection: 'column'}}>
                  <FontAwesome5
                    name="shopping-cart"
                    solid
                    size={23}
                    style={{marginHorizontal: 15}}
                    color="#F0C341"
                    onPress={() => navigation.navigate('Cart')}
                  />
                  {cart != 0 && (
                    <Badge
                      containerStyle={{
                        position: 'absolute',
                        right: 7,
                        bottom: -9,
                      }}
                      value={cart}></Badge>
                  )}
                </View>
              </View>
            );
          },
        })}
      />

      <Tab.Screen
        name="AboutUs"
        component={AboutUs}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: props => <LogoTitle {...props} />,
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Home')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="EditName"
        component={EditName}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Account </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="EditPhone"
        component={EditPhone}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Account </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="EditAddress"
        component={EditAddress}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Account </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="EditEmail"
        component={EditEmail}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Account </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="EditPassword"
        component={EditPassword}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Account </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="CreateStore"
        component={CreateStore}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> Create Store </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="EditNameToko"
        component={EditNameToko}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> Edit Nama Toko </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Tab.Screen
        name="Report"
        component={Report}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> R E P O R T </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const cart = useSelector(state => state.cart.length);

  return (
    <Stack.Navigator initialRouteName="Splash" backBehavior="history">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: props => (
            <View>
              <Text style={styles.teksHeadLoginSignup}>REGISTER</Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Login')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="IncomingOrder"
        component={IncomingOrder}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> O R D E R S </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('MyStore')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="SettingStore"
        component={SettingStore}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Store </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="ListProduct"
        component={ListProduct}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> List Product </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: props => (
            <View>
              <Text style={styles.teksHeadLoginSignup}>LOGIN</Text>
            </View>
          ),
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> Add Product </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="ChatPerson"
        component={ChatPerson}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyStore"
        component={MyStore}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> My Store </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> Edit Product </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="Shipping"
        component={Shipping}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> S H I P P I N G </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <FontAwesome5
                  name="bell"
                  solid
                  size={23}
                  color="#F0C341"
                  onPress={() => navigation.navigate('Notification')}
                />
                <View style={{flexDirection: 'column'}}>
                  <FontAwesome5
                    name="shopping-cart"
                    solid
                    size={23}
                    style={{marginHorizontal: 15}}
                    color="#F0C341"
                    onPress={() => navigation.navigate('Cart')}
                  />
                  {cart != 0 && (
                    <Badge
                      containerStyle={{
                        position: 'absolute',
                        right: 7,
                        bottom: -9,
                      }}
                      value={cart}></Badge>
                  )}
                </View>
              </View>
            );
          },
        })}
      />

      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> Feedback </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={({navigation, route}) => ({
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> C A R T </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Product')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="ProductFeedback"
        component={ProductFeedback}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> Feedback </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Feedback')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="InputFeedback"
        component={InputFeedback}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> F E E D B A C K </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="OpenBidding"
        component={OpenBidding}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> Bidding Product </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Account')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="DetailProductStore"
        component={DetailProductStore}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="DetailProductAuction"
        component={DetailProductAuction}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="DetailProduct"
        component={DetailProduct}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}>
                {' '}
                D E T A I L P R O D U K{' '}
              </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.navigate('Sale')}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="Payment"
        component={Payment}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> P A Y M E N T </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="PaymentAuction"
        component={PaymentAuction}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> P A Y M E N T </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="ListBid"
        component={ListBidAuction}
        options={({navigation, route}) => ({
          headerStyle: {
            backgroundColor: '#043C88',
            height: 70,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.teksHeadLoginSignup}> L I S T B I D </Text>
            </View>
          ),
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  width: 80,
                  height: 35,
                  marginLeft: -30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <FontAwesome5
                  name="arrow-left"
                  solid
                  size={23}
                  color="#F0C341"
                  style={{
                    alignSelf: 'flex-end',
                    paddingHorizontal: 20,
                  }}
                  onPress={() => navigation.pop()}
                />
              </View>
            );
          },
          headerBackVisible: false,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({
  Image: {
    width: 70,
    height: 40,
    marginLeft: 5,
    marginVertical: 15,
  },
  teksHeadLoginSignup: {
    color: '#F0C341',
    textAlignVertical: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
});
