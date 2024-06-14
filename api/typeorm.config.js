const typeorm = require('typeorm');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

let envVars = dotenv.config();
dotenvExpand.expand(envVars);

module.exports = {
  default: new typeorm.DataSource({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    entities: [
      'dist/libs/db/entities/*.js',
    ],
    migrations: [
      'dist/libs/db/migrations/*.js',
    ],
  }),
};
