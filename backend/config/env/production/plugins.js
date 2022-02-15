const { api_key, api_secret, cloud_name } = parse(process.env.CLOUDINARY_URL);

module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      // breakpoints are inherited
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME", cloud_name),
        api_key: env("CLOUDINARY_KEY", api_key),
        api_secret: env("CLOUDINARY_SECRET", api_secret),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // ...
});

function parse(url) {
  // connection url > cloudinary://[**************-username]:[**************-password]@[foobar-hostname]
  try {
    const {
      username: api_key,
      password: api_secret,
      hostname: cloud_name,
    } = new URL(url);

    return { api_key, api_secret, cloud_name };
  } catch {
    return { api_key: "", api_secret: "", cloud_name: "" };
  }
}
