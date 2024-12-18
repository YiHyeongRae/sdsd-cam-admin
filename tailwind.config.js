/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "8fr": "repeat(8, 1fr)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#020202",
          "primary-content": "#fff",
          secondary: "#725DF2",
          "secondary-content": "#fff",
          accent: "#ddd6fe",
          "accent-content": "#333",
          neutral: "#030303",
          "neutral-content": "#efefef",
          "base-100": "#eee",
          "base-200": "#ccc",
          "base-300": "#aaa",
          "base-content": "#333",
          info: "#00c4ed",
          "info-content": "#fff",
          success: "#00ff7d",
          "success-content": "#fff",
          warning: "#ff9200",
          "warning-content": "#fff",
          error: "#ff2445",
          "error-content": "#fff",
          "--btn": {
            "border-radius": "0px", // 기본 버튼에 rounded-none 적용
          },
        },
      },
    ],
  },
};
