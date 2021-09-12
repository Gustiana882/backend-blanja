const redis = require('redis');

class Redis {
  constructor() {
    this.redisDb = redis.createClient({
      host: '34.227.218.249',
      port: 6379,
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
