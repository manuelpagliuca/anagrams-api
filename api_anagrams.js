// Local functions
function removePunctuation(sentence) {
    return String(sentence).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function searchAnagramInArray(string, array) {
    let outcome = [];

    if (String(string).length == 0 || String(array).length == 0)
        return outcome;

    for (let word of array) {
        if (areAnagrams(string, word)) {
            outcome.push(word);
        }
    }
    return outcome;
}

// API Functions
/// Endpoint A
function areAnagrams(string1, string2) {
    if (!string1 || !string2) {
        return false;
    }

    let str1 = String(string1).toLocaleLowerCase();
    let str2 = String(string2).toLocaleLowerCase();

    let len1 = str1.length;
    let len2 = str2.length;

    if (len1 == 1 || len2 == 2 || len1 != len2) {
        return false;
    }

    let dictStr1 = {};
    let dictStr2 = {};

    for (let val of str1) {
        dictStr1[val] = (dictStr1[val] || 0) + 1;
    }

    for (let val of str2) {
        dictStr2[val] = (dictStr2[val] || 0) + 1;
    }

    for (let key in dictStr1) {
        if (dictStr1[key] != dictStr2[key])
            return false;
    }

    return true;
}

/// Endpoint B
function searchAnagramInSentence(string, sentence) {
    if (!string || !sentence) {
        return false;
    }
    sentence = removePunctuation(sentence);
    let words = sentence.toLocaleLowerCase().split(" ");
    let anagrams = searchAnagramInArray(string, words);

    return anagrams;
}

/// Endpoint C
// Brute force approach, time complexity O(N^3), space complexity > O(N^2)
function anagramsInSentenceNaive(sentence) {
    let outcome = [];

    if (String(sentence).length == 0)
        return outcome;

    sentence = removePunctuation(sentence).toLowerCase();

    const possibleAnagrams = sentence.split(" ");
    let words = sentence.split(" ");

    for (let possibleAnagram of possibleAnagrams) {
        let anagrams = searchAnagramInArray(possibleAnagram, words);
        if (anagrams.length > 1) {
            words = words.filter(x => !anagrams.includes(x));
            possibleAnagram = words.filter(x => !anagrams.includes(x));
            outcome.push(anagrams);
        }
    }

    return outcome;
}

/* Approach categorizing by sorted anagram
    - time complexity O(N * W * LOG W) = O(N * LOG W)
    - space complexity is linear O(NW) = O(N)
    Where :
        N = length of sentence
        W = length of single words */
function anagramsInSentenceLogN(sentence) {
    let outcome = {};

    if (String(sentence).length == 0)
        return outcome;

    sentence = removePunctuation(sentence).toLocaleLowerCase().split(" ");

    for (let word of sentence) {
        let key = word.split('').sort().join('');
        if (!outcome[key])
            outcome[key] = [];
        outcome[key].push(word);
    }

    // Deleting not relevant clusters (single element and single character)
    for (let elem in outcome) {
        if (outcome[elem].length < 2 || elem.length == 1)
            delete outcome[elem];
    }

    return outcome;
}

/* Approach categorizing by counting
    - time complexity O(N*W) = O(N)
    - space complexity O(N + 26) = O(N)
    Where :
        N = length of sentence
        W = length of single words */
function anagramsInSentenceN(sentence) {
    const outcome = new Map();

    if (String(sentence).length == 0)
        return Array.from(outcome.values());

    sentence = removePunctuation(sentence).toLowerCase().split(" ");
    const ASCII_CHAR_OFFSET = 97;

    for (let word of sentence) {
        const count = Array(26).fill(0);

        for (let i = 0; i < word.length; ++i)
            count[word.charCodeAt(i) - ASCII_CHAR_OFFSET] += 1;

        const anagramId = count.join('');

        if (outcome.has(anagramId))
            outcome.get(anagramId).push(word);
        else
            outcome.set(anagramId, [word]);
    }

    // Deleting not relevant clusters (single element and single character)
    outcome.forEach((value, key, map) => {
        if (value[0].length == 1 || value.length == 1)
            outcome.delete(key);
    });

    return Array.from(outcome.values());
}

// Approach by counting the existence of letters
module.exports = {
    areAnagrams,
    searchAnagramInSentence,
    anagramsInSentenceNaive,
    anagramsInSentenceLogN,
    anagramsInSentenceN
}