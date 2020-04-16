const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
	MongoClient.connect(
		`mongodb+srv://test:test@ecommerce-app-eq446.mongodb.net/ecommerceapp?retryWrites=true&w=majority`
	)
		.then((client) => {
			console.log("Connected to DB!");
			_db = client.db();
			cb();
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database connection";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
