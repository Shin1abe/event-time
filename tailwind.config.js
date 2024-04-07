module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#050505",
        "selected-text": "#A3A3FF",
        theme: "#5c318c",
        secondary: "#9191A4",
        badge: "#3F3F51",
        inputBorder: "#565666",
        input: "#2A2A33",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
