const express = require('express')
const app = express()
const port = 3000;
const { dbConnect } = require("./helper/dbConnection");
const morgan = require("morgan");
const cors = require("cors");


const { router } = require("./helper/router");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use('/api', router);
app.use((req, res, next) => {
    const error = new Error("route Not found..");
    error.status = 404;
    next(error);
});

dbConnect().then((_) => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    // server.listen(port, (_) => console.log(`Server is Running on port ${port}`));
});