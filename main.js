const express = require('express')
const app = express()
const api_anagrams = require('./api_anagrams')

app.use(express.json());

// Endpoint A
app.post('/A/', (req, res) => {
    let keys = Object.keys(req.body);

    if (keys.length == 2) {
        let ans = api_anagrams.areAnagrams(req.body[keys[0]], req.body[keys[1]]);
        res.status(200).json({
            outcome: ans
        });
    } else {
        res.status(400).json({
            outcome: "Wrong number of elements inside the body of the request."
        });
    }
});

// Endpoint B
app.post('/B/', (req, res) => {
    let keys = Object.keys(req.body);

    if (keys.length == 2) {
        let ans = api_anagrams.searchAnagramInSentence(req.body[keys[0]], req.body[keys[1]]);
        res.status(200).json({
            outcome: ans
        });
    } else {
        res.status(400).json({
            outcome: "Wrong number of elements inside the body of the request."
        });
    }
});

// Endpoint C
app.post('/C/', (req, res) => {
    let keys = Object.keys(req.body);

    if (keys.length == 1) {
        let arrayOfAnagrams = api_anagrams.anagramsInSentenceNaive(req.body[keys[0]]);
        res.status(200).json({
            outcome: arrayOfAnagrams
        });
    } else {
        res.status(400).json({
            outcome: "Wrong number of elements inside the body of the request."
        });
    }
});

app.listen(process.env.PORT || 3000);