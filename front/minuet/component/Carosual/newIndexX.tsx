import * as React from "react";
import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import Animated, {
  Extrapolate,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { fruitItems } from "./utils/items";

import { ElementsText, window } from "./constants";
import { withAnchorPoint } from "./anchor-point";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { GlobalColor } from "../../util/colors";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { remove } from "firebase/database";
import { useSelector } from "react-redux";
import GestureRecognizer from "react-native-swipe-gestures";
import { delay } from "@reduxjs/toolkit/dist/utils";
// import { fruitItems } from "./items";

const PAGE_WIDTH = window.width;
const PAGE_HEIGHT = window.width * 2;

function CardCaro({
  isUserpick,
  startIndex,
  data,
  setModal,
  memberId,
  setNews,
  setTotalLength,
  totalLength,
}) {
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
  const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
  const progressValue = useSharedValue<number>(0);
  const [isVertical, setIsVertical] = React.useState(false);
  const isDark = useSelector((state) => state.darkmode.value);
  //console.log(data)
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  } as const;
  function sliceDataFromStartIndex(data, startIndex) {
    // 시작 인덱스부터 끝까지의 데이터 추출
    const fromStartIndex = data.slice(startIndex);

    // 맨 처음부터 시작 인덱스까지의 데이터 추출
    const toStartIndex = data.slice(0, startIndex);
    const result = [...fromStartIndex, ...toStartIndex];
    return result;
  }
  return (
    <>
      <View
        style={{
          height: Dimensions.get("window").height,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Carousel
          {...baseOptions}
          loop={false}
          autoPlay={false}
          withAnimation={{
            type: "spring",
            config: {
              damping: 13,
            },
          }}
          autoPlayInterval={1500}
          pagingEnabled={pagingEnabled}
          snapEnabled={false}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 110,
          }}
          data={sliceDataFromStartIndex(data, startIndex)}
          renderItem={({ item, index, animationValue }) => (
            <Card
              isUserpick={isUserpick}
              startIndex={startIndex}
              setModal={setModal}
              animationValue={animationValue}
              uri={item.imgURL}
              title={item.title}
              content={item.content}
              publishDate={item.publishDate}
              key={index}
              index={index}
              newsId={item.newsId}
              memberId={memberId}
              isRegion={item.isRegion}
              setNews={setNews}
              setTotalLength={setTotalLength}
              totalLength={totalLength}
              data={data}
            />
          )}
        />
      </View>
    </>
  );
}

const Card: React.FC<{
  startIndex: number;
  uri: string;
  title: string;
  content: string;
  publishDate: string;
  index: number;
  isUserpick: boolean;
  setModal: (value: boolean) => void;
  animationValue: Animated.SharedValue<number>;
}> = ({
  title,
  isUserpick,
  content,
  publishDate,
  index,
  animationValue,
  uri,
  startIndex,
  setModal,
  newsId,
  memberId,
  isRegion,
  setNews,
  setTotalLength,
  totalLength,
  data,
}) => {
  const WIDTH = PAGE_WIDTH / 1;
  const HEIGHT = PAGE_HEIGHT / 1;
  const isDark = useSelector((state) => state.darkmode.value);
  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-0.1, 0, 1],
      [0.95, 1, 1],
      Extrapolate.CLAMP
    );

    const translateX = interpolate(
      animationValue.value,
      [-1, -0.2, 0, 1],
      [0, WIDTH * 0.3, 0, 0]
    );

    const transform = {
      transform: [
        { scale },
        { translateX },
        { perspective: 200 },
        {
          rotateY: `${interpolate(
            animationValue.value,
            [-1, 0, 0.4, 1],
            [30, 0, -25, -25],
            Extrapolate.CLAMP
          )}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(
        transform,
        { x: 0.5, y: 0.5 },
        { width: WIDTH, height: HEIGHT }
      ),
    };
  }, [index]);

  const blockStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [-1, 0, 1] // 조절 필요한 값
    );

    const translateY = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [-1, 0, -1] // 조절 필요한 값
    );

    const rotateZ = interpolate(animationValue.value, [-1, 0, 1], [0, 0, -25]);

    return {
      transform: [{ translateX }, { translateY }],
    };
  }, [index]);
  const [isLike, setIsLike] = React.useState(false);
  const [isBookmark, setIsBookmark] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const removebookmark = async () => {
    try {
      if (isRegion) {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/region/bookmark/${memberId}/${newsId}`
        );
      } else {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/bookmark/${memberId}/${newsId}`
        );
      }
      if (isUserpick == true) {
        newsdetail();
      } else {
        const updatedNews = data.filter((item, idx) => idx !== index);
        setNews(updatedNews);
        setTotalLength(totalLength - 1);
      }

      //목록 갱신
    } catch (err) {
      console.error(err);
    }
  };
  const addbookmark = async () => {
    if (isRegion == true) {
      try {
        const res = await axios.post(
          `https://j10e205.p.ssafy.io/region/bookmark`,
          {
            memberId: memberId,
            newsId: newsId,
          }
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post(`https://j10e205.p.ssafy.io/bookmark`, {
          memberId: memberId,
          newsId: newsId,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  const newsdetail = async () => {
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/news/detail/${memberId}/${newsId}`
      );
      const value = res.data;
      console.log(value);
      setIsBookmark(value.bookmark);
      setIsLike(value.like);
      // setUnIsLike(value.dislike);
      setLikeCount(value.newsLikeCount);
      // updateNews(value);
      return;
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    newsdetail();
  }, []);
  const addlike = async () => {
    if (isRegion == true) {
      try {
        const res = await axios.post(`https://j10e205.p.ssafy.io/region/like`, {
          memberId: memberId,
          regionNewsId: newsId,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post(`https://j10e205.p.ssafy.io/like`, {
          memberId: memberId,
          newsId: newsId,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const removelike = async () => {
    if (isRegion == true) {
      try {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/region/like/${newsId}/${memberId}`
        );
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/like/${newsId}/${memberId}`
        );
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleButton = async (type) => {
    // console.log(type)
    if (type === "like") {
      console.log(isLike);
      if (isLike === false) {
        await addlike();
      } else {
        await removelike();
      }
    } else if (type === "bookmark") {
      if (isBookmark == true) {
        await removebookmark();
      } else {
        await addbookmark();
      }
    }
    await newsdetail();
  };
  const AnimatedBackGroundImage =
    Animated.createAnimatedComponent(ImageBackground);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const scale = useSharedValue(0);
  const lStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));
  return (
    <Animated.View
      style={{
        // backgroundColor :"white",
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        // paddingVertical: 10,
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: isDark
              ? GlobalColor.colors.primary_black
              : "white",
            alignSelf: "center",
            justifyContent: "flex-start",
            alignItems: "center",
            borderWidth: 2,
            borderTopWidth: 20,
            borderRadius: 10,
            borderColor: isDark ? GlobalColor.colors.primary_black : "white",

            paddingHorizontal: 20,
            width: WIDTH,
            height: HEIGHT,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 50,
          },
          cardStyle,
        ]}
      >
        <Animated.View style={styles.container}>
          <AnimatedBackGroundImage
            source={uri ? { uri: uri } : require("../../assets/news_img.jpg")}
            style={[styles.firstImage]}
          >
            <AnimatedImage
              source={require("../../assets/Heart_02.png")}
              style={[
                {
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.35,
                  shadowRadius: 35,
                  width: 100,
                  height: 100,
                },
                lStyle,
              ]}
              resizeMode={"center"}
            />
          </AnimatedBackGroundImage>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(400).delay(200)}
          style={{ flex: 3, paddingHorizontal: 5, width: "100%" }}
        >
          <View
            style={{
              borderBottomColor: GlobalColor.colors.Pick_color,
              borderBottomWidth: 1,
              paddingVertical: 10,
              marginVertical: 20,
            }}
          >
            <Animated.View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: isDark ? "white" : "black",
                  fontSize: 25,
                  lineHeight: 34,
                  fontFamily: "GmarketSansTTFBold",
                  textAlignVertical: "top",
                }}
              >
                {title}
              </Text>
            </Animated.View>
            <Text
              style={{
                color: isDark ? "white" : "black",
                fontSize: 15,
                fontFamily: "GmarketSansTTFMedium",
                textAlign: "right",
                textAlignVertical: "bottom",
              }}
            >
              {publishDate}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
          >
            <Text
              style={{
                color: isDark ? "white" : "black",
                fontSize: 20,
                fontFamily: "GmarketSansTTFMedium",
                lineHeight: 27,
              }}
            >
              {content}
            </Text>
          </ScrollView>
        </Animated.View>
      </Animated.View>
      <View style={{ backgroundColor: "white" }}>
        {/* 이 부분이 absolute로 설정되고 원하는 위치를 지정한 부분입니다 */}
        {/* <Pressable onPress={() => setModal(false)}>
            <FontAwesome name="remove" size={36} color={GlobalColor.colors.primary_black} />
          </Pressable> */}
      </View>
    </Animated.View>
  );
};

export default CardCaro;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  firstImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    // paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    height: 150,
    alignItems: "start",
  },
  summaryContainer: {
    width: "100%",
    paddingHorizontal: 30,
    height: height - 350,
  },
  textBold: {
    fontSize: 23,
    fontFamily: "GmarketSansTTFBold",
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    height: 70,
  },
  icon: {
    marginLeft: 5,
  },
  iconOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
    height: 100,
  },
  text: {
    fontSize: 15,
  },
  newnewtext: {
    color: "black",
    fontSize: 15,
    fontFamily: "GmarketSansTTFMedium",
  },
  newnewtextBold: {
    color: "black",
    fontSize: 15,
    marginVertical: 5,
    fontWeight: "bold",
    fontFamily: "GmarketSansTTFBold",
  },
  newnewtextContainer: {
    padding: 10,
    alignItems: "start",
  },
  newnewfirstImage: {
    width: 130,
    height: 130,
    borderWidth: 0,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "GmarketSansTTFMedium",
  },
  textBoldlike: {
    width: 100,
    borderLeftWidth: 3,
    borderLeftColor: GlobalColor.colors.primary_gray,
    fontSize: 15,
    margin: 10,
    fontFamily: "GmarketSansTTFBold",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bold: {
    fontWeight: "800",
    color: "red",
  },
});
