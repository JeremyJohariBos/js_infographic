class GymBenefitsInfographic extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.callouts = [
      {
        id: "brain",
        img: "./assets/brain-stock.png",
        title: "Cognitive Function",
        text: "Consistent training sharpens focus, strengthens memory, and regulates stress response.",
        position: "top-left",
      },
      {
        id: "heart",
        img: "./assets/heart-stock.png",
        title: "Cardiovascular Health",
        text: "Exercise strengthens the heart and improves blood circulation.",
        position: "mid-right",
      },
      {
        id: "muscle",
        img: "./assets/muscle-stock.png",
        title: "Strength & Metabolism",
        text: "Building muscle increases metabolism and overall physical strength.",
        position: "bottom-left",
      },
    ];
  }

  calloutTemplate(callout) {
    return `
      <div class="callout ${callout.position}" data-id="${callout.id}">
      <div class="callout-circle">
      ${callout.img ? `<img class="callout-icon" src="${callout.img}">` : ""}
      </div>
        <div class="callout-content">
          <h4>${callout.title}</h4>
          <p>${callout.text}</p>
        </div>
      </div>
    `;
  }

  initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.target;

          if (entry.isIntersecting) {
            this.revealCallout(id);
          } else {
            this.hideCallout(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    this.shadowRoot
      .querySelectorAll(".reveal-marker")
      .forEach((marker) => observer.observe(marker));
  }

  revealCallout(id) {
    const callout = this.shadowRoot.querySelector(`.callout[data-id="${id}"]`);

    if (callout) {
      callout.classList.add("visible");
    }
  }

  hideCallout(id) {
    const callout = this.shadowRoot.querySelector(`.callout[data-id="${id}"]`);

    if (callout) {
      callout.classList.remove("visible", "expanded");
    }
  }

  connectedCallback() {
    this.render();
    this.initScrollReveal();
  }
  

  render() {
    this.shadowRoot.innerHTML = `
      ${this.styles()}
      <section class="infographic">
        
        <!-- Intro -->
        <div class="intro">
          <h2>How Exercise Transforms Your Body & Mind</h2>
          <p>Scroll to explore the benefits</p>
        </div>

        <!-- Main body stage -->
<div class="body-stage">

  <!-- Scroll markers -->
<div class="reveal-marker brain-marker" data-target="brain"></div>
<div class="reveal-marker heart-marker" data-target="heart"></div>
<div class="reveal-marker muscle-marker" data-target="muscle"></div>

  <div class="silhouette">
    <div class="silhouette-placeholder"></div>
  </div>

  ${this.callouts.map((c) => this.calloutTemplate(c)).join("")}

</div>

        <!-- Summary -->
        <div class="summary">
          <h3>Consistency Beats Intensity</h3>
          <p>Exercise improves both physical and mental health when practiced regularly.</p>
        </div>

      </section>
    `;
  }

  styles() {
    return `
<style>
  :host {
    display: block;
    width: 100%;
  }

  .infographic {
    background: #0f0f0f;
    color: #fff;
    padding: 80px 24px;
    box-sizing: border-box;
  }

  /* Intro */
  .intro {
    text-align: center;
    margin-bottom: 80px;
  }

  .intro h2 {
    margin: 0 0 12px;
    font-size: 32px;
  }

  .intro p {
    opacity: 0.7;
  }

  /* Body stage */
  .body-stage {
    position: relative;
    max-width: 900px;
    height: 700px;
    margin: 0 auto 120px;
  }

  /* Silhouette */
  .silhouette {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .silhouette-placeholder {
    width: 375px;
    height: 600px;
    border-radius: 130px;
    background-image: url(./assets/gym-stock.jpg);
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.35;
    font-size: 12px;
    letter-spacing: 2px;
  }

  .reveal-marker {
    position: absolute;
    width: 100%;
    height: 40px;
    pointer-events: none;
  }

  .brain-marker {
    top: 120px;
  }

  .heart-marker {
    top: 300px;
  }

  .muscle-marker {
    top: 500px;
  }

  /* Callouts */

  .callout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    border-radius: 14px;
    padding: 14px 18px;
    font-size: 14px;
    max-width: 220px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .callout.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .callout strong {
    display: block;
    margin-bottom: 6px;
  }

  .callout-content h4 {
    margin: 10px 0 0 4px;
    font-size: 14px;
  }

  .callout-content p {
    margin: 0;
    font-size: 12px;
    opacity: 0.75;
  }

  /* Positioning callouts */
  .callout.top-left {
    top: 60px;
    left: 0;
  }

  .callout.mid-right {
    top: 260px;
    right: 0;
  }

  .callout.bottom-left {
    bottom: 120px;
    left: 0;
  }

  .callout-circle {
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .callout-icon {
    font-size: 20px;
    margin-bottom: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
  }

  @keyframes brainPulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.08);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.8;
    }
  }

  @keyframes heartBeat {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1.15);
    }
    40% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes muscleFlex {
    0% {
      transform: rotate(0deg) scale(1);
    }
    30% {
      transform: rotate(-5deg) scale(1.1);
    }
    60% {
      transform: rotate(5deg) scale(1.05);
    }
    100% {
      transform: rotate(0deg) scale(1);
    }
  }

  .callout.visible[data-id="brain"] .callout-icon {
    animation: brainPulse 2.2s ease-in-out infinite;
  }

  .callout.visible[data-id="heart"] .callout-icon {
    animation: heartBeat 2.5s ease-in-out infinite;
  }

  .callout.visible[data-id="muscle"] .callout-icon {
    animation: muscleFlex 2.8s ease-in-out infinite;
  }

  /* Summary */
  .summary {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .summary h3 {
    margin-bottom: 8px;
  }

  .summary p {
    opacity: 0.7;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .body-stage {
      height: auto;
    }

    .silhouette {
      position: relative;
      margin-bottom: 40px;
    }

    .callout {
      position: relative;
      margin: 16px auto;
      display: block;
      text-align: center;
    }
  }
</style>
    `;
  }
}

customElements.define("gym-benefits-infographic", GymBenefitsInfographic);
