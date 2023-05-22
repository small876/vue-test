<template>
    <div class="main-nav">
        <div class="container clearfix">
        <div class="all-types leftfix">全部商品</div>
            <ul class="main-nav-list rightfix">
            <li><a href="#">novel</a></li>
            <li><a href="#">comic</a></li>
            <li><a href="#">science</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    name:'MainNav',
    data(){
        return{}
    }
    }
</script>

<style scoped>
/* #region start list*/

.main-nav{
  height: 48px;
  border-bottom: 1px solid #dd302d;
}

.main-nav .all-types{
  width: 190px;
  height: 48px;
  line-height:48px ;
  background-color: #dd302d;
  text-align: center;
  font-size: 16px;
  float : left;
}

.main-nav-list{
  height: 48px;
  line-height: 48px;
}

.main-nav-list li{
  float : left;
  margin: 0 10px;
  font-size: 20px; 
}
/* #endregion start list*/
</style>