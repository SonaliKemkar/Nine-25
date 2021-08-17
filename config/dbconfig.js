const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "postgres",
    "postgres",
    "Postgres@123",
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging: false,
        pool: {
            acquire: 1000000
        },
        dialectOptions: {
            connectTimeout: 80000
        }
    }
);
var models = [
    "Log",
];
var db = {};
sequelize
    .authenticate()
    .then(() => {
        console.log("db-config::Database Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
models.forEach((model) => {
    db[model] = sequelize.import(
        "../models/" + model.toLowerCase() + ".js"
    );
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
