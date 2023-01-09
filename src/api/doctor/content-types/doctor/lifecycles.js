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

  async afterUpdate(event) {
    const { result, params } = event;

    const doctor = await strapi.entityService.findOne(
      "api::doctor.doctor",
      result.id,
      {
        populate: ["appointment"],
      }
    );

    const appointmentsTime = doctor.appointment.map((v) => v.time);

    const receptionDay = result.receptionDay;
    if (receptionDay) {
      await strapi.db.query("api::doctor.doctor").update({
        where: { id: result.id },
        data: {
          reception: generateReception(receptionDay, appointmentsTime),
        },
      });
    }
  },
};

function getDateTime(date) {
  return [date.getHours(), date.getMinutes()]
    .map((v) => (v < 10 ? "0" + v : v))
    .join(":");
}

function generateTimeRange(day, timeStart, timeEnd, appointmentsTime) {
  const start = new Date(`${day} ${timeStart}`);
  const end = new Date(`${day} ${timeEnd}`);
  const res = {
    [getDateTime(start)]: !appointmentsTime.includes(start.toISOString()),
  };

  while (start < end) {
    start.setMinutes(start.getMinutes() + 30);
    res[getDateTime(start)] = !appointmentsTime.includes(start.toISOString());
  }

  return res;
}

function generateReception(receptionDays, appointmentsTime) {
  const res = {};
  receptionDays.forEach((v) => {
    res[v.date] = generateTimeRange(
      v.date,
      v.timeStart,
      v.timeEnd,
      appointmentsTime
    );
  });
  return res;
}
