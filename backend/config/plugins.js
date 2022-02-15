module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      breakpoints: {
        // match frontend breakpoints
        sm: 320,
        md: 768,
        lg: 960,
        xl: 1200,
        "2xl": 1536,
      },
      // use local provider by default in development
    },
  },
  // ...
});
