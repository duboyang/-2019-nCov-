<template>
  <div>
    <div id="container">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      shijian:[],
      leijiquezhen:[]
    }
  },
  methods:{
    a(){
      // console.log(echarts)
      let divEle = document.getElementById('container')
      let instance = echarts.init(divEle,'walden')

      instance.setOption({
        title: {
        text: '美国疫情趋势图',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['累计确诊', '现有确诊', '累计死亡']
        },
        // 控制折线模型的上下左右边距
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.shijian
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '累计确诊',
                type: 'line',
                stack: '总量',
                data: this.leijiquezhen,
            },
            // {
            //     name: '现有确诊',
            //     type: 'line',
            //     stack: '总量',
            //     data: this.leijiquezhen
            // },
            // {
            //     name: '累计死亡',
            //     type: 'line',
            //     stack: '总量',
            //     data: this.leijiquezhen
            // },
        ]
      })
    }
  },
  mounted(){
    
    this.axios.get('http://111.231.75.86:8000/api/countries/USA/daily/').then(res=>{
      // res.data
      //现有确诊 "currentConfirmedCount  
      //累计确诊""confirmedCount 
      //累计死亡"deadCount   
      // console.log(res.data[100].currentConfirmedCount)
      let shijian = []
      let leijiquezhen = []
      res.data.forEach(element => {
        shijian.push(element.dateId)
        leijiquezhen.push(element.currentConfirmedCount)
      });
      this.shijian = shijian;
      console.log(shijian)
      this.leijiquezhen = leijiquezhen;
      // console.log(this.leijiquezhen)
      // console.log(this.shijian)

    })

    // console.log(this.leijiquezhen)
    setTimeout(() => {
      this.a(); 
    }, 5000);

  }
}
</script>

<style scoped>
#container{
      width: 70%;
      height: 400px;
      color:#fff
      /* margin: 0 auto;  */
      /* border: 1px solid #333; */
}
</style>