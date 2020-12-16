<template>
  <div>
    <!-- 页头导入 -->
    <el-header></el-header>
    <!-- 页头 -->
    <!-- 数据说明开始 -->
    <el-divider @click="drawer = true" content-position="center">
      <p class="el-icon-warning-outline">数据说明</p>
    </el-divider>
    <!-- 数据说明点击弹出 -->
    <el-drawer :visible.sync="drawer">
      <div class="divider">
        <h2>数据说明</h2>
        <p>1. 数据来源：</p>
        <p>
          来自国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道公开数据<br />定时获取疫情数据，保存疫情数据变更情况，以备跟踪研究和数据图表化展示。
        </p>
        <p>2. 实时数据统计原则：</p>
        <p>
          a)
          每日上午优先将全国数据与国家卫健委公布数据对齐（此时各省市数据尚未及时更新，会出现全国数据大于各省份合计数的情况）。
          <br />
          b) 当各省公布数据总和大于国家公布数据时，则全国数据切换为各省合计数。
          <br />
          c)「较昨日+」的数据使用当前国家总数减去国家卫健委公布的前一日数据，这个数值会根据实时数据发生变化。
          <br />
          d)
          疑似数据「较昨日+」因为会有转确诊与排除疑似两种情况，因此只采用国家每日公布的新增疑似数据，而不是两日的差异。
          <br />
        </p>
      </div>
    </el-drawer>
    <!-- 数据说明结束 -->
    <!-- 当前时间 / 最新数据更新时间开始 -->
    <div style="margin:24px 0">
      <el-row :gutter="10" type="flex" justify="end">
        <el-col :span="5">
          <el-card shadow="hover">
            <p :span="4" v-text="`当前北京时间：${this.dangqianshijian}`"></p>
          </el-card>
        </el-col>
        <el-col :span="5" justify="center">
          <el-card shadow="hover">
            <p>
              <button class="el-icon-refresh shuaxin" @click="shuaxin"></button>
              数据最新更新时间为：{{zuixinshijian}}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 当前时间 / 最新数据更新时间结束 -->
    <!-- 各种数据开始 -->
    <div>
      <!-- type="flex" -->
      <el-row :gutter="10" class="shuju">
        <!-- 现有确诊 -->
        <el-col :span="4">
          <el-card shadow="hover">
            <div style="text-align:center">
              <p>现有确诊</p>
              <p style="color: rgb(247, 76, 49);">
                {{ shuju.currentConfirmedCount }}
              </p>
              <p
                v-if="shuju.currentConfirmedIncr == null"
                style="font-size:10px"
              >
                数据更新中~
              </p>
              <p
                v-else-if="shuju.currentConfirmedIncr == 0"
                style="font-size:10px"
              >
                较昨日数据未变化
              </p>
              <p v-else>
                较昨日:
                <span style="color: rgb(247, 76, 49);">
                  {{
                    shuju.currentConfirmedIncr > 0
                      ? "+" + shuju.currentConfirmedIncr
                      : shuju.currentConfirmedIncr
                  }}
                </span>
              </p>
            </div>
          </el-card>
        </el-col>

        <!-- 现有无症状沾染着 -->
        <el-col :span="4">
          <el-card shadow="hover">
            <div style="text-align:center">
              <p>现有无症状沾染者</p>
              <p style="color: rgb(162, 90, 78);">{{ shuju.seriousCount }}</p>
              <p v-if="shuju.seriousIncr == null" style="font-size:10px">
                数据更新中~
              </p>
              <p v-else-if="shuju.seriousIncr == 0" style="font-size:10px">
                较昨日数据未变化
              </p>
              <p v-else>
                较昨日:
                <span style="color: rgb(162, 90, 78)">
                  {{
                    shuju.seriousIncr > 0
                      ? "+" + shuju.seriousIncr
                      : shuju.seriousIncr
                  }}
                </span>
              </p>
            </div>
          </el-card>
        </el-col>

        <!-- 境外输入确诊 -->
        <el-col :span="4">
          <el-card shadow="hover">
            <div style="text-align:center">
              <p>境外输入确诊</p>
              <p style="color: rgb(247, 130, 7);">{{ shuju.suspectedCount }}</p>
              <p v-if="shuju.suspectedIncr == null" style="font-size:10px">
                数据更新中~
              </p>
              <p v-else-if="shuju.suspectedIncr == 0" style="font-size:10px">
                较昨日数据未变化
              </p>
              <p v-else>
                较昨日:
                <span style="color: rgb(247, 130, 7)">
                  {{
                    shuju.suspectedIncr > 0
                      ? "+" + shuju.suspectedIncr
                      : shuju.suspectedIncr
                  }}
                </span>
              </p>
            </div>
          </el-card>
        </el-col>

        <!-- 累计确诊 -->
        <el-col :span="4">
          <el-card shadow="hover">
            <div style="text-align:center">
              <p>累计确诊</p>
              <p style="color: rgb(174, 33, 44);">{{ shuju.confirmedCount }}</p>
              <p v-if="shuju.confirmedIncr == null" style="font-size:10px">
                数据更新中~
              </p>
              <p v-else-if="shuju.confirmedIncr == 0" style="font-size:10px">
                较昨日数据未变化
              </p>
              <p v-else>
                较昨日:
                <span style="color: rgb(247, 130, 7)">
                  {{
                    shuju.confirmedIncr > 0
                      ? "+" + shuju.confirmedIncr
                      : shuju.confirmedIncr
                  }}
                </span>
              </p>
            </div>
          </el-card>
        </el-col>
        <!-- 累计治愈 -->
        <el-col :span="4">
          <el-card shadow="hover">
            <div style="text-align:center">
              <p>累计治愈</p>
              <p style="color: rgb(40, 183, 163);">{{ shuju.curedCount }}</p>
              <p v-if="shuju.curedIncr == null" style="font-size:10px">
                数据更新中~
              </p>
              <p v-else-if="shuju.curedIncr == 0" style="font-size:10px">
                较昨日数据未变化
              </p>
              <p v-else>
                较昨日:
                <span style="color: rgb(247, 130, 7)">
                  {{
                    shuju.curedIncr > 0
                      ? "+" + shuju.curedIncr
                      : shuju.curedIncr
                  }}
                </span>
              </p>
            </div>
          </el-card>
        </el-col>

        <!-- 累计死亡 -->
        <el-col :span="4">
          <el-card shadow="hover">
            <div style="text-align:center">
              <p style="color: rgb(93, 112, 146);">累计死亡</p>
              <p>{{ shuju.deadCount }}</p>
              <p v-if="shuju.deadIncr == null" style="font-size:10px">
                数据更新中~
              </p>
              <p v-else-if="shuju.deadIncr == 0" style="font-size:10px">
                较昨日数据未变化
              </p>
              <p v-else>
                较昨日:
                <span style="color: rgb(93, 112, 146);">
                  {{
                    shuju.deadIncr > 0 ? "+" + shuju.deadIncr : shuju.deadIncr
                  }}
                </span>
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 各种数据结束 -->
    <!-- 新闻展示开始 -->
    <!-- 第一新闻开始 -->
    <div class="flex_justify">
      <div class="xinwen" infinite-scroll-distance="30" v-infinite-scroll="loadMore"
      infinite-scroll-immediate=false infinite-scroll-delay=300>
        <span><el-divider>疫情相关信息新闻</el-divider></span>
        <div v-for="(item,i) of xinwen" :key="i">
          <h3 v-text="item.title"></h3>
          <p v-text="item.summary" class="wenzi"></p>
          <div class="flex_justify">
            <p v-text="item.pubDate"></p>
            <p>
              <a :href="item.sourceUrl" target="_bleak">查看原文</a>
            </p>
          </div>
        </div>
      </div>
      <!-- 第一新闻结束 -->
      <!-- 第二新闻开始 -->
      <div class="xinwen2">
        <span><el-divider>谣言与防护</el-divider></span>
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane label="谣言信息">
            <div v-for="(item,i) of yaoyan" :key="i" class="xinwen2_x">
              <h3 v-text="item.title"></h3>
              <p v-text="item.mainSummary" class="wenzi"></p>
              <p v-text="item.body" class="wenzi_body"></p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="可信信息">
            <div v-for="(item,i) of kexin" :key="i" class="xinwen2_x">
              <h3 v-text="item.title"></h3>
              <p v-text="item.mainSummary" class="wenzi"></p>
              <p v-text="item.body" class="wenzi_body"></p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未证实信息">
            <div v-for="(item,i) of weizhegnshi" :key="i" class="xinwen2_x">
              <h3 v-text="item.title"></h3>
              <p v-text="item.mainSummary" class="wenzi"></p>
              <p v-text="item.body" class="wenzi_body"></p>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- <div v-for="(item,i) of 1" :key="i">
          <h3 v-text="item.title"></h3>
          <p v-text="item.summary" class="wenzi"></p>
          <div class="flex_justify">
            <p v-text="item.pubDate"></p>
            <p>
              <a target="_blank" :href="path:item.sourceUrl">查看原新闻</a> 
              <router-link :to="{path:item.sourceUrl}"></router-link>
            </p>
          </div>
        </div> -->
      </div>

    </div>
    <!-- 第二新闻结束 -->
    <!-- 新闻展示结束 -->
    <!-- vex表格开始 -->
    <div class="Table">
      <!-- 导出表格按钮 -->
      <div>
        <!-- 打印 -->
        <el-button
          type="primary"
          icon="el-icon-printer"
          @click="printEvent"
          circle
          plain
        ></el-button>
        <!-- 导出表格 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="exportDataEvent"
          circle
          plain
        ></el-button>
      </div>
      <!-- 
        align='center'  对齐方式
        highlight-hover-row  hover行高亮
        stripe  隔行变色
        :data  数据
      -->
      <vxe-table
        height="500"
        ref="xTable1"
        align="center"
        highlight-hover-row
        border="outer"
        :sort-config="{
          trigger: 'cell',
          defaultSort: { field: 'currentConfirmedCount', order: 'desc' },
          orders: ['desc', 'asc', null],
        }"
        :data="zuixinshengfen"
      >
        >
        <!-- <vxe-table-column type="seq" width="60"></vxe-table-column> -->
        <vxe-table-column field="provinceName" title="地区"></vxe-table-column>
        <vxe-table-column
          field="currentConfirmedCount"
          title="现有确诊"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          field="confirmedCount"
          title="累计确诊"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          field="suspectedCount"
          title="境外输入确诊"
        ></vxe-table-column>
        <vxe-table-column
          field="curedCount"
          title="累计治愈"
        ></vxe-table-column>
        <vxe-table-column field="deadCount" title="累计死亡"></vxe-table-column>
      </vxe-table>
    </div>
    <!-- vex表格结束 -->
    <!-- 第二表格开始 -->
    <div class="Tables">
      <div>
        <input type="text" v-model="text" class="input"/>
        <el-button
          type="primary"
          icon="el-icon-search"
          circle
          plain
          @click="input"
        ></el-button>

      </div>
      <vxe-table
        height="500"
        align="center"
        highlight-hover-row
        border="outer"
        :sort-config="{
          trigger: 'cell',
          defaultSort: { field: 'currentConfirmedCount', order: 'desc' },
          orders: ['desc', 'asc', null],
        }"
        :data="suoyouchengshi"
      >
        >
        <!-- <vxe-table-column type="seq" width="60"></vxe-table-column> -->
        <vxe-table-column field="cityName" title="地区"></vxe-table-column>
        <vxe-table-column
          field="currentConfirmedCount"
          title="现有确诊"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          field="confirmedCount"
          title="累计确诊"
          sortable
        ></vxe-table-column>
        <vxe-table-column
          field="suspectedCount"
          title="境外输入确诊"
        ></vxe-table-column>
        <vxe-table-column
          field="curedCount"
          title="累计治愈"
        ></vxe-table-column>
        <vxe-table-column field="deadCount" title="累计死亡"></vxe-table-column>
      </vxe-table>
    </div>
    <!-- 第二表格结束 -->
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "河北",
      //控制数据说明默认隐藏
      drawer: false,
      //国内数据保存
      shuju: [],
      //国外数据保存
      guowaishuju: [],
      //保存最近一次更新的时间
      zuixinshijian: "",
      //获取当前时间
      dangqianshijian: "",
      //最新省份疫情数据
      zuixinshengfen: [],
      //所有城市
      suoyouchengshi: [],
      //保存省份名称
      shengfen: [],
      // 保持新闻信息
      xinwen:[],
      //分页初始页
      page:1,
      // 返回与疫情有关的谣言以及丁香园的辟谣。
      yaoyan:[],
      kexin:[],
      weizhegnshi:[],
    };
  },
  mounted() {
    //展示出首页所有数据
    //备用接口
    //
    this.axios
      .get("http://111.231.75.86:8000/api/statistics/latest")
      .then((res) => {
        this.shuju = res.data.domesticStatistics;
      });

    

    //获取所有省份最新疫情
    // http://ncov.leafcoder.cn/
    this.axios
      .get("http://111.231.75.86:8000/api/provinces/CHN/")
      .then((res) => {
        this.zuixinshengfen = res.data;
        // 使用所有省份名称，获取该省下所有每个城市的数据
        let arr = [];
        res.data.forEach((item) => {
          arr.push(item.provinceName);
        });
        this.shengfen = arr;
      });

    //把获取的当前时间进行转换并每秒执行
    setInterval(() => {
      let date = new Date();
      date = this.dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.dangqianshijian = date;
    }, 1000);

    //默认让第二表格的数据显示某个地区
    //为了不让用户打开页面后看到一个空的表格
    this.axios.get("http://111.231.75.86:8000/api/cities/CHN/?provinceNames=" + this.text).then(res=> {
      this.suoyouchengshi = res.data;
    });


    //新闻信息 ===  与疫情有关的新闻信息
    this.axios.get('https://lab.isaaclin.cn/nCoV/api/news?page='+this.page+'&num=10').then(res=>{
      res.data.results.forEach(item=>{
        // item.pubDate
        item.pubDate = this.dayjs(parseInt(parseInt(item.pubDate))).format("YYYY-MM-DD HH:mm");
        // console.log(date)
        this.xinwen.push(item)
      })
      // console.log(res.data)
    })

    
    
    setTimeout(()=>{
    this.axios.get('https://lab.isaaclin.cn/nCoV/api/rumors?rumorType=0').then(res=>{
      this.yaoyan = res.data.results;
      // console.log(this.yaoyan)
    })
    },1000)
    //新闻信息 ===  与疫情有关的新闻信息
    
  },

  methods: {
    // 展示首页国内动态数据接口
    shuaxin(){
      this.axios.get('https://lab.isaaclin.cn//nCoV/api/overall').then(res=>{
        //取得国内数据
        this.shuju = res.data.results[0];
        //取得国外数据
        this.guowaishuju = res.data.results[0].globalStatistics;
        //取得最新一次更新数据的时间 (数据时间为国外时间)
        this.zuixinshijian = res.data.results[0].updateTime;
        //把最新跟新时间转换为北京时间
        this.zuixinshijian = this.dayjs(this.zuixinshijian).format('YYYY-MM-DD HH:mm:ss')
        // console.log(this.zuixinshijian)
        console.log(res.data)
      })
    },
    handleClick(tab, event) {
      if(tab.index == 0){
        this.yaoyan_click();
      } else if (tab.index == 1) {
        //第二新闻显示卡 可信信息内容
        this.kexin_click();
      } else if (tab.index == 2) {
        //第二新闻显示卡 未证实信息内容
        this.weizhegnshi_click();
      }
    },
    yaoyan_click(){
      this.axios.get('https://lab.isaaclin.cn/nCoV/api/rumors?rumorType=0').then(res=>{
        this.yaoyan = res.data.results;
        console.log(this.yaoyan)
      })
    },
    kexin_click(){
      this.axios.get('https://lab.isaaclin.cn/nCoV/api/rumors?rumorType=1').then(res=>{
        this.kexin = res.data.results;
        console.log(this.kexin)
      })
    },
    weizhegnshi_click(){
      this.axios.get('https://lab.isaaclin.cn/nCoV/api/rumors?rumorType=2').then(res=>{
        this.weizhegnshi = res.data.results;
        console.log(this.weizhegnshi)
      })
    },


    //第一新闻显示卡滚动加载
    loadMore(){
      this.page++;
      this.axios.get('https://lab.isaaclin.cn/nCoV/api/news?page='+this.page+'&num=10').then(res=>{
        res.data.results.forEach(item=>{
          // item.pubDate
          item.pubDate = this.dayjs(parseInt(parseInt(item.pubDate))).format("YYYY-MM-DD HH:mm");
          // console.log(date)
          this.xinwen.push(item)
        })
      })
    },
    // 点击打开弹出框，选择是否下载表格
    exportDataEvent() {
      // this.$refs.xTable1.exportData({ type: 'csv' })
      this.$confirm("是否确认导出当前表格为CVS？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "导出",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$refs.xTable1.exportData({ type: "csv" });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "取消导出" : "",
          });
        });
    },

    // 打印^
    printEvent() {
      this.$refs.xTable1.print();
    },

    //input方法
    //输入要查询的省名称
    //查询出该省下的所有市级疫情情况
    input() {
      //给arrary添加方法
      //in_array
      Array.prototype.in_array=function(e){
      var r=new RegExp(','+e+',');
      return (r.test(','+this.join(this.S)+','));};
      //具体功能实现
      let text = this.text;
      let arr = this.shengfen;
      //如果输入的内容是一个省份则调用 /cities/CHN/?provinceNames=内容 这个接口
      if(arr.in_array(text)){
        this.axios.get("http://111.231.75.86:8000/api/cities/CHN/?provinceNames=" + this.text).then((res) => {
          // console.log(res.data);
          this.suoyouchengshi = res.data;
        });
      }else{
        //如果输入的内容是一个城市名称  则调用 api/cities/CHN/内容  这个接口
        this.axios.get('http://111.231.75.86:8000/api/cities/CHN/'+text).then((res) => {
          let arr = []
          arr.push( res.data );
          // console.log(arr);
          this.suoyouchengshi = arr; 
        });
      }
    },
  },
  watch:{
    text(){
      Array.prototype.in_array=function(e){
      var r=new RegExp(','+e+',');
      return (r.test(','+this.join(this.S)+','));};
      //具体功能实现
      let text = this.text;
      let arr = this.shengfen;
      //如果输入的内容是一个省份则调用 /cities/CHN/?provinceNames=内容 这个接口
      if(arr.in_array(text)){
        this.axios.get("http://111.231.75.86:8000/api/cities/CHN/?provinceNames=" + this.text).then((res) => {
          // console.log(res.data);
          this.suoyouchengshi = res.data;
        });
      }else{
        //如果输入的内容是一个城市名称  则调用 api/cities/CHN/内容  这个接口
        this.axios.get('http://111.231.75.86:8000/api/cities/CHN/'+text).then((res) => {
          let arr = []
          arr.push( res.data );
          // console.log(arr);
          this.suoyouchengshi = arr; 
        });
      }
    }
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.divider {
  padding: 0 20px;
}
.divider > p {
  margin: 10px 0;
}

.shuju p:first-child {
  font-size: 12px;
}
.shuju p:nth-child(2) {
  font-size: 25px;
}
.Table {
  margin: 20px;
}
.Table > div:first-child {
  margin: 10px 30px;
  text-align: right;
}
.Tables {
  margin: 20px;
}
.Tables > div:first-child {
  margin: 10px 30px;
  text-align: right;
}
/* .shuju p:last-child{
  font-size: 18px;
} */

.input{
  border: 1px solid #b3d8ff;
  border-radius: 20px;
  padding:11px;
  width: 200px;
  
}
.input:focus{
  outline: none;
  border: 1px solid #409EFF;
}
.xinwen2{
  width:50%;
  height:500px;
  /* overflow-x: none;*/
  word-break:break-all;
  /* word-wrap:break-word; */
  overflow: auto; 
  overflow-x:hidden;
  margin: 20px 20px 0 20px;
  box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.205);
  border-radius: 10px;
  padding:10px 0;
}

.xinwen2_x{
  margin: 10px 15px;
  border-radius: 10px;
  padding: 10px;
  border:1px solid rgba(0, 0, 0, 0.205);
}
.xinwen2_x:hover{
  box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.205);
}



.xinwen{
  width:50%;
  height:500px;
  /* overflow-x: none;*/
  word-break:break-all;
  /* word-wrap:break-word; */
  overflow: auto; 
  overflow-x:hidden;
  margin: 20px 20px 0 20px;
  box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.205);
  border-radius: 10px;
  padding:10px;
}
.xinwen>div>p{
  margin: 10px 0;
  font-size: 12px;
}
.xinwen>div{
  margin: 20px 20px;
  border-radius: 10px;
  padding: 10px;
  border:1px solid rgba(0, 0, 0, 0.205);
}
.xinwen>div:hover{
  box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.205);
}
.xinwen a{
  text-decoration: none;
}
.flex_justify{
  display: flex;
  justify-content: space-between;
}

.wenzi_body{
  font-size: 12px;
  color: rgb(138, 138, 138);
}

.wenzi{
   display: -webkit-box;
   overflow: hidden;
   text-overflow: ellipsis;
   word-wrap: break-word;
   white-space: normal !important;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 3px;
}
::-webkit-scrollbar-track {
  border-radius: 3px; /*滚动条的背景区域的圆角*/
}
::-webkit-scrollbar-thumb {
  border-radius: 3px; /*滚动条的圆角*/
  background-color: #ccc; /* 滚动条的背景颜色 */

}
 
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
 
::-webkit-scrollbar-thumb:active {
  cursor: pointer;
}


.shuaxin{
  background: none;
  border: none;
  font-size: 18px;
}
.shuaxin:focus{
  outline: none;
}


</style>
