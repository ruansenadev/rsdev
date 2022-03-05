module.exports = ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "c7c9d6fe56cfeca47f0b3565772cbb4c"),
  },
});
