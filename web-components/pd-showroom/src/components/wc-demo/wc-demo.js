import {SourceElement} from './wc-source-element.js';


class WCDemo extends HTMLElement {
  static get observedAttributes () {
    return ['title', 'desc', 'src'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return; }
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  get title () { return this.getAttribute('title'); }
  set title (value) {
    this.setAttribute('title', value);
    this.setTitle();
  }

  get desc () { return this.getAttribute('desc'); }
  set desc (value) {
    this.setAttribute('desc', value);
    this.setDescription();
  }

  get src () { return this.getAttribute('src'); }
  set src (value) {
    this.setAttribute('src', value);
    this.setSrc();
  }

  constructor () {
    super();
    const template = document.createElement('template');
    template.innerHTML = WCDemo.template();
    // this.appendChild(template.content.cloneNode(true));
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(document.importNode(template.content, true));

    this.__initialized = null;
    this.titleElement = this.shadowRoot.querySelector('#title');
    this.descElement = this.shadowRoot.querySelector('#description');
    this.sourceElement = this.shadowRoot.querySelector('#source');
    this.outputElement = this.shadowRoot.querySelector('#output');
  }

  async connectedCallback () {

    if (this.hasAttribute('desc')) {
      this.setDescription();
    }

    if (this.hasAttribute('title')) {
      this.setTitle();
    }

    if (this.hasAttribute('src')) {
      this.setSrc();
    } else {
      this.setSrcSlot();
    }

    this.__initialized = true;
  }

  setTitle () {
    this.titleElement.innerText = this.getAttribute('title');
  }

  setDescription () {
    this.descElement.innerText = this.getAttribute('desc');
  }

  async setSrc () {
    const src = this.getAttribute('src');
    this.source = await this.fetchSrc(src);
    this.sourceElement.source = this.source;
    this.outputElement.innerHTML = this.source;
  }

  async setSrcSlot() {
    this.source = this.shadowRoot.querySelector('slot').assignedNodes()[1].outerHTML;
    this.sourceElement.source = this.source;
    this.outputElement.innerHTML = this.source;
  }

  async fetchSrc (src) {
    const response = await fetch(src);
    return response.text();
  }

  static template () {
    return `
      <style>
      @import url('https://fonts.googleapis.com/css?family=Lato|Roboto|Source+Code+Pro');

      body {
        font-family: 'Lato', san-serif;
      }

      h1, h2, h3, h4, h5 {
        font-family: 'Roboto', sans-serif;
        font-weight: 900;
        margin: 0;
      }

      h2 {
        margin-bottom: 10px;
      }

      hr {
        margin: 20px;
      }

      textarea {
        width:100%;
        white-space: nowrap;
      }

      code {
        font-family: 'Source Code Pro', monospace;
      }

      #header {
        width: 100%;
        height: 50px;
        background: #333333;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        z-index: 999;
      }

      #title {
        float: left;
        padding-top: 10px;
        padding-left: 10%;
        color: white;
        font-size: 1.25rem;
      }

      #container {
        width: 80%;
        max-width: 960px;
        padding: 0 50px 0 50px;
        margin: 0 auto;
        display: block;
        overflow-x: hidden;
        background: #F0F0F0;
      }

      #content {
        background: #F0F0F0;
        margin: 16px auto 0 auto;
        padding: 20px 0 20px 0;
      }

      #run {
        margin-top: 10px;
        border-radius: 15%;
      }

      #output {
        display: block;
        overflow: auto;
        background-color: lightblue;
        padding: .5em;
      }
      </style>

      <div id="header">
        <h1 id="title"></h1>
      </div>
      <div id="container">
        <section id="content">
          <h2>Description</h2>
          <p id="description"></p>
          <hr>
          <h2>Usage</h2>
          <source-element id="source"></source-element>
          <hr />
          <h2>Output</h2>
          <div id="output"><slot></slot></div>
        </section>
      </div>
      `;
  }
}

customElements.define('wc-demo', WCDemo);

export { WCDemo };
