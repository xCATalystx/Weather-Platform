const app = Vue.createApp({
    data(){
        return{
            selected: "",
            clicked: undefined,
            closed: undefined,
            // 縣市data
            countyValue: "13",
            countyWxData: [],
            countyId: [],
            countyWxInfo: [],
            countyWx: [],
        }
    },
    computed: {
        arrangeWxData(){
            let i;
            let countyInfo = [];
            for (i = 0; i < this.countyWxData.length; i++) {
                let wxs = this.countyWxData[i].weatherElement;
                let weatherData = {
                    county: this.countyWxData[i].locationName,
                    wx: wxs[0].time[0].parameter.parameterName,
                    wxV: wxs[0].time[0].parameter.parameterValue,
                    pop: wxs[1].time[0].parameter.parameterName,
                    minT: wxs[2].time[0].parameter.parameterName,
                    maxT: wxs[4].time[0].parameter.parameterName,
                    ci: wxs[3].time[0].parameter.parameterName,
                    id: this.countyId[i].id,
                    value: this.countyId[i].value,
                    date: ((wxs[0].time[0].startTime).split(' ')[0]).split('-'),
                };
                countyInfo.push(weatherData);
            };
            this.countyWxInfo = countyInfo;
            this.countyWx.push(countyInfo[this.countyValue]);
        },
        countySelect(event){
            this.countyWx.length = 0;
            this.countyValue = event.target.value;
            this.countyWx.push(this.countyWxInfo[this.countyValue]);
        },
        twMapSelect(event){
            this.countyWx.length = 0;
            this.countyValue = event.target.parentElement.getAttribute('value');
            this.countyWx.push(this.countyWxInfo[this.countyValue]);
        },
    },
    watch: {
    },
    methods: {

    },
    created(){
        // fetch各縣市氣象資料
        let countyWxData = fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-4D24F5BE-73F7-485A-94A0-AB7B5E86D535&format=JSON")
        .then(res => res.json())
        .then(res => this.countyWxData = res["records"].location);

        // fetch各縣市id
        let countyId = fetch("https://mocki.io/v1/fdfea774-a5f4-45f9-a02c-3a9865abb76c")
        .then(res => res.json())
        .then(res => this.countyId = res);

        // 整理縣市資料
        Promise.all([countyWxData, countyId])
        .then(a => this.arrangeWxData())
    },
}).mount('#app');