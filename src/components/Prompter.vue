<template>


<div v-html="renderized"></div>

</template>

<script>
export default {
    name: 'Prompter',
    props: {
        text: String,
        well: Number,
        wrong: Number,
    },
    template: "<div v-html = renderized></div>",
    computed: {
        renderized(){
            return "<span id='green'>"+this.text.slice(0,this.well)+"</span><span id='red'>"+this.text.slice(this.well,this.well+this.wrong)+"</span>"+this.text.slice(this.well+this.wrong,this.text.length+1);
        }
    }
}
</script>


