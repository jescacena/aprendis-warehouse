import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";

import FailureMessage from "./FailureMessage";

const setup = props => {
    return shallow(<FailureMessage {...props} />);
};

describe("renders assertions", () => {
    test("show message on show prop is true", () => {
        const wrapper = setup({ show: true, secretWord: "triana" });
        const messageNode = findByTestAttr(wrapper, "message");
        expect(messageNode.length).toBe(1);
    });
    test("does not show message on show prop is false", () => {
        const wrapper = setup({ show: false, secretWord: "triana" });
        const messageNode = findByTestAttr(wrapper, "message");
        expect(messageNode.length).toBe(0);
    });
    test("show message correctly (contains secret word)", () => {
        const secretWord = "triana";
        const wrapper = setup({ show: true, secretWord });
        const messageNode = findByTestAttr(wrapper, "message");
        expect(messageNode.text().indexOf("triana")).not.toBe(-1);
    });
});

// describe("check props", () => {
//     test("does not throw warning with expected props", () => {
//         const expectedProps = { show: false, secretWord: "test" };
//         checkProps(FailureMessage, expectedProps);
//     });
// });
