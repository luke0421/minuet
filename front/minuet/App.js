import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch } from "react-redux";
import Home from "./Test/Home";
import Test from "../minuet/secreens/Test/Test";
import store, { persistor } from "./store/store";
// import Register from "./secreens/Register/Register";
import Start from "./secreens/Start/Start";
import Login from "./secreens/Login/Login";
import Email from "./secreens/Register/Email";
import MainPage from "./secreens/MainPage/MainPage";
import News from "./secreens/News/News";
import CountryNews from "./secreens/CountryNews.js/CountryNews";
import Setting from "./secreens/Setting/Setting";
import { GlobalColor } from "./util/colors";
import Ionicons from "react-native-vector-icons/Ionicons"; // 이 패키지를 설치해야 할 수도 있습니다.
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import Weather from "./component/Weather/Weather";
import Testasdf from "./secreens/Test/Test";
import MyTest from "./secreens/Test/TestSetting";
import DetailsNews from "./secreens/DetailsNews/DetailsNews";
import * as Notifications from "expo-notifications";
import app from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import {
  setEconmicNews,
  setLifeNews,
  setScienceNews,
  setSocialNews,
  setWorldNews,
} from "./store/newsSlice";
import NaverDictionarySearch from "./component/Dictionary/Dictionary";
import Password from "./secreens/Register/Password";
import UserDetails from "./secreens/Register/UserDetails";
import SettingInfo from "./secreens/Setting/SettingInfo";
import { getUserInfo } from "./asyncstorage/AsyncStorage";
import NewCountryNews from "./secreens/CountryNews.js/NewCoun";
import NewNew from "./secreens/CountryNews.js/NewNew";

import * as Font from "expo-font";

import { PersistGate } from "redux-persist/integration/react";
import Search from "./secreens/Search/Search";
import CountryDetailsNews from "./secreens/DetailsNews/CountryDetailsNews";
import NewsSearch from "./component/NewsSearch/NewsSearch";
import { FontAwesome } from "@expo/vector-icons";
import HandleState from "./secreens/handlestate/HandleState";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get("window");
const MARGIN = 16;
const TAB_BAR_WIDTH = width;
const TAB_WIDTH = TAB_BAR_WIDTH / 4;
const colorArr = [
  GlobalColor.colors.primary_blue,
  GlobalColor.colors.Pick_color,
  GlobalColor.colors.primary_yellow,
  GlobalColor.colors.primary_purple,
  GlobalColor.colors.primary_gray,
];
function MyTabBar({ state, descriptors, navigation }) {
  const [translateX] = useState(new Animated.Value(0));

  const translateTab = (index) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.slidingTabContainer}>
        <Animated.View
          style={[
            styles.slidingTab,
            {
              transform: [{ translateX }],
              backgroundColor: colorArr[state.index],
            },
          ]}
        />
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <TabIcon
              isFocused={isFocused}
              options={options}
              label={label}
              index={state.index}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const TabIcon = ({ isFocused, options, label, index }) => {
  const [translateY] = useState(new Animated.Value(0));

  const translateIcon = (val) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (isFocused) {
      translateIcon(-10);
    } else {
      translateIcon(0);
    }
  }, [index]);

  return (
    <>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {isFocused === true ? <options.focuseIcon /> : <options.tabBarIcon />}
      </Animated.View>
      <Text
        style={{
          color: isFocused ? options.textColor : "white",
          fontWeight: "bold",
        }}
      >
        {label}
      </Text>
    </>
  );
};
function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false, keyboardHidesTabBar: true }}
    >
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          textColor: GlobalColor.colors.primary_blue,
          tabBarLabel: "메인", // 탭 바에 표시될 라벨
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={GlobalColor.colors.primary_blue}
              size={24}
            />
          ),
          focuseIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={24} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          textColor: GlobalColor.colors.primary_red,
          tabBarLabel: "뉴스",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="newspaper-outline"
              color={GlobalColor.colors.Pick_color}
              size={24}
            />
          ),
          focuseIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={24} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="CountryNews"
        component={NewNew}
        options={{
          textColor: GlobalColor.colors.primary_yellow,
          tabBarLabel: "지역뉴스",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="globe-outline"
              color={GlobalColor.colors.primary_yellow}
              size={24}
            />
          ),
          focuseIcon: ({ color, size }) => (
            <Ionicons name="globe" size={24} color="white" />
          ),
        }}
      />

      {/* <Tab.Screen
        name="NewsSearch"
        component={NewsSearch}
        options={{
          textColor: GlobalColor.colors.primary_purple,
          tabBarLabel: "검색",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="search"
              color={GlobalColor.colors.primary_purple}
              size={24}
            />
          ),
          focuseIcon: ({ color, size }) => (
            <FontAwesome name="search" color="white" size={24} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          textColor:  GlobalColor.colors.primary_purple,
          tabBarLabel: "설정",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              color={  GlobalColor.colors.primary_purple}
              size={24}
            />
          ),
          focuseIcon: ({ color, size }) => (
            <Ionicons name="settings" size={24} color="white" />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Test"
        component={Test}
        options={{
          textColor: GlobalColor.colors.primary_gray,
          tabBarLabel: "설정",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              color={GlobalColor.colors.primary_gray}
              size={24}
            />
          ),
          focuseIcon: ({ color, size }) => (
            <Ionicons name="settings" size={24} color="white" />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      GmarketSansTTFLight: require("./assets/font/GmarketSansTTFLight.ttf"),
      GmarketSansTTFBold: require("./assets/font/GmarketSansTTFBold.ttf"),
      GmarketSansTTFMedium: require("./assets/font/GmarketSansTTFMedium.ttf"),
    });
    setIsReady(true);
  };

  useEffect(() => {
    getFonts();
  }, []);

  return (
    <>
      {isReady ? (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer
              linking={{
                config: {
                  // Configuration for linking
                },
                async getInitialURL() {
                  // First, you may want to do the default deep link handling
                  // Check if app was opened from a deep link
                  const url = await Linking.getInitialURL();

                  if (url != null) {
                    return url;
                  }

                  // Handle URL from expo push notifications
                  const response =
                    await Notifications.getLastNotificationResponseAsync();
                  console.log(response?.notification.request.content.data.url)
                  return response?.notification.request.content.data.url;
                },
                subscribe(listener) {
                  const onReceiveURL = ({ url }) => listener(url);

                  // Listen to incoming links from deep linking
                  const eventListenerSubscription = Linking.addEventListener(
                    "url",
                    onReceiveURL
                  );

                  // Listen to expo push notifications
                  const subscription =
                    Notifications.addNotificationResponseReceivedListener(
                      (response) => {
                        const url =
                          response.notification.request.content.data.url;

                        // Any custom logic to see whether the URL needs to be handled
                        //...

                        // Let React Navigation handle the URL
                        listener(url);
                      }
                    );

                  return () => {
                    // Clean up the event listeners
                    eventListenerSubscription.remove();
                    subscription.remove();
                  };
                },
              }}
            >
              <Stack.Navigator initialRouteName="Start">
                <Stack.Screen
                  name="Tab"
                  component={MyTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Test"
                  component={Test}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Start"
                  component={Start}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MainPage"
                  component={MainPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Email"
                  component={Email}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Password"
                  component={Password}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserDetails"
                  component={UserDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Search"
                  component={Search}
                  options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="DetailsNews"
                  component={DetailsNews}
                  options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="CountryDetailsNews"
                  component={CountryDetailsNews}
                  options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Dictionary"
                  component={NaverDictionarySearch}
                  // options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SettingInfo"
                  component={SettingInfo}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="HandleState"
                  component={HandleState}
                  options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="NewsSearch"
                  component={NewsSearch}
                  options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarContainer: {
    flexDirection: "row",
    width: TAB_BAR_WIDTH,
    height: 70,
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: "center",
    justifyContent: "space-around",
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    // backgroundColor:"gray",
    alignItems: "center",
  },
  slidingTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: GlobalColor.colors.Pick_color,
    bottom: 15,
    borderWidth: 4,
    borderColor: "white",
  },
});
