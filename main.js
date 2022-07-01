const express = require('express')
const app = express()
const {
    anagrams
} = require('./anagrams')

app.use(express.json());

app.get('/A/', (req, res) => {
    res.status(200).json({
        data: anagrams
    });
});

app.post('/B/', (req, res) => {
    console.log(req.body);
    const anagram = req.body;
    anagrams.push(anagram)
    res.status(200).json({
        success: true,
        data: anagrams
    })
});


app.listen(process.env.PORT || 3000);