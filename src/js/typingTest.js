class TypingTest {

    constructor() {
        this.init()
        this.wordCount = 0;
        this.userLetterIndex = 1;
    }

    async init() {
        this.words = await this.fetchWords()
        this.renderWords()
        document.addEventListener('keypress', this.handleUserEntries.bind(this) )
    }

    async fetchWords() {
        const response  = await fetch('https://random-word-api.herokuapp.com/word?number=100')
        return await response.json()
    }

    renderWords() {
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
            if(e.key != ' ') {
                letterElement.classList.add('passed')
            }
            letterElement.nextSibling.classList.add('current')
        } else {
            letterElement.classList.add('wrong')
        }
    }
}

new TypingTest