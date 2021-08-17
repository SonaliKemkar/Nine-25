const LogHelper = require("../helpers/logHelper");
const { days, holidays } = require('../config/days')

exports.getNextDay = async (req, res) => {

    console.log("request date===========>", req.body.date);

    var date = new Date(req.body.date);

    date.setUTCDate(date.getUTCDate() + 1);
    var day = days[date.getDay()]

    var holiday = holidays[date.toISOString().slice(0, 10)]


    if (day !== "saturday" && day !== "sunday" && holiday == undefined) {
        var date = new Date(date)

        date = date.toISOString();

        var data = { correlation_id: date, inputdate: req.body.date, outputdate: date };

        await LogHelper.getNextDay(data)
            .then((response) => {
                res.send(response);
            })
            .catch((err) => {
                res.status(400).send({
                    message: err.message || "Some error occurred while retrieving data.",
                });
            });
    }
    else {
        return null;
    }
}