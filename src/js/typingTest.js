const words = ['Hello', 'world', 'how', 'good', 'is', 'this', 'game']
const totype = document.getElementById('to-type')

let index = 0
let letter = 0
let valid = false

const getFormattedWord = word => {
    let formattedWord = document.createElement('div');
    word.split('').forEach((l, i) => {
        let letter = document.createElement('span')
        letter.id = 'l_' + i
        letter.textContent = l;
        formattedWord.append(letter)
    })
    return formattedWord;
}

totype.append(getFormattedWord(words[index]))

document.addEventListener('keypress', (e) => {

    if(' ' === e.key && valid == true) {
        index++
        letter = 0
        totype.append(getFormattedWord(words[index]))
        valid = false
    }

    if (words[index][letter] === e.key) {
        letter++
        if (letter === words[index].length) {
            valid = true
        }
    }
    
})




