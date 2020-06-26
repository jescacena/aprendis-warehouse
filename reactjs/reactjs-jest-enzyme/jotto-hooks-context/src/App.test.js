import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import App from "./App";
import languageContext from "./contexts/languageContext";

import hookActions from "./actions/hookActions";

const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party", language = "en") => {
    mockGetSecretWord.mockClear();
    hookActions.getSecretWord = mockGetSecretWord;

    const mockUseReducer = jest
        .fn()
        .mockReturnValue([{ secretWord, language }, jest.fn()]);

    React.useReducer = mockUseReducer;

    //  use mount because useEffect not called on 'shadow' --> Check enzyme opened issue
    return mount(<App />);
};

test("App renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-app");
    expect(component.length).toBe(1);
});

describe("getSecretWord calls", () => {
    test("getSecretWord gets called on App mount", () => {
        setup();

        // Check to see if secret word is updated

        expect(mockGetSecretWord).toHaveBeenCalled();
    });

    test("secret word does not update on App update", () => {
        const wrapper = setup();

        mockGetSecretWord.mockClear();

        // wrapper.update() doesnt trigger update (check enzyme issue)
        wrapper.setProps();

        expect(mockGetSecretWord).not.toHaveBeenCalled();
    });
});

describe("secretWord is not null", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup("party");
    });
    test("renders app when secretWord is not null", () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(true);
    });
    test("does not render spinner when secretWord is not null", () => {
        const spinnerComponent = findByTestAttr(wrapper, "spinner");
        expect(spinnerComponent.exists()).toBe(false);
    });
});

describe("secretWord is null", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = setup(null);
    });
    test("does not render app when secretWord is null", () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(false);
    });
    test("renders spinner when secretWord is null", () => {
        const spinnerComponent = findByTestAttr(wrapper, "spinner");
        expect(spinnerComponent.exists()).toBe(true);
    });
});
