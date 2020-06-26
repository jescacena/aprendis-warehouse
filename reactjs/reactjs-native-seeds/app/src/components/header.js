//Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

//Make a component
const Header = (props) => {
    const { textStyles, viewStyles } = styles;
    
    return (
        <View style={viewStyles}>
            <Text style={textStyles}>{ props.headerText }</Text>
        </View>
    );
};
const styles = {
    viewStyles: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
        position: 'relative'
    },
    textStyles: {
        fontSize: 20
    }
};

//Make the component available to other parts of the app
export default Header;
