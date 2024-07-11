import axios from "axios";
import PreSearch from "./PreSearch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Text, View, ScrollView } = require("react-native");

const PreSearches = ({ navigation }) => {
  const [data, setData] = useState(null);

  const userInfo = useSelector((state) => state.userInfo);
  const memberId = userInfo.value.memberId;

  useEffect(() => {
    const updateNews = async () => {
      try {
        const res = await axios.get(
          `https://j10e205.p.ssafy.io/search/${memberId}`
        );
        setData(res.data.words.slice(0, 10));
        //console.log(res.data.words)
      } catch (err) {
        console.error(err);
      }
    };

    updateNews();
  }, [data]);
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {data &&
          data.map((item, index) => (
            <PreSearch navigation={navigation} key={index} data={item} />
          ))}
      </ScrollView>
    </>
  );
};

export default PreSearches;
