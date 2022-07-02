const express = require('express')
const app = express()
const {
    anagrams
} = require('./anagrams')
const tools = require('./utility')

app.use(express.json());

app.post('/A/', (req, res) => {
    let keys = Object.keys(req.body);

    if (keys.length == 2) {
        let success = tools.areAnagrams(req.body[keys[0]], req.body[keys[1]]);
        res.status(200).json({
            outcome: success
        });
    } else {
        res.status(400).json({
            outcome: false
        });
    }
});

app.post('/B/', (req, res) => {
    let keys = Object.keys(req.body);
    if (keys.length == 2) {
        let anagrams = tools.anagramsInSentence(req.body[keys[0]], req.body[keys[1]]);
        res.status(200).json({
            outcome: anagrams
        });
    } else {
        res.status(400).json({
            outcome: false
        });
    }
});

app.listen(process.env.PORT || 3000);