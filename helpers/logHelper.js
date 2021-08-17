const model = require("../config/dbconfig");


exports.getNextDay = async (data) => {

    return await model.Log.create(data);

};