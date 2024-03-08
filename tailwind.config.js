/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
    // Eğer başka dosya türleriniz varsa, buraya ekleyebilirsiniz.
  ],
  darkMode: false, // Ya da 'media' veya 'class' olarak değiştirebilirsiniz.
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

