<template>
<div id="graph">
    <div id="myfirstchart" style="height: 250px;"></div>
</div>
</template>

<script>

export default {
    name: 'Graph',
    data () {
        return {
            data: [
                { year: '2008', value: 20 },
                { year: '2009', value: 10 },
                { year: '2010', value: 4 },
                { year: '2011', value: 13 },
                { year: '2012', value: 20 }
            ],
            dataString:""
        }
    },
    props: {
        dataset:{
            type: Array,
        }
    },
    methods: {
        loadMorris: function () {
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
        }
    },
    mounted () {
        this.loadMorris();
        console.log(this.data)
        const graph = document.querySelector("#graph");
        let script = document.createElement('script')
        let i;
        for (i=0;i < this.data.length;i++) {
            this.dataString += JSON.stringify(this.data[i]) + ",\n"
        }
        console.log(this.dataString)
        const code = 
        `
            new Morris.Line({
                element: 'myfirstchart',
                data:[
                    `+this.dataString+`
                ],
                xkey: 'year',
                ykeys: ['value'],
                labels: ['Value']
            });
        `
        script.innerHTML = code;
        graph.appendChild(script);
    }
}
</script>

<style>

</style>
