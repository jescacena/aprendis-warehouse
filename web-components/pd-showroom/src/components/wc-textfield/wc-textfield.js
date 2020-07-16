class WCTextField extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement("template");
        template.innerHTML = WCTextField.template();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.__initialized = null;
    }

    static get observedAttributes() {
        return ["id", "label", "error"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.__initialized) {
            return;
        }
        if (oldValue !== newValue) {
            this[name] = newValue;
        }
    }

    get id() {
        return this.getAttribute("id");
    }

    set id(value) {
        this.setAttribute("id", value);
    }

    get label() {
        return this.getAttribute("label");
    }
    set label(value) {
        this.setAttribute("label", value);
    }
    get error() {
        return this.getAttribute("error");
    }
    set error(value) {
        this.setAttribute("error", value);
        if (
            this.hasAttribute("error") &&
            this.getAttribute("error") &&
            this.getAttribute("error") !== "undefined"
        ) {
            this.setError();
        }
    }

    async connectedCallback() {
        if (this.hasAttribute("label")) {
            this.setLabel();
        }

        if (
            this.hasAttribute("error") &&
            this.getAttribute("error") &&
            this.getAttribute("error") !== "undefined"
        ) {
            this.setError();
        }

        this.__initialized = true;
    }

    setLabel() {
        // Remove previous label nodes
        let labelElement = this.shadowRoot.querySelector("label");
        if (labelElement) {
            this.shadowRoot.removeChild(labelElement);
        }

        // Create label element before the input
        const template = document.createElement("template");
        template.innerHTML = WCTextField.labelTemplate();
        this.shadowRoot.prepend(template.content.cloneNode(true));

        // Set label properties
        labelElement = this.shadowRoot.querySelector("label");
        labelElement.innerText = this.getAttribute("label");
        const id = this.getAttribute("id");
        labelElement.setAttribute("for", id);
        labelElement.setAttribute("id", id);
    }

    setError() {
        // Remove previous nodes
        let errorElement = this.shadowRoot.querySelector("div#error");
        if (errorElement) {
            this.shadowRoot.removeChild(errorElement);
        }

        // Create error element after the input
        const template = document.createElement("template");
        template.innerHTML = WCTextField.errorContainerTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Set values from properties
        errorElement = this.shadowRoot.querySelector("div#error");
        errorElement.innerText = this.getAttribute("error");
    }

    static labelTemplate() {
        return `
            <label for="fname" id="label"></label><br>
        `;
    }

    static errorContainerTemplate() {
        return `
            <div id="error"></div>
        `;
    }

    static template() {
        return `
            <style>
                label {color:darkblue; font-style:italic; margin-bottom:0.4rem;}
                #error {color:red; font-size: 0.8rem; margin:0; padding: 0;}
            </style>
            <slot name="input"></slot>
        `;
    }
}

customElements.define("wc-textfield", WCTextField);

export { WCTextField };
