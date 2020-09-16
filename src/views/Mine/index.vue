<template>
  <div id="main">
    <Header Title="我的喵喵"></Header>
    <div class="content">
      <Login></Login>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Login from '@/components/Login';
export default {
  name: 'Mine',
  components: {
    Header,
    Login,
    TabBar
  }
}
</script>

<style>
</style>
