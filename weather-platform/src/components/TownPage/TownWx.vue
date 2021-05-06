<template>
    <div class="weather" v-for="i in townWxInfo">
        <div class="weatherWrap">
            <div class="weatherImg">
                <img :src="'images/weatherImg/'+i.wxV+'.svg'" :alt="i.wx">
            </div>
            <div class="location">
                <span><i class="fas fa-map-marker-alt"></i> {{ i.county }} {{ i.town }}</span>
            </div>
            <div class="ci">
                <span>{{ i.ci }}</span>
            </div>
            <div class="weatherIcon">
                <button class="temperature">
                    <i class="fas fa-temperature-low"></i>
                    <span>{{ i.minT }}~{{ i.maxT }}˚C</span>
                </button>
                <button class="pop">
                    <i class="fas fa-umbrella"></i>
                    <span>{{ i.pop }}<i>%</i></span>
                </button>
                <button class="uvi">
                    <i class="far fa-sun"></i>
                    <span>{{ i.uvi }}</span>
                </button>
                <button class="wind">
                    <i class="fas fa-wind"></i>
                    <span>{{ i.wd }}</span>
                    <span>(風速{{ i.ws }}級)</span>
                </button>
            </div>
        </div>
        <div class="weatherInfo">
            <div class="currentDate">
                <h1>{{ i.date[0] }} / {{ i.date[1] }} / {{ i.date[2] }}</h1>
            </div>
            <div class="weatherText">
                <ul>
                    <li>天氣現象：<span>{{ i.wx }}</span></li>
                    <li>濕度：<span>{{ i.rh }}</span><i>%</i></li>
                    <li>降雨機率：<span>{{ i.pop }}</span><i>%</i></li>
                    <li>溫度：<span>{{ i.minT }}～{{ i.maxT }}</span><i>˚C</i></li>
                    <li>體感溫度：<span>{{ i.minAT }}～{{ i.maxAT }}</span><i>˚C</i></li>
                    <li>紫外線指數：<span>{{ i.uviV }} ({{ i.uvi }})</span></li>
                    <li>風向：<span>{{ i.wd }}(風速{{ i.ws }}級)</span></li>
                    <li>舒適度：<span>{{ i.ci }}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['townWxInfo'],
}
</script>