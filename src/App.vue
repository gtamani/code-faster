<template>
<div id="app" class="row">

    <div id="sidebar" class="col col-2 p-2 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width:290px">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Options</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
            <input type="checkbox" 
            >
            Show statistics
            </a>
        </li>
        <li>
            <a href="#" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
            <input type="checkbox" 
            @click="changeVisibility"
            checked>
            Show timer
            </a>
        </li>
        
        <li>
        
            <a href="#" class="nav-link text-white">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
            
            <div class="form-group">
                <input type="checkbox" 
                @click="changeVisibility"
                >
                <label for="exampleFormControlInput1" style="padding-left:15px;">Beat speed</label>
                <input type="email" id="speed" class="form-control" placeholder="20-500 characters/minute" v-on:keydown="changeSpeed" v-model="speedInput">
                <div id="message"></div>
            </div>
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
        <div id='container' class="p-2 ">
            <div class="h-100 p-5 text-white bg-dark rounded-3">
                <h2 id="header">Type this sentence 👇</h2>
                <div v-if="!finished">
                    <prompter
                    :text='text'
                    :opponent='opponentPosition'
                    :well='position'
                    :wrong='lettersToPosition'/>
                </div>
                <div id="win" v-if="finished && win">You beated {{opponentSpeed}} characters/minute</div>
                <div id="loose" v-if="finished && !win">You couldn't beat {{opponentSpeed}} characters/minute</div>
                <div id="results" v-if="finished"> Speed: {{ speed }} </div>
                <div id="results" v-if="finished"> Presition: {{ presition }}% </div>
                <div class="input-group mb-3" id="main-input" v-if="!finished">
                    <span class="input-group-text" id="inputGroup-sizing-default">✏️</span>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-on:keydown="keyPressed">
                </div>
                <button class="btn btn-outline-light" type="button" @click="nextParagraph">Try Again</button>
            </div>

        
            <!--button @click="changeVisibility">Show/Don't show next letter</button-->
            
            <div v-if="show">
                {{speed}} - {{ nextLetter }} - {{position}} - {{lettersToPosition}} - {{opponentPosition}} - {{presition}}
            </div>
        </div>
        <div class="p-2">
            <div class="h-100 p-5 text-white bg-dark rounded-3">
                <div class="flex flex-row justify-content-center">
                    <div class="p-2">
                        <Graph></Graph>
                    </div>
                    <div class="p-2">
                        <Graph></Graph>
                    </div>
                </div>
            </div>
        </div>
    </div>

   

    <div id="clock" class="d-flex flex-row-reverse">
        <div class="p-2" id="clock-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
        </div>
        <div id="clocker" class="p-2" v-if="show && beggins">
            {{minutes}} : {{seconds}}
        </div>   
        <div id="counter" class="p-2" v-if="!beggins"></div>
    </div>

    



    
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
            show: true,
            sentences: [],
            sentenceNumber: 0,
            text: "",
            position: 0,
            lettersToPosition: 0,
            started: new Date(Date.now()),
            unvalidKeyCodes: [17, 16, 20, 9, 18, 27, 222, 13],
            sameLetter: false,
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

        }
    },
    methods: {
        changeVisibility: function () {
            this.show = !this.show
        },
        keyPressed: function (e) {
            console.log('token')
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
        counter: function () {
            const counter = document.querySelector("#counter");
            let m = 0;
            const countToThree = setInterval(function () {
                const messages = ["Ready?","3","2","1","Go!",""]
                
                if (m != messages.length) {
                    counter.innerHTML = messages[m];
                    m++;
                } else {
                    clearInterval(countToThree)
                }
            },1000)
        },
        nextParagraph: function() {
            this.finished = false;
            this.sentenceNumber ++;
            this.position = 0;
            this.opponentPosition = 0;
            this.opponentPosition = 0;
            this.lettersToPosition = 0;
            this.text = this.sentences[this.sentenceNumber]
        },
        update: function () {
            let date = new Date(Date.now()) 
            this.difference = date.getTime() - this.started.getTime()
            this.minutes = parseInt(this.difference / 60000)
            this.seconds = Math.round((this.difference - this.minutes*60000) / 1000).toFixed(2)
            this.speed = parseFloat(60000 / (this.difference / this.position)).toFixed(2)
            this.presition = 100 - parseFloat((this.errors/this.position)*100).toFixed(2)
        },
        loop: function () {
            this.graph()
            this.nextLetter = this.text[0]
            const r = setInterval(() => {
                this.update()
                if (this.position === this.text.length) {
                    this.text = ""
                    this.win = true;
                    this.finished = true;
                    document.querySelector("#header").innerHTML = "You win"
                    clearInterval(r);
                } else if (this.finished) {
                    clearInterval(r);
                }
            }, 15)
        },
        opponentLoop: function () {
            this.beggins = true;
            const r = setInterval(() => {
                this.opponentPosition ++;
                if (this.opponentPosition === this.text.length) {
                    this.text = ""
                    this.win = false;
                    this.finished = true;
                    document.querySelector("#header").innerHTML = "You loose"
                    clearInterval(r);
                }
            }, 60000 / this.opponentSpeed)
        },
        graph: function () {
           
            
            console.log()
            
            
            
        
        }
    },
    created () { 
        const getSentences = async function () {
            const res = await fetch("https://api.generadordni.es/v2/text/paragraphs?results=100&sentences=1&language=es")
            if (res.status == 200) {
                const data = await res.json()
                return data
            } else {
                return ['Lengua, detalles llegas elegir ciudadano ninguno mi helicóptero perdedor entrada león decidí izquierda entienden mesa pérdida, cubrir aterrizar toma tienen preparada decirlo ciudadanos aguantar, bebé asunto llevaré creas solas mirada puerta, jardín invito oido chica alcalde prepara teme acaban costado sábado felicidad, temo hielo dc preparada pasaste fondos adonde ambulancia.']
            }
        }
        const s = getSentences();
        s.then(res => {
            console.log("asd",res.status);
            this.sentences = res;
            this.text = this.sentences[this.sentenceNumber];
            this.loop();
            this.counter();
            setTimeout(this.opponentLoop,5000);
            
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
    margin:0;
}
#app{
    position:relative;
    width:100vw;
    height:100vh;
    background-color:#b1ccd3;
}
#container{
    width:80%;
    /*border:1px solid black;*/
    text-align: center;
}
#main-input{
    width:80%;
    margin: 0 10%;
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
#counter{
    margin-right:20px;
}
#clock{
    position:absolute;
    right: 2vw;
    top:2vh;
}
#clock-icon{
    animation: seconds 1s infinite;
}

@keyframes seconds {
    0%, 100% {transform:scale(1.1)}
    10%, 90% {transform:none}
    
}
</style>
