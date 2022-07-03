// Local functions
function removePunctuation(sentence) {
    return String(sentence).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

function searchAnagramInArray(string, array) {
    let outcome = [];

    for (let word of array) {
        if (areAnagrams(string, word)) {
            outcome.push(word);
        }
    }
    return outcome;
}

// Exported functions
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

function searchAnagramInSentence(string, sentence) {
    if (!string || !sentence) {
        return false;
    }
    sentence = removePunctuation(sentence);
    let words = sentence.toLocaleLowerCase().split(" ");
    let anagrams = searchAnagramInArray(string, words);

    return anagrams;
}

function anagramsInSentence(sentence) {
    sentence = removePunctuation(sentence);

    const possibleAnagrams = sentence.split(" ");
    let words = sentence.toLocaleLowerCase().split(" ");

    let outcome = [];

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

module.exports = {
    areAnagrams,
    searchAnagramInSentence,
    anagramsInSentence
}