<template>
  <div class="movie_body">
    <Scroller :data="movieList"
              :pulldown="pulldown"
              :listenScroll="listenScroll"
              @scroll="loadData"
              @pulldown="loadDataEnd">
      <ul>
        <li class="pullDown">{{ pullDownMsg }}</li>
        <li v-for="(item) in movieList"
            :key="item.id">
          <div class="pic_show"
               @click="handleToDetails"><img :src="item.img | setWH('@1l_1e_1c_128w_180h')"></div>
          <div class="info_list">
            <h2>{{item.nm}}
              <img v-if="(item.version).includes('2')"
                   src="@/assets/version.v2d.imax.png">
              <img v-else-if="(item.version).includes('3')"
                   src="@/assets/version.v3d.imax.png">
            </h2>
            <p>观众评 <span class="grade"
                    v-if="item.sc">{{item.sc}}</span>
              <span class="no-score"
                    v-else>暂无评分</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>

export default {
  name: 'NowPlaying',
  data () {
    return {
      movieList: [],
      listenScroll: true,
      pulldown: true,
      pullDownMsg: ''
    };
  },
  mounted () {
    this.loadDataEnd();
  },
  methods: {
    loadData (ev) {
      this.pullDownMsg = ev
    },
    loadDataEnd (ev) {
      this.axios.get('/ajax/movieOnInfoList').then((res => {
        this.pullDownMsg = ev
        setTimeout(() => {
          this.movieList = res.data.movieList;
          this.pullDownMsg = ''
        }, 1000);
      }));
    },
    handleToDetails () {
      console.log('handleToDetails');
    }
  },
}
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}

.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}

.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}

.movie_body .pic_show {
  width: 64px;
  height: 90px;
}

.movie_body .pic_show img {
  width: 100%;
}

.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}

.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}

.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}

.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .no-score {
  font-size: 14px;
  color: #777;
}

.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
