import React from "react";
import { Dimensions, Image, Pressable } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GlobalColor } from "../../util/colors";
import { useSelector } from "react-redux";

const { width: windowWidth } = Dimensions.get("window");
const logo_key = {
  0: "Busan",
  1: "GangWon",
  2: "GyungNam",
  3: "Incheon",
  4: "Ulsan",
};

export const ListItemWidth = windowWidth / 4;

const CircularCarouselListItem = ({
  imageSrc,
  index,
  setPageNo,
  contentOffset,
  setWhatLogo,
  handleLogo,
  handleall,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemWidth,
      (index - 1) * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth,
    ];

    const translateYOutputRange = [
      0,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      0,
    ];

    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

    const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          translateY: translateY,
        },
        // Padding left is better than translateX
        // {
        //   translateX: ListItemWidth / 2 + ListItemWidth,
        // },
        {
          scale,
        },
      ],
    };
  });

  const handlePress = () => {
    if (index == 0) {
      setWhatLogo({
        logo: require(`../../assets/Busan_gun.png`),
        img: require(`../../assets/Busan_Mark.png`),
        eng: "BUSAN",
      });
    } else if (index == 1) {
      setWhatLogo({
        logo: require(`../../assets/GangWon_gun.png`),
        img: require(`../../assets/GangWon_Mark.png`),
        eng: "GANGWON",
      });
    } else if (index == 2) {
      setWhatLogo({
        logo: require(`../../assets/GyungNam_gun.png`),
        img: require(`../../assets/GyungNam_Mark.png`),
        eng: "GYEONGNAM",
      });
    } else if (index == 3) {
      setWhatLogo({
        logo: require(`../../assets/Incheon_gun.png`),
        img: require(`../../assets/Incheon_Mark.png`),
        eng: "INCHEON",
      });
    } else if (index == 4) {
      setWhatLogo({
        logo: require(`../../assets/Ulsan_gun.png`),
        img: require(`../../assets/Ulsan_Mark.png`),
        eng: "ULSAN",
      });
    }
    handleLogo();
    setPageNo(0);
    handleall;
  };
  const isDark = useSelector((state) => state.darkmode.value);
  return (
    <Animated.View
      style={[
        {
          width: ListItemWidth,
          aspectRatio: 1,
          elevation: 10,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: 0,
          },

          // shadowRadius: 20,
        },
        rStyle,
      ]}
    >
      <Pressable onPress={handlePress}>
        <Image
          source={imageSrc}
          style={{
            margin: 3,
            height: ListItemWidth,
            width: ListItemWidth,
            backgroundColor: "white",
            borderRadius: 200,
            borderWidth: 5,
            borderColor: "white",
          }}
        />
      </Pressable>
    </Animated.View>
  );
};

export { CircularCarouselListItem };
