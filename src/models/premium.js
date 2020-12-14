const mongoose = require("mongoose");

const Premium = new mongoose.Schema({
	ID: {
		type: String,
	},
});

module.exports = mongoose.model("premium", Premium);