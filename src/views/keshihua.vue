<template>
	<div>
		<!-- 全屏容器 -->
		<dv-full-screen-container class="bg">
		<!-- 页头文字+效果条开始 -->
		<div class="header">
			<div class="header-title">新冠肺炎（2019-nCov）疫情</div>
			<div class="header-left">May everything be well</div>
			<div class="header-right">时间：{{dangqianshijian}}</div>
		</div>
		<!-- 页头文字+效果条结束 -->

		<div class="zong">
			<!-- 现存确诊人数排行前十国家 排名轮播表开始 -->
			<div class="top_left">
				<h3>现存确诊人数排行前十国家</h3>
				<dv-scroll-ranking-board :config="config1" />
			</div>
			<!-- 现存确诊人数排行前十国家 排名轮播表结束 -->

			<!-- 国外数据统计开始 -->
			<div class="top_center">
				<h3>国外统计数据</h3>
				<!-- 第一层 -->
				<div class="top_icon">
					<!-- 现存确诊开始 -->
					<div class="top_icon">
						<div style="margin-right:20px">
							<img src="../../public/img/guowaixiancun.png">
						</div>
						<div>
							<p><span class="wenzi">较昨日</span>+{{shuju.currentConfirmedIncr}}</p>
							<p>{{shuju.currentConfirmedCount}}</p>
							<p class="wenzi">国外现存确诊</p>
						</div>
					</div>
					<!-- 现存确诊结束 -->
					<!-- 累计确诊开始 -->
					<div class="top_icon">
						<div style="margin-right:20px">
							<img src="../../public/img/guowaileiji.png">
						</div>
						<div>
							<p><span class="wenzi">较昨日</span>+{{shuju.confirmedIncr}}</p>
							<p>{{shuju.confirmedCount}}</p>
							<p class="wenzi">国外累计确诊</p>
						</div>
					</div>
					<!-- 累计确诊开始 -->
				</div>
				<!-- 第一层 -->

				<!-- 第二层 -->
				<div class="top_icon">
					<!-- 累计治愈开始 -->
					<div class="top_icon">
						<div style="margin-right:20px">
							<img src="../../public/img/guowaixiancun.png">
						</div>
						<div>
							<p><span class="wenzi">较昨日</span>+{{shuju.confirmedIncr}}</p>
							<p>{{shuju.curedCount}}</p>
							<p class="wenzi">国外累计治愈</p>
						</div>
					</div>
					<!-- 累计治愈开始 -->
					<!-- 累计死亡结束 -->
					<div class="top_icon">
						<div style="margin-right:20px">
							<img src="../../public/img/guowaileiji.png">
						</div>
						<div>
							<p><span class="wenzi">较昨日</span>+{{shuju.deadIncr}}</p>
							<p>{{shuju.deadCount}}</p>
							<p class="wenzi">国外累计死亡</p>
						</div>
					</div>
					<!-- 累计死亡结束 -->
				</div>
				<!-- 第二层 -->
			</div>
			<!-- 国外数据统计结束 -->
			<!-- 动态环图开始 -->
			<div class="top_right">
				<h3>所有国家动态环形图</h3>
				<dv-active-ring-chart :config="config2" style="width:350px;height:350px" />
			</div>
			<!-- 动态环图结束 -->
		</div>
		<div>
			<el-ceshi></el-ceshi>
		</div>
		</dv-full-screen-container>
		
		
	</div>
</template>


<script>
export default {
	data(){
		return{
			dangqianshijian:'',
			config1: {
        data:[],
        rowNum: 6
			},
			config2: {
				data:[],
				radius:150,
				activeRadius:160,
				showOriginValue:true,
			},
			shuju:{},
		}
	},
	watch:{
		
	},
	methods:{
		
	},
	mounted(){

		//获取当前时间
		setInterval(() => {
     let date = new Date();
     date = this.dayjs().format("YYYY-MM-DD HH:mm:ss");
     this.dangqianshijian = date;
		}, 1000);
		
		//获取全部国家疫情信息
		//并计算出 现有确诊数量前十的国家
		this.axios.get('http://111.231.75.86:8000/api/countries/').then(res=>{
			//let data = res.data;
			let data = JSON.parse(JSON.stringify(res.data));
			// console.log(JSON.parse(JSON.stringify(data)));
			let arr = [];
			data.forEach((item,i) => {
				arr.push([item,item.currentConfirmedCount])
			});
			data = arr.sort(function(a,b){return b[1]-a[1]})
			data = arr.slice(0,10)
			var datas = []
			
			data.forEach(item=>{
				datas.push({name:item[0].countryName,value:item[0].currentConfirmedCount})
			});

			this.config1.data = datas;
			this.config2.data = datas;
			//console.log(JSON.parse(JSON.stringify(datas)));
			// console.log(this.config.data)
			this.config1 = { ...this.config1 }
			this.config2 = { ...this.config2 }
		})

		// 全球统计疫情各数据信息
		this.axios.get('http://111.231.75.86:8000/api/statistics/latest/').then(res=>{
			this.shuju = res.data.globalStatistics
			// console.log(res.data.globalStatistics)
		})
		
	}

}
</script>


<style scoped>
/* 整体样式 */
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
/* 背景样式 */
.bg{
	background:url(../../public/img/bg.png) 0 0 / 100% 100%;
}
/* 头部样式 */
.header{
	position:relative;
	height:72px;
	background:url(../../public/img/header.png) 0 0 / 100% 100% no-repeat;
	overflow:hidden;
}

.header-title {
	line-height:64px;
	text-align:center;
	font-size:34px;
	font-weight:400;
	color:#fff;
}
.header-right{
	position:absolute;
	top:32px;
	right: 100px;
	font-size:19px;
	color:#73aae5;
}
.header-left{
	position:absolute;
	top:32px;
	left: 100px;
	font-size:19px;
	color:#73aae5;
}
/* 总yangshi */
.zong{
	display: flex;
	justify-content: space-between;
	/* color:#9aa8d4; */
}
.zong h3{
	color:#9aa8d4;
	padding: 10px 0;
	font-size:22px
}
.zong>div{
		padding: 20px;
		font-size: 33px;
}
.wenzi{
	color:#9aa8d4;
	font-size: 14px;
}
/* 现存确诊人数排行前十国家 样式 */
.top_left{
	width:30%;
	height:350px;
}
.top_center{
	width: 50%;
	color: #ffffff;
}
.top_right{
	width: 25%;
}
.top_icon{
	display: flex;
	/* flex-direction: row; */
	margin: 10px 20px;
	justify-content:center;

}
.top_icon img{
	margin-top:50%;
	box-shadow:0 2px 12px 0 rgba(255, 255, 255, 0.205);
	/* border-radius: 50%; */
}


</style>