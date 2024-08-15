function generateRandomString(length) {
  if (!length) {
    length = 8;
  }
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const MakeNormalDate = (utcTimestamp) => {
  const date = new Date(utcTimestamp);
  const localDateString = date.toLocaleString();
  return localDateString;
};

module.exports = {
  generateRandomString,
  MakeNormalDate,
};
