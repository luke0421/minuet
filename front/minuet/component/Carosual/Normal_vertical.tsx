import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { SBTextItem } from "./SBTextItem";
import SButton from "./SButton";
import { ElementsText, window } from "./constants";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColor } from "../../util/colors";
import GestureRecognizer from "react-native-swipe-gestures";

const PAGE_WIDTH = window.width;

// Normal_Vertical 컴포넌트에서 prop 이름을 colors로 변경
function Normal_Vertical({ colors, Newsdata }) {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [isVertical, setIsVertical] = React.useState(true);
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(true);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(false);
  const ref = React.useRef<ICarouselInstance>(null);
  const animateheight = useSharedValue(40);
  const imgStyle = useAnimatedStyle(() => {
    return {
      height: animateheight.value,
    };
  });
  const opacityanimate = useAnimatedStyle(() => {
    return {
      opacity: animateheight.value,
    };
  });
  const [isVisible, setIsVisible] = React.useState(true);
  const animateopacity = useSharedValue(1);

  const handlebutton = () => {
    animateheight.value = withTiming(0);
    animateopacity.value = withTiming(0);
  };
  const handlenewbutton = () => {
    animateheight.value = withTiming(40);
    animateopacity.value = withTiming(1);
  };
  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: windowWidth,
        height: 40,
      } as const)
    : ({
        vertical: false,
        width: windowWidth,
        height: 40,
      } as const);

  return (
    <>
      {isVisible && (
        <GestureRecognizer onSwipeUp={handlebutton} onSwipeDown={handlenewbutton}>
          <Animated.View
            style={[{ height: 40, position: "relative" }, opacityanimate]}
          >
            <Carousel
              {...baseOptions}
              loop
              enabled ={false}
              ref={ref}
              defaultScrollOffsetValue={scrollOffsetValue}
              testID={"xxx"}
              style={[{ width: "100%", height: 40 }, imgStyle]}
              autoPlay={isAutoPlay}
              autoPlayInterval={isFast ? 100 : 2000}
              data={Newsdata}
              onConfigurePanGesture={(g) => g.enabled(false)}
              pagingEnabled={isPagingEnabled}
              renderItem={({ index, item }) => (
                <SBTextItem
                  title={item.title}
                  colors={colors}
                  key={index}
                  index={index}
                />
              )}
            />
            {/* <TouchableOpacity activeOpacity={0.7} onPress={() => handlebutton()}>
            <AntDesign
              style={{ position: "relative", left: 4, bottom: 30 }}
              name="caretup"
              size={24}
              color={GlobalColor.colors.Pick_color}
            />
          </TouchableOpacity> */}
          </Animated.View>
        </GestureRecognizer>
      )}
    </>
  );
}

export default Normal_Vertical;
