import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useAnimatedValue,
} from "react-native";
import Header_White_Left from "../../util/Header_White_Left";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GlobalColor } from "../../util/colors";
import { BlurView } from "expo-blur";
import { useState } from "react";
const { width, height } = Dimensions.get("window");
const HandleState = ({ route, navigation }) => {
  const handleState = route.params.handleState;
  const text = route.params.state;
  const [newTab, setNewTab] = useState(text);
  const getBottomColor = (tab) => {
    if (tab === "ECONOMIC") return GlobalColor.colors.primary_red100;
    if (tab === "SOCIAL") return GlobalColor.colors.primary_yellow;
    if (tab === "LIFE") return GlobalColor.colors.primary_green;
    if (tab === "WORLD") return GlobalColor.colors.primary_blue;
    if (tab === "SCIENCE") return GlobalColor.colors.primary_purple;
    return "transparent";
  };
  const handlePress = (value) => {
    if (value == newTab) {
      handleState(value);
      navigation.goBack();
    } else {
      animated_width.value = 50;
      setNewTab(value);
      animated_width.value = withTiming(width - 250);
    }
  };
  const bottomColor = getBottomColor(text);
  let tabs = ["ECONOMIC", "SOCIAL", "LIFE", "WORLD", "SCIENCE"];

  // 선택된 탭의 인덱스 찾기

  // 선택된 탭을 배열의 맨 앞으로 이동
  // const indexOfLife = tabs.indexOf(text);
  // const beforeLife = tabs.slice(0, indexOfLife);
  // const afterLife = tabs.slice(indexOfLife + 1);

  // // 나눈 배열들을 합치기
  // tabs = [tabs[indexOfLife], ...afterLife, ...beforeLife];
  const animated_width = useSharedValue(width - 250);
  const rstyle = useAnimatedStyle(() => {
    const new_height = animated_width.value;
    return {
      width: new_height,
    };
  });
  return (
    <BlurView tint="dark" intensity={70} style={{ flex: 1 }}>
      <Pressable onPress={() => navigation.goBack()} style={{ flex: 1 }}>
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: width - 50,
              // borderRadius: 15,
              borderTopLeftRadius : 25,
              borderTopRightRadius :25,
              height: 250,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {tabs.map((tab) => (
                <Pressable key={tab} onPress={() => handlePress(tab)}>
                  <Animated.View style={[styles.tabItem]}>
                    <Text style={[styles.tabText,{fontWeight : newTab==tab ? "bold" :"normal" }]}>{tab}</Text>
                    {newTab == tab ? (
                      <Animated.View
                        style={[
                          {
                            backgroundColor: getBottomColor(tab),
                            height: 2,
                          },
                          rstyle,
                        ]}
                      >
                        <Text></Text>
                      </Animated.View>
                    ) : (
                      <Animated.View
                        style={[
                          {
                            height: 2,
                            width: width - 200,
                          },
                        ]}
                      >
                        <Text></Text>
                      </Animated.View>
                    )}
                  </Animated.View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          {/* <View style={{ backgroundColor: "white", width: width - 100 ,borde}}>
          <Text>asdf</Text>
        </View> */}
        </Animated.View>
      </Pressable>
    </BlurView>
  );
};
export default HandleState;

const styles = StyleSheet.create({
  tabItem: {
    borderBottomWidth: 2,
    padding: 25,
    width: width - 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 20,
  },
  selectedTabText: {
    fontWeight: "bold",
  },
});
