//@ts-check
import { LitElement, html, css } from "./lib/lit.js";

/**
 * @typedef {Object} States
 * @property {string} IDLE
 * @property {string} MAX
 * @property {string} MIN
 */
const States = {
  IDLE: "Idle",
  MAX: "Max reached",
  MIN: "Min reached",
};

Object.freeze(States);

class Hello extends LitElement {
  static styles = css`
    :root {
      --color-green: #31c48d;
      --color-white: #ffff;
      --color-dark-grey: #33333d;
      --color-medium-grey: #424250;
      --color-light-grey: #9ca3ae;
    }

    section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
    }

    @keyframes enter {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /*header*/

    .header {
      text-align: center;
    }

    .header__title {
      font-size: 3rem;
      font-weight: 900;
      color: var(--color-light-grey);
    }
    /*controls*/

    .controls {
      background: yellow;
    }

    /*counter*/

    .message {
      border-radius: 10px;
      margin: 0 auto;
      animation: enter 0.5s ease-in-out;
      outline: 0;
      padding: 10px;
      border: 0;
    }

    .counter {
      background: var(--color-dark-grey);
    }

    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
      font-weight: 900;
      color: var(--color-white);
      background: none;
      border-width: 0;
      border-bottom: 1px solid var(--color-light-grey);
    }

    .counter__actions {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    /*footer*/

    .footer {
      background: var(--color-dark-grey);
      color: var(--color-light-grey);
      padding: 2rem;
      font-size: 0.8rem;
      text-align: center;
    }

    .footer__link {
      color: var(--color-white);
    }

    sl-button.reset::part(prefix) {
      padding: 5px;
    }
    sl-button.reset::part(suffix) {
      padding: 5px;
    }
    sl-button.button::part(prefix) {
      padding: 75px;
    }
    sl-button.button::part(suffix) {
      padding: 75px;
    }

    sl-button.reset::part(base) {
      /* Set design tokens for height and border width */
      --sl-input-height-medium: 30px;
      --sl-input-border-width: 1px;
      background-color: transparent;
      border-top-color: #cacaca;
      border-left-color: #cacaca;
      border-bottom-color: #767474;
      border-right-color: #767474;
      color: rgb(255, 255, 255);
      font-size: 1rem;
      font-weight: 300;
    }

    sl-button.reset::part(base):hover {
      transform: scale(1.05);
    }

    sl-button.reset::part(base):active {
      transform: scale(1.075) translateY(2px);
      transition: 0.3ms;
    }

    sl-button.button::part(base) {
      /* Set design tokens for height and border width */
      --sl-input-height-medium: 48px;
      --sl-input-border-width: 2px;
      background-color: transparent;
      color: white;
      font-size: 1.125rem;
    }

    sl-button.add::part(base) {
      border-top-color: #05da09;
      border-left-color: #05da09;
      border-bottom-color: #117513;
      border-right-color: #117513;
    }

    sl-button.subtract::part(base) {
      border-top-color: #fb2c2c;
      border-left-color: #fb2c2c;
      border-bottom-color: #b70000;
      border-right-color: #b70000;
    }

    sl-button.button::part(base):hover {
      transform: scale(1.05);
    }

    sl-button.button::part(base):active {
      transform: scale(1.075) translateY(2px) rotate(180deg);
      transition: 0.3ms;
    }
  `;

  static properties = {
    value: { type: String },
    open: { type: "boolean", state: true },
    depleted: { type: Number },
    exceeded: { type: Number },
    state: { type: String },
  };

  constructor() {
    super();
    this.value = "0";
    this.open = false;
    this.depleted = -30;
    this.exceeded = 30;
    this.state = States.IDLE;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  subHandler = () => {
    let num = parseInt(this.value);
    num--;
    num === this.depleted
      ? (this.state = States.MIN)
      : (this.state = States.IDLE);
    this.value = num.toString();
  };

  addHandler = () => {
    let num = parseInt(this.value);
    num++;
    num === this.exceeded
      ? (this.state = States.MAX)
      : (this.state = States.IDLE);
    this.value = num.toString();
  };

  resetHandler = () => {
    this.state = States.IDLE;
    this.value = "0";
    this.toggleOpen();
    setTimeout(() => {
      this.toggleOpen();
    }, 1500);
  };
  /**
   *
   * @returns {any}
   */
  render() {
    return html` <section>
      <header class="header">
        <h1 class="header__title">Tally Count</h1>
        <p>State:${this.state}</p>
      </header>

      <main class="counter">
        <dialog .open=${this.open} class="message" data-overlay>
          <p align="center">The counter has been set to zero</p>
        </dialog>
        <input
          class="counter__value"
          readonly
          value="${this.value}"
          data-number
        />
        <div class="counter__actions">
          <sl-button
            ?disabled=${this.state === States.MIN}
            @click=${this.subHandler}
            class="button subtract"
            pill
            data-subtract
            >-</sl-button
          >
          <sl-button ?disabled=${this.value === '0'} @click=${this.resetHandler} class="reset" pill data-reset
            >Reset</sl-button
          >
          <sl-button
            ?disabled=${this.state === States.MAX}
            @click=${this.addHandler}
            class="button add"
            pill
            data-add
            >+</sl-button
          >
        </div>
      </main>
      <footer class="footer">
        Inspired by
        <a class="footer__link" href="https://tallycount.app/">Tally Count</a>,
        Note that this is merely a student practice project for learning
        JavaScript.
      </footer>
    </section>`;
  }
}

customElements.define("tally-app", Hello);
