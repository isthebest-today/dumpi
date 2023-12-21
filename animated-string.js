class AnimatedLetter extends HTMLElement {
  constructor() {
    super();

    this.maxAnimationSteps = 30;
    this.letterAnimationDuration = 60;
    this.letter = null;
    this.tempLetter = "";
    this.alphabet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ _-1234567890";
  }

  static get observedAttributes() {
    return ["letter"];
  }

  connectedCallback() {
    this.animateLetter();
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  getRandomLetter() {
    return this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
  }

  updateToRandomLetter() {
    this.tempLetter = this.getRandomLetter();
    this.textContent = this.tempLetter;
  }

  animateLetter(
    step = this.maxAnimationSteps,
    duration = this.letterAnimationDuration
  ) {
    if (step === 0 || this.letter === " " || this.letter === this.textContent) {
      this.textContent = this.letter;
      return;
    }

    this.updateToRandomLetter();
    setTimeout(() => this.animateLetter(step - 1, duration), duration);
  }
}

customElements.define("animated-letter", AnimatedLetter);

class AnimatedString extends HTMLElement {
  constructor() {
    super();

    this.string = "";
  }

  static get observedAttributes() {
    return ["string"];
  }

  connectedCallback() {
    this.innerHTML = this.string
      .split("")
      .map((letter) => `<animated-letter letter="${letter}"></animated-letter>`)
      .join("");
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }
}

customElements.define("animated-string", AnimatedString);
