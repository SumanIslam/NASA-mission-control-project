const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const api = require('./routes/api');

const app = express();

// middleware
app.use(cors());
//  {
//   origin: 'http://localhost:3000'
// }
app.use(morgan('combined'))
app.use(express.json());


// Routes
app.use('/v1', api);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "client", "build")));

	app.get("*", (req, res) => {
		res.sendFile(
			path.join(__dirname, '..', '..', 'client', 'build', 'index.html'),
			function (err) {
				res.status(500).send(err);
			}
		);
	});
}


module.exports = app;