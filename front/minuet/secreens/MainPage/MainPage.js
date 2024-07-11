import React, { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header_Black from "../../util/Header_Black";
import { StatusBar } from "expo-status-bar";
import Header_White from "../../util/Header_White";
import { GlobalColor } from "../../util/colors";
import Caro from "../../component/Carosual/Caro";
import IndexX from "../../component/Carosual/IndexX";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Parallax_Horizontal from "../../component/Carosual/Parallax_Horizontal";
import KeywordsCloud from "../../util/KewordCloud";

import Weather from "../../component/Weather/Weather";
import Normal_Vertical from "../../component/Carosual/Normal_vertical";
import Tags from "../../component/Tags/Tags";
import { useSelector } from "react-redux";
import axios from "axios";
import CardCaro from "../../component/Carosual/IndexX";
// import MainCarousel from "../../component/MainCarousel";
const MainPage = ({ navigation }) => {
  const isDark = useSelector((state) => state.darkmode.value);
  // console.log(isDark);
  const [data, setData] = useState();
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(null);
  const userInfo = useSelector((state) => state.userInfo);
  const memberId = userInfo.value.memberId;
  const [modalVisible, setModalVisible] = useState(false);
  const handleNewsCardClick = (index) => {
    // setSelectedArticle(article);
    setSelectedArticleIndex(index);
    setModalVisible(true);
  };
  useEffect(() => {
    const updateNews = async () => {
      try {
        const res = await axios.get(
          `https://j10e205.p.ssafy.io/userpick/${memberId}`
        );

        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    updateNews();
  }, []);

  return (
    <>
      <Header_Black />
      <StatusBar style="light" />
      {/* {!isDark && (
        <View
          style={{
            backgroundColor:GlobalColor.colors.primary_black,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{ height: 2, width: "80%", backgroundColor: "white" }}
          ></View>
        </View>
      )} */}

      <ScrollView
        style={{
          // height:700,
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
        }}
      >
        {/* <GestureHandlerRootView>
            <Normal_Vertical
              Newsdata={data}
              colors={GlobalColor.colors.primary_black}
            />
          </GestureHandlerRootView> */}
        <View>
          <Text
            style={{
              padding: 10,
              paddingHorizontal: 20,
              fontSize: 21,
              justifyContent: "center",
              alignItems: "center",
              color: "rgb(150,178,255)",
              fontWeight: "bold",
              fontFamily: "GmarketSansTTFLight",
            }}
          >
            Today's{" "}
            <Text
              style={{
                color: isDark ? "white" : GlobalColor.colors.primary_black,
                fontWeight: "bold",
              }}
            >
              Weather{" "}
              <Ionicons
                name="partly-sunny"
                size={24}
                color={isDark ? "white" : GlobalColor.colors.primary_black}
              />
            </Text>
          </Text>
          <Weather />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              paddingHorizontal: 50,
              marginVertical: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDark
                ? GlobalColor.colors.primary_black
                : "white",
            }}
          >
            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "rgb(150,178,255)",
              }}
            ></View>
          </View>
          <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
            <View
              style={{
                paddingHorizontal: 20,
                justifyContent: "flex-start",
                gap: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  justifyContent: "center",
                  color: "rgb(150,178,255)",
                  fontWeight: "bold",
                }}
              >
                User's{" "}
                <Text
                  style={{
                    color: isDark ? "white" : GlobalColor.colors.primary_black,
                    fontWeight: "bold",
                  }}
                >
                  Pick
                </Text>
                {/* <Text style={{ color: "white", fontSize: 14 }}>
                    {" "}
                    맞춤형 뉴스를 한눈에
                  </Text> */}
              </Text>
              <FontAwesome
                name="check"
                size={24}
                style={styles.icon}
                color="rgb(150,178,255)"
              />
            </View>
            <View style={{ marginVertical: 30 }}>
              <Parallax_Horizontal
                handleNewsCardClick={handleNewsCardClick}
                data={data}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 1, gap: 10, justifyContent: "center" }}>
          <View
            style={{
              paddingHorizontal: 20,
              justifyContent: "flex-start",
              gap: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 21,
                justifyContent: "center",
                color: "rgb(150,178,255)",
                fontWeight: "bold",
              }}
            >
              Hot{" "}
              <Text
                style={{
                  color: isDark ? "white" : GlobalColor.colors.primary_black,
                  fontWeight: "bold",
                }}
                s
              >
                Tag's
              </Text>
            </Text>
            <FontAwesome5
              name="hotjar"
              size={24}
              style={styles.icon}
              color="rgb(150,178,255)"
            />
          </View>
          <View style={{ height: 300 , alignItems:"center"}}>
            <Tags navigation={navigation} />
          </View>
        </View>
      </ScrollView>

      {modalVisible && (
        <Modal style={styles.modalContainer}>
          <CardCaro
            isUserpick={true}
            startIndex={selectedArticleIndex}
            data={data}
            setModal={setModalVisible}
            memberId={memberId}
            setNews={setData}
            // setTotalLength={setTotalLength}
            // totalLength={totalLength}
          />
        </Modal>
      )}
    </>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  modalContainer: {},
});
