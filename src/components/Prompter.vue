<!--

PROMPTER'S COMPONENT

@author: Giuliano Tamani

-->

<template>
<div id="prompter" v-html="renderized"></div>
</template>

<script>
export default {
    name: 'Prompter',
    props: {
        text: {
            type: String,
        },
        opponent: Number,
        activateOpponent: Boolean,
        well: Number,
        wrong: Number,
    },
    data () {
        return {
            bar: "<span id='bar'></span>", // Html's code for opponent's vursor
            green:"", //
            red:"",
            yellow:"",
            result:""
        }
    },
    methods: {
        beforeRendering: function () {
            /* Strips text in three segments: 
                1. Code written correctly
                2. Code written, but incorrect.
                3. Code left to be written. */

            let point1 = this.well;
            let point2 = this.well+this.wrong;
            let point3 = this.text.length+1;
            
            this.green = this.text.slice(0,point1);
            this.red = this.text.slice(point1,point2);
            this.left = this.text.slice(point2,point3);

            /* Place opponent cursor before text rendering. */

            if (!this.activateOpponent) {

                if (this.opponent > point2){
                    let opponent = this.opponent - point2
                    this.left = this.left.slice(0,opponent) + this.bar + this.left.slice(opponent,this.left.length)
                } else if (this.opponent > point1) {
                    let opponent = this.opponent - point1
                    this.red = this.red.slice(0,opponent)+this.bar+this.red.slice(opponent,this.red.length)
                } else {
                    this.green = this.green.slice(0,this.opponent)+this.bar+this.green.slice(this.opponent,this.green.length)
                }
            }
        }
    },
    computed: {
        renderized(){
            this.beforeRendering()
            return "<span id='green'>"+this.green+"</span><span id='red'>"+this.red+"</span>"+this.left;
        }
    }
}
</script>

<style>

#bar{
    border-left: 1px solid white;
    animation: spark 1s infinite;
}

</style>
