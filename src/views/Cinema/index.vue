<template>
  <div id="main">
    <Header Title="喵喵影院"></Header>
    <div id="content">
      <div class="cinema_menu">
        <router-link to="city" tag="div" class="city_switch">
          全城 <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <router-link to="brand" tag="div" class="brand_swtich">
          品牌 <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <router-link to="feature" tag="div" class="feature_switch">
          特色 <i class="iconfont icon-lower-triangle"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
export default {
  name: 'Cinema',
  components: {
    Header,
    TabBar
  }
}
</script>

<style scoped>
#content .cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}

#content .cinema_menu .router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
</style>
