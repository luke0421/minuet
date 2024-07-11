import axios from "axios";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Text, View } = require("react-native");

const Tags = ({ navigation }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const updateNews = async () => {
      try {
        const res = await axios.get(`https://j10e205.p.ssafy.io/hottag`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    updateNews();
  }, []);
  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          gap: 18,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data &&
          data.map((item, index) => (
            <Tag navigation={navigation} key={index} data={item} />
          ))}
      </View>
    </>
  );
};

export default Tags;
