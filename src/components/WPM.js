export default class WPM {
    constructor(container) {
        this.container = container
        this.wpm = this.wordPassed = this.secondsPassed = 0
        this.init()
    }

    init() {
        this.container.textContent = this.calculWPM()
        this.wpmInterval = setInterval(() => {
            this.container.textContent = this.calculWPM()
            this.secondsPassed++
        }, 1000);
    }

    calculWPM() {
        this.wpm =  isNaN(this.wordPassed / this.secondsPassed) ? 
                    0 :
                    this.wordPassed / this.secondsPassed * 60;
        return this.getFormattedWPM()
    }

    getFormattedWPM() {
        return Math.floor(this.wpm) + ' WPM'
    }

    unmount() {
        clearInterval(this.wpmInterval)
    }
}