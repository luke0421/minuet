import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutLeft,
} from "react-native-reanimated";
import { GlobalColor } from "../../util/colors";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import OpenAI from "openai";
import Header_Black from "../../util/Header_Black";

const Search = ({ navigation }) => {
  const clientId = "nu1zCWBYmWXjKjfevIlE"; // 네이버 개발자 센터에서 발급받은 클라이언트 ID
  const { height, width } = Dimensions.get("window");
  const [word, setWord] = useState("");
  const [talkhistory, settalkhistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const handleClose = () => {
  //   setSearchBar("");
  //   setSearchResult("");
  //   setWord("");
  // };
  // const handleSearch = () => {
  //   setSearchBar(!searchbar);
  //   setWord("");
  // };
  // const handleSearchBar = async () => {
  //   if (word == "") {
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(
  //       `https://openapi.naver.com/v1/search/encyc.json?query=${encodeURIComponent(
  //         word
  //       )}&display=5`,
  //       {
  //         headers: {
  //           "X-Naver-Client-Id": clientId,
  //           "X-Naver-Client-Secret": clientSecret,
  //         },
  //       }
  //     );
  //     setSearchResult(response.data.items);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // const removeHTMLTags = (html) => {
  //   const regex = /<[^>]*>/g;
  //   return html.replace(regex, "");
  // };
  // const handlePress = (url) => {
  //   Linking.openURL(url);
  // };
  const [searchResult, setSearchResult] = useState(null);
  const openai = new OpenAI({
    apiKey: "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",
  });
  const chatbot = async (text) => {
    if (text == "") {
      return;
    }
    setWord("");
    setIsLoading(true);
    settalkhistory((prev) => [...prev, [text, 1]]);
    const ans = await sendText(text);
    settalkhistory((prev) => [...prev, [ans, 2]]);
    setIsLoading(false);
  };
  const sendText = async (text) => {
    if (text == "") {
      return;
    }
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "너의 이름은 미뉴에트이고, 물어보는 질문에 친절하게 대답해줘.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return response.choices[0].message.content;
  };
  const scrollViewRef = useRef();
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [talkhistory]);
  return (
    <>
      <StatusBar style="light" />
      <Header_Black />
      <View
        style={{
          position: "relative",
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <KeyboardAvoidingView>
            <Animated.View
              entering={FadeInDown.duration(400).delay(500)}
              style={[
                {
                  borderRadius: 50,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  width: width - 50,
                  backgroundColor: "white",
                  borderWidth: 1,
                },
              ]}
            >
              <View>
                <TextInput
                  onEndEditing={() => chatbot(word)}
                  style={{ textAlign: "center" }}
                  //placeholder="검색할 단어를 입력하세요"
                  placeholder="미뉴에트에게 뭐든 물어보세요"
                  placeholderTextColor="#d3d3d3"
                  value={word}
                  onChangeText={(text) => setWord(text)}
                />
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
        {talkhistory.length == 0 && (
          <Animated.View
            entering={FadeInLeft.duration(400).delay(300)}
            style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
          >
            <Image
              source={require("../../assets/chatgpt.jpg")}
              style={{ width: 300, height: 300 }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: GlobalColor.colors.primary_black,
                fontFamily: "GmarketSansTTFMedium",
                fontSize: 20,
              }}
            >
              미뉴엣에게 궁금한 것에 질문해보세요!
            </Text>
            <Text
              style={{
                color: GlobalColor.colors.primary_black,
                textAlign: "center",
                fontFamily: "GmarketSansTTFMedium",
              }}
            >
              챗GPT를 기반으로 대답을 드릴께요
            </Text>
          </Animated.View>
        )}
        {talkhistory.length != 0 && (
          <View
            style={{
              //backgroundColor:"black",
              justifyContent: "center",
              position: "absolute",

              alignItems: "center",
            }}
          >
            <Animated.View
              entering={FadeInDown}
              style={[
                {
                  justifyContent: "start",
                  alignItems: "center",
                  width: width - 10,
                  height: height - 220,
                  backgroundColor: "white",
                  // borderRadius: 15,
                  marginBottom: 100,
                },
              ]}
            >
              {/* <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderColor: GlobalColor.colors.Pick_color,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: "bold",
                    height: 60,
                  }}
                >
                  {word}
                </Text>
                <View
                    style={{
                      width: "100%",
                      borderWidth: 1,
                      borderColor: GlobalColor.colors.Pick_color,
                    }}
                  ></View>
              </View> */}

              <ScrollView
                // style={{
                //   paddingHorizontal: 20,
                //   marginVertical: 20,
                // }}

                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ width: width - 40, marginTop: 20 }}>
                  {talkhistory.map((item, index) => (
                    <Animated.View
                      key={index}
                      entering={FadeInDown}
                      style={{
                        alignItems: item[1] === 1 ? "flex-end" : "flex-start", // 역할이 1인 경우 왼쪽, 2인 경우 오른쪽으로 배치
                        margin: 5,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        {item[1] === 1 && (
                          <Text
                            style={{
                              fontFamily: "GmarketSansTTFMedium",
                              fontSize: 17,
                            }}
                          >
                            나
                          </Text>
                        )}
                        {item[1] === 1 ? (
                          <Image
                            source={require("../../assets/profile.png")}
                            style={{
                              width: 45,
                              height: 45,
                              borderRadius: 18,
                              marginBottom: 10,
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../../assets/chatgpt_1.png")}
                            resizeMode="repeat"
                            style={{
                              width: 45,
                              height: 45,
                              borderRadius: 18,
                              marginBottom: 10,
                            }}
                          />
                        )}
                        {item[1] !== 1 && (
                          <Text
                            style={{
                              fontFamily: "GmarketSansTTFMedium",
                              fontSize: 17,
                            }}
                          >
                            미뉴에트
                          </Text>
                        )}
                      </View>
                      <Text
                        style={{
                          lineHeight: 25,
                          backgroundColor:
                            item[1] === 1
                              ? "rgb(8,138,250)"
                              : "rgb(240,240,240)",
                          borderRadius: 15,
                          padding: 10,
                          fontSize: 15,
                          marginBottom: 10,
                          color: item[1] === 1 ? "white" : "black",
                          fontFamily: "GmarketSansTTFMedium",
                        }}
                      >
                        {item[0]}
                      </Text>
                    </Animated.View>
                  ))}
                  <View style={{alignItems:"flex-start" , padding:50}}>
                    {isLoading && (
                      <ActivityIndicator
                        size="large"
                        animating={true}
                        color="rgb(8,138,250)"
                      />
                    )}
                  </View>
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            height: 40,
            position: "absolute",
            bottom: 10,
            left: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Search;
