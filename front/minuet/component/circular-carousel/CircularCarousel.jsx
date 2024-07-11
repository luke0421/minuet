import React from "react";
import { FlatList, Dimensions, Image } from "react-native";
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolate,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { CircularCarouselListItem, ListItemWidth } from "./listItem";
// 해당 컴포넌트가 있는 경로로 수정

const CircularCarousel = ({
  handleall,
  handleLogo,
  data,
  setWhatLogo,
  setPageNo,
}) => {
  const contentOffset = useSharedValue(0);

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16}
      onScroll={(event) => {
        contentOffset.value = event.nativeEvent.contentOffset.x;
      }}
      pagingEnabled
      snapToInterval={ListItemWidth}
      style={{
        position: "absolute",
        bottom: 0,
        height: 300,
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 1.5 * ListItemWidth,
      }}
      horizontal
      renderItem={({ item, index }) => {
        return (
          <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
            <CircularCarouselListItem
              handleall={handleall}
              handleLogo={handleLogo}
              contentOffset={contentOffset}
              imageSrc={item}
              index={index}
              setWhatLogo={setWhatLogo}
              setPageNo={setPageNo}
            />
          </Animated.View>
        );
      }}
    />
  );
};

export { CircularCarousel };
