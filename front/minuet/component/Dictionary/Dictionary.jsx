import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import { clearUserInfo } from '../../asyncstorage/AsyncStorage';

const NaverDictionarySearch = ({ navigation }) => {
  const [word, setWord] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const clientId = 'nu1zCWBYmWXjKjfevIlE'; // 네이버 개발자 센터에서 발급받은 클라이언트 ID
  const clientSecret = 'CVWpEEpYbb'; // 네이버 개발자 센터에서 발급받은 시크릿 키

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://openapi.naver.com/v1/search/encyc.json?query=${encodeURIComponent(word)}&display=1`, {
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      });
      console.log(response.data.items)
      setSearchResult(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await clearUserInfo()
      navigation.navigate('Start')
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={word}
        onChangeText={text => setWord(text)}
        placeholder="검색할 단어를 입력하세요"
      />
      <Button title="검색" onPress={handleSearch} />
      {searchResult && (
        <View>
          {searchResult.map((item, index) => (
            <View key={index}>
              <Text>{item.description}</Text>
            </View>
          ))}
        </View>
      )}
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
};

export default NaverDictionarySearch;
