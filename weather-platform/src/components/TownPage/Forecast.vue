<template>
    <div class="weekWeather">
        <div class="dayWeather" v-for="i in forecastInfo">
            <div class="forecastInfo">
                <li class="forecastDate"><span> {{ i.date[1] }}/{{ i.date[2] }}</span></li>
                <li><span>{{ i.wx }}</span></li>
                <li><span><i class="fas fa-temperature-low"></i> {{ i.minT }}~{{ i.maxT }}˚C</span></li>
                <li><span><i class="fas fa-umbrella"></i>{{ i.pop }}<i>%</i></span></li>
            </div>
            <img :src="'images/weatherImg/'+i.wxV+'.svg'" :alt="i.wx">
            <div class="timeInfo">
                <p>{{ i.date[1] }}/{{ i.date[2] }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['forecastInfo'],
    }
</script>
