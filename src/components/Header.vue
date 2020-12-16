<template>
    <div id="div">
      <el-row type="flex">
        <!-- 导航图标开始 -->
        <el-col :span="5">
          <div>
            <img src="../../public/images/icon.png">
          </div>
        </el-col>
        <!-- 导航图标结束 -->
        <!-- 导航中间跳转链接开始 -->
        <el-col :span="14">
          <div id="zong">
            <div @click="d(0)" :class="{active:0 == isActive}">
              <router-link to="/Introduction">病毒介绍</router-link>
            </div>
            <div @click="d(1)" :class="{active:1 == isActive}">
              <router-link to="/" >国内疫情</router-link>
            </div>
            <div @click="d(2)" :class="{active:2 == isActive}">
              <router-link to="/guowai">国外疫情</router-link>
            </div>
            <div @click="d(3)" :class="{active:3 == isActive}">
              <router-link to="/keshihua">可视化数据</router-link>
            </div>
          </div>
        </el-col>
        <!-- 导航中间跳转链接结束 -->
        <!-- 导航右侧设置 -->
        <el-col :span="5"></el-col>
        <!-- 导航右侧设置 -->
      </el-row>
    </div>
    <!-- <img src="../../public/images/bj.png"> -->
</template>


<script>
export default {
  data(){
    return{
      i:0,
      isActive:0
    }
  },

  methods:{
    d(i){
      this.isActive=i
    }
  }
}
</script>



<style scoped>
#div{
  background-color: #000000;
  /* margin-bottom: 50px; */
}
img{
  margin: 10px 0 0 20px;
  height: 40px;
}

a{
  text-decoration: none;
  color: #fff;
}
#zong{
  display: flex;
  justify-content: center;
}
#zong>div>a{
  display: block;
  padding: 20px 35px;
}
/* #zong>div>a:hover{
  color: #000;
  background-color: #fff;
}
#zong>div>a:focus{
  color: #000;
  background-color: #fff;
} */
.active{
  /* color: #000; */
  background-color: #fff;
}
.active>a{
  color:#000
}
</style>