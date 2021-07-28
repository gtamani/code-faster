export const METHODS = {
    keyPressed,
    changeSpeed,
    nextParagraph,
    update,
    gameEnded,
    loop,
    opponentLoop,
    addToGraph
}

const keyPressed = function (e) {
    /* Check's if the key pressed is correct or incorrect. */
    if (!this.beggins) {
        this.beggins = true;
        this.started = new Date(Date.now());
        document.querySelector("#clock-icon").style.animation = "seconds 1s infinite";
        this.opponentLoop();
    }
}

const changeSpeed = function(e) {
    /* Controls opponent's speed according to Option's configuration */

    console.log(e,this.speedInput)
    setTimeout(() => {
        const messageDiv = document.querySelector("#message")
        if (!this.beggins) {

            //console.log(document.querySelector("#speed").value)
            try {
                const number = parseInt(document.querySelector("#speed").value)
                if (number) {
                    if (number >= 20 && number <= 1200) {
                        this.opponentSpeed = number;
                        messageDiv.innerHTML = ""

                    } else {
                        messageDiv.innerHTML = "Speed must be defined between 20-1200"
                        this.opponentSpeed = 50;
                    }
                } else {
                    messageDiv.innerHTML = "That's not a number"
                    this.opponentSpeed = 50;
                }
            } catch {
                document.querySelector("#message").innerHTML = "That's not a number"
            }
        } else {
            messageDiv.innerHTML = "Wait the match ended to set a new speed"
        } 
    },10)
}


const nextParagraph = function() {
    /* Restore variables for a new test */
    this.beggins = false;
    this.finished = false;
    this.sentenceNumber ++;
    this.position = 0;
    this.opponentPosition = 0;
    this.opponentPosition = 0;
    this.lettersToPosition = 0;
    this.speed = 0;
    this.presition = 0;
    this.errors = 0;
    this.text = this.sentences[this.sentenceNumber]
    this.nextLetter = this.text[0]
    document.querySelector("#header").innerHTML = "Type this sentence 👇"
    this.loop();
}

const update = function () {
    /* Update clock's info when game is running */

    let date = new Date(Date.now()) 
    this.difference = date.getTime() - this.started.getTime()
    this.minutes = parseInt(this.difference / 60000)
    this.seconds = ((this.difference - this.minutes*60000) / 1000).toFixed(2)
    this.speed = parseFloat(60000 / (this.difference / this.position)).toFixed(2)
    this.presition = this.position ? 100 - parseFloat((this.errors/this.position)*100).toFixed(2) : 0
    if(this.presition < 0) {this.presition = 0}
}
    
const gameEnded = function (has_won) {
    /* Determinates the winner when game's finished,
        Change frontend 
        
        prop: has_won - Boolean. Has the player won?
    */

    const result = has_won ? "Win" : "Loose"
    this.text = ""
    this.win = has_won;
    this.finished = true;
    this.beggins = false;
    document.querySelector("#clock-icon").style.animation = "none";
    document.querySelector("#header").innerHTML = "You "+result
    this.addToGraph();
}

const loop = function () {        
    /* Player's main loop */

    this.started = new Date(Date.now()),
    this.nextLetter = this.text[0]
    const r = setInterval(() => {
        if (this.beggins) {
            this.update()
        }
        if (this.position === this.text.length) {
            this.gameEnded(true)
            clearInterval(r);
        } else if (this.finished) {
            clearInterval(r);
        }
    }, 15)
}

const opponentLoop = function () {
    /* Opponent's loop */

    const r = setInterval(() => {
        this.opponentPosition ++;
        if (this.opponentPosition === this.text.length) {
            this.gameEnded(false)
            clearInterval(r);
        } else if (this.finished) {
            clearInterval(r);
        }
    }, 60000 / this.opponentSpeed)
}

const addToGraph = function () {
    /* Add new data to the graph */

    this.try++;
    this.graphSpeedData = { try: this.try, speed: parseFloat(this.speed)}
    this.graphPresitionData = { try: this.try, presition: parseFloat(this.presition) }
    console.log(this.graphSpeedData.length,this.graphPresitionData.length)
}