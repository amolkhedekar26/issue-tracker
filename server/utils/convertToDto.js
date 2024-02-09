module.exports = {
  toList: (arr, Type) => {
    const res = [];
    arr.forEach((item) => {
      res.push(new Type(item));
    });
    return res;
  },
  to: (item, Type) => {
    const res = new Type(item);
    return res;
  },
};
