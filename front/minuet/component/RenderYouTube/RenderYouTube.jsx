import React, { useState } from 'react';
import { View, Button, FlatList, TouchableOpacity, Text, TextInput } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

const RenderYouTube = () => {
    const [trailerUrl, setTrailerUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [videoList, setVideoList] = useState([]);
    const [searchWord, setSearchWord] = useState('')

    const fetchTrailer = async (title) => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: 'AIzaSyDVfpn8nhCnuKkx_LV-PCadF01FIWjnVgQ',
                    q: `뉴스${title}`,
                    part: 'snippet',
                    type: 'video',
                    maxResults: 5,
                },
            });

            const videos = response.data.items.map(item => ({
                id: item.id.videoId,
                title: item.snippet.title
            }));
            setVideoList(videos);
        } catch (error) {
            console.error('Error fetching trailer:', error);
        }
    };

    const playVideo = (videoId) => {
        setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
        setShowModal(true);
    };

    const renderVideoItem = ({ item }) => (
        <TouchableOpacity onPress={() => playVideo(item.id)}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={{ textAlign: "center" }}
                placeholder="검색어를 입력해주세요."
                value={searchWord}
                onChangeText={(text) => setSearchWord(text)}
            />
            <Button
                title="Search Trailer"
                onPress={() => fetchTrailer(searchWord)}
            />
            {showModal && (
                <Button
                    title='Close Modal'
                    onPress={() => { setShowModal(false) }}
                />
            )}
            <FlatList
                data={videoList}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
            />
            {showModal && (

                <WebView
                    source={{ uri: trailerUrl }}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                />

            )}
        </View>
    );
};

export default RenderYouTube;
