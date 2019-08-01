import React, { Component } from "react";
import componentStyles from '../scss/components.module';

class Jander extends React.Component {

    render() {
        console.log('JES render', componentStyles);
        
        return (
            <h1 className={componentStyles.jander}>JANDERRRRR</h1>
        );
    }
}

export default Jander;