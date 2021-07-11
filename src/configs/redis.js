const redis = require('redis');

class Redis {
  constructor() {
    this.redisDb = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS,
    });
  }

  check() {
    return new Promise((resolve, reject) => {
      this.redisDb.get('test key', (err, res) => {
        if (err) {
          reject(err);
        } else if (res === 'OK' || res === null) {
          resolve('Connection to redis successfully');
        }
      });
    });
  }
}

module.exports = new Redis();
