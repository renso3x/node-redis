const redis = require('redis');
const config = require('../config');
const client = redis.createClient(config.REDIS_URL);

module.exports = client