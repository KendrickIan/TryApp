const express = require("express");
const bodyParser = require('body-parser');
const db = require('./queries.js');
const { request } = require("express");
var cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors({origin: "*",}))

//Create
app.post('/add-new-skill', async function(req, res, next) {
    try {
        let skillName = req.body.skillName;
        let maxSkillLevel = req.body.maxSkillLevel;
        const result = await db.addSkill(skillName, maxSkillLevel);
        res.json(result);
    } catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
});

app.get('/get-all-skill-list', async function(req, res, next) {
    try {
        const result = await db.getAll();
        res.json(result);
    }
    catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
});

app.get('/get-skill-by-id/:skillId', async function(req, res, next) {
    try {
        let skillId = req.params.skillId;
        const result = await db.getOne(skillId);
        res.json(result);
    } catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
})

app.put('/update-skill-by-id/:skillId', async function(req, res, next) {
    try {
        let skillDetails = req.body;
        let skillId = req.params.skillId;
        const result = await db.updateSkill(skillId, skillDetails);
        res.json(result);
    } catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
})

app.delete('/delete-skill-by-id/:skillId', async function(req, res, next) {
    try {
        let skillId = req.params.skillId;
        const result = await db.deleteSkill(skillId);
        res.json(result);
    } catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});