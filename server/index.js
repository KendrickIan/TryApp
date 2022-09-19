const express = require("express");
const bodyParser = require('body-parser');
const db = require('./queries.js');
const { request } = require("express");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/api-test', async function(req, res, next) {
    try {
        const result = await db.getAll()
        res.json(result);
    }
    catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});