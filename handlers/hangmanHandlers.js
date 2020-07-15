const { words } = require('../data/words');
let progress = [];
let checkToWin;
let hasWord = false;

const strikeLetter = (objWithWord, letter) => {
    objWithWord.word = [...objWithWord.word];
    objWithWord.word.splice(objWithWord.word.indexOf(letter), 1, "!");
    objWithWord.word = objWithWord.word.join("");
}

// write your handlers here...
const getWordsArr = (req, res) => {
    if(words) {
        res.status(200).json({
            status: 200,
            words: words
        });
    } else {
        res.status(404).json({
            status: 404,
            Error: "Couldn't find ressource"
        });
    }
}

const getSingleWord = (req, res) => {
    const word = words[Math.floor(Math.random() * words.length)];

    if(word && !hasWord) {
            for(let i=0; i<word.word.length; i++){
                progress.push('_');
            }

            checkToWin = word.word;
            hasWord = true;
        
        res.status(200).json({
            status: 200,
            id: word.id,
            letterCount: word.letterCount
        });
    } else {
        res.status(404).json({
            status: 404,
            Error: "Couldn't find ressource or you already chose a word"
        });
    }
}

const guessLetter = (req, res) => {
    const { id, letter} = req.params;
    const word = words.filter(words => words.id === id)[0];
    
    if(word && word.word.includes(letter)) {
        progress[word.word.indexOf(letter)] = letter;
        strikeLetter(word, letter);
        word.finishingWord = progress.join('');

        if(progress.join('') === checkToWin) {
            hasWord = false;
            
            res.status(200).json({
                status: 200,
                winMsg: 'You win!',
                progress: progress
            });
        } else {
            res.status(200).json({
                status: 200,
                progress: progress
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            Error: "Letter is not in the word"
        });
    }
}

module.exports = { getWordsArr, getSingleWord, guessLetter }