const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", config.host),
      port: env.int("DATABASE_PORT", config.port),
      database: env("DATABASE_NAME", config.database),
      user: env("DATABASE_USERNAME", config.user),
      password: env("DATABASE_PASSWORD", config.password),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    debug: false,
  },
});
