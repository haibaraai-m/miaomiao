<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller v-else
              :data="cinemaList">
      <ul>
        <li v-for="item in cinemaList"
            :key="item.id">
          <div>
            <span>{{item.nm}}</span>
            <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div class="card">
            <span v-for="(value,key) in item.tag"
                  :key="key">
              <div :class="key | formatColor(key)"
                   v-if="value===1">
                {{key | formatKey(key)}}
              </div>
            </span>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: 'Brand',
  data () {
    return {
      isLoading: true,
      cinemaList: []
    }
  },
  mounted () {
    this.axios.get('/ajax/cinemaList?ci=10')
      .then(res => {
        this.cinemaList = res.data.cinemas
        this.isLoading = false
      })
      .catch(err => {
        console.error(err)
      })
  },

  filters: {
    formatKey (key) {
      var card = [
        { key: 'allowRefund', value: '可改签' },
        { key: 'endorse', value: '可退票' },
        { key: 'snack', value: '小吃卡' },
        { key: 'sell', value: '折扣卡' },
      ];
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return '';
    },
    formatColor (key) {
      var color = [
        { key: 'allowRefund', value: 'or' },
        { key: 'endorse', value: 'or' },
        { key: 'snack', value: 'bl' },
        { key: 'sell', value: 'bl' },
      ];
      for (let i = 0; i < color.length; i++) {
        if (color[i].key === key) {
          return color[i].value;
        }
      }
      return '';
    }
  }
}
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}

.cinema_body ul {
  padding: 20px;
}

.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}

.cinema_body div {
  margin-bottom: 10px;
}

.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}

.cinema_body .price {
  font-size: 18px;
}

.cinema_body .address {
  font-size: 13px;
  color: #666;
}

.cinema_body .address span:nth-of-type(2) {
  float: right;
}

.cinema_body .card {
  display: flex;
}

.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}

.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}

.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
