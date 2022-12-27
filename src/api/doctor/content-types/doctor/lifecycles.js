module.exports = {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
  },

  async afterCreate(event) {
    const { result, params } = event;

    await strapi.db.query("api::doctor.doctor").update({
      where: { id: result.id },
      data: {
        reception: generateReception(result.receptionDay),
      },
    });

    // do something to the result;
  },
};

function getDateTime(date) {
  return [date.getHours(), date.getMinutes()]
    .map((v) => (v < 10 ? "0" + v : v))
    .join(":");
}

function generateTimeRange(day, timeStart, timeEnd) {
  const start = new Date(`${day} ${timeStart}`);
  const end = new Date(`${day} ${timeEnd}`);
  const res = [{ [getDateTime(start)]: true }];

  while (start < end) {
    start.setMinutes(start.getMinutes() + 30);
    res.push({ [getDateTime(start)]: true });
  }

  return res;
}

function generateReception(receptionDays) {
  return receptionDays.map((v) => {
    return {
      [v.date]: generateTimeRange(v.date, v.timeStart, v.timeEnd),
    };
  });
}
