export default class Countdown {
    constructor(container, duration) {
        this.container = container
        this.duration = duration
        this.setCountdown()
    }

    setCountdown() {
        let seconds = this.duration / 1000;

        this.container.textContent = this.getFormattedCountdown(seconds)
        let countdownInterval = setInterval(() => {
            seconds--
            if (!seconds) {
                clearInterval(countdownInterval)
            }
            this.container.textContent = this.getFormattedCountdown(seconds)
        }, 1000);
    }

    getFormattedCountdown(seconds) {
        let formattedMinutes = (Math.floor(seconds / 60));
        let formattedSeconds = (seconds % 60 < 10 ? '0' : '') + (seconds % 60)
        return formattedMinutes + ':' + formattedSeconds
    }
}