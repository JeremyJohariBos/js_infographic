# Gym Benefits Interactive Infographic

This project is a self-contained interactive infographic designed to be embedded within any webpage.
and strictly created for the purpose of this assesment.

---

# Running the Project

# Local development
1. Clone or download the repository : https://github.com/JeremyJohariBos/js_infographic/
2. Serve the files using a local server / or just run the html file with a browser inside the folder

- Opening the file directly may cause asset loading issues.

-----

# Features Implemented

# 1. Embeddable Web Component
- built using native Web Components
- shadow DOM ensures style and behavior isolation
- most likely able to b e embedded into any HTML page or framework
- no importing of css, all inside js

# 2. Scroll-Driven Storytelling (Desktop)
- Callouts(icons) appear as the user scrolls through the main image
- instead of scroll listeners to keep animations, used intersectionObserver to keep cleaner interactions.

# 3. Interactive Callouts
- Each callout represents a body system (Brain, Heart, Muscles)
- Includes iconography, title, and descriptive text
- Micro-animations enhance visual engagement

# 4. Responsive & Mobile-Friendly
- Layout adapts for smaller screens
- On mobile devices, all callouts are shown immediately
- Touch-friendly interactions

# 5. Design direction
- Dark theme for modern, smooth and cool feel
- stock images selected were easy to see and understand
- Animated connector lines and hover effects for a niche feel
- Clean typography and spacing for minimalist design

-----

# Design & Technical Decisions

- HTML, CSS, and JavaScript were used intentionally to demonstrate strong platform fundamentals.
- Scroll-based interactions are disabled on mobile to improve UX and prevent missed triggers.
- All interactive content is configuration-driven for dynamic changes.

-----

# Assumptions & Limitations

- The component assumes it is embedded within a vertically scrollable page.
- Images are optimized for demonstration purposes; production usage may require further optimization.
- Three.js was explored but intentionally omitted to maintain clarity and focus on core storytelling.

---

# Assisted tools used
- chatgpt -> suggestions, placeholders and text content
- cursor - > cleanup, tab-completion, error checking

# Live Demo

A hosted demo is available at:

**[Netlify Demo Link Here]**
