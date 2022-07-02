function areAnagrams(string1, string2) {
    if (!string1 || !string2) {
        return false;
    }

    let str1 = String(string1).toLocaleLowerCase();
    let str2 = String(string2).toLocaleLowerCase();

    if (str1 == str2) {
        return true;
    }

    let len1 = str1.length;
    let len2 = str2.length;

    if (len1 != len2) {
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

function anagramsInSentence(string, sentence) {
    if (!string || !sentence) {
        return false;
    }

    let str = String(string);
    let words = sentence.split(" ");
    let outcome = []
    for (let word of words) {
        if (areAnagrams(string, word)) {
            outcome.push(word);
        }
    }
    return outcome;
}

module.exports = {
    areAnagrams,
    anagramsInSentence
}