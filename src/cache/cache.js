// cache.js

const NodeCache = require("node-cache");
const cache = new NodeCache();

// Hàm để lưu trữ dữ liệu vào cache
function setCache(key, data, ttl) {
  cache.set(key, data, ttl);
}

// Hàm để lấy dữ liệu từ cache
function getCache(key) {
  return cache.get(key);
}

module.exports = {
  setCache,
  getCache,
};
