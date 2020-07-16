import {
    html,
    LitElement,
    property,
} from "https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module";

// Extend the LitElement base class
class WcLitElementTextField extends LitElement {

    static get properties() {
        return {
            label: { type: String },
            error: { type: String },
            id: { type: String }
        };
    }

    render() {
        const labelChunk = this.label ? html`<label for="${this.id}" id="${this.id}">${this.label}</label><br>`: '';
        const errorChunk = this.error ? html`<div id="error">${this.error}</div>` : '';
        return html`
            <style>
                label {
                    color: darkblue;
                    font-style: italic;
                    margin-bottom: 0.4rem;
                }
                #error {
                    color: red;
                    font-size: 0.8rem;
                    margin: 0;
                    padding: 0;
                }
            </style>
            ${labelChunk}
            <slot name="input">no input</slot>
            ${errorChunk}
        `;
    }
}

// Register the new element with the browser.
customElements.define("wc-litelement-textfield", WcLitElementTextField);

export { WcLitElementTextField };
