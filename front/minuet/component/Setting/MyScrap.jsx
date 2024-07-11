import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
// import { useSelector } from "react-redux";
import { GlobalColor } from "../../util/colors";
import CardCaro from "../../component/Carosual/IndexX";
import axios from "axios";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const MyScrap = ({ onChangeTotalScrap, memberId }) => {
  // const user = useSelector((state) => state.userInfo);
  // const memberId = user.value.memberId;
  // const news = news;
  const isDark = useSelector((state) => state.darkmode.value);
  const [news, setNews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalLength, setTotalLength] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // console.log(totalLength);

  // 뉴스 카드 클릭(기사 자세히 팝업)
  const handleNewsCardClick = (article, index) => {
    setSelectedArticle(article);
    setSelectedArticleIndex(index);
    setModalVisible(true);
  };

  // 뉴스 카드 길게 누르기(스크랩 삭제)
  const handleNewsCardPress = async (article, index) => {
    try {
      if (article.region) {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/region/bookmark/${memberId}/${article.newsId}`
        );
      } else {
        const res = await axios.delete(
          `https://j10e205.p.ssafy.io/bookmark/${memberId}/${article.newsId}`
        );
      }
      // 기사 삭제 후 기사 목록을 갱신
      const updatedNews = news.filter((item, idx) => idx !== index);
      setNews(updatedNews);
      setTotalLength(totalLength - 1);
    } catch (err) {
      console.error(err);
    }
  };

  // 스크랩 처음 불러오기
  useEffect(() => {
    updateScrap();
  }, []);

  // 스크랩 숫자 갱신
  useEffect(() => {
    if (totalLength === 0) {
      onChangeTotalScrap("0");
    } else if (totalLength === null) {
      onChangeTotalScrap(null);
    } else {
      onChangeTotalScrap(totalLength.toString());
    }
  }, [totalLength]);

  const updateScrap = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/bookmark/list/${memberId}/0`
      );
      // console.log(res.data);
      setTotalPage(res.data.totalPage);
      setNews(res.data.bookmarks);
      setTotalLength(res.data.totalLength);
      setPageNo(0);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 다음 스크랩 페이지 불러오기
  const updateNextScrap = async () => {
    const realpageNo = pageNo + 1;
    if (realpageNo == totalPage) {
      return;
    }
    // console.log(realpageNo);
    setPageNo((prev) => prev + 1);
    try {
      const res = await axios.get(
        `https://j10e205.p.ssafy.io/bookmark/list/${memberId}/${realpageNo}`
      );
      setNews((prev) => [...prev, ...res.data.bookmarks]);
    } catch (err) {
      console.error(err);
    }
  };

  const getRefreshData = async () => {
    setRefreshing(true);
    await updateScrap();
    setRefreshing(false);
  };

  const onRefresh = () => {
    if (!refreshing) {
      getRefreshData();
    }
  };

  const categoryColor = (categoryName) => {
    switch (categoryName) {
      case "ECONOMIC":
        return GlobalColor.colors.primary_red100;
      case "SOCIAL":
        return GlobalColor.colors.primary_yellow;
      case "LIFE":
        return GlobalColor.colors.primary_green;
      case "WORLD":
        return GlobalColor.colors.primary_blue;
      case "SCIENCE":
        return GlobalColor.colors.primary_purple;
      default:
        return GlobalColor.colors.primary_black;
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          style={{ marginVertical: 150 }}
          size="large"
          color="white"
        />
      ) : (
        <View style={styles.myScrapNews}>
          <FlatList
            data={news}
            keyExtractor={(item) => item.newsId}
            // contentContainerStyle={styles.myScrapNews}
            onEndReached={() => updateNextScrap()}
            onEndReachedThreshold={0.1}
            refreshing={refreshing}
            onRefresh={onRefresh}
            numColumns={2}
            // ListFooterComponent={loading && <ActivityIndicator />}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.myScrapNewsCard,
                  {
                    borderWidth: 3,
                    borderColor: (() => {
                      const { category } = item;
                      if (category) {
                        return categoryColor(category.categoryName);
                      } else {
                        return GlobalColor.colors.primary_black;
                      }
                    })(),
                  },
                ]}
                onPress={() => handleNewsCardClick(item, index)}
                onLongPress={() => handleNewsCardPress(item, index)}
              >
                <Image
                  source={
                    item.imgURL
                      ? { uri: item.imgURL }
                      : require("../../assets/news_img.jpg")
                  }
                  style={styles.myScrapNewsCardImg}
                />
                <View style={styles.myScrapNewsCardContent}>
                  <Text style={{ fontFamily: "GmarketSansTTFMedium" }}>
                    {item.title.length <= 30
                      ? item.title
                      : item.title.slice(0, 30) + "..."}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {news.length === 0 && (
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={[
                  {
                    width: "95%",
                    aspectRatio: 1,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderStyle: "dashed",
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  isDark && { borderColor: "white" },
                ]}
              >
                <Text
                  style={[
                    { fontFamily: "GmarketSansTTFMedium", fontSize: 20 },
                    isDark && { color: "white" },
                  ]}
                >
                  스크랩한 기사가 없어요...
                </Text>
                <TouchableOpacity
                  onPress={updateScrap}
                  style={[
                    {
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    isDark && { borderColor: "white" },
                  ]}
                >
                  <Entypo
                    name={"cycle"}
                    size={30}
                    style={isDark && { color: "white" }}
                  />
                  <Text
                    style={[
                      { fontFamily: "GmarketSansTTFMedium", color: "gray" },
                    ]}
                  >
                    새로고침
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
      {modalVisible && (
        <Modal style={styles.modalContainer}>
          <CardCaro
            startIndex={selectedArticleIndex}
            data={news}
            setModal={setModalVisible}
            memberId={memberId}
            setNews={setNews}
            setTotalLength={setTotalLength}
            totalLength={totalLength}
          />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  myScrapNews: {
    width: "100%",
  },
  myScrapNewsCard: {
    width: "49.5%",
    aspectRatio: 1,
    borderRadius: 10,
    margin: 1,
    padding: 5,
    backgroundColor: "white",
  },
  myScrapNewsCardImg: {
    flex: 3,
    justifyContent: "center",
    borderRadius: 10,
    // resizeMode: "contain",
  },
  myScrapNewsCardContent: {
    flex: 1,
    justifyContent: "center",
    // color: "white",
    // backgroundColor: "teal",
    // padding: 5,
  },
});

export default MyScrap;
