<template>
<div id="app" class="row" v-on:keydown="keyPressed">

    <div id="sidebar" class="col col-lg-2 p-2 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
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
            >
            Show timer
            </a>
        </li>
        
        </ul>
        <hr>
        <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
            <strong>gtamani</strong>
        </a>
        
        </div>
    </div>
    
    
    <div id='container' class="col">
        <div class="h-100 p-5 text-white bg-dark rounded-3">
          <h2>Type this sentence</h2>
          <div>
            <prompter
            :text='text'
            :opponent='opponentPosition'
            :well='position'
            :wrong='lettersToPosition'/>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">✏️</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <button class="btn btn-outline-light" type="button" @click="nextParagraph">Siguiente</button>
    </div>
        <div id="clock" v-if="show">
            {{minutes}} : {{seconds}}      - {{speed}}
        </div>
        <!--button @click="changeVisibility">Show/Don't show next letter</button-->
        
        <div v-if="show">
            {{ nextLetter }} - {{position}} - {{lettersToPosition}} - {{words}} - {{opponentPosition}}
        </div>
    </div>
    
    
</div>
</template>

<script>
import Prompter from './components/Prompter'
export default {
    name: 'App',
    components: {
        Prompter
    },
    data () {
        return {
            // Text data
            show: false,
            sentences: [],
            sentenceNumber: 0,
            text: 'Lengua, detalles llegas elegir ciudadano ninguno mi helicóptero perdedor entrada león decidí izquierda entienden mesa pérdida, cubrir aterrizar toma tienen preparada decirlo ciudadanos aguantar, bebé asunto llevaré creas solas mirada puerta, jardín invito oido chica alcalde prepara teme acaban costado sábado felicidad, temo hielo dc preparada pasaste fondos adonde ambulancia.',
            position: 0,
            lettersToPosition: 0,
            words: 0,
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
            speed: 0
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
                    this.position += 1;
                    const next = this.text[this.position];
                    if (next == " ") {this.words += 1}
                    this.nextLetter = next;
                } else {
                    if (e.key === "Backspace") {
                        if (this.position >= 0) {
                            if (this.lettersToPosition === 0) {
                                this.position -= 1;
                                const next = this.text[this.position];
                                this.nextLetter = next;
                            } else {
                                this.lettersToPosition -= 1;
                            }
                        }
                    } else {
                        this.lettersToPosition += 1;
                    }
                }
            }
        },
        nextParagraph: function() {
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
            this.seconds = (this.difference - this.minutes*60000) / 1000
            this.speed = 60000 / (this.difference / this.words)
        },
        loop: function () {
            this.nextLetter = this.text[0]
            setInterval(() => {
                this.update()
                if (this.position === this.text.length) {
                    this.text = "USER WINS"
                }
            }, 15)
        },
        opponentLoop: function () {
            setInterval(() => {
                this.opponentPosition ++;
                if (this.opponentPosition === this.text.length) {
                    this.text = "MACHINE WINS"
                }
            }, 60000 / this.opponentSpeed)
        }
    },
    created () { 
        const getSentences = async function () {
            const res = await fetch("https://api.generadordni.es/v2/text/paragraphs?results=100&sentences=1&language=es")
            const data = await res.json()
            return data
        }
        const s = getSentences();
        s.then(res => {
            this.sentences = res;
            this.text = this.sentences[this.sentenceNumber];
            this.loop();
            this.opponentLoop();
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
    
    /*border:1px solid black;*/
    text-align: center;
}
#red{
    background-color: #860F0F;
}
#green{
    background-color: #0F8637;
}
</style>
