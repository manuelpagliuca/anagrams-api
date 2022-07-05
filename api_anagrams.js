// Local functions
function removePunctuation(sentence) {
    return String(sentence).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function searchAnagramInArray(string, array) {
    let outcome = [];

    if (String(string).length == 0 || String(array).length == 0)
        return outcome;

    for (let word of array)
        if (areAnagrams(string, word))
            outcome.push(word);

    return outcome;
}

// API Functions
/// Endpoint A
function areAnagrams(string1, string2) {
    if (!string1 || !string2)
        return false;

    let str1 = String(string1).toLowerCase();
    let str2 = String(string2).toLowerCase();

    let len1 = str1.length;
    let len2 = str2.length;

    // won't consider anagram if word length <= 2
    if (len1 <= 2 || len1 != len2)
        return false;

    let dictStr1 = {};
    let dictStr2 = {};

    for (let val of str1)
        dictStr1[val] = (dictStr1[val] || 0) + 1;

    for (let val of str2)
        dictStr2[val] = (dictStr2[val] || 0) + 1;

    for (let key in dictStr1)
        if (dictStr1[key] != dictStr2[key])
            return false;

    return true;
}

/// Endpoint B
function searchAnagramInSentence(anagram, sentence) {
    if (String(anagram).split(" ").length > 1)
        return "The first argument in the body of the request contains more than one word."

    if (!anagram || !sentence)
        return "One of the two arguments is missing in the body of the request.";

    sentence = removePunctuation(sentence);
    let words = sentence.toLowerCase().split(" ");
    let anagrams = searchAnagramInArray(anagram, words);

    return anagrams;
}

/// Endpoint C (there are three different approaches)
/*  Brute force approach, time complexity O(N^3), space complexity > O(N^2)

    It basically, re-use the previous functions for delegate the operation of searching
    the anagram in an array of words (sentence). If positive, remove from
    the array of words the found anagrams. */
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
            outcome.push(anagrams);
        }
    }

    return outcome;
}

/* Approach categorizing by sorted anagram.
    - time complexity O(N * W * LOG W) = O(N * LOG W)
    - space complexity is linear O(NW) = O(N)
    Where :
        N = length of sentence
        W = length of single words

    I create an hashmap which categorizes the anagrams
    using as key the sorted anagram, which will always
    be the same at each recomputation.
    The time complexity of the sorting function should be equal to the
    time-complexity of the merge-sort. */
function anagramsInSentenceNLogW(sentence) {
    let outcome = {};

    if (String(sentence).length == 0)
        return outcome;

    sentence = removePunctuation(sentence).toLowerCase().split(" ");

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

/*  Approach categorizing by counting the occurrences alpha-characters.
    - time complexity O(N*W) = O(N)
    - space complexity O(N + 26) = O(N)
    Where :
        N = length of sentence
        W = length of single words

    Use the occurrences like an hash/unique identifier for each anagram inside
    an hashmap.*/
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

module.exports = {
    areAnagrams,
    searchAnagramInSentence,
    anagramsInSentenceNaive,
    anagramsInSentenceNLogW,
    anagramsInSentenceN
}