import React, { Component } from "react";
import styles from './MainContainer.module';
import NavMenu from "./NavMenu";
import ContentContainer from "./ContentContainer";
import Footer from "./Footer";

class MainContainer extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.up}>
                    <NavMenu />
                    <ContentContainer />
                </div>
                <div className={styles.bottom}>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default MainContainer;