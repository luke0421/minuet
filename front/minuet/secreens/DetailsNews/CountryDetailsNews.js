import { BlurView } from "expo-blur";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalColor } from "../../util/colors";
import { useCallback, useEffect, useRef, useState } from "react";
import Animated, {
  FadeInDown,
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getUserInfo } from "../../asyncstorage/AsyncStorage";
import { useSelector } from "react-redux";
import GestureRecognizer from "react-native-swipe-gestures";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
const { height } = Dimensions.get("window");
const CountryDetailsNews = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.darkmode.value);
  const userInfo = useSelector((state) => state.userInfo);
  const memberId = userInfo.value.memberId;
  const updateNews = route.params.handleButton;
  const item = route.params.newItem;
  const index = route.params.index;
  const status = route.params.status;
  const [isUnLike, setUnIsLike] = useState(false);
  const AnimatedBackGroundImage =
    Animated.createAnimatedComponent(ImageBackground);
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [rannumber, setRannumber] = useState(2);
  const newsdetail = async () => {
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/region/detail/${memberId}/${item.newsId}`
      );
      const value = res.data;
      //   console.log(value);
      updateNews(value);
      setIsBookmark(value.bookmark);
      setIsLike(value.like);
      setUnIsLike(value.dislike);
      setLikeCount(value.likeCount);
      return;
    } catch (err) {
      console.log(err);
    }
  };
  const getRandomNumber = () => {
    // Math.random() 함수는 0 이상 1 미만의 난수를 생성합니다.
    // 이를 이용하여 0 또는 1을 생성하고, 그에 1을 더하여 1 또는 2를 만듭니다.
    const ans = Math.floor(Math.random() * 2) + 1;
    console.log(ans);
    return ans;
  };
  useEffect(() => {
    newsdetail();
    const number = getRandomNumber();
    console.log(number);
    setRannumber(number);
  }, []);
  const addlike = async () => {
    try {
      const res = await axios.post(`https://j10e205.p.ssafy.io/region/like`, {
        memberId: memberId,
        regionNewsId: item.newsId,
      });
      // console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const adddislike = async () => {
    try {
      const res = await axios.post(
        `https://j10e205.p.ssafy.io/region/dislike`,
        {
          memberId: memberId,
          regionNewsId: item.newsId,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  const removelike = async () => {
    try {
      const res = await axios.delete(
        `https://j10e205.p.ssafy.io/region/like/${item.newsId}/${memberId}`
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const removedislike = async () => {
    try {
      const res = await axios.delete(
        `https://j10e205.p.ssafy.io/region/dislike/${item.newsId}/${memberId}`
      );
    } catch (err) {
      console.error(err);
    }
  };
  const addbookmark = async () => {
    try {
      const res = await axios.post(
        `https://j10e205.p.ssafy.io/region/bookmark`,
        {
          memberId: memberId,
          newsId: item.newsId,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  const removebookmark = async () => {
    try {
      const res = await axios.delete(
        `https://j10e205.p.ssafy.io/region/bookmark/${memberId}/${item.newsId}`
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleButton = async (type) => {
    if (type === "like") {
      if (isLike === false) {
        scale.value = withSpring(1, undefined, (isFinished) => {
          if (isFinished) {
            scale.value = withDelay(500, withSpring(0));
          }
        });
        await addlike();
        if (isUnLike == true) {
          await removedislike();
        }
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
  const scale = useSharedValue(0);
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const lStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));
  const handleNext = () => {
    navigation.goBack();
  };
  const doubleTapRef = useRef();
  const onDoubleTap = useCallback(async () => {
    await handleButton("like");
  }, [isLike]);
  const viewshotRef = useRef();
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
  if (item.keywordList) {
    words = renderContentWithRedKeywords(
      item.content,
      item.keywordList
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <View
        style={{
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
          flex: 1,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Animated.View style={styles.container}>
            {item.imgURL ? (
              <AnimatedBackGroundImage
                source={{ uri: item.imgURL }}
                style={[styles.firstImage]}
              >
                {rannumber == 1 ? (
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
                ) : (
                  <AnimatedImage
                    source={require("../../assets/Heart_01.png")}
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
                )}
              </AnimatedBackGroundImage>
            ) : (
              <ImageBackground
                source={require("../../assets/news_img.jpg")}
                style={styles.firstImage}
              >
                <AnimatedImage
                  source={
                    rannumber == 1
                      ? require("../../assets/Heart_02.png")
                      : require("../../assets/Heart_01.png")
                  }
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
              </ImageBackground>
            )}
          </Animated.View>
        </Pressable>

        <GestureHandlerRootView>
          <TapGestureHandler waitFor={doubleTapRef}>
            <TapGestureHandler
              maxDelayMs={250}
              ref={doubleTapRef}
              numberOfTaps={2}
              onActivated={onDoubleTap}
            >
              <GestureRecognizer onSwipeRight={handleNext}>
                <Animated.ScrollView
                  entering={FadeInDown.duration(400).delay(700)}
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.summaryContainer,

                    {
                      backgroundColor: isDark
                        ? GlobalColor.colors.primary_black
                        : "white",
                    },
                  ]}
                >
                  <ViewShot style={{
                    flex: 1,
                    backgroundColor: isDark
                      ? GlobalColor.colors.primary_black
                      : "white",
                  }} ref={viewshotRef}>
                    <Animated.View
                      entering={FadeInDown.duration(400).delay(600)}
                      style={[
                        styles.textContainer,
                        {
                          backgroundColor: isDark
                            ? GlobalColor.colors.primary_black
                            : "white",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textBold,
                          {
                            color: isDark
                              ? "white"
                              : GlobalColor.colors.primary_black,
                            lineHeight: 33,
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: isDark
                              ? GlobalColor.colors.primary_gray
                              : GlobalColor.colors.primary_black,
                          },
                        ]}
                      >
                        {item.publishDate}
                      </Text>
                    </Animated.View>
                    {item.keywordList && item.keywordList.length > 0 && (
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={{
                          height: 45,
                          marginVertical: 5,
                        }}
                      >
                        {item.keywordList.map((word, index) => (
                          // 빈 문자열이 아닌 경우에만 렌더링
                          word.trim() !== "" && (
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
                          )
                        ))}
                      </ScrollView>
                    )}
                    <View
                      style={{
                        backgroundColor: isDark
                          ? GlobalColor.colors.primary_black
                          : "white",
                      }}
                    >
                      <Text
                        style={{
                          color: isDark
                            ? "white"
                            : GlobalColor.colors.primary_black,
                          fontFamily: "GmarketSansTTFMedium",
                          lineHeight: 28,
                          fontSize: 18,
                        }}
                      >
                        {words ? words : item.content}
                      </Text>
                    </View>
                  </ViewShot>
                </Animated.ScrollView>
                <Animated.View
                  style={[
                    styles.iconOuterContainer,
                    {
                      backgroundColor: isDark
                        ? GlobalColor.colors.primary_black
                        : "white",
                    },
                  ]}
                  entering={FadeInLeft.duration(400).delay(500)}
                >
                  <View style={[styles.iconContainer]}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleButton("like")}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                          borderColor: isDark
                            ? "white"
                            : GlobalColor.colors.primary_black,
                        }}
                      >
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
                        <Text
                          style={[
                            styles.textBoldlike,
                            {
                              color: isDark
                                ? GlobalColor.colors.primary_gray
                                : GlobalColor.colors.primary_black,
                            },
                          ]}
                        >
                          {likeCount} 개
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", gap: 20 }}>
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
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => Linking.openURL(item.newsURL)}
                      >
                        <Image
                          source={require("../../assets/url.png")}
                          style={{ height: 38, width: 38 }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => onShare()}
                      >
                        <Image
                          source={require("../../assets/share.png")}
                          style={{ height: 38, width: 38 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              </GestureRecognizer>
            </TapGestureHandler>
          </TapGestureHandler>
        </GestureHandlerRootView>
      </View>
    </>
  );
};
export default CountryDetailsNews;
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
    paddingVertical: 30,
    height: 160,
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
});
