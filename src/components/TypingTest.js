import Countdown from "./Countdown.js"

export default class TypingTest {

    constructor() {
        this.init()

        /** @type {number} Must be an integer  */
        this.duration = 61000
        
        this.wordQuantity = 200;
        this.wordCount = 0
        this.userLetterIndex = 1
        this.root = document.getElementById('root')
    }

    init() {
        this.startButton = document.getElementById('start')
        this.startButton.addEventListener('click', this.startGame.bind(this))
    }

    async startGame() {
        this.words = await this.fetchWords()
        this.startButton.style.display = 'none'
        this.renderWords()
        this.setCountdown()
    }

    async renderWords() {

        const wordsContainer = document.getElementById('words-container')
        for (let [i, word] of this.words.entries()) {
            word = word.split('')
            for (let j = 0; j < word.length; j++) {
                const letter = word[j]
                const element = document.createElement('span')
                element.classList.add('not-passed')
                element.textContent = letter
                wordsContainer.append(element)
            }
            // Avoid last space element
            if (i === this.words.length - 1) {
                break;
            }
            const space = document.createElement('span')
            space.classList.add('not-passed')
            space.textContent = ' '
            wordsContainer.append(space)
        }


        /**
         * Set user entry listener and game duration
         * Remove the listener at the end
         */
        this.handleUserEntries = this.handleUserEntries.bind(this)
        document.addEventListener('keypress', this.handleUserEntries, true)
        setTimeout(() => {
            document.removeEventListener('keypress', this.handleUserEntries, true)
        }, this.duration);

    }

    async fetchWords() {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=' + this.wordQuantity)
        return await response.json()
    }

    setCountdown() {
        this.countdownElement = document.getElementById('countdown');
        new Countdown(this.countdownElement, this.duration)
        this.root.prepend(this.countdownElement)
    }

    handleUserEntries(e) {

        let letterElement = document.querySelector('#words-container span:nth-child(' + this.userLetterIndex + ')')

        // End execution
        if (!letterElement) {
            return;
        }

        if (letterElement.textContent === e.key) {
            this.userLetterIndex++
            letterElement.classList = ''
            if (e.key != ' ') {
                letterElement.classList.add('passed')
            }
            letterElement.nextSibling.classList.add('current')
        } else {
            letterElement.classList.add('wrong')
        }
    }
}

