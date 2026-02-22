/**
 * Copyright 2026 mjr7121-sketch
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `count-app`
 * 
 * @demo index.html
 * @element count-app
 */
export class CountApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "count-app";
  }

  updated(changedProperties){
    if(super.updated){
      super.updated(changedProperties)
    }
    if (changedProperties.has('count')) {
    // do your testing of the value and make it rain by calling makeItRain
    if(this.count == 21){
      //when count reaches 21 confetti appears by calling the make it rain method 
      this.makeItRain();
    }
    }

  }

  makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the poppped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/count-app.ar.json", import.meta.url).href +
        "/../",
    });
    //declare the starting values for count, min, and max
    this.count = 0;
    this.min = 5;
    this.max =25;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      //declares the properties 
      title: { type: String },
      count: {type: Number, reflect: true},
      min: {final: true, type: Number, reflect: true},
      max: {final: true, type: Number, reflect: true},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      /*make the plus and minus button purple when the mouse is over it*/
      button:hover{
        background-color: var(--ddd-theme-default-wonderPurple);
      }
      /*make the plus and minus button purple when clicked*/
       button:focus{
        background-color: var(--ddd-theme-default-wonderPurple);
      }
      /*when count reach 18, the number changes color*/
      :host([count = "18"]) h3{
        color: var(--ddd-theme-default-keystoneYellow);
      }
      /*when count reach 21, the number changes color*/
       :host([count = "21"]) h3{
        color: var(--ddd-theme-default-keystoneYellow);
      }
      /*when count reaches the min, the number changes color*/
       :host([count = "5"]) h3{
        color: var(--ddd-theme-default-keystoneYellow);
      }
      /*when count reach the max, the number changes color*/
         :host([count = "25"]) h3{
        color: var(--ddd-theme-default-keystoneYellow);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--count-app-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
  <!--The confetti wrapper-->
<confetti-container id="confetti">
<div class="wrapper">
  <h3>${this.count}</h3>
  <button @click="${this.decrement}" ?disabled="${this.min === this.count}">-</button>
  <button @click="${this.increment}" ?disabled="${this.max === this.count}">+</button>
  <slot></slot>
</div>
</confetti-container>`;
  }
  decrement(){
    if(this.count == this.min){
      return;
    }
    this.count--;
  }
  increment(){
    if(this.count == this.max){
      return;
    }
    this.count++;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CountApp.tag, CountApp);