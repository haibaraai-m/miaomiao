<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading"></Loading>
      <Scroller v-else
                :data="[city_lists, hot_list]"
                ref="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="(hot_city) in hot_list"
                  :key="hot_city.id">{{hot_city.nm}}</li>
            </ul>
          </div>
          <div class="city_sort"
               ref="city_sort">
            <div v-for="(city_list) in city_lists"
                 :key="city_list.index">
              <h2>{{city_list.index}}</h2>
              <ul>
                <li v-for="(city) in city_list.list"
                    :key="city.id">{{city.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(city_sort,index) in city_lists"
            :key="city_sort.index"
            @touchstart="handleToIndex(index)">{{city_sort.index}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
/**
 *汉字转换库，方便城市中文转换为拼音
 * https://github.com/theajack/cnchar
 */
/* import cnchar from 'cnchar'; */

export default {
  name: 'City',
  data () {
    return {
      isLoading: true,
      city_lists: [],
      hot_list: [],
    };
  },
  mounted () {
    this.axios.get('/dianying/cities.json').then((res) => {
      var city_info = res.data.cts;
      var { city_lists, hot_list } = this.formatCityList(city_info);
      this.city_lists = city_lists;
      this.hot_list = hot_list;
      this.isLoading = false
    });
  },
  methods: {
    /* 格式如下：
      {
        index: 'A',
        list[{
          name: '北京',
          id: '1'
          }...]
        } */
    formatCityList (city_info) {
      var city_lists = [];
      var hot_list = [];

      for (var i = 0; i < city_info.length; i++) {
        var first_letter = city_info[i].py.substring(0, 1);
        if (toCom(first_letter)) {
          //已存在,累积添加
          for (var j = 0; j < city_lists.length; j++) {
            if (first_letter === city_lists[j].index) {
              city_lists[j].list.push({
                nm: city_info[i].nm,
                id: city_info[i].id,
              });
            }
          }
        } else {
          //不存在
          city_lists.push({
            index: first_letter,
            list: [
              {
                nm: city_info[i].nm,
                id: city_info[i].id,
              },
            ],
          });
        }
      }

      city_lists.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      function toCom (first_letter) {
        for (var i = 0; i < city_lists.length; i++) {
          if (first_letter === city_lists[i].index) {
            return true;
          }
        }
        return false;
      }

      for (var i = 0; i < 11; i++) {
        hot_list.push(city_info[i]);
      }

      return {
        city_lists,
        hot_list
      };
    },

    handleToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2');
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_list.scrollTo(0, -h2[index].offsetTop)
    },
  },
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}

.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}

.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}

.city_body .city_hot {
  margin-top: 20px;
}

.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}

.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}

.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}

.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
