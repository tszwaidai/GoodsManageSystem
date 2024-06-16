<template>
  <div class="app"> 
    <h1>欢迎您：{{ name }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      name: 'name' // 将 Vuex 的 getter 'name' 映射到组件的计算属性 'username'
    })
  }
}
</script>

<style lang="scss" scoped>
.app {
  background-image: url('/src/assets/404_images/login.jpg');
  background-size: 100%;

}


</style>
