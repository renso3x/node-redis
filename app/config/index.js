module.exports = {
  MARVEL_ENDPOINT: `${process.env.MARVEL_ENDPOINT}/v1/public`,
  ts: process.env.ts,
  MARVEL_API_KEY: process.env.MARVEL_API_KEY,
  MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
  REDIS_URL: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  CACHE_POLICY: 5*60
}