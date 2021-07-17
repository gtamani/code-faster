<template>
  <div id="app" v-on:keydown="keyPressed">
    <div id="clock" v-if="show">
        {{minutes}} : {{seconds}}      - {{speed}}
    </div>
    <button @click="changeVisibility">Show/Don't show next letter</button>
    <div>
      <prompter 
      :text = "text"
      :well = "position"
      :wrong = "lettersToPosition"/>
    </div>
    <div v-if="show">
        {{ nextLetter }} - {{position}} - {{lettersToPosition}} - {{words}}
    </div>
    <input type="text">
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
      show: true,
      text: 'Sin embargo, la posibilidad de utilizar publicidad en Wikipedia provocó una reacción de parte de los contribuyentes de la Wikipedia en español, motivo que llevó a la creación de la Enciclopedia Libre Universal en Español en febrero de 2002.',
      position: 0,
      lettersToPosition: 0,
      words: 0,
      started: new Date(Date.now()),
      unvalidKeyCodes: [17,16,20,9,18,27,222,13],
      sameLetter: false,
      // Clock data
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      difference: 0,
      speed: 0
    }
  },
  methods: {
      changeVisibility: function() {
          this.show = !this.show
      },
      keyPressed: function(e) {
          console.log("token");
          this.sameLetter = e.key === this.nextLetter ? true : false;
          if (this.unvalidKeyCodes.indexOf(e.keyCode) == -1) {
              if (this.sameLetter && this.lettersToPosition == 0) {
                  this.position += 1;
                  const next = this.text[this.position];
                  if (next == " ") {this.words += 1}
                  this.nextLetter = next;
              } else {
                  if (e.key == "Backspace") {
                      if (this.position >= 0) {
                          if (this.lettersToPosition == 0) {
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
      update: function() {
          let date = new Date(Date.now()) 
          this.difference = date.getTime() - this.started.getTime();
          this.minutes = parseInt(this.difference / 60000);
          this.seconds = (this.difference-this.minutes*60000) / 1000;
          this.speed = 60000 / (this.difference/this.words)
      },
      loop: function() {
          this.nextLetter = this.text[0]
          setInterval(() => {
              this.update()
          }, 15);
      }
  },
  created () {
      this.loop();
  }
}
</script>

<style>
#red{
    background-color: red;
}
#green{
    background-color: greenyellow;
}
</style>
