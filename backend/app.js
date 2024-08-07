require("dotenv").config({ path: "./.env" });
const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const usersRoutes = require("./routes/userRoutes")
const cors = require("cors")



// setting up a database connection
require("./config/db.config").DbConnection();

//cors setup
app.use(cors());


// Logger middleware
app.use(logger('tiny'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());


// base uri for user routes
app.use(`/`, usersRoutes);

// Catch-all route for unknown paths
app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: `${req.url} not found` });
});


// Start server
const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`server started running on port ${process.env.PORT}`);
})
