const moment = require("moment");
// format time and date with moment
module.exports = {
  dateTime: (time) => {
    return moment(time).format("MMMM Do YY");
  },
  compareId: (id1, req, res) => {
    if (id1 === req.session.user_id) {
      return `${id1}`;
    } else {
      return false;
    }
  },
};
