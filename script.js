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
        // 鄉鎮data
        countyOptionValue: "071",
        townValue: "5",
        townOptionData: [],
        townOptionInfo: [],
        townWxData: [],
        townWxInfo: [],
        forecastInfo: [],
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
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
      countyOptionSelect(event){
        this.selected = "";
        this.townOptionInfo.length = 0;
        this.countyOptionValue = event.target.value;
        let townOptionData = fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${this.countyOptionValue}?Authorization=CWB-4D24F5BE-73F7-485A-94A0-AB7B5E86D535`)
        .then(res => res.json())
        .then(res => this.townOptionData = res["records"].locations[0].location);
        this.$options.methods.arrangeTownOption.bind(this)();

        Promise.all([townOptionData])
        .then(a => this.$options.methods.arrangeTownOption.bind(this)())
      },
      townOptionSelect(event){
        this.townWxInfo.length = 0;
        this.townValue = event.target.value;
        let townWxData = fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${this.countyOptionValue}?Authorization=CWB-4D24F5BE-73F7-485A-94A0-AB7B5E86D535`)
        .then(res => res.json())
        .then(res => this.townWxData = res["records"].locations[0]);
        this.$options.methods.arrangeTownWxData.bind(this)();
        this.$options.methods.arrangeForecast.bind(this)();

        Promise.all([townWxData])
        .then(a => this.$options.methods.arrangeTownWxData.bind(this)())
        .then(a => this.$options.methods.arrangeForecast.bind(this)())
      },
      arrangeTownOption(){
        let i;
        let townOption = [];
        for (i = 0; i < this.townOptionData.length; i++) {           
          const townSelectData = {
              i: i,
              town: this.townOptionData[i].locationName,
          };
          townOption.push(townSelectData);            
        };
        this.townOptionInfo = townOption;
      },
      arrangeTownWxData(){         
        let townInfo = [];
        let wxs = this.townWxData.location[this.townValue].weatherElement;
        let townWeatherData = {
          county: this.townWxData.locationsName,
          town: this.townWxData.location[this.townValue].locationName,
          date: ((wxs[0].time[0].startTime).split(' ')[0]).split('-'),
          wx: wxs[6].time[0].elementValue[0].value,
          wxV: wxs[6].time[0].elementValue[1].value,
          pop: wxs[0].time[0].elementValue[0].value,
          rh: wxs[2].time[0].elementValue[0].value,
          minT: wxs[8].time[0].elementValue[0].value,
          maxT: wxs[12].time[0].elementValue[0].value,
          minAT: wxs[11].time[0].elementValue[0].value,
          maxAT: wxs[5].time[0].elementValue[0].value,
          T: wxs[1].time[0].elementValue[0].value,
          uvi: wxs[9].time[0].elementValue[1].value,
          uviV: wxs[9].time[0].elementValue[0].value,
          wd: wxs[13].time[0].elementValue[0].value,
          ws: wxs[4].time[0].elementValue[1].value,
          ci: (wxs[10].time[0].elementValue[0].value).split('。')[3],
        };       
        townInfo.push(townWeatherData);
        this.townWxInfo = townInfo;
      },
      arrangeForecast(){
        this.forecastInfo.length = 0;
        let i;
        let forecast = [];
        let wxs = this.townWxData.location[this.townValue].weatherElement;
        for (i = 1; i < (wxs[0].time).length; i = i + 2){
          const forecastData = {
            date: ((wxs[0].time[i].startTime).split(' ')[0]).split('-'),
            wx: wxs[6].time[i].elementValue[0].value,
            wxV: wxs[6].time[i].elementValue[1].value,
            pop: wxs[0].time[i].elementValue[0].value,
            minT: wxs[8].time[i].elementValue[0].value,
            maxT: wxs[12].time[i].elementValue[0].value,
          };
          forecast.push(forecastData);
        };
        this.forecastInfo = forecast;
      },
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
      
      // fetch鄉鎮區氣象資料
      let townWxData = fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${this.countyOptionValue}?Authorization=CWB-4D24F5BE-73F7-485A-94A0-AB7B5E86D535`)
      .then(res => res.json())
      .then(res => this.townWxData = res["records"].locations[0])

      // 整理鄉鎮資料和氣象預報
      Promise.all([townWxData])
      .then(a => this.arrangeTownWxData())
      .then(a => this.arrangeForecast())
    },
}).mount('#app');