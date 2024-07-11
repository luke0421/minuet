import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import axios from 'axios';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);

    // 데이터를 받아오는 함수
    const fetchPokemonData = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
            const results = response.data.results;

            // 포켓몬의 상세 정보를 가져오기 위해 각 포켓몬에 대한 추가 요청을 보냅니다.
            const pokemonDetailsPromises = results.map(async pokemon => {
                const pokemonResponse = await axios.get(pokemon.url);
                return pokemonResponse.data;
            });

            // 모든 포켓몬의 상세 정보를 받아올 때까지 기다립니다.
            const pokemonDetails = await Promise.all(pokemonDetailsPromises);
            setPokemonData(pokemonDetails);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    // FlatList의 renderItem에 사용될 함수
    const renderPokemonItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.sprites.front_default || item.sprites.other['official-artwork'].front_default }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemonData}
                renderItem={renderPokemonItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default PokemonList;
