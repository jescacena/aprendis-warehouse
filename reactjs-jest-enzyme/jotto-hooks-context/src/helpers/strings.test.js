import stringsModule from "./strings";

const { getStringByLanguage } = stringsModule;

const strings = {
    en: {
        submit: "submit"
    },
    emoji: {
        submit: "🚀"
    },
    mermiish: {}
};

describe("language string testing", () => {
    const mockWarn = jest.fn();
    let originalWarn;

    beforeEach(() => {
        originalWarn = console.warn;
        console.warn = mockWarn;
    });
    afterEach(() => {
        console.warn = originalWarn;
    });
    test("returns correct submit string for english", () => {
        const value = getStringByLanguage("en", "submit", strings);
        expect(value).toBe(strings.en.submit);
        expect(mockWarn).not.toHaveBeenCalled();
    });

    test("returns correct submit string for emoji", () => {
        const value = getStringByLanguage("emoji", "submit", strings);
        expect(value).toBe(strings.emoji.submit);
        expect(mockWarn).not.toHaveBeenCalled();
    });

    test("returns english submit string when language does not exist", () => {
        const value = getStringByLanguage("kaka", "submit", strings);
        expect(value).toBe(strings.en.submit);
        expect(mockWarn).toHaveBeenCalledWith(
            `Could not get string for [submit] for language [kaka]`
        );
    });

    test("returns english submit string when submit key does not exist for language", () => {
        const value = getStringByLanguage("mermiish", "submit", strings);
        expect(value).toBe(strings.en.submit);
        expect(mockWarn).toHaveBeenCalledWith(
            `Could not get string for [submit] for language [mermiish]`
        );
    });
});
