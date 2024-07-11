import {
  Button,
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
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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


const logo = [
  require(`../../assets/Busan_Mark.png`),
  require(`../../assets/GangWon_Mark.png`),
  require(`../../assets/GyungNam_Mark.png`),
  require(`../../assets/Incheon_Mark.png`),
  require(`../../assets/Ulsan_Mark.png`),
];

const CountryNews = () => {
  const handleSearch = () => {
    setSearchBar(!searchbar);
    setWord("");
  };

  const [word, setWord] = useState("");
  const [searchbar, setSearchBar] = useState(false);
  const [modal, setModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const viewableItems = useSharedValue([]);

  const news_data = useSelector((state) => state.news);
  const data = require("../../news_data_101.json");

  const clientId = "nu1zCWBYmWXjKjfevIlE"; // 네이버 개발자 센터에서 발급받은 클라이언트 ID
  const clientSecret = "CVWpEEpYbb"; // 네이버 개발자 센터에서 발급받은 시크릿 키

  const [searchResult, setSearchResult] = useState(null);

  const handleSearchBar = async () => {
    if (word == "") {
      return;
    }
    try {
      const response = await axios.get(
        `https://openapi.naver.com/v1/search/encyc.json?query=${encodeURIComponent(
          word
        )}&display=5`,
        {
          headers: {
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
          },
        }
      );
      setSearchResult(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrollRef = useAnimatedRef();
  const scrollHandler = useScrollViewOffset(scrollRef);
  const bottom = useSharedValue(290);
  const imgHeight = useSharedValue(65);
  const imgstyles = useAnimatedStyle(() => {
    const newheight = imgHeight.value - scrollHandler.value / 5;
    if (newheight <= 0) {
      return { height: 0 };
    }

    return {
      height: newheight,
    };
  });

  const bottomStyles = useAnimatedStyle(() => {
    const newheight = bottom.value - scrollHandler.value / 7;
    if (newheight <= 210) {
      return { bottom: 210 };
    }

    return {
      bottom: newheight,
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
    const newheight = opacity.value - scrollHandler.value / 800;
    if (newheight < 0) {
      return { opacity: 0 };
    }
    return {
      opacity: newheight,
    };
  });
  const handleClose = () => {
    setSearchBar("");
    setSearchResult("");
    setWord("");
  };
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const RenderNews = ({ item, index, viewableItems }) => {
    const [isUnLike, setUnIsLike] = useState(false);
    const AnimatedBackGroundImage =
      Animated.createAnimatedComponent(ImageBackground);
    const [isLike, setIsLike] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
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
    const handleButton = (type) => {
      if (type === "like") {
        if (isLike === false) {
          scale.value = withSpring(1, undefined, (isFinished) => {
            if (isFinished) {
              scale.value = withDelay(500, withSpring(0));
            }
          });
        }
        setIsLike(!isLike);
        if (isUnLike) {
          setUnIsLike(false);
        }
      } else {
        setUnIsLike(!isUnLike);
        if (isLike) {
          setIsLike(false);
        }
      }
    };
    const scale = useSharedValue(0);

    const lStyle = useAnimatedStyle(() => ({
      transform: [{ scale: Math.max(scale.value, 0) }],
    }));
    const [loadMore, setLoadMore] = useState(true);
    return (
      <>
        {loadMore == true ? (
          <Pressable onPress={() => setLoadMore(false)}>
            <Animated.View
              style={[rStyle, { marginVertical: 10, flexDirection: "row" }]}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  onLongPress={handleSearch}
                  android_ripple={{
                    color: "rgba(255, 255, 255, 0.1)",
                    borderless: false,
                  }}
                >
                  <Animated.View>
                    {item.img_url ? (
                      <AnimatedBackGroundImage
                        sharedTransitionTag="shared"
                        source={{ uri: item.img_url }}
                        style={styles.newnewfirstImage}
                      ></AnimatedBackGroundImage>
                    ) : (
                      <AnimatedBackGroundImage
                        sharedTransitionTag={`index-${item.title}`}
                        source={require("../../assets/news_img.jpg")}
                        style={styles.newnewfirstImage}
                      ></AnimatedBackGroundImage>
                    )}
                  </Animated.View>
                </Pressable>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    height: "100%",
                  }}
                >
                  <View style={styles.newnewtextContainer}>
                    <Text style={styles.newnewtextBold}>{item.title}</Text>
                    <Text style={styles.newnewtext}>{item.datestamp}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </Pressable>
        ) : (
          <Animated.View style={[rStyle, { marginVertical: 10 }]}>
            <Pressable
              onLongPress={handleSearch}
              android_ripple={{
                color: "rgba(255, 255, 255, 0.1)",
                borderless: false,
              }}
            >
              <Animated.View style={styles.container}>
                {item.img_url ? (
                  <AnimatedBackGroundImage
                    sharedTransitionTag={`index-${item.title}`}
                    source={{ uri: item.img_url }}
                    style={styles.firstImage}
                  >
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
                  </AnimatedBackGroundImage>
                ) : (
                  <ImageBackground
                    source={require("../../assets/news_img.jpg")}
                    style={styles.firstImage}
                  >
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
                  </ImageBackground>
                )}
              </Animated.View>
            </Pressable>
            <View style={styles.iconOuterContainer}>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleButton("like")}
                >
                  {isLike ? (
                    <Ionicons
                      name="heart-circle-outline"
                      size={40}
                      color="rgb(255,51,83)"
                    />
                  ) : (
                    <Ionicons name="heart-circle" size={40} color="white" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleButton("unlike")}
                >
                  {isUnLike ? (
                    <Ionicons
                      name="heart-dislike-circle-outline"
                      size={40}
                      style={styles.icon}
                      color="rgb(240,192,90)"
                    />
                  ) : (
                    <Ionicons
                      name="heart-dislike-circle"
                      size={40}
                      style={styles.icon}
                      color="white"
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.iconContainer}>
                <Pressable onPress={() => setIsBookmark(!isBookmark)}>
                  {isBookmark ? (
                    <FontAwesome
                      name="bookmark"
                      size={30}
                      style={styles.icon}
                      color="white"
                    />
                  ) : (
                    <FontAwesome
                      name="bookmark-o"
                      size={30}
                      style={styles.icon}
                      color="white"
                    />
                  )}
                </Pressable>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textBold}>좋아요 0개</Text>
              <Text style={styles.textBold}>{item.title}</Text>
              <Text style={styles.text}>{item.datestamp}</Text>
            </View>
            <View style={styles.summaryContainer}>
              <Text style={{ color: "black" }}>{item.summary}</Text>
            </View>
          </Animated.View>
        )}
      </>
    );
  };
  const removeHTMLTags = (html) => {
    const regex = /<[^>]*>/g;
    return html.replace(regex, "");
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
  const handlePress = (url) => {
    Linking.openURL(url);
  };
  const [logoModal, setLogoModal] = useState(false);
  const handleLogo = () => {
    setLogoModal(!logoModal);
  };
  const [whatlogo, setWhatLogo] = useState({
    logo: "부산 교차로",
    img: require(`../../assets/Busan_Mark.png`),
  });

  // FlatList 스크롤 이벤트 처리 함수

  // 스크롤 맨 위로 이동하는 함수

  return (
    <>
      <Header_White />
      <View
        style={{
          backgroundColor: GlobalColor.colors.primary_black,
          position: "relative",
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
            newanimatedStyles,
          ]}
        >
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: "black",
            }}
          ></View>
        </Animated.View>
        <Animated.View
          style={[
            {
              flexDirection: "row",
              backgroundColor: "white",
              alignItems: "center",
              paddingHorizontal: 20,
            },
            animatedStyles, // 배열 안에 animatedStyles를 추가합니다.
          ]}
        >
          <TouchableOpacity onPress={handleLogo} activeOpacity={0.5}>
            <AnimatedImage
              style={[{ width: 65, marginRight: 10 }, imgstyles]}
              source={whatlogo.img}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {whatlogo.logo}
          </Text>
        </Animated.View>
        <GestureHandlerRootView>
          <Normal_Vertical
            Newsdata={data}
            colors={GlobalColor.colors.primary_black}
          />
        </GestureHandlerRootView>
        <View>
          <Pressable onLongPress={handleSearch}>
            <View style={{ paddingHorizontal: 20, marginBottom: 220 }}>
              <FlatList
                ref={scrollRef}
                data={data} // 스크롤 이벤트 처리 함수 연결
                onViewableItemsChanged={({ viewableItems: vItems }) => {
                  viewableItems.value = vItems;
                }}
                renderItem={({ item, index }) => (
                  <GestureHandlerRootView>
                    <RenderNews
                      viewableItems={viewableItems}
                      index={index}
                      item={item}
                    />
                  </GestureHandlerRootView>
                )}
                keyExtractor={(item) => item.title}
              />
            </View>
          </Pressable>
        </View>
      </View>

      {logoModal && (
        <CircularCarousel
          handleLogo={handleLogo}
          setWhatLogo={setWhatLogo}
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
    borderWidth: 2,
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
    padding: 10,
    alignItems: "start",
  },
  summaryContainer: {
    width: "100%",
    padding: 10,
    alignItems: "start",
    backgroundColor: "white",

    borderRadius: 15,
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
  newnewtext: {
    color: "black",
    fontSize: 15,
  },
  newnewtextBold: {
    color: "black",
    fontSize: 15,
    marginVertical: 5,
    fontWeight: "bold",
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
  },
});

export default CountryNews;
