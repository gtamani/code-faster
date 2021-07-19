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
        well: Number,
        wrong: Number,
    },
    data () {
        return {
            bar: "<span id='bar'></span>",
            green:"",
            red:"",
            yellow:"",
            result:""
        }
    },
    methods: {
        add_cursor: function () {
            let point1 = this.well;
            let point2 = this.well+this.wrong;
            let point3 = this.text.length+1;
            //
            this.green = this.text.slice(0,point1);
            this.red = this.text.slice(point1,point2);
            this.left = this.text.slice(point2,point3);
            //
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
    },
    computed: {
        renderized(){
            this.add_cursor()
            return "<span id='green'>"+this.green+"</span><span id='red'>"+this.red+"</span>"+this.left;
        }
    }
}
</script>

<style>
#prompter{
    /*border:1px solid black;*/
    padding:4rem;
}
#bar{
    border-left: 1px solid white;
    animation: spark 1s infinite;
}

</style>
