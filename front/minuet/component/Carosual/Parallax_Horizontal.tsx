import * as React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { SBItem } from "./SBitem";

import { ElementsText, window } from "./constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalColor } from "../../util/colors";

const PAGE_WIDTH = window.width;
const colors = [
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
  GlobalColor.colors.primary_black50,
];

function Parallax_Horizontal({ handleNewsCardClick, data }) {
  const [isVertical, setIsVertical] = React.useState(false);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const progressValue = useSharedValue<number>(0);
  // console.log(handleNewsCardClick)
  const baseOptions = isVertical
    ? ({
      vertical: true,
      width: PAGE_WIDTH * 0.86,
      height: PAGE_WIDTH * 0.6,
    } as const)
    : ({
      vertical: false,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH * 0.6,
    } as const);

  return (
    <GestureHandlerRootView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Carousel
          {...baseOptions}
          style={{
            width: PAGE_WIDTH,
          }}
          loop
          pagingEnabled={pagingEnabled}
          snapEnabled={snapEnabled}
          autoPlay={autoPlay}
          autoPlayInterval={3000}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={data}
          renderItem={({ index, item }) => (
            <SBItem
              handleNewsCardClick={handleNewsCardClick}
              key={index}
              img_url={item.imgURL}
              title={item.title}
              index={index}
            />
          )}
        />
        {/* {!!progressValue && (
          <View
            style={
              isVertical
                ? {
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: 10,
                    position: "absolute",
                    alignItems: "center",
                    right: 5,
                    top: 40,
                  }
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 100,
                    marginBottom: 10,
                    alignItems: "center",
                  }
            }
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              {colors.map((backgroundColor, index) => {
                return (
                  <PaginationItem
                    key={index}
                    backgroundColor={backgroundColor}
                    animValue={progressValue}
                    index={index}
                    isRotate={isVertical}
                    length={colors.length}
                  />
                );
              })}
            </View>
          </View>
        )} */}
      </View>
    </GestureHandlerRootView>
  );
}

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = (props) => {
  const { animValue, index, length, backgroundColor, isRotate } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: "white",
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        transform: [
          {
            rotateZ: isRotate ? "90deg" : "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default Parallax_Horizontal;
