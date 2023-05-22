<template>
    <div class="main-content">
        <div class="container clearfix">
            <div class="slide-left">
                <li>
                <a href="#">number</a>
                <div class="second-menu">
                    <dl>
                    <dt><a href="#">TestTitle1</a></dt>
                    <dd><a href="#">Test2</a></dd>
                    <dd><a href="#">Test3</a></dd>
                    <dd><a href="#">Test4</a></dd>
                    </dl>
                </div>
                </li>
                <li><a href='#'>電子書．有聲．訂閱</a></li>
                <li><a href='#'>中文書．簡體．外文</a></li>
                <li><a href='#'>雜誌．日文書</a></li>
                <li><a href='#'>CD,DVD</a></li>
                <li><a href='#'>創意生活</a></li> 
                <li><a href='#'>美妝時尚</a></li> 
                <li><a href='#'>售票</a></li>          
            </div> 
            
            <div class="banner"></div>

            <div class="slide-right ">
                <div class="message">
                <div class="title">
                    <span >最新消息</span>
                    <a href="#">更多消息&gt;</a>
                </div>
                <div class="message-list">
                    <li><a href='#'>List1 </a></li>
                    <li><a href='#'>List2 </a></li>
                    <li><a href='#'>List3 </a></li>
                    <li><a href='#'>List4 </a></li>
                </div>
                </div>
                <div class="other-nav">
                <ul class="other-nav-list">
                    <li>
                        <div class="picture"></div>
                        <span>Book</span>
                    </li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
                <ul class="other-nav-list">
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                </ul>
                <ul class="other-nav-list">  
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li>12</li>
                </ul>  
                </div>
            </div>          
        </div>
        <div class="clearfix"></div>
    </div>

       
</template>

<script>
export default{
    name:'MainContent',
    data(){
        return{}
    }
    }
</script>

<style scoped>
/* #region start mainlist*/

.main-content{
  margin-top: 20px;
}

.container{
  flex-wrap: nowrap;
}

.main-content .slide-left{
  width: 190px;
  height: 458px;
  background-color: whitesmoke;
  float: left;
  position: relative;
  padding-top: 10px;
}

.main-content .slide-left li{
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  /* margin: 10px 10px;   hover會隨margin縮小*/
  padding-left: 14px;
}

.main-content .slide-left li:hover{
  background-color: #dd302d;
}

.main-content .slide-left li:hover>a{
  color: azure;
}

.main-content .slide-left li:hover .second-menu{
  display:block;
}

.second-menu{
  width: 680px;
  height: 458px;
  background-color: white;
  position: absolute;
  top: 0; 
  left: 190px;
  padding-left: 20px;  /*padding會令整個second-menu一起移動 width減回來*/
  display: none;      /*一開始不顯示*/
  } 

.second-menu dl:first-child{
  margin-top: 10px;
}

.second-menu dl{
  height: 36px;
  line-height: 36px;
}

.second-menu dt{
  float: left;
  width: 70px;
  font-weight: bold;
  margin-right: 0;
}

.second-menu dd{
  float: left;
}

.second-menu dd a{
  padding: 0 10px;
  border-left: 1px solid #666;
}

.banner{
    width: 690px;
    height: 458px;
    background-color: grey;
    float:left;
    margin: 0 10px;
}


.main-content .slide-right{
  width: 250px;
  height: 458px;
  background-color: whitesmoke;
  float:left;
}

.slide-right .message{
  width: 220px;
  height: 156px;
  padding: 0 14px;
  border:1px solid #d9d9d9 /* border padding也會影響message長寬 須減掉長寬 */
}  

.slide-right .message .title{
  height: 38px;
  line-height: 38px;
  border-bottom: 1px solid #d9d9d9;
}

.slide-right .message .title span{
  float: left;
  font-size: 18px;
}

.slide-right .message .title a {
  float: right;
  font-size: 14px;
}

.slide-right .message-list li {
  height: 26px;
  line-height: 26px;
}

.slide-right .other-nav {
  margin-top: 10px;
  width: 250px;
  height: 290px;
  background-color: gray;
  overflow: hidden;
}

.slide-right .other-nav-list:first-child {
  margin-top: 16px; /* margin-top有可能被父元素搶走 需加在父元素+hidden */
  overflow: hidden;
  text-align: center;
}

.slide-right .other-nav-list:nth-child(2) {
  margin: 17px 0;
  overflow: hidden;
}

.slide-right .other-nav-list li{
  width: 48px;
  height: 70px;
  background-color: skyblue;
  float:left;
  margin: 0 7px;
}

.slide-right .other-nav-list .picture{
  width: 48px;
  height: 48px;
  /* background-image: url(''); */
}

/* #endregion start mainlist*/
</style>