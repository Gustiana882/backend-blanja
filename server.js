const server = require('./app');
const { sequelize } = require('./src/configs/db');
const redis = require('./src/configs/redis');

const PORT = 3000;

const run = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const msg = await redis.check();
    server.listen(PORT, () => {
      console.log('Connection to db');
      console.log(msg);
      console.log(`Service running on port ${PORT}`);
      console.log(process.env.APP_STATUS);
    });
  } catch (error) {
    console.log(error);
  }
};

run();
