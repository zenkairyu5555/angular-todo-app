function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

function generateRandomDate() {
  const date = new Date();
  const ran = Math.floor(Math.random() * 100);
  const newDate = addDays(date, ran);
  return newDate;
}

module.exports = {
  addDays,
  generateRandomDate,
};
