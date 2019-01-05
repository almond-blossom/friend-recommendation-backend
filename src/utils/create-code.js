// const CODES = ['A', 'B', 'C', '1', '2', '3'];
const CODES = ['A', 'B'];

module.exports = (length = 2) => {
  let coded = '';
  for (let i = 0; i < length; i += 1) {
    coded += CODES[
      Math.floor(
        Math.random() * (CODES.length),
      )
    ];
  }
  return coded;
};
