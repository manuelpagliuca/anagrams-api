const express = require('express')
const app = express()
const api_anagrams = require('./api_anagrams')

app.use(express.json());

app.post('/A/', (req, res) => {
    let keys = Object.keys(req.body);

    if (keys.length == 2) {
        let success = api_anagrams.areAnagrams(req.body[keys[0]], req.body[keys[1]]);
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
        let anagrams = api_anagrams.searchAnagramInSentence(req.body[keys[0]], req.body[keys[1]]);
        res.status(200).json({
            outcome: anagrams
        });
    } else {
        res.status(400).json({
            outcome: "Wrong number of elements."
        });
    }
});

app.post('/C/', (req, res) => {
    let keys = Object.keys(req.body);

    if (keys.length == 1) {
        let arrayOfAnagrams = api_anagrams.anagramsInSentenceN(req.body[keys[0]]);
        res.status(200).json({
            outcome: arrayOfAnagrams
        });
    } else {
        res.status(400).json({
            outcome: "Wrong number of elements."
        });
    }
});

app.listen(process.env.PORT || 3000);