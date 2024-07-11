import * as React from "react";
import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import Animated, {
  Extrapolate,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { fruitItems } from "./utils/items";
import * as Sharing from "expo-sharing";
import { ElementsText, window } from "./constants";
import { withAnchorPoint } from "./anchor-point";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { GlobalColor } from "../../util/colors";
import {
  GestureHandlerRootView,
  ScrollView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import axios from "axios";
import { remove } from "firebase/database";
import { useSelector } from "react-redux";
import GestureRecognizer from "react-native-swipe-gestures";
import { delay } from "@reduxjs/toolkit/dist/utils";
import ViewShot, { captureRef } from "react-native-view-shot";
// import { fruitItems } from "./items";
const { height } = Dimensions.get("window");
const PAGE_WIDTH = window.width;
const PAGE_HEIGHT = height;

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
          // paddingHorizontal: 10,
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
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
              keywordList={item.keywordList}
              newsURL={item.newsURL}
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
  keywordList: string[] | null | undefined;
  newsURL: string;
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
  keywordList,
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
  newsURL,
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
      if (isRegion == true) {
        try {
          const res = await axios.get(
            `https://j10e205.p.ssafy.io/region/detail/${memberId}/${newsId}`
          );
          const value = res.data;
          setIsBookmark(value.bookmark);
          setIsLike(value.like);
          setLikeCount(value.likeCount);
          return;
        } catch (err) {
          console.log(err);
        }
      } else {
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
          scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
              scale.value = withDelay(500, withSpring(0));
            }
          });
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
    const viewshotRef = React.useRef();
    const onShare = async () => {
      const options = {
        mimeType: "image/jpeg",
        dialogTitle: "Share the image",
        UTI: "image/jpeg",
      };
      try {
        const uri = await captureRef(viewshotRef, {
          // snapshotContentContainer: true,
          format: "jpg",
          quality: 0.9,
        });
        Sharing.shareAsync(uri, options)
          .then((data) => { })
          .catch((err) => {
            console.log(JSON.stringify(err));
          });
      } catch (error) {
        console.log(error);
      }
    };
    const doubleTapRef = React.useRef();
    const onDoubleTap = React.useCallback(async () => {
      await handleButton("like");
    }, [isLike]);
    const renderContentWithRedKeywords = (content, keywordList) => {
      // 개행 문자를 기준으로 문자열을 분할합니다.
      const lines = content.split("\n");
  
      // 각 줄을 공백 문자를 기준으로 단어로 분할하고, 키워드를 확인합니다.
      const processedLines = lines.map((line) => {
        // 공백 문자를 기준으로 단어를 분할합니다.
        const words = line.split(/\s+/);
  
        // 각 단어에 대해 키워드를 확인하고 스타일을 적용합니다.
        const processedWords = words.map((word, index) => {
          let startIdx = 0;
          let endIdx = 0;
  
          for (let i = 0; i < keywordList.length; i++) {
            const keyword = keywordList[i];
            let idx = word.indexOf(keyword);
            while (idx !== -1) {
              // 단어의 시작과 끝 인덱스를 계산합니다.
              startIdx = idx;
              endIdx = idx + keyword.length;
  
              // 단어가 keywordList에 포함되면 해당 부분을 빨간색으로 처리합니다.
              return (
                <Text key={index}>
                  {word.substring(0, startIdx)}
                  <Text
                    style={{
                      color: GlobalColor.colors.Pick_color,
                      fontWeight: "bold",
                    }}
                  >
                    {word.substring(startIdx, endIdx)}
                  </Text>
                  {word.substring(endIdx)}
                </Text>
              );
            }
          }
          // 포함되지 않는다면 일반 텍스트로 출력합니다.
          return <Text key={index}>{word}</Text>;
        });
  
        // 각 단어를 다시 공백 문자로 합쳐서 반환합니다.
        return processedWords.reduce((prev, curr) => [prev, " ", curr]);
      });
  
      // 각 줄을 다시 개행 문자로 합쳐서 반환합니다.
      return processedLines.reduce((prev, curr) => [prev, "\n", curr]);
    };
    let words = null
    if (keywordList) {
      words = renderContentWithRedKeywords(
        content,
        keywordList
      );
    }
  
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
          <Animated.View
            entering={FadeInDown.duration(400)}
            style={{ width: "100%" }}
          >
            <AnimatedBackGroundImage
              sharedTransitionTag={`${uri}`}
              source={uri ? { uri: uri } : require("../../assets/news_img.jpg")}
              style={[
                {
                  width: WIDTH - 40,
                  height: WIDTH - 150,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                },
              ]}
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
              <View
                style={{
                  borderRadius: 10,
                  // backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  top: WIDTH - 190,
                  right: 10,
                  position: "absolute",
                  flexDirection: "row",
                }}
              >
                <Pressable onPress={() => handleButton("bookmark")}>
                  {isBookmark ? (
                    <Image
                      source={require("../../assets/bookmark.png")}
                      style={{ width: 38, height: 38 }}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/not_bookmark.png")}
                      style={{ width: 38, height: 38 }}
                    />
                  )}
                </Pressable>
              </View>
              <View
                style={{
                  borderRadius: 10,
                  // backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  top: WIDTH - 190,
                  right: 58,
                  position: "absolute",
                  flexDirection: "row",
                }}
              >
                <Pressable onPress={() => handleButton("like")}>
                  {isLike ? (
                    <Image
                      source={require("../../assets/like.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/not_like.png")}
                      style={{ width: 35, height: 35 }}
                    />
                  )}
                </Pressable>
              </View>
            </AnimatedBackGroundImage>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(400).delay(200)}
            style={{ paddingHorizontal: 5, width: "100%", height: height - 300 }}
          >
            <GestureHandlerRootView>
              <TapGestureHandler waitFor={doubleTapRef}>
                <TapGestureHandler
                  maxDelayMs={250}
                  ref={doubleTapRef}
                  numberOfTaps={2}
                  onActivated={onDoubleTap}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 10 }}
                  >
                    <ViewShot
                      style={{
                        flex: 1,
                        backgroundColor: isDark
                          ? GlobalColor.colors.primary_black
                          : "white",
                      }}
                      ref={viewshotRef}
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
                        {keywordList && (
                          <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{
                              height: 45,
                              marginVertical: 5,
                              backgroundColor: isDark
                                ? GlobalColor.colors.primary_black
                                : "white",
                            }}
                          >
                            {keywordList.map((word, index) => (
                              <View
                                key={index}
                                style={{
                                  paddingHorizontal: 20,
                                  margin: 5,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: isDark
                                    ? GlobalColor.colors.primary_black50
                                    : "white",
                                  borderRadius: 50,
                                  paddingVertical: 3,
                                  borderWidth: isDark ? 3 : 0,
                                  elevation: 5,
                                  borderColor: isDark
                                    ? "white"
                                    : GlobalColor.colors.primary_black,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "GmarketSansTTFBold",
                                    color: isDark
                                      ? "white"
                                      : GlobalColor.colors.primary_black,
                                    fontSize: 17,
                                    textAlign: "center",
                                  }}
                                >
                                  #{word}
                                </Text>
                              </View>
                            ))}
                          </ScrollView>
                        )}
                      </View>
                      <Text
                        style={{
                          color: isDark ? "white" : "black",
                          fontSize: 20,
                          fontFamily: "GmarketSansTTFMedium",
                          lineHeight: 27,
                        }}
                      >
                        {words ? words : content}
                      </Text>
                    </ViewShot>
                  </ScrollView>
                </TapGestureHandler>
              </TapGestureHandler>
            </GestureHandlerRootView>
          </Animated.View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              height: 50,
            }}
          >
            <Pressable onPress={() => setModal(false)}>
              <Image
                source={require("../../assets/remove.png")}
                style={{ height: 35, width: 35 }}
              />
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => Linking.openURL(newsURL)}
              >
                <Image
                  source={require("../../assets/url.png")}
                  style={{ height: 35, width: 35 }}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => onShare()}>
                <Image
                  source={require("../../assets/share.png")}
                  style={{ height: 35, width: 35 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  };

export default CardCaro;
