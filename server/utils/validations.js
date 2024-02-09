function isInteger(value) {
  return /^\d+$/.test(value);
}

module.exports = {
  isInteger,
};
