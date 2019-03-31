import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    renderLastSlideButton(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title="Adelante!"
                    
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View
                    style={[styles.slide, { backgroundColor: slide.color }]}
                    key={slide.text}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlideButton(index)}
                </View>
            );
        });
    }
    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30,
        color: 'white',
        padding: 20

    },
    buttonStyle: {
        backgroundColor: '#288DD1',
        marginTop: 15
    }
};

export default Slides;
