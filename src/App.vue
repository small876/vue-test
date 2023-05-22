<template>
   <div class="root">
    <NewTopBar/>     
    <router-view></router-view>
  </div>
</template>

<script>
import NewTopBar from './website_frontend/NewTopBar.vue'

export default {
  name: 'App',
  components:{
    NewTopBar:NewTopBar,
  },

  data: () => ({
  }),
};
</script>