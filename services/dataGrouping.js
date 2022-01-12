const moment = require('moment')
const dataGrouping = (notifications) => {

  const entries = {};
  const keys = [];
  const results = [];

  // loop through the notification to filter it by dates
  notifications.forEach((notification) => {
    const date = moment(notification["created_at"]).format("YYYY-MM-DD");
    if (entries[date]) {
      entries[date].push(notification);
    } else {
      // create new key
      keys.push(date);
      // add entry
      entries[date] = [notification];
    }
  });

  // group by date pair => entry
  keys.forEach((key) => {
    results.push({
      date: key,
      records: entries[key],
    });
  });

//   results.map(i =>   console.log(i.records) )
//   console.log(results)

  return results;
}


module.exports = dataGrouping