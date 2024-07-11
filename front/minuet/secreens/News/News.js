import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SBImageItem } from "../../component/Carosual/SBImageItem";
import { GlobalColor } from "../../util/colors";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GestureHandlerRootView,
  Swipeable,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Normal_Vertical from "../../component/Carosual/Normal_vertical";
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import Header_White_Left from "../../util/Header_White_Left";
import { useSelector } from "react-redux";
import axios from "axios";
import NewsSkeleton from "../../component/Skeleton/NewsSkeleton";
import GestureRecognizer from "react-native-swipe-gestures";
import Header_White from "../../util/Header_White";
import Header_Black from "../../util/Header_Black";
import Tag from "../../component/Tags/Tag";
const News = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const viewableItems = useSharedValue([]);
  const [startIndex, setStartIndex] = useState(0);
  const getColor = (tab) => {
    // 원하는 조건에 따라 동적으로 색상을 반환하는 함수
    if (tab === "ECONOMIC") return GlobalColor.colors.primary_red100;
    if (tab === "SOCIAL") return GlobalColor.colors.primary_yellow;
    if (tab === "LIFE") return GlobalColor.colors.primary_green;
    if (tab === "WORLD") return GlobalColor.colors.primary_blue;
    if (tab === "SCIENCE") return GlobalColor.colors.primary_purple;
    return "transparent"; // 기본값은 투명으로 설정
  };
  const [state, setState] = useState("ECONOMIC");
  const height = useSharedValue(80);
  const imgheight = useSharedValue(40);
  const scrollRef = useAnimatedRef();
  const bottom = useSharedValue(195);
  const scrollHandler = useScrollViewOffset(scrollRef);
  const animatedStyles = useAnimatedStyle(() => {
    const newheight = height.value - scrollHandler.value / 7;
    if (newheight < 0) {
      return { height: 0 };
    }
    return {
      height: newheight,
    };
  });
  const imgStyle = useAnimatedStyle(() => {
    const newheight = imgheight.value - scrollHandler.value / 10;
    if (newheight <= 0) {
      return { height: 0 };
    }

    return {
      height: newheight,
    };
  });
  const backgroundColor = useSharedValue(getColor(state)); // 초기 색상 값
  // const underColor = useSharedValue(getunderColor(state));
  // state 값이 변할 때마다 색상 값도 업데이트

  // 20240312 park change code
  const [news, setNews] = useState([]);
  const isDark = useSelector((state) => state.darkmode.value);
  const userInfo = useSelector((state) => state.userInfo);
  const memberId = userInfo.value.memberId;
  const [pageNo, setPageNo] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  useEffect(() => {
    const updateNews = async () => {
      setAllLoading(true);
      try {
        const res = await axios.get(
          `https://j10e205.p.ssafy.io/news/category/${state}/${pageNo}/${memberId}`
        );
        setNews(res.data.newsLists);
        // console.log(res.data.newsLists);
        // console.log(res.data)
        settotalpage(res.data.totalPage);
        setAllLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    updateNews();
  }, [state]);
  const formatString = (string) => {
    if (string.length > 35) {
      return string.slice(0, 35) + "...";
    } else {
      return string;
    }
  };
  const updateNextNews = async () => {
    const realpageNo = pageNo + 1;
    if (realpageNo == totalpage) {
      return;
    }
    console.log(realpageNo);
    setPageNo((prev) => prev + 1);
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/news/category/${state}/${realpageNo}/${memberId}`
      );
      const data = res.data;
      setNews((prev) => [...prev, ...data.newsLists]);
    } catch (err) {
      console.error(err);
    }
  };
  const [AllLoading, setAllLoading] = useState(false);
  const RenderNews = ({ item, index, viewableItems }) => {
    const [isLoading, setIsLoading] = useState(false);
    const AnimatedBackGroundImage =
      Animated.createAnimatedComponent(ImageBackground);
    const addlike = async () => {
      try {
        const res = await axios.post(`https://j10e205.p.ssafy.io/like`, {
          memberId: memberId,
          newsId: item.newsId,
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const adddislike = async () => {
      try {
        const res = await axios.post(`https://j10e205.p.ssafy.io/dislike`, {
          memberId: memberId,
          newsId: item.newsId,
        });
      } catch (err) {
        console.error(err);
      }
    };
    const removelike = async () => {
      try {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/like/${item.newsId}/${memberId}`
        );
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const removedislike = async () => {
      try {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/dislike/${item.newsId}/${memberId}`
        );
      } catch (err) {
        console.error(err);
      }
    };

    const addbookmark = async () => {
      try {
        const res = await axios.post(`https://j10e205.p.ssafy.io/bookmark`, {
          memberId: memberId,
          newsId: item.newsId,
        });
      } catch (err) {
        console.error(err);
      }
    };
    const removebookmark = async () => {
      try {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/bookmark/${memberId}/${item.newsId}`
        );
      } catch (err) {
        console.error(err);
      }
    };
    const rStyle = useAnimatedStyle(() => {
      const isVisible = viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItems) => viewableItems.item.title === item.title);

      return {
        opacity: withTiming(isVisible ? 1 : 0.5),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.5),
          },
        ],
      };
    }, []);
    const swiperef = useRef();
    const [isLike, setIsLike] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const [isUnLike, setUnIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    useEffect(() => {
      const newsdetail = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(
            `https://j10e205.p.ssafy.io/news/detail/${memberId}/${item.newsId}`
          );
          const value = res.data;
          // console.log(item.newsId);
          console.log(value);
          updateNews(value);
          setIsLoading(false);
          return;
        } catch (err) {
          console.log(err);
        }
      };
      newsdetail();
    }, []);

    const updateNews = (value) => {
      setIsBookmark(value.bookmark);
      setIsLike(value.like);
      setUnIsLike(value.dislike);
      setLikeCount(value.newsLikeCount);
    };
    const Newdetail = async () => {
      try {
        const res = await axios.get(
          `https://j10e205.p.ssafy.io/news/detail/${memberId}/${item.newsId}`
        );
        const value = res.data;
        updateNews(value);
        return;
      } catch (err) {
        console.log(err);
      }
    };
    const handleButton = async (type) => {
      if (type === "like") {
        if (isLike === false) {
          await addlike();
          if (isUnLike == true) {
            await removedislike();
          }
        } else {
          await removelike();
        }
      } else if (type === "unlike") {
        if (isUnLike == false) {
          await adddislike();
          if (isLike == true) {
            await removelike();
          }
        } else {
          await removedislike();
        }
      } else {
        if (isBookmark == true) {
          await removebookmark();
        } else {
          await addbookmark();
        }
      }
      await Newdetail();
    };
    const scale = useSharedValue(0);
    const handleSwipe = (delid) => {
      const updatedData = news.filter((item) => item.newsId !== delid);
      console.log(updatedData);
      adddislike();
      setNews(updatedData);
      // swiperef.current.close();
    };
    const rightswipe = () => {
      return (
        <Pressable
          onPress={() => handleSwipe(item.newsId)}
          style={{
            margin: 10,

            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 100,
            backgroundColor: GlobalColor.colors.Pick_color,
            borderRadius: 30,
          }}
        >
          <FontAwesome5 name="trash" size={25} color="white" />
        </Pressable>
      );
    };
    const doubleTapRef = useRef();
    const onDoubleTap = useCallback(async () => {
      scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    }, []);
    const onSingleTap = useCallback(() => {
      navigation.navigate("DetailsNews", {
        state: state,
        handleButton: updateNews,
        newItem: item,
        index: index,
      });
    }, []);
    const { width } = Dimensions.get("window");
    return (
      <>
        {AllLoading || isLoading ? (
          <NewsSkeleton />
        ) : (
          <GestureHandlerRootView>
            <GestureRecognizer onSwipeRight={handlestatebar}>
              <Animated.View
                style={[
                  rStyle,
                  {
                    // height: 180,
                    backgroundColor: isDark
                      ? GlobalColor.colors.primary_black
                      : "white",
                    width: width - 30,
                    borderBottomWidth: isDark ? 2 : 0,
                    marginVertical: 10,
                    borderBottomColor: isDark
                      ? GlobalColor.colors.primary_gray
                      : GlobalColor.colors.primary_black,
                    elevation: 10,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  },
                ]}
              >
                <Animated.View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: 10,
                    },
                  ]}
                >
                  <Swipeable ref={swiperef} renderRightActions={rightswipe}>
                    <Pressable
                      onLongPress={() => navigation.navigate("Search")}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TapGestureHandler
                        waitFor={doubleTapRef}
                        onActivated={onSingleTap}
                      >
                        <TapGestureHandler
                          maxDelayMs={250}
                          ref={doubleTapRef}
                          numberOfTaps={2}
                          onActivated={onDoubleTap}
                        >
                          <Animated.View sharedTransitionTag={`${item.imgURL}`}>
                            {item.imgURL ? (
                              <AnimatedBackGroundImage
                                sharedTransitionTag={`${item.imgURL}`}
                                source={{ uri: item.imgURL }}
                                style={styles.newnewfirstImage}
                              ></AnimatedBackGroundImage>
                            ) : (
                              <AnimatedBackGroundImage
                                source={require("../../assets/news_img.jpg")}
                                style={styles.newnewfirstImage}
                              ></AnimatedBackGroundImage>
                            )}
                          </Animated.View>
                        </TapGestureHandler>
                      </TapGestureHandler>

                      <View
                        style={{
                          flex: 1,
                          backgroundColor: isDark
                            ? GlobalColor.colors.primary_black
                            : "white",
                          height: "100%",
                        }}
                      >
                        <TapGestureHandler
                          waitFor={doubleTapRef}
                          onActivated={onSingleTap}
                        >
                          <TapGestureHandler
                            maxDelayMs={250}
                            ref={doubleTapRef}
                            numberOfTaps={2}
                            onActivated={onDoubleTap}
                          >
                            <View style={styles.newnewtextContainer}>
                              <Text
                                style={[
                                  styles.newnewtextBold,
                                  { color: isDark ? "white" : "black" },
                                ]}
                              >
                                {formatString(item.title)}
                              </Text>
                              <Text
                                style={[
                                  styles.newnewtext,
                                  {
                                    color: isDark
                                      ? GlobalColor.colors.primary_gray
                                      : "black",
                                  },
                                ]}
                              >
                                {item.publishDate}
                              </Text>
                            </View>
                          </TapGestureHandler>
                        </TapGestureHandler>
                        <Animated.View style={styles.iconOuterContainer}>
                          <Text
                            style={{
                              color: isDark
                                ? GlobalColor.colors.primary_gray
                                : GlobalColor.colors.primary_black,
                              fontFamily: "GmarketSansTTFMedium",
                            }}
                          >
                            좋아요 {likeCount} 개
                          </Text>
                          <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => handleButton("like")}
                            >
                              {isLike ? (
                                <Image
                                  source={require("../../assets/like.png")}
                                  style={{ width: 30, height: 30 }}
                                />
                              ) : (
                                <Image
                                  source={require("../../assets/not_like.png")}
                                  style={{ width: 30, height: 30 }}
                                />
                              )}
                            </TouchableOpacity>

                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => handleButton("bookmark")}
                            >
                              {isBookmark ? (
                                <Image
                                  source={require("../../assets/bookmark.png")}
                                  style={{ width: 30, height: 30 }}
                                />
                              ) : (
                                <Image
                                  source={require("../../assets/not_bookmark.png")}
                                  style={{ width: 30, height: 30 }}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        </Animated.View>
                      </View>
                    </Pressable>
                  </Swipeable>
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
              </Animated.View>
            </GestureRecognizer>
          </GestureHandlerRootView>
        )}
      </>
    );
  };
  const handleState = (value) => {
    setState(value);
    setPageNo(0);
    scrollRef.current.scrollToIndex({ animated: true, index: 0 });
  };
  const handleNext = () => {
    if (state === "ECONOMIC") {
      setState("SOCIAL"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "SOCIAL") {
      setState("LIFE"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "LIFE") {
      setState("WORLD"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "WORLD") {
      setState("SCIENCE"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "SCIENCE") {
      setState("ECONOMIC"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    }
  };
  const handleBack = () => {
    if (state === "SOCIAL") {
      setState("ECONOMIC"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "LIFE") {
      setState("SOCIAL"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "WORLD") {
      setState("LIFE"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "SCIENCE") {
      setState("WORLD"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } else if (state === "ECONOMIC") {
      setState("SCIENCE"),
        setPageNo(0),
        scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    }
  };
  const handlestatebar = () => {
    navigation.navigate("HandleState", {
      handleState: handleState,
      state: state,
    });
  };
  return (
    <>
      <Header_White animatedStyles={animatedStyles} imgStyle={imgStyle} />
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? GlobalColor.colors.primary_black : null,
        }}
      >
        <GestureRecognizer onSwipeLeft={handleNext} onSwipeRight={handleBack}>
          <Animated.View
            style={[
              {
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                height: 80,
                backgroundColor: getColor(state),
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("HandleState", {
                    handleState: handleState,
                    state: state,
                  })
                }
              >
                <Octicons
                  style={{ marginLeft: 20 }}
                  name="three-bars"
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  color: state === "SOCIAL" ? "black" : "white",
                  paddingHorizontal: 20,
                }}
              >
                {state}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewsSearch")}
              style={{ marginRight: 20 }}
            >
              <FontAwesome name="search" color="white" size={35} />
            </TouchableOpacity>
          </Animated.View>
        </GestureRecognizer>
        <GestureHandlerRootView>
          <Normal_Vertical Newsdata={news} colors={getColor(state)} />
        </GestureHandlerRootView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            // backgroundColor:"black"
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
            data={news}
            onViewableItemsChanged={({ viewableItems: vItems }) => {
              viewableItems.value = vItems;
            }}
            onEndReached={() => updateNextNews()}
            onEndReachedThreshold={0.1}
            renderItem={({ item, index }) => (
              <RenderNews
                viewableItems={viewableItems}
                index={index}
                item={item}
              />
            )}
            keyExtractor={(item) => item.newsId}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: "white",

    backgroundColor: GlobalColor.colors.primary_black,
  },
  firstImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    padding: 10,
    alignItems: "start",
  },
  textContainerSecond: {
    width: "100%",
    padding: 10,
    height: 100,
  },
  textBold: {
    color: "white",
    fontSize: 15,
    marginVertical: 5,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 5,
  },
  iconOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  text: {
    color: GlobalColor.colors.primary_gray,
    fontSize: 15,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 7,
  },
  iconOuterContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: GlobalColor.colors.primary_gray,
    fontSize: 15,
    fontFamily: "GmarketSansTTFMedium",
  },
  newnewtext: {
    fontSize: 15,
    fontFamily: "GmarketSansTTFMedium",
  },
  newnewtextBold: {
    fontSize: 15,
    marginVertical: 5,
    fontWeight: "bold",
    fontFamily: "GmarketSansTTFLight",
    lineHeight: 20,
  },
  newnewtextContainer: {
    padding: 10,
    alignItems: "start",
  },
  newnewfirstImage: {
    width: 95,
    height: 95,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    // marginLeft:5,
  },
});

export default News;
