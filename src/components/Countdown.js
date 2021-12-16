export default class Countdown {
    constructor(container, duration) {
        this.container = container
        this.duration = duration
        this.init()
    }

    init() {
        this.seconds = this.duration / 1000;

        this.container.textContent = this.getFormattedCountdown()
        this.countdownInterval = setInterval(() => {
            this.seconds--
            this.container.textContent = this.getFormattedCountdown()
        }, 1000);
    }

    getFormattedCountdown() {
        let formattedMinutes = (Math.floor(this.seconds / 60));
        let formattedSeconds = (this.seconds % 60 < 10 ? '0' : '') + (this.seconds % 60)
        return formattedMinutes + ':' + formattedSeconds
    }

    unmount() {
        this.container.textContent = this.getFormattedCountdown(this.seconds--)
        clearInterval(this.countdownInterval)
    }
}