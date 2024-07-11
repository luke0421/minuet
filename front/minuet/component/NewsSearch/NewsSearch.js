import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header_White_Left from "../../util/Header_White_Left";
import { StatusBar } from "expo-status-bar";
import { GlobalColor } from "../../util/colors";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Normal_Vertical from "../Carosual/Normal_vertical";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Animated, {
  FadeInDown,
  FadeInLeft,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Header_White from "../../util/Header_White";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import NewsSkeleton from "../Skeleton/NewsSkeleton";
import Tags from "../Tags/Tags";
import PreSearches from "../PreSearch/PreSearches";

const NewsSearch = ({ navigation, route }) => {
  const scrollRef = useAnimatedRef();
  const RenderNews = ({ item, index, viewableItems }) => {
    const userInfo = useSelector((state) => state.userInfo);
    const memberId = userInfo.value.memberId;
    const [isLoading, setIsLoading] = useState(false);
    // console.log(item)
    const addlike = async () => {
      if (item.region == true) {
        try {
          const res = await axios.post(
            `https://j10e205.p.ssafy.io/region/like`,
            {
              memberId: memberId,
              regionNewsId: item.newsId,
            }
          );
          console.log(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const res = await axios.post(`https://j10e205.p.ssafy.io/like`, {
            memberId: memberId,
            newsId: item.newsId,
          });
          console.log(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    const adddislike = async () => {
      if (item.region == true) {
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
      } else {
        try {
          const res = await axios.post(`https://j10e205.p.ssafy.io/dislike`, {
            memberId: memberId,
            newsId: item.newsId,
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    const removelike = async () => {
      if (item.region == true) {
        try {
          const res = await axios.delete(
            `https://j10e205.p.ssafy.io/region/like/${item.newsId}/${memberId}`
          );
          console.log(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const res = await axios.delete(
            `https://j10e205.p.ssafy.io/like/${item.newsId}/${memberId}`
          );
          console.log(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    const removedislike = async () => {
      if (item.region == true) {
        try {
          const res = await axios.delete(
            `https://j10e205.p.ssafy.io/region/dislike/${item.newsId}/${memberId}`
          );
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const res = await axios.delete(
            `https://j10e205.p.ssafy.io/dislike/${item.newsId}/${memberId}`
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    const addbookmark = async () => {
      if (item.region == true) {
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
      } else {
        try {
          const res = await axios.post(`https://j10e205.p.ssafy.io/bookmark`, {
            memberId: memberId,
            newsId: item.newsId,
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    const removebookmark = async () => {
      if (item.region == true) {
        try {
          const res = await axios.delete(
            `https://j10e205.p.ssafy.io/region/bookmark/${memberId}/${item.newsId}`
          );
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const res = await axios.delete(
            `https://j10e205.p.ssafy.io/bookmark/${memberId}/${item.newsId}`
          );
        } catch (err) {
          console.error(err);
        }
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
    const AnimatedBackGroundImage =
      Animated.createAnimatedComponent(ImageBackground);

    const updateNews = (value) => {
      console.log(value)
      setIsBookmark(value.bookmark);
      setIsLike(value.like);
      setUnIsLike(value.dislike);
      if (value.newsLikeCount !==undefined){
        setLikeCount(value.newsLikeCount);
      }else{
        setLikeCount(value.likeCount);
      }
      
    };
    const Newdetail = async () => {
      if (item.region === true) {
        try {
          const res = await axios.get(
            `https://j10e205.p.ssafy.io/region/detail/${memberId}/${item.newsId}`
          );
          const value = res.data;
          console.log(value);
          updateNews(value);
          return;
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await axios.get(
            `https://j10e205.p.ssafy.io/news/detail/${memberId}/${item.newsId}`
          );
          const value = res.data;
          console.log(value);
          updateNews(value);
          return;
        } catch (err) {
          console.log(err);
        }
      }
    };
    useEffect(() => {
      const newsdetail = async () => {
        setIsLoading(true);
        // console.log(item)
        if (item.region == true) {
          try {
            const res = await axios.get(
              `https://j10e205.p.ssafy.io/region/detail/${memberId}/${item.newsId}`
            );
            const value = res.data;
            updateNews(value);
            setIsLoading(false);
            return;
          } catch (err) {
            console.log(err);
          }
        } else {
          try {
            const res = await axios.get(
              `https://j10e205.p.ssafy.io/news/detail/${memberId}/${item.newsId}`
            );
            const value = res.data;
            updateNews(value);
            setIsLoading(false);
            return;
          } catch (err) {
            console.log(err);
          }
        }
      };
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
    const formatString = (string) => {
      if (string.length > 40) {
        return string.slice(0, 40) + "...";
      } else {
        return string;
      }
    };
    const handlenavigate = () => {
      if (item.region == true) {
        navigation.navigate("CountryDetailsNews", {
          handleButton: updateNews,
          newItem: item,
          index: index,
        });
      } else {
        navigation.navigate("DetailsNews", {
          handleButton: updateNews,
          newItem: item,
          index: index,
        });
      }
    };
    return (
      <>
        {isLoading ? (
          <NewsSkeleton />
        ) : (
          <GestureHandlerRootView>
            <Animated.View
              style={[
                rStyle,
                {
                  // flexDirection: "row",
                  // height: 150,
                  backgroundColor: isDark
                    ? GlobalColor.colors.primary_black
                    : "white",
                  paddingVertical: 10,
                  borderBottomWidth: 2,

                  borderBottomColor: isDark
                    ? GlobalColor.colors.primary_gray
                    : "black",
                },
              ]}
            >
              <Pressable
                onPress={() => handlenavigate()}
                onLongPress={() => navigation.navigate("Search")}
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
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

                <View
                  style={{
                    flex: 1,
                    backgroundColor: isDark
                      ? GlobalColor.colors.primary_black
                      : "white",
                    height: "100%",
                  }}
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
                            ? GlobalColor.colors.primary_black50
                            : "black",
                        },
                      ]}
                    >
                      {item.publishDate}
                    </Text>
                  </View>
                  <Animated.View style={styles.iconOuterContainer}>
                    <Text
                      style={{
                        color: isDark
                          ? GlobalColor.colors.primary_gray
                          : "black",
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
              {item.keywordList && (
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={{
                    height: 50,
                    marginVertical: 5,
                  }}
                >
                  {item.keywordList.map((word, index) => (
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
            </Animated.View>
          </GestureHandlerRootView>
        )}
      </>
    );
  };
  const item = route.params;
  const [pageNo, setPageNo] = useState(0);
  const [news, setNews] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    if (item !== undefined) {
      setWord(item.text);
      SearchBarNews(item.text);
      setPageNo(0);
    }
  }, [item]);
  const [totalpage, settotalpage] = useState(0);
  const textInputRef = useRef(null);
  const viewableItems = useSharedValue([]);

  const userInfo = useSelector((state) => state.userInfo);
  const memberId = userInfo.value.memberId;
  const isDark = useSelector((state) => state.darkmode.value);
  const handleSearchPress = () => {
    if (textInputRef.current.isFocused()) {
      // TextInput이 포커스되어 있을 때
      textInputRef.current.blur(); // 키보드를 숨기고 포커스 해제
    } else {
      // TextInput이 포커스되어 있지 않을 때
      textInputRef.current.focus(); // TextInput에 포커스 설정
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
        `https://j10e205.p.ssafy.io/news/search/${word}/${realpageNo}/${memberId}`
      );
      const data = res.data;
      setNews((prev) => [...prev, ...data.newsLists]);
    } catch (err) {
      console.error(err);
    }
  };
  const SearchBarNews = async (item) => {
    if (item === "") {
      return;
    }
    //
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/news/search/${item}/0/${memberId}`
      );
      // console.log(res.data);
      setNews(res.data.newsLists);
      settotalpage(res.data.totalPage);
      scrollRef.current.scrollToIndex({ animated: true, index: 0 });
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect(() => {
  //   if (word != "") {
  //     SearchBarNews(word);
  //   }else{
  //     setNews([])
  //   }

  // }, [word]);
  const handleword = (word) => {
    setWord(word);
  };
  const { height } = Dimensions.get("window");
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  return (
    <>
      <StatusBar style="black" />
      <Header_White />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 50, left: 20 }}
      >
        <Ionicons name="arrow-back" size={36} color="black" />
      </TouchableOpacity>
      <Animated.View style={{ position: "relative", backgroundColor: "white" }}>
        <TextInput
          onSubmitEditing={() => SearchBarNews(word)}
          ref={textInputRef} // TextInput에 ref 설정
          style={[
            {
              height: 70,
              paddingLeft: 30,
              fontFamily: "GmarketSansTTFMedium",
              fontSize: 30,
              borderBottomWidth: 2,
              borderBottomColor: "black",
              // borderTopColor: "black",
              // borderTopWidth: 2,
              backgroundColor: "white",
            },
          ]}
          placeholder="뉴스검색"
          value={word}
          onChangeText={(text) => handleword(text)}
        />
        <View>
          <PreSearches navigation={navigation} />
        </View>
      </Animated.View>
      {news.length != 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: isDark
              ? GlobalColor.colors.primary_black
              : "white",
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: isDark
                ? GlobalColor.colors.primary_black
                : "white",
            }}
          >
            <Pressable
              style={{
                backgroundColor: isDark
                  ? GlobalColor.colors.primary_black
                  : "white",
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
            </Pressable>
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              scrollRef.current.scrollToIndex({ animated: true, index: 0 });
            }}
          >
            <Animated.View
              style={[
                {
                  position: "absolute",
                  right: 20,
                  borderRadius: 25,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "white",
                  borderWidth: 3,
                  bottom: 50,
                  backgroundColor: GlobalColor.colors.primary_black,
                },
              ]}
            >
              <AntDesign name="up" size={30} color="white" />
            </Animated.View>
          </TouchableOpacity> */}
        </View>
      ) : (
        <>
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <Animated.View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ backgroundColor: "white" }}
                onPress={handleSearchPress}
              >
                <AnimatedImage
                  // entering={FadeInDown.duration(400).delay(200)}
                  source={require("../../assets/image.gif")}
                  height={100}
                  width={100}
                  resizeMode="center"
                />
              </TouchableOpacity>
              {word && (
                <Text style={{ color: GlobalColor.colors.primary_black50 }}>
                  검색결과가 없습니다. 다시 검색해주세요
                </Text>
              )}
            </Animated.View>
          </View>
        </>
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
    fontFamily: "GmarketSansTTFMedium",
  },
  newnewtextContainer: {
    padding: 10,
    alignItems: "start",
  },
  newnewfirstImage: {
    width: 80,
    height: 80,
    borderWidth: 0,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NewsSearch;
