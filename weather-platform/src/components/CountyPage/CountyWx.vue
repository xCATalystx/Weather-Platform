<template>
    <div class="countyWeather">
        <div class="countySearch">
            <label>
                <select name="countySelectBar" id="countySelectBar" @change="countySelect($event)">
                    <option value disabled selected>選擇縣市</option>
                    <optgroup label="北部地區">
                        <option value="18">基隆市</option>
                        <option value="1">新北市</option>
                        <option value="5">臺北市</option>
                        <option value="13">桃園市</option>
                        <option value="3">新竹縣</option>
                        <option value="4">新竹市</option>
                        <option value="7">宜蘭縣</option>
                    </optgroup>
                    <optgroup label="中部地區">
                        <option value="8">苗栗縣</option>
                        <option value="11">臺中市</option>
                        <option value="14">南投縣</option>
                        <option value="20">彰化縣</option>
                        <option value="9">雲林縣</option>
                    </optgroup>
                    <optgroup label="南部地區">
                        <option value="0">嘉義縣</option>
                        <option value="2">嘉義市</option>
                        <option value="6">臺南市</option>
                        <option value="15">高雄市</option>
                        <option value="17">屏東縣</option>
                    </optgroup>
                    <optgroup label="東部地區">
                        <option value="12">臺東縣</option>
                        <option value="10">花蓮縣</option>
                    </optgroup>
                    <optgroup label="外島地區">
                        <option value="19">澎湖縣</option>
                        <option value="16">金門縣</option>
                        <option value="21">連江縣</option>
                    </optgroup>            
                </select>
            </label>
        </div>
        <div class="countyWxPage" v-for="i in countyWx">
            <div class="wxPage1">
                <div class="wxPageLocation">
                    <span><i class="fas fa-map-marker-alt"></i> {{ i.county }}</span>
                </div>
                <div class="wxPageImg">
                    <img :src="'images/weatherImg/'+i.wxV+'.svg'" :alt="i.wx">
                </div>
            </div>
            <div class="wxPage2">
                <div>
                    <span> {{ i.date[1] }} / {{ i.date[2] }}</span>
                </div>
                <div>
                    <li><span>{{ i.wx }}</span></li>
                    <li><span><i class="fas fa-temperature-low"></i> {{ i.minT }} ~ {{ i.maxT }}</span><i>˚C</i></li>
                    <li><span><i class="fas fa-umbrella"></i> {{ i.pop }}</span><i>%</i></li>
                    <li><span>{{ i.ci }}</span></li>
                </div>
            </div>
        </div>
    </div>
</template>
