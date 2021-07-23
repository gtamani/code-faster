<!--

GRAPH'S COMPONENT

@author: Giuliano Tamani

-->

<template>
<div :id="isSpeed" class="graph-svg">
    <div :id="isSpeed+isSpeed" ></div>
</div>
</template>

<script>

export default {
    name: 'Graph',
    data () {
        return {
            dataString:"",
            dataset:[],
            ykeys:"",
            goal:"",
            xmax:"",
        }
    },
    props: {
        newData:{
            type: Object,
        },
        isSpeed: String,
    },
    watch:{
        newData: function () {
            console.log("WATCHERRRRR",this.newData)
            this.createComponents();
            this.update();
        }
    },
    methods: {
        loadMorris: function () {
            /* Loads necessary scripts to run Morris, 
               Javascript library to plot graphs */
            
            const scripts = ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js",
                            "http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js",
                            "//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js",
                            "morris.css",
                            "morris.js",
                            "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.4.1/chart.min.js"]
            let i;
            for (i=0;i<scripts.length;i++) {
                let script = document.createElement('script')
                script.setAttribute('src', scripts[i])
                document.head.appendChild(script)
            }
        },
        createComponents: function () {
            /* Create components that Morris will use to place the data */
            const graph = document.querySelector("#"+this.isSpeed);
            try {
                graph.removeChild(document.querySelector("#"+this.isSpeed+this.isSpeed));
                graph.removeChild(document.querySelector("#graph-script"+this.isSpeed));
            } catch {console.log("created!")}
            let script = document.createElement('script')
            let graphDiv = document.createElement('div')
            script.setAttribute("id","graph-script"+this.isSpeed)
            graphDiv.setAttribute("id",this.isSpeed+this.isSpeed)
            graph.appendChild(script);
            graph.appendChild(graphDiv);

            // Set initial variables
            this.ykeys = this.isSpeed === "g1" ? "speed" : "presition"
            this.xmax = this.isSpeed === "g1" ? "auto" : "100"
        },
        update: function () {
            /*  Update chart's info  */

            this.dataString = "";
            this.dataset.push(this.newData);
            let i;
            let code;
            for (i=0;i < this.dataset.length;i++) {
                this.dataString += JSON.stringify(this.dataset[i]) + ",\n"
            }
            console.log(this.dataString)
            code = 
            ` 
                new Morris.Line({
                    element: '`+this.isSpeed+this.isSpeed+`',
                    data:[
                        `+this.dataString+`
                    ],
                    xkey: 'try',
                    ykeys: ['`+this.ykeys+`'],
                    ymax:'`+this.xmax+`',
                    ymin:'auto',
                    labels: ['Speed'],
                    hideHover: 'always',
                    yLabelFormat: function (y) { return parseFloat(y).toFixed(2); },
                    fillOpacity: 0.5
                });
            `
            console.log(code);
            document.querySelector("#graph-script"+this.isSpeed).innerHTML = code;
        }
    },
    mounted () {
        console.log(this.isSpeed)
        this.loadMorris();
        this.createComponents();
        this.update();
        console.log(this.newData)
    }
}
</script>

<style>
    .graph-svg{
        transform:scale(0.8);
        padding:0;
        margin:0
    }

    @media (max-width: 600px) {
        .graph-svg{
            transform:scale(0.7);
        }
    }

    @media (max-width: 450px) {
        .graph-svg{
            transform:scale(0.6);
        }
    }
    
</style>
