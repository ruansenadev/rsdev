module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      breakpoints: {
        // match frontend breakpoints
        sm: 480,
        md: 768,
        lg: 992,
        xl: 1280,
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
