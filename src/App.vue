<template>
<div id="app" class="row">
    <!-- Sidebar Options-->
    <div id="sidebar" class="col col-2 p-2 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width:290px">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Options</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <a href="#" class="nav-link text-white" aria-current="page">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
            <input type="checkbox"
            @click="activateGraphs = !activateGraphs" 
            checked>
            <span style="padding-left:15px;">Show statistics</span>
            </a>
        </li>
        <li>
            <a href="#" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
            <input type="checkbox" 
            @click="activateTimer = !activateTimer"
            checked>
            <span style="padding-left:15px;">Show timer</span>
            </a>
        </li>
        
        <li>
        
            <a href="#" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
            
            
                <input type="checkbox"
                @click="activateOpponentSpeed = !activateOpponentSpeed"
                checked>
                <label for="exampleFormControlInput1" style="padding:0 0 15px 15px;">Beat speed</label>
                <input type="email" id="speed" class="form-control" placeholder="20-500 characters/minute" v-on:keydown="changeSpeed" v-model="speedInput">
                <div id="message"></div>
            
            </a>
        </li>
        
        </ul>
        <hr>
        <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img v-bind:src="require('./assets/logo.png')" alt="">
            <strong>gtamani</strong>
        </a>
        
        </div>
    </div>

    <div class="d-flex flex-column col align-items-center justify-content-center">
        <!-- Clock -->
        <div id="clock" class="d-flex flex-row-reverse p-2">
            <div class="p-2" id="clock-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
            </div>
            <transition name="fade">
            <div class="bubble p-2" v-if="activateTimer" style="padding-right:2vw">
            <pre>
                    Speed: {{speed}}   Characters: {{position}} 
                    Presition: {{presition}}%   Time: {{minutes}}:{{seconds}}
            </pre>
            </div>
            </transition>
            <div id="clocker" class="p-2" v-if="activateTimer && beggins">
                
            </div>   
            
        </div>
        <!-- Main container => keyboard prompter -->
        <div id='container' class="p-2 ">
            <div class="h-100 p-5 text-white bg-dark rounded-2">
                <div class="d-flex flex-column align-items-center justify-content-between" style="height:100%">
                    <div id="keyboard-container">
                        <div class="d-flex flex-row">
                            <div class="p-2">
                                <img id="keyboard-logo" v-bind:src="require('./assets/keyboard.png')" alt="">
                            </div>
                        </div>
                    </div>
                    <!-- Header -->
                    <h2 id="header" class="p-2">Type this sentence 👇</h2>
                    <!-- Prompter -->
                    <div class="p-2">
                        <div id="prompter-container" v-if="!finished">
                            <prompter
                            :text='text'
                            :opponent='opponentPosition'
                            :activateOpponent='activateOpponentSpeed'
                            :well='position'
                            :wrong='lettersToPosition'/>
                        </div>
                        <div id="win" v-if="finished && win">You beated {{opponentSpeed}} characters/minute</div>
                        <div id="loose" v-if="finished && !win">You couldn't beat {{opponentSpeed}} characters/minute</div>
                        <div id="results" v-if="finished"> Speed: {{ speed }} </div>
                        <div id="results" v-if="finished"> Presition: {{ presition }}% </div>
                    </div>
                    <!-- Input and button-->
                    <div class="d-flex flex-row justify-content-center p-2" style="width:100%">
                        <div class="input-group mb-2 p-2" id="main-input" v-if="!finished">
                            <span class="input-group-text" id="inputGroup-sizing-default">✏️</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Press the first letter to run the clock" v-on:keydown="keyPressed">
                        </div>
                        <button class="btn btn-outline-light p-2" type="button" @click="nextParagraph">Try Again</button>
                    </div>
                </div>
            </div>  
        </div>
        
        <div class="p-2" id="graphs" v-if="activateGraphs">
            <!-- Graphs container -->
            <transition name="fade">
                <div class="h-100 p-5 text-white bg-dark rounded-3" id="graph-container">
                    <p> Speed & Presition graphs</p>
                    <div class="d-flex flex-row justify-content-center">
                        <div class="p-2">
                            <graph 
                            :newData='graphSpeedData'
                            :isSpeed='graph1'/>
                        </div>
                        <div class="p-2">
                            <graph
                            :newData='graphPresitionData'
                            :isSpeed='graph2'/>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
    </div>

   
    

    <transition appear name="fade">
        <div id="wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffd700" fill-opacity="1" d="M0,192L48,208C96,224,192,256,288,266.7C384,277,480,267,576,240C672,213,768,171,864,138.7C960,107,1056,85,1152,85.3C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
    </transition>



    
</div>
</template>

<script>
import Prompter from './components/Prompter'
import Graph from './components/Graph'

export default {
    name: 'App',
    components: {
        Prompter,
        Graph
    },
    data () {
        return {
            // Text data
            activateTimer: true,
            activateGraphs: true,
            activateOpponentSpeed: false,
            sentences: [],
            sentenceNumber: 0,
            text: "",
            position: 0,
            lettersToPosition: 0,
            started: "",
            unvalidKeyCodes: [17, 16, 20, 9, 18, 27, 222, 13],
            sameLetter: false,
            nextLetter:"",
            // Opponent
            opponentPosition: 0,
            opponentSpeed:200,
            // Clock data
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            difference: 0,
            speed: 0,
            errors: 0,
            presition: 100,
            speedInput: 0,
            beggins: false,
            finished: false,
            win: "",
            graphSpeedData:{try: 1, speed: 150 },
            graphPresitionData: {try: 1, presition: 95 },  
            try:1,
            graph1:"g1",
            graph2:"g2",
        }
    },
    methods: {
        keyPressed: function (e) {
            console.log('token')
            if (!this.beggins) {
                this.beggins = true;
                document.querySelector("#clock-icon").style.animation = "seconds 1s infinite";
                this.opponentLoop();
            }
            this.sameLetter = e.key === this.nextLetter;
            if (this.unvalidKeyCodes.indexOf(e.keyCode) == -1) {
                if (this.sameLetter && this.lettersToPosition == 0) {
                    this.position++;
                    const next = this.text[this.position];
                    this.nextLetter = next;
                } else {
                    if (e.key === "Backspace") {
                        if (this.position >= 0) {
                            if (this.lettersToPosition === 0) {
                                this.position--;
                                const next = this.text[this.position];
                                this.nextLetter = next;
                            } else {
                                this.lettersToPosition--;
                            }
                        }
                    } else {
                        this.lettersToPosition++;
                        this.errors++;
                    }
                }
            }
        },
        changeSpeed: function(e) {
            console.log(e,this.speedInput)
            setTimeout(() => {
                console.log(document.querySelector("#speed").value)
                try {
                    const messageDiv = document.querySelector("#message")
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
            },10)
        },
        nextParagraph: function() {
            this.finished = false;
            this.sentenceNumber ++;
            this.position = 0;
            this.opponentPosition = 0;
            this.opponentPosition = 0;
            this.lettersToPosition = 0;
            this.speed = 0;
            this.presition = 0;
            this.text = this.sentences[this.sentenceNumber]
            this.nextLetter = this.text[0]
            document.querySelector("#header").innerHTML = "Type this sentence 👇"
            this.loop();
        },
        update: function () {
            let date = new Date(Date.now()) 
            this.difference = date.getTime() - this.started.getTime()
            this.minutes = parseInt(this.difference / 60000)
            this.seconds = ((this.difference - this.minutes*60000) / 1000).toFixed(2)
            this.speed = parseFloat(60000 / (this.difference / this.position)).toFixed(2)
            this.presition = this.position ? 100 - parseFloat((this.errors/this.position)*100).toFixed(2) : 0
        },
        loop: function () {
            this.started = new Date(Date.now()),
            this.nextLetter = this.text[0]
            const r = setInterval(() => {
                if (this.beggins) {
                    this.update()
                }
                if (this.position === this.text.length) {
                    this.text = ""
                    this.win = true;
                    this.finished = true;
                    this.beggins = false;
                    document.querySelector("#clock-icon").style.animation = "none";
                    document.querySelector("#header").innerHTML = "You win"
                    this.addToGraph();
                    clearInterval(r);
                } else if (this.finished) {
                    clearInterval(r);
                }
            }, 15)
        },
        opponentLoop: function () {
            const r = setInterval(() => {
                this.opponentPosition ++;
                if (this.opponentPosition === this.text.length) {
                    /// Repetido
                    this.text = ""
                    this.win = false;
                    this.finished = true;
                    this.beggins = false;
                    document.querySelector("#clock-icon").style.animation = "none";
                    document.querySelector("#header").innerHTML = "You loose"
                    this.addToGraph()
                    clearInterval(r);
                } else if (this.finished) {
                    clearInterval(r);
                }
            }, 60000 / this.opponentSpeed)
        },
        addToGraph: function () {
            this.try++;
            this.graphSpeedData = { try: this.try, speed: parseFloat(this.speed)}
            this.graphPresitionData = { try: this.try, presition: parseFloat(this.presition) }
            console.log(this.graphSpeedData.length,this.graphPresitionData.length)
        }
    },
    created () { 
        const getSentences = async function () {
            const res = await fetch("https://api.generadordni.es/v2/text/paragraphs?results=100&sentences=1&language=es")
            if (res.status == 200) {
                const data = await res.json()
                return data
            } else {
                return ['Lengua, detalles llegas elegir ciudadano ninguno mi helicóptero perdedor entrada león decidí izquierda entienden mesa pérdida.',]
            }
        }
        const s = getSentences();
        s.then(res => {
            console.log("asd",res.status);
            this.sentences = res;
            this.text = this.sentences[this.sentenceNumber];
            this.loop();
        })
    }
}
</script>

<style>
*{
    margin:0;
    padding:0;
}
#sidebar{
    height:100vh;
    width:290px;
    margin:0;
}
#app{
    position:relative;
    width:100vw;
    height:100vh;
    /*background-color:#b1ccd3;*/
}
#container{
    position:relative;
    width:80%;
    height:40%;
    text-align: center;
    border-radius: 40px;
}
#graphs{
    height:40%;
}
#graph-container{
    overflow-y:scroll;
}
#main-input{
    width:100%;
    margin: 0 10%;
}
#main-input::-webkit-input-placeholder{
    text-align: center;
}
#red{
    background-color: #860F0F;
}
#green{
    background-color: #0F8637;
}
img{
    height:40px;
    margin: 0 20px
}
#message{
    font-size: 80%;
    color:rgb(223, 118, 118);
}
#clock{
    position:absolute;
    right: 2vw;
    top:2vh;
}
#wave{
    position:absolute;
    bottom:0;
    z-index:-1
}
#prompter-container{
    font-family: 'Rubik', sans-serif;
    font-size: 17px;
}
#keyboard-logo{
    filter:invert(100%);
    opacity:0.7;
    transform:scale(3) rotate(-15deg)
}
#keyboard-container{
    position:absolute;
    top:15%;
    left:5%;
}
#sidebar,#container,#graphs{
    opacity: 0.85;
}


/* Transitions */
.fade-enter-from {opacity:0;}
/*.fade-enter-to { opacity:1;}*/
.fade-enter-active {transition: opacity 0.5s ease;}
/*.fade-leave-from {opacity:1;}*/
.fade-leave-to {opacity:0;}
.fade-leave-active {transition: opacity 0.5s ease;}

@keyframes seconds {
    0%, 100% {transform:scale(1.1)}
    10%, 90% {transform:none}   
}
</style>
