import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Header_Black from "../../util/Header_Black";
import Header_White from "../../util/Header_White";
import { Ionicons, Fontisto, Entypo } from "@expo/vector-icons";
import CardCaro from "../../component/Carosual/IndexX";
import { GlobalColor } from "../../util/colors";
import { useSelector } from "react-redux";
import WheelPicker from "react-native-wheely";

const Setting = () => {
  // 스크랩 관련
  // selectTag= 0: 브리핑, 1: 스크랩
  const [isSelectedTag, setIsSelectedTag] = useState(1);

  const news_data = useSelector((state) => state.news);
  const data = news_data.news.economic;
  const news = data;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(null);

  // 뉴스 카드 클릭(그림 반투명, 기사 제목)
  const handleNewsCardClick = (article) => {
    if (selectedArticle === article) setSelectedArticle(null);
    else setSelectedArticle(article);
  };

  // 뉴스 카드 길게 누르기(기사 cardcaro 등장)
  const handleNewsCardPress = (article, index) => {
    setSelectedArticle(article);
    setSelectedArticleIndex(index);
    setModalVisible(true);
  };

  // 브리핑 관련
  const [isConnected, setIsConnected] = useState(true);
  const [briefs, setBriefs] = useState([]);
  const [selectedBrief, setSelectedBrief] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTimeType, setSelectedTimeType] = useState(0);
  const [selectedTimeHour, setSelectedTimeHour] = useState(0);
  const [selectedTimeMin, setSelectedTimeMin] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("IT/과학");
  const categories = ["경제", "사회", "생활/문화", "세계", "IT/과학"];
  const wheelType = ["오전", "오후"];
  const wheelHour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const wheelMin = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const handleOpenModal = (brief, index = null) => {
    if (index === null) {
      setSelectedBrief({
        time: [selectedTimeType, selectedTimeHour, selectedTimeMin],
        category: "IT/과학",
      });
    } else {
      setSelectedBrief(brief);
      setSelectedTimeType(brief.time[0]);
      setSelectedTimeHour(brief.time[1]);
      setSelectedTimeMin(brief.time[2]);
      setSelectedCategory(brief.category);
      setSelectedIndex(index);
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedBrief(null);
    setSelectedIndex(null);
    setSelectedTimeType(0);
    setSelectedTimeHour(0);
    setSelectedTimeMin(0);
    setSelectedCategory("IT/과학");
    setModalVisible(false);
  };

  const handleAddBrief = () => {
    const newBrief = {
      time: [selectedTimeType, selectedTimeHour, selectedTimeMin],
      category: selectedCategory,
    };
    setBriefs([...briefs, newBrief]);
    handleCloseModal();
  };

  const handleModifyBrief = (index) => {
    const newBrief = {
      time: [selectedTimeType, selectedTimeHour, selectedTimeMin],
      category: selectedCategory,
    };
    const updatedBriefs = [...briefs];
    updatedBriefs.splice(index, 1, newBrief);
    setBriefs(updatedBriefs);
    handleCloseModal();
  };

  const handleDeleteBrief = (index) => {
    const updatedBriefs = [...briefs];
    updatedBriefs.splice(index, 1);
    setBriefs(updatedBriefs);
  };

  return (
    <View style={styles.container}>
      <Header_White />
      <View style={styles.profile}>
        <View style={styles.profileTitle}>
          <Text style={[styles.textBig, { fontFamily: "GmarketSansTTFBold" }]}>
            이름이나닉네임
          </Text>
          <TouchableOpacity>
            <Entypo name={"cog"} style={styles.textBig} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileMain}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.profileImg}
              source={require("../../assets/profile.png")}
              resizeMode="contain"
            />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileInfoMain}>
              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={[
                    styles.textBig,
                    { fontFamily: "GmarketSansTTFMedium" },
                  ]}
                >
                  {news.length}
                </Text>
                <Text
                  style={[styles.textBig, { fontFamily: "GmarketSansTTFBold" }]}
                >
                  스크랩
                </Text>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={[
                    styles.textBig,
                    { fontFamily: "GmarketSansTTFMedium" },
                  ]}
                >
                  {briefs.length}
                </Text>
                <Text
                  style={[styles.textBig, { fontFamily: "GmarketSansTTFBold" }]}
                >
                  알람
                </Text>
              </View>
            </View>
            <View style={styles.profileInfoSub}>
              <Text
                style={[
                  styles.text,
                  {
                    backgroundColor: "red",
                    fontFamily: "GmarketSansTTFMedium",
                  },
                ]}
              >
                좋아하는
              </Text>
              <Text>{`\t`}</Text>
              <Text
                style={[
                  styles.text,
                  {
                    backgroundColor: "green",
                    fontFamily: "GmarketSansTTFMedium",
                  },
                ]}
              >
                카테고리
              </Text>
              <Text>{`\t`}</Text>
              <Text
                style={[
                  styles.text,
                  {
                    backgroundColor: "blue",
                    fontFamily: "GmarketSansTTFMedium",
                  },
                ]}
              >
                최대 3개
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.tag}>
        <TouchableOpacity
          style={isSelectedTag ? styles.selectedTag : styles.noneTag}
          onPress={() => {
            setIsSelectedTag(1);
            setModalVisible(false);
          }}
        >
          <Entypo name={"news"} style={styles.textBig} />
        </TouchableOpacity>
        <TouchableOpacity
          style={isSelectedTag ? styles.noneTag : styles.selectedTag}
          onPress={() => {
            setIsSelectedTag(0);
            setModalVisible(false);
          }}
        >
          <Entypo name={"sound"} style={styles.textBig} />
        </TouchableOpacity>
      </View>
      {/* <Animated.Veiw style={styles.selectedTag}/> */}
      <View style={styles.main}>
        {isSelectedTag ? (
          <ScrollView contentContainerStyle={styles.myScrapNews}>
            {news.length === 0 ? (
              <Text style={{ fontFamily: "GmarketSansTTFMedium" }}>
                아직 스크랩한 기사가 없어요...
              </Text>
            ) : (
              <>
                {news.map((article, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.myScrapNewsCard}
                    onPress={() => handleNewsCardClick(article)}
                    onLongPress={() => handleNewsCardPress(article, index)}
                  >
                    {article === selectedArticle ? (
                      <>
                        <ImageBackground
                          source={
                            article.img_url
                              ? { uri: article.img_url }
                              : require("../../assets/news_img.jpg")
                          }
                          style={styles.myScrapNewsCardImg}
                        >
                          <View
                            style={{
                              width: "100%",
                              height: "100%",
                              justifyContent: "center",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <Text style={styles.myScrapNewsCardTitle}>
                              {article.title}
                            </Text>
                          </View>
                        </ImageBackground>
                      </>
                    ) : (
                      <Image
                        source={
                          article.img_url
                            ? { uri: article.img_url }
                            : require("../../assets/news_img.jpg")
                        }
                        style={styles.myScrapNewsCardImg}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </>
            )}
          </ScrollView>
        ) : (
          <View style={styles.iotBriefingBox}>
            {briefs.length === 0 ? (
              <View style={[styles.iotBriefingContent, { marginTop: 10 }]}>
                <Text
                  style={{
                    flex: 5,
                    textAlign: "center",
                    fontFamily: "GmarketSansTTFMedium",
                  }}
                >
                  아직 브리핑할 알람이 없어요..
                </Text>
                <TouchableOpacity
                  onPress={handleOpenModal}
                  style={{ flex: 1, textAlign: "center" }}
                >
                  <Entypo name={"plus"} size={30} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View
                  style={[styles.iotBriefingContent, { borderBottomWidth: 1 }]}
                >
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontFamily: "GmarketSansTTFBold",
                    }}
                  >
                    시간
                  </Text>
                  <Text>|</Text>
                  <Text
                    style={{
                      flex: 2,
                      textAlign: "center",
                      fontFamily: "GmarketSansTTFBold",
                    }}
                  >
                    카테고리
                  </Text>
                  <Text>|</Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontFamily: "GmarketSansTTFBold",
                    }}
                  >
                    수정/삭제
                  </Text>
                </View>
                {briefs.map((brief, index) => (
                  <Animated.View
                    key={index}
                    style={styles.iotBriefingContent}
                    // exiting={FadeOutUp}
                  >
                    <Text
                      style={{
                        flex: 1,
                        textAlign: "center",
                        fontFamily: "GmarketSansTTFMedium",
                      }}
                    >
                      {wheelType[brief.time[0]]}
                      {`\n`}
                      {wheelHour[brief.time[1]] < 10
                        ? `0${wheelHour[brief.time[1]]}`
                        : wheelHour[brief.time[1]]}{" "}
                      :{" "}
                      {wheelMin[brief.time[2]] < 10
                        ? `0${wheelMin[brief.time[2]]}`
                        : wheelMin[brief.time[2]]}
                    </Text>
                    <Text>|</Text>
                    <Text
                      style={{
                        flex: 2,
                        textAlign: "center",
                        fontFamily: "GmarketSansTTFMedium",
                      }}
                    >
                      {brief.category}
                    </Text>
                    <Text>|</Text>
                    <TouchableOpacity
                      style={{ flex: 1, alignItems: "center" }}
                      onPress={() => handleOpenModal(brief, index)}
                      onLongPress={() => handleDeleteBrief(index)}
                    >
                      <Entypo name={"clipboard"} size={30} />
                    </TouchableOpacity>
                  </Animated.View>
                ))}
                {briefs.length <= 5 ? (
                  <View
                    style={{
                      width: "90%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ flex: 5, textAlign: "center" }}> </Text>
                    <TouchableOpacity
                      onPress={handleOpenModal}
                      style={{ flex: 1, textAlign: "center" }}
                    >
                      <Entypo name={"plus"} size={30} />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </>
            )}
          </View>
        )}
      </View>
      {isSelectedTag ? (
        <View
          style={{
            backgroundColor: GlobalColor.colors.primary_black50,
            position: "absolute",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {modalVisible && (
            <View style={styles.modalContainer}>
              <CardCaro
                startIndex={selectedArticleIndex}
                data={news}
                setModal={setModalVisible}
              />
            </View>
          )}
        </View>
      ) : (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalBriefTitle}>
                {selectedIndex === null ? "브리핑 추가" : "브리핑 수정"}
              </Text>
              <View style={styles.modalBriefTime}>
                <Text
                  style={[
                    styles.modalBriefTimeText,
                    { flex: 1.5, fontSize: 20 },
                  ]}
                >
                  시간
                </Text>
                <WheelPicker
                  selectedIndex={selectedTimeType}
                  options={wheelType}
                  onChange={(index) => setSelectedTimeType(index)}
                  visibleRest={1}
                  itemHeight={30}
                  containerStyle={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    height: "100%",
                  }}
                />
                <WheelPicker
                  selectedIndex={selectedTimeHour}
                  options={wheelHour}
                  onChange={(index) => setSelectedTimeHour(index)}
                  visibleRest={1}
                  itemHeight={30}
                  containerStyle={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    height: "100%",
                  }}
                />
                <Text style={styles.modalBriefTimeText}>시</Text>
                <WheelPicker
                  selectedIndex={selectedTimeMin}
                  options={wheelMin}
                  onChange={(index) => setSelectedTimeMin(index)}
                  visibleRest={1}
                  itemHeight={30}
                  containerStyle={{
                    backgroundColor: "rgba(0,0,0,0.1)",
                    height: "100%",
                  }}
                />
                <Text style={styles.modalBriefTimeText}>분</Text>
              </View>
              <View style={styles.modalBriefCategory}>
                <View
                  style={[
                    styles.modalBriefCategoryButton,
                    { backgroundColor: "gray" },
                  ]}
                >
                  <Text
                    style={{ fontFamily: "GmarketSansTTFBold", fontSize: 20 }}
                  >
                    카테고리
                  </Text>
                </View>
                {categories.map((category) => (
                  <TouchableOpacity
                    style={[
                      styles.modalBriefCategoryButton,
                      {
                        backgroundColor:
                          selectedCategory === category
                            ? "rgba(255,165,0,0.25)"
                            : null,
                      },
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={
                        category == selectedCategory
                          ? { fontFamily: "GmarketSansTTFBold", fontSize: 18 }
                          : { fontFamily: "GmarketSansTTFMedium", fontSize: 18 }
                      }
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalButton}>
                <TouchableOpacity
                  style={[
                    styles.modalButtonClose,
                    { borderBottomLeftRadius: 5 },
                  ]}
                  onPress={handleCloseModal}
                >
                  <Text
                    style={{ fontFamily: "GmarketSansTTFBold", fontSize: 20 }}
                  >
                    닫기
                  </Text>
                </TouchableOpacity>
                {selectedIndex === null ? (
                  <TouchableOpacity
                    style={[
                      styles.modalButtonClose,
                      { borderBottomRightRadius: 5 },
                    ]}
                    onPress={handleAddBrief}
                  >
                    <Text
                      style={{ fontFamily: "GmarketSansTTFBold", fontSize: 20 }}
                    >
                      생성
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.modalButtonClose,
                      { borderBottomRightRadius: 5 },
                    ]}
                    onPress={() => handleModifyBrief(selectedIndex)}
                  >
                    <Text
                      style={{ fontFamily: "GmarketSansTTFBold", fontSize: 20 }}
                    >
                      수정
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColor.colors.primary_black,
  },
  profile: {
    flex: 3,
    justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBlockColor: "white",
  },
  profileTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileMain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 20,
  },
  textBig: {
    color: "white",
    fontSize: 32,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  profileImg: {
    flex: 1,
    width: 150,
    height: 150,
  },
  profileInfo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfoMain: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  profileInfoSub: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  tag: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    borderTopWidth: 1,
    // borderBottomWidth: 0.5,
    borderColor: GlobalColor.colors.Pick_color,
  },
  selectedTag: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderColor: "white",
  },
  noneTag: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 7,
    alignItems: "center",
  },
  myScrap: {
    width: "100%",
    alignItems: "center",
    flex: 5,
  },
  myScrapNews: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  myScrapNewsCard: {
    width: "33.33%",
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
  myScrapNewsCardImg: {
    width: "100%",
    height: 125,
    justifyContent: "center",
    // resizeMode: "contain",
  },
  myScrapNewsCardTitle: {
    color: "white",
    fontFamily: "GmarketSansTTFMedium",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
  },
  iotBriefingBox: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  iotBriefingContent: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "gray",
    height: 40,
    // marginTop: 5,
    marginBottom: 10,
    // borderRadius: 10,
    // borderWidth: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    height: "60%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
  },
  modalBrief: {
    backgroundColor: "white",
    margin: 10,
  },
  modalBriefTitle: {
    fontSize: 32,
    fontFamily: "GmarketSansTTFBold",
    marginTop: 20,
  },
  modalBriefTime: {
    flexDirection: "row",
    // flexWrap: "wrap",
    width: "90%",
    aspectRatio: 7 / 2,
    alignItems: "center",
    // justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 5,
  },
  modalBriefTimeText: {
    flex: 1,
    // height: "100%",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "GmarketSansTTFBold",
    fontSize: 18,
  },
  modalBriefCategory: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    aspectRatio: 3 / 2,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
  },
  modalBriefCategoryButton: {
    width: "33.33333%",
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 2.5,
  },
  modalButton: {
    flexDirection: "row",
    width: "100%",
  },
  modalButtonClose: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    borderWidth: 0.5,
  },
});

export default Setting;
