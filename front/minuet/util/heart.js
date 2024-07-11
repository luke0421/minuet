import React, { Component } from "react";
import { View, Animated, StyleSheet, TouchableOpacity, Dimensions, Easing } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const animationEndY = Math.ceil(height * 0.8);
const negativeEndY = animationEndY * -1;
let heartCount = 1

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
}
class Heartpop extends Component {
    state = {
        hearts: []
    }

    addHeart = () => {
        this.setState(
            {
                hearts: [
                    ...this.state.hearts,
                    {
                        id: heartCount,
                        right: getRandomNumber(20, 150)
                    }
                ]
            },
            () => {
                heartCount++
            }
        )
    };

    removeHeart = (id) => {
        this.setState((prevState) => ({
            hearts: prevState.hearts.filter((heart) => heart.id !== id),
        }));
    };

    render() {
        const { hearts } = this.state;

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.heartContainer, { transform: [{ scale: this.scaleAnimation }] }]}>
                    {this.state.hearts.map((heart) => (
                        <HeartContainer key={heart.id} style={{ right: heart.right }} />
                    ))}
                </Animated.View>
                <TouchableOpacity onPress={this.addHeart} style={styles.addButton}>
                    <AntDesign name="plus" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    }
}

class HeartContainer extends Component {
    render() {
        return (
            <Animated.View
                style={[
                    styles.heartContainer,
                    { right: this.props.style.right } // Add this line to include the 'right' property
                ]}
            >
                <Heart color="purple" />
            </Animated.View>
        );
    }
}


const Heart = props => (
    <View {...props} style={[styles.heart, props.style]}>
        <AntDesign name="heart" size={48} color={props.color} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heartContainer: {
        position: "absolute",
        bottom: 30,
        backgroundColor: "transparent",
    },
    heart: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    addButton: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 50,
    },
});

export default Heartpop;
