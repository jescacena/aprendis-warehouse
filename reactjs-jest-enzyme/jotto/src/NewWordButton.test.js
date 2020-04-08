import React from "react";
import { shallow } from "enzyme";
import NewWordButton from "./NewWordButton";
import { checkProps, findByTestAttr } from "../test/testUtils";

const setup = props => {
    const wrapper = shallow(<NewWordButton {...props} />);
    return wrapper;
};
describe("renders properly", () => {
    test("renders button on success true", () => {
        const wrapper = setup({ success: true, onClickCallback: () => {} });

        const buttonNode = findByTestAttr(wrapper, "new-word-button");
        expect(buttonNode.length).toBe(1);
    });
    test("does not render button on success false", () => {
        const wrapper = setup({ success: false, onClickCallback: () => {} });

        const buttonNode = findByTestAttr(wrapper, "new-word-button");
        expect(buttonNode.length).toBe(0);
    });
});

describe("check props", () => {
    test("does not throw warning with expected props", () => {
        const expectedProps = { success: false, onClickCallback: () => {} };
        checkProps(NewWordButton, expectedProps);
    });
});

describe("click button", () => {
    test("on click button calls onclick callback prop", () => {
        const onClickMockFn = jest.fn();
        const wrapper = setup({
            success: true,
            onClickCallback: onClickMockFn
        });

        const buttonNode = findByTestAttr(wrapper, "new-word-button");

        buttonNode.simulate("click");

        expect(onClickMockFn.mock.calls.length).toBe(1);
    });
});
