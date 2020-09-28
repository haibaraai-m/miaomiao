<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text"
                       v-model="searchStr">
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="(item) in movieList"
                    :key="item.id">
                    <div class="img"
                         @click="handleToDetails(item.id)">
                        <img :src="item.img | setWHC('128.180')">
                    </div>
                    <div class="info">
                        <p><span @click="handleToDetails(item.id)">{{item.nm}}</span>
                            <span>{{item.sc}}</span>
                        </p>
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
/* _.debounce 是一个通过 Lodash 限制操作频率的函数。 */
import _ from 'lodash'

export default {
    name: 'Search',
    data () {
        return {
            searchStr: '',
            movieList: []
        }
    },
    methods: {
        getResult () {
            var cityId = this.$store.state.city.id;
            this.axios.get('/ajax/search?kw=' + this.searchStr + '&cityId=' + cityId + '& stype=-1')
                .then(res => {
                    var movieList = res.data.movies;
                    if (movieList) {
                        this.movieList = movieList.list;
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        },
        handleToDetails (movieId) {
            this.$router.push('/movie/detail/3/' + movieId);
        }
    },

    watch: {
        searchStr: _.debounce(function () {
            this.getResult();
        }, 20)
    },
}
</script>

<style scoped>
#content .search_body {
    flex: 1;
    overflow: auto;
}

.search_body .search_input {
    padding: 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
}

.search_body .search_input_wrapper {
    padding: 0 10px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    line-height: 20px;
}

.search_body .search_input_wrapper i {
    font-size: 16px;
    padding: 4px 0;
}

.search_body .search_input_wrapper input {
    border: none;
    font-size: 13px;
    color: #333;
    padding: 4px 0;
    outline: none;
    margin-left: 5px;
    width: 100%;
}

.search_body .search_result h3 {
    font-size: 15px;
    color: #999;
    padding: 9px 15px;
    border-bottom: 1px solid #e6e6e6;
}

.search_body .search_result li {
    border-bottom: 1px #c9c9c9 dashed;
    padding: 10px 15px;
    box-sizing: border-box;
    display: flex;
}

.search_body .search_result .img {
    width: 60px;
    float: left;
}

.search_body .search_result .img img {
    width: 100%;
}

.search_body .search_result .info {
    float: left;
    margin-left: 15px;
    flex: 1;
}

.search_body .search_result .info p {
    height: 22px;
    display: flex;
    line-height: 22px;
    font-size: 12px;
}

.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
    font-size: 18px;
    flex: 1;
}

.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
    font-size: 16px;
    color: #fc7103;
}
</style>
