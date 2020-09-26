<template>
  <div class="movie_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller v-else
              :data="movieList">
      <ul>
        <li v-for="(item) in movieList"
            :key="item.id">
          <div class="pic_show"><img :src="item.img | setWH('@1l_1e_1c_128w_180h')"></div>
          <div class="info_list">
            <h2>{{item.nm}}</h2>
            <p><span class="person">{{item.wish}}</span> 人想看</p>
            <p>{{item.star}}</p>
            <p>{{item.rt}}上映</p>
          </div>
          <template v-if="item.showInfo">
            <div class="btn_pre">
              预售
            </div>
          </template>
          <template v-else>
            <div class="btn_wish">
              想看
            </div>
          </template>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: 'SoonPlaying',
  data () {
    return {
      isLoading: true,
      movieList: [],
      preCityId: -1
    }
  },
  activated () {
    var cityId = this.$store.state.city.id;
    if (this.preCityId === cityId) {
      return;
    }
    this.isLoading = true;
    this.axios.get('/ajax/comingList?token=&limit=10&ci=' + cityId)
      .then(res => {
        this.movieList = res.data.coming;
        this.preCityId = cityId;
        this.isLoading = false;
      })
      .catch(err => {
        console.error(err);
      })
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
.movie_body .btn_pre,
.movie_body .btn_wish {
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
.movie_body .btn_wish {
  background-color: #faaf00;
}
</style>
