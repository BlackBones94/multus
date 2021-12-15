import Countdown from "./Countdown.js"
import WPM from "./WPM.js"

export default class TypingTest {

    constructor() {
        this.init()

        /** @type {number} Must be an integer  */
        this.duration = 60000
        
        this.wordQuantity = 20;
        this.wordPassed = 0
        this.userLetterIndex = 1
        this.root = document.getElementById('root')
        this.wordCounts = document.querySelector('.word-count')
    }

    init() {
        this.startButton = document.getElementById('start')
        this.startButton.addEventListener('click', this.startGame.bind(this))
    }

    async startGame() {
        this.words = await this.fetchWords()
        this.startButton.style.display = 'none'
        this.wordCounts.textContent = 'Passed: ' + 0;
        this.renderWords()
        this.setCountdown()
        this.setWPM()
    }

    async renderWords() {

        const wordsContainer = document.querySelector('.words-container')
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
            this.countdown.unmount()
            this.WPM.unmount()
        }, this.duration);

    }

    async fetchWords() {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=' + this.wordQuantity)
        return await response.json()
    }

    setCountdown() {
        this.countdownElement = document.querySelector('.countdown');
        this.countdown = new Countdown(this.countdownElement, this.duration)
    }

    setWPM() {
        this.wpmElement = document.querySelector('.wpm');
        this.WPM = new WPM(this.wpmElement)
    }

    handleUserEntries(e) {
        let letterElement = document.querySelector('.words-container span:nth-child(' + this.userLetterIndex + ')')
        
        // End execution
        if (!letterElement) {
            return;
        }

        if (letterElement.textContent === e.key) {
            this.userLetterIndex++
            letterElement.classList = ''
            if (e.key === ' ') {
                this.wordPassed++;
                this.WPM.wordPassed++
                this.wordCounts.textContent = 'Passed : ' + this.wordPassed;
            } else {
                letterElement.classList.add('passed')
            }
            letterElement.nextSibling.classList.add('current')
        } else {
            letterElement.classList.add('wrong')
        }
    }
}

