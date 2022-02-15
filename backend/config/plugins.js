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
      // uncomment below or use local provider by default in development
      // provider: "cloudinary",
      // providerOptions: {
      //   cloud_name: env("CLOUDINARY_NAME"),
      //   api_key: env("CLOUDINARY_KEY"),
      //   api_secret: env("CLOUDINARY_SECRET"),
      // },
      // actionOptions: {
      //   upload: {},
      //   delete: {},
      // },
    },
  },
  // ...
});
