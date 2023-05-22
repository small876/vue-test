<template>
    <div class="header">
      <div class="container">
        <div class="logo">
          <img src=" " alt="nothing">
          <div class="searchbar">
          <form action="#">
              <input type="text">
              <button> search </button>
          </form>  
        </div>

        </div>
        
      </div>
  </div>
</template>

<script>


export default{
    name:'WebHeader',
    data(){
        return{}
    },
}


</script>

<style scoped>
 /* #region start body*/
.header{
  height: 120px;
  background-color: skyblue;
}

.header .container{
  line-height: 120px;
}

.header .searchbar{
  float: right;
}

.searchbar input{
  width: 510px;
  height: 36px;
  border: 1px solid #dd302d;
}

.searchbar button{
  width: 80px;
  height: 36px;
  background-color: #dd302d;
}
/* #endregion start body*/   

</style>