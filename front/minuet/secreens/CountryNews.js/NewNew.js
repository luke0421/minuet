import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header_White from "../../util/Header_White";
import { GlobalColor } from "../../util/colors";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
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
import axios from "axios";

import { CircularCarousel } from "../../component/circular-carousel/CircularCarousel";
import { useSelector } from "react-redux";
import NewsSkeleton from "../../component/Skeleton/NewsSkeleton";
import GestureRecognizer from "react-native-swipe-gestures";
import { color } from "d3";
import { StatusBar } from "expo-status-bar";

const logo = [
  require(`../../assets/Busan_Mark.png`),
  require(`../../assets/GangWon_Mark.png`),
  require(`../../assets/GyungNam_Mark.png`),
  require(`../../assets/Incheon_Mark.png`),
  require(`../../assets/Ulsan_Mark.png`),
];

const NewNew = ({ navigation }) => {
  const isDark = useSelector((state) => state.darkmode.value);
  const viewableItems = useSharedValue([]);
  // const data = require("../../news_data_101.json");
  // console.log(item)
  const [AllLoading, setAllLoading] = useState(false);
  const [news, setNews] = useState([]);
  const userInfo = useSelector((state) => state.userInfo);
  const memberId = userInfo.value.memberId;
  const [pageNo, setPageNo] = useState(0);
  const [totalpage, settotalpage] = useState(0);
  const formatString = (string) => {
    if (string.length > 40) {
      return string.slice(0, 40) + "...";
    } else {
      return string;
    }
  };

  const updateNextNews = async () => {
    const realpageNo = pageNo + 1;
    if (realpageNo == totalpage) {
      return;
    }
    setPageNo((prev) => prev + 1);
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/region/news/${whatlogo.eng}/${realpageNo}/${memberId}`
      );
      const data = res.data;
      setNews((prev) => [...prev, ...data.newsLists]);
    } catch (err) {
      console.error(err);
    }
  };
  const scrollRef = useAnimatedRef();
  const scrollHandler = useScrollViewOffset(scrollRef);
  const bottom = useSharedValue(290);
  const imgHeight = useSharedValue(40);
  const where = useSelector((state) => state.userposition.value);
  const imgstyles = useAnimatedStyle(() => {
    const newheight = imgHeight.value - scrollHandler.value / 10;
    if (newheight <= 0) {
      return { height: 0 };
    }

    return {
      height: newheight,
    };
  });

  const height = useSharedValue(80);
  const animatedStyles = useAnimatedStyle(() => {
    const newheight = height.value - scrollHandler.value / 7;
    if (newheight < 0) {
      return { height: 0 };
    }
    return {
      height: newheight,
    };
  });
  const opacity = useSharedValue(1);
  const newanimatedStyles = useAnimatedStyle(() => {
    const newheight = opacity.value - scrollHandler.value / 700;
    if (newheight < 0) {
      return { opacity: 0 };
    }
    return {
      opacity: newheight,
    };
  });

  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const RenderNews = ({ item, index, viewableItems }) => {
    const [isLoading, setIsLoading] = useState(false);
    const AnimatedBackGroundImage =
      Animated.createAnimatedComponent(ImageBackground);
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
        // console.log(res.data);
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
    const [isLike, setIsLike] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const [isUnLike, setUnIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const newsdetail = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://j10e205.p.ssafy.io/region/detail/${memberId}/${item.newsId}`
        );
        const value = res.data;
        // console.log(value);
        updateNews(value);
        setIsLoading(false);
        return;
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    const updateNews = (value) => {
      setIsBookmark(value.bookmark);
      setIsLike(value.like);
      setUnIsLike(value.dislike);
      setLikeCount(value.likeCount);
    };
    const Newdetail = async () => {
      try {
        const res = await axios.get(
          `https://j10e205.p.ssafy.io/region/detail/${memberId}/${item.newsId}`
        );
        const value = res.data;
        updateNews(value);
        return;
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      newsdetail();
    }, []);
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
    console.log(item.keywordList)
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
      navigation.navigate("CountryDetailsNews", {
        handleButton: updateNews,
        newItem: item,
        index: index,
      });
    }, []);
    const swiperef = useRef();
    const { width } = Dimensions.get("window");
    return (
      <>
        {isLoading || AllLoading ? (
          <NewsSkeleton />
        ) : (
          <GestureHandlerRootView>
            <GestureRecognizer onSwipeRight={handleLogo}>
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
                          <Animated.View>
                            {item.imgURL ? (
                              <AnimatedBackGroundImage
                                sharedTransitionTag={`${index}`}
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
                                  {
                                    color: isDark
                                      ? "white"
                                      : GlobalColor.colors.primary_black,
                                  },
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
  const modalbottom = useSharedValue(380);
  const modalbottomStyles = useAnimatedStyle(() => {
    const newheight = modalbottom.value - scrollHandler.value / 7;
    if (newheight <= 300) {
      return { bottom: 300 };
    }

    return {
      bottom: newheight,
    };
  });
  const [logoModal, setLogoModal] = useState(false);
  const handleLogo = () => {
    // console.log("wer");
    setLogoModal(!logoModal);
  };
  const [whatlogo, setWhatLogo] = useState({
    logo: require(`../../assets/Busan_gun.png`),
    img: require(`../../assets/Busan_Mark.png`),
    eng: "BUSAN",
  });
  useEffect(() => {
    // console.log(where);
    if (where == "부산광역시") {
      setWhatLogo({
        logo: require(`../../assets/Busan_gun.png`),
        img: require(`../../assets/Busan_Mark.png`),
        eng: "BUSAN",
      });
    } else if (where == "강원도") {
      setWhatLogo({
        logo: require(`../../assets/GangWon_gun.png`),
        img: require(`../../assets/GangWon_Mark.png`),
        eng: "GANGWON",
      });
    } else if (where == "경상남도") {
      setWhatLogo({
        logo: require(`../../assets/GyungNam_gun.png`),
        img: require(`../../assets/GyungNam_Mark.png`),
        eng: "GYEONGNAM",
      });
    } else if (where == "인천광역시") {
      setWhatLogo({
        logo: require(`../../assets/Incheon_gun.png`),
        img: require(`../../assets/Incheon_Mark.png`),
        eng: "INCHEON",
      });
    } else if (where == "울산광역시") {
      setWhatLogo({
        logo: require(`../../assets/Ulsan_gun.png`),
        img: require(`../../assets/Ulsan_Mark.png`),
        eng: "ULSAN",
      });
    }
  }, []);
  // 20240327 박주헌 추가 코드(축제 정보)
  // const [festival, setFestival] = useState(null);
  // const [isFestivalShow, setIsFestivalShow] = useState(true);

  // FlatList 스크롤 이벤트 처리 함수

  // 스크롤 맨 위로 이동하는 함수
  useEffect(() => {
    const updateNews = async () => {
      setAllLoading(true);
      // console.log(whatlogo.eng);
      try {
        const res = await axios.get(
          `https://j10e205.p.ssafy.io/region/news/${whatlogo.eng}/0/${memberId}`
        );
        console.log(res.data.newsLists);
        setNews(res.data.newsLists);
        settotalpage(res.data.totalPage);
        setAllLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    updateNews();

    //   const getFestivalData = async () => {
    //     setFestival(null);
    //     try {
    //       const res = await axios.get(
    //         `https://j10e205.p.ssafy.io/festival/${whatlogo.eng}`
    //       );
    //       setFestival(res.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };

    //   getFestivalData();

    //   setIsFestivalShow(true);
  }, [whatlogo.eng]);

  handleall = () => {
    scrollRef.current.scrollToIndex({
      animated: true,
      index: 0,
    });
  };

  //20240327 박주헌 추가 코드(축제 정보)
  // const FestivalItem = ({ item }) => (
  //   <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(item.url)}>
  //     <View style={styles.itemContainer}>
  //       <View>
  //         <Image style={styles.poster} source={{ uri: item.poster }} />
  //       </View>
  //       <View style={styles.festivalTextContainer}>
  //         <Text style={[styles.title, { color: isDark ? "white" : "black" }]}>
  //           {item.title}
  //         </Text>
  //         <Text style={[styles.text, { color: isDark ? "white" : "black" }]}>
  //           {item.periode}
  //         </Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <>
      <Header_White animatedStyles={animatedStyles} imgStyle={imgstyles} />
      <StatusBar style="dark" />
      <View
        style={{
          backgroundColor: isDark ? GlobalColor.colors.primary_black : null,
          flex: 1
        }}
      >
        <Animated.View
          style={[
            {
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            },
          ]}
        >
          <Animated.View
            style={[
              {
                width: "100%",
                borderWidth: 1,
                borderColor: "black",
              },
              newanimatedStyles,
            ]}
          ></Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            {
              flexDirection: "row",
              backgroundColor: "white",
              alignItems: "center",
              paddingHorizontal: 20,
              height: 80,
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            flexDirection="row"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={handleLogo} activeOpacity={0.5}>
              <AnimatedImage
                style={[{ width: 65, height: 65, marginRight: 10 }]}
                source={whatlogo.img}
              />
            </TouchableOpacity>
            <AnimatedImage
              style={[
                {
                  marginRight: 10,
                  width: 200,
                  resizeMode: "contain",
                },
              ]}
              source={whatlogo.logo}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewsSearch")}
            style={{}}
          >
            <FontAwesome
              name="search"
              color={GlobalColor.colors.primary_black50}
              size={35}
            />
          </TouchableOpacity>
        </Animated.View>

        <GestureHandlerRootView>
          <Normal_Vertical
            Newsdata={news}
            colors={GlobalColor.colors.primary_black}
          />
        </GestureHandlerRootView>
        {/* 여기부터 수정 */}
        {/* {festival && festival.festivals.length > 0 && (
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              paddingBottom: 20,
              display: "flex",
              flexDirection: "row",
              borderBottomColor: GlobalColor.colors.primary_red,
              borderBottomWidth: 2,
            }}
          >
            {festival && festival.festivals.length > 0 && isFestivalShow ? (
              <ScrollView
                style={{ height: 100, width: "100%" }}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
              >
                {festival.festivals.map((festivaldata, index) => (
                  <FestivalItem key={index} item={festivaldata} />
                ))}
              </ScrollView>
            ) : (
              <></>
            )}
            {festival && festival.festivals.length > 0 && isFestivalShow ? (
              <Pressable
                style={{ padding: 10 }}
                onPress={() => setIsFestivalShow(!isFestivalShow)}
              >
                <Text style={{ color: GlobalColor.colors.primary_red }}>X</Text>
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        )} */}
        {/* 여기까지 수정 끝 */}
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

      {logoModal && (
        <CircularCarousel
          handleall={handleall}
          handleLogo={handleLogo}
          setWhatLogo={setWhatLogo}
          setPageNo={setPageNo}
          data={logo}
        />
      )}
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

export default NewNew;
