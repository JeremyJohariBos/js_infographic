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
      ${callout.position == "mid-right" ? `<div class="callout-circle-right">` : `<div class="callout-circle-left">`}
      ${callout.img ? `<img class="callout-icon" src="${callout.img}">` : ""}
      </div>
        <div class="callout-content">
          <h4>${callout.title}</h4>
          <p>${callout.text}</p>
        </div>
      </div>
    `;
  }

  revealAllCallouts() {
  this.shadowRoot
    .querySelectorAll(".callout")
    .forEach(c => c.classList.add("visible"));
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

  isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  connectedCallback() {
    this.render();
    if (this.isMobile()) {
      console.log(true,'mobile')
      this.revealAllCallouts();
    } else {
      this.initScrollReveal();
      console.log("web")
    }
    this.initParallax();
  }

  // small movement for img
  initParallax() {
    const image = this.shadowRoot.querySelector(".silhouette-placeholder");

    if (!image) return;

    window.addEventListener("scroll", () => {
      const rect = image.getBoundingClientRect();
      const offset = rect.top * 0.15;
      image.style.transform = `translateY(${offset}px)`;
    });
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
  <p class="summary-sub">
    Sustainable habits outside the gym matter just as much as training itself.
  </p>

  <div class="lifestyle-strip">
    <div class="lifestyle-item protein">
      <div class="overlay">
        <h4>Protein</h4>
        <p>
          Protein supports muscle repair, preserves lean mass, and helps regulate appetite during fat loss.
        </p>
      </div>
    </div>

    <div class="lifestyle-item sleep">
      <div class="overlay">
        <h4>Sleep</h4>
        <p>
          Quality sleep optimizes recovery, hormone balance, and long-term performance.
        </p>
      </div>
    </div>

    <div class="lifestyle-item nutrition">
      <div class="overlay">
        <h4>Nutrition</h4>
        <p>
          Consistent, balanced nutrition fuels training, recovery, and overall health.
        </p>
      </div>
    </div>
  </div>
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
    background:radial-gradient(circle at top, #1a1a1a, #0f0f0f 60%), #0f0f0f;
    color: #fff;
    padding: 80px 24px;
    box-sizing: border-box;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* intro */
  .intro {
    text-align: center;
    margin-bottom: 80px;
  }

  .intro h2 {
    margin: 0 0 12px;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .intro p {
    opacity: 0.7;
  }

  /* body stage */
.body-stage {
  position: relative;
  max-width: 900px;
  min-height: 700px;
  margin: 0 auto 120px;
  margin-bottom: 160px;
}

  /* silhouette */

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

  /* callouts */

  .callout {
    display: flex;
    gap: 12px;
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
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: #f2f2f2;
  }

  .callout-content h4::after {
    content: "";
    display: block;
    width: 90%;
    height: 1px;
    background: rgba(255,255,255,0.3);
    margin: 8px auto 0;
}

  .callout-content p {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: rgba(255,255,255,0.7);
    opacity: 0.75;
  }

  /* positioning */
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

  .callout-circle-left,
  .callout-circle-right {
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }

  .callout-circle-left::after {
  content: "";
  position: absolute;
  width: 80px;
  height: 2px;
  background: rgba(255,255,255,0.25);
  top: 35%;
  left: 80%;
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.6s ease;
}

  .callout-circle-right::after {
  content: "";
  position: absolute;
  width: 80px;
  height: 2px;
  background: rgba(255,255,255,0.25);
  top: 35%;
  right: 80%;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.6s ease;
}

.callout.visible .callout-circle-left::after {
  transform: scaleX(1);
}
.callout.visible .callout-circle-right::after {
  transform: scaleX(1);
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

  // icon animation 

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

  /* summary */

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

  .lifestyle-strip {
  display: flex;
  height: 280px;
  margin-top: 48px;
  overflow: hidden;
  border-radius: 24px;
  background: radial-gradient(circle at top, #1a1a1a, #0f0f0f 60%), #0f0f0f;
}

.lifestyle-item {
  position: relative;
  flex: 1;
  background-size: cover;
  background-position: center;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0% 100%);
  transition: filter 0.4s ease, transform 0.4s ease;
}

/* lifestyle cutting */
.lifestyle-item:first-child {
  clip-path: polygon(0 0, 100% 0, 92% 100%, 0% 100%);
}

.lifestyle-item:last-child {
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0% 100%);
}

/* images */
.lifestyle-item.protein {
  background-image: url("./assets/protein-stock.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.lifestyle-item.sleep {
  background-image: url("./assets/sleep-stock.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.lifestyle-item.nutrition {
  background-image: url("./assets/food-stock.png");
  background-size: contain;
  background-repeat: no-repeat;
}


.lifestyle-item .overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 15, 15, 0.85);
  color: #fff;
  padding: 32px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: opacity 0.4s ease;
}

.lifestyle-item:hover {
  transform: scale(1.02);
}

.lifestyle-item:hover .overlay {
  opacity: 1;
}

.lifestyle-item h4 {
  margin: 0 0 8px;
  font-size: 18px;
}

.lifestyle-item p {
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.85;
}

  /* mobile */
@media (max-width: 768px) {
  .body-stage {
    min-height: auto;
    padding-bottom: 40px;
  }

    .silhouette {
      position: relative;
      margin-bottom: 40px;
    }

  .callout {
    position: relative;
    opacity: 1;
    transform: none;
    margin: 32px auto;
  }

  .reveal-marker {
    display: none;
  }

    .lifestyle-strip {
    flex-direction: column;
    height: auto;
  }

  .lifestyle-item {
    height: 200px;
    clip-path: none;
  }
  }
</style>
    `;
  }
}

customElements.define("gym-benefits-infographic", GymBenefitsInfographic);
