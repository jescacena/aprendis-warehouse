import {LitElement, html, customElement, property} from 'lit-element';


@customElement('my-element')
export class MyElement extends LitElement {

    @property() message:string = 'foo';
    @property() myArray:string[] = ['foo1', 'foo2', 'foo3'];

    constructor() {
        super();
        this.message = 'Jander clander';

        setTimeout(() => {
            this.message = 'Cande morrrr';
        }, 5000);
    }

    amossClick() {
        console.log('JES amosssss');
        this.myArray.push(new Date().getTime().toString());
    }

    render() {
        // return html`<p>${this.message}</p>`;
        return html`<ul>
        ${this.myArray.map(i => html`<li>${i}</li>`)}
        </ul>

        <div>
            property binding
            <input type="text" value="${this.message}"/>
        </div>

        <button @click="${this.amossClick}">Test</button>
        
        `;
    }

}