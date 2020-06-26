import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { counter: 0, showErrorMessage: false };
    }
    render() {
        return (
            <div data-test="component-app">
                <h1 data-test="component-counter">
                    The counter is {this.state.counter}
                </h1>
                <button
                    data-test="component-button"
                    onClick={() => {
                        this.setState({ counter: this.state.counter + 1 });
                        this.setState({ showErrorMessage: false });
                    }}
                >
                    Increment
                </button>
                <button
                    data-test="decrement-button"
                    onClick={() => {
                        if (this.state.counter > 0) {
                            this.setState({ counter: this.state.counter - 1 });
                        } else {
                            this.setState({ showErrorMessage: true });
                        }
                    }}
                >
                    Decrement
                </button>

                {this.state.showErrorMessage && (
                    <p data-test="error-message" style={{ color: "red" }}>
                        <h3>The counter cannot go below zero</h3>
                    </p>
                )}
            </div>
        );
    }
}

export default App;
