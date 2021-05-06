<template>
  <div id="town">
    <div class="searchBar">
      <label>
        <select name="countySelect" id="countySelect" @change="countyOptionSelect($event)">
          <option value disabled selected>選擇縣市</option>
          <optgroup label="北部地區">
            <option value="051">基隆市</option>
            <option value="071">新北市</option>
            <option value="063">臺北市</option>
            <option value="007">桃園市</option>
            <option value="011">新竹縣</option>
            <option value="055">新竹市</option>
            <option value="003">宜蘭縣</option>
          </optgroup>
          <optgroup label="中部地區">
            <option value="015">苗栗縣</option>
            <option value="075">臺中市</option>
            <option value="023">南投縣</option>
            <option value="019">彰化縣</option>
            <option value="027">雲林縣</option>
          </optgroup>
          <optgroup label="南部地區">
            <option value="031">嘉義縣</option>
            <option value="059">嘉義市</option>
            <option value="079">臺南市</option>
            <option value="067">高雄市</option>
            <option value="035">屏東縣</option>
          </optgroup>
          <optgroup label="東部地區">
            <option value="039">臺東縣</option>
            <option value="043">花蓮縣</option>
          </optgroup>
          <optgroup label="外島地區">
            <option value="047">澎湖縣</option>
            <option value="087">金門縣</option>
            <option value="083">連江縣</option>
          </optgroup>
        </select>
        <select
          name="townSelect"
          id="townSelect"
          @change="townOptionSelect($event)"
          v-model="selected"
        >
          <option value disabled selected>選擇鄉鎮</option>
          <option v-for="i in townOptionInfo" :value="i.i">{{ i.town }}</option>
        </select>
      </label>
    </div>
    <div class="mainPage">
      <TownWx :townWxInfo="townWxInfo"></TownWx>
    </div>
    <footer class="weatherForecast">
      <Forecast :forecastInfo="forecastInfo"></Forecast>
    </footer>
  </div>
</template>

<script>
import TownWx from "@/components/TownPage/TownWx";
import Forecast from "@/components/TownPage/Forecast";

export default {
  name: "TownPage",
  components: {
    TownWx,
    Forecast,
  },
  data() {
    return {
      selected: "",
      // 鄉鎮data
      countyOptionValue: "071",
      townValue: "19",
      townOptionData: [],
      townOptionInfo: [],
      townWxData: [],
      townWxInfo: [],
      forecastInfo: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    countyOptionSelect(event) {
      this.selected = "";
      this.townOptionInfo.length = 0;
      this.countyOptionValue = event.target.value;
      let townOptionData = fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${this.countyOptionValue}?Authorization=CWB-4D24F5BE-73F7-485A-94A0-AB7B5E86D535`
      )
        .then((res) => res.json())
        .then(
          (res) => (this.townOptionData = res["records"].locations[0].location)
        );
      this.$options.methods.arrangeTownOption.bind(this)();

      Promise.all([townOptionData]).then((a) =>
        this.$options.methods.arrangeTownOption.bind(this)()
      );
    },
    townOptionSelect(event) {
      this.townWxInfo.length = 0;
      this.townValue = event.target.value;
      let townWxData = fetch(
        `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${this.countyOptionValue}?Authorization=CWB-4D24F5BE-73F7-485A-94A0-AB7B5E86D535`
      )
        .then((res) => res.json())
        .then((res) => (this.townWxData = res["records"].locations[0]));
      this.$options.methods.arrangeTownWxData.bind(this)();
      this.$options.methods.arrangeForecast.bind(this)();

      Promise.all([townWxData])
        .then((a) => this.$options.methods.arrangeTownWxData.bind(this)())
        .then((a) => this.$options.methods.arrangeForecast.bind(this)());
    },
    arrangeTownOption() {
      let i;
      let townOption = [];
      for (i = 0; i < this.townOptionData.length; i++) {
        const townSelectData = {
          i: i,
          town: this.townOptionData[i].locationName,
        };
        townOption.push(townSelectData);
      }
      this.townOptionInfo = townOption;
    },
    arrangeTownWxData() {
      let townInfo = [];
      let wxs = this.townWxData.location[this.townValue].weatherElement;
      let townWeatherData = {
        county: this.townWxData.locationsName,
        town: this.townWxData.location[this.townValue].locationName,
        date: wxs[0].time[0].startTime.split(" ")[0].split("-"),
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
        ci: wxs[10].time[0].elementValue[0].value.split("。")[3],
      };
      townInfo.push(townWeatherData);
      this.townWxInfo = townInfo;
    },
    arrangeForecast() {
      this.forecastInfo.length = 0;
      let i;
      let forecast = [];
      let wxs = this.townWxData.location[this.townValue].weatherElement;
      for (i = 1; i < wxs[0].time.length; i = i + 2) {
        const forecastData = {
          date: wxs[0].time[i].startTime.split(" ")[0].split("-"),
          wx: wxs[6].time[i].elementValue[0].value,
          wxV: wxs[6].time[i].elementValue[1].value,
          pop: wxs[0].time[i].elementValue[0].value,
          minT: wxs[8].time[i].elementValue[0].value,
          maxT: wxs[12].time[i].elementValue[0].value,
        };
        forecast.push(forecastData);
      }
      this.forecastInfo = forecast;
    },
  },
  created() {
    // fetch鄉鎮區氣象資料
    let townWxData = fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-${this.countyOptionValue}?Authorization=CWB-4D24F5BE-73F7-485A-94A0-AB7B5E86D535`
    )
      .then((res) => res.json())
      .then((res) => (this.townWxData = res["records"].locations[0]));

    // 整理鄉鎮資料和氣象預報
    Promise.all([townWxData])
      .then((a) => this.arrangeTownWxData())
      .then((a) => this.arrangeForecast());
  },
};
</script>
