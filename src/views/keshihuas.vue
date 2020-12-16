<template>
	<div>
		<body>
			<header id="header">
				<h3 class="header-title">新冠肺炎（2019-nCov）疫情</h3>
				<div class="header-info header-info-l">数据来源：丁香园</div>
				<div class="header-info header-info-r">时间：<span id="nowDate"></span><small>（每隔1分钟自动刷新）</small></div>
			</header>
			<!--  -->
			<footer id="footer"></footer>
			<!--  -->
			<div id="container">
			<div id="flexCon">
				<div class="flex-row">
					<div class="flex-cell flex-cell-l">
						<div class="chart-wrapper">
							<h3 class="chart-title">现存确诊数排行前 10 位的国家</h3>
							<div class="chart-div" id="rankChart">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-c" style="padding-right:0;">
						<div class="chart-wrapper">
							<h3 class="chart-title">国内外统计数据</h3>
							<div class="chart-div chart-done">
								<table class="data-t">
									<tr>
										<th><img src="../img/icon-01.png" /></th>
										<td>
											<p>较昨日 <span v-text="guowaitongjishuju.currentConfirmedIncr">0</span></p>
											<p><span v-text="guowaitongjishuju.currentConfirmedCount">0</span></p>
											<p>国外现存确诊</p>
										</td>
										<th><img src="../img/icon-02.png" /></th>
										<td>
											<p>较昨日 <span v-text="guoneitongjishuju.currentConfirmedIncr">0</span></p>
											<p><span v-text="guoneitongjishuju.currentConfirmedCount">0</span></p>
											<p>中国现存确诊</p>
										</td>
									</tr>
									<tr>
										<th><img src="../img/icon-03.png" /></th>
										<td>
											<p>较昨日 <span v-text="guowaitongjishuju.confirmedIncr">0</span></p>
											<p><span v-text="guowaitongjishuju.confirmedCount">0</span></p>
											<p>国外累计确诊</p>
										</td>
										<th><img src="../img/icon-04.png" /></th>
										<td>
											<p>较昨日 <span v-text="guoneitongjishuju.confirmedIncr ">0</span></p>
											<p><span v-text="guoneitongjishuju.confirmedCount">0</span></p>
											<p>中国累计确诊</p>
										</td>
									</tr>
									<tr>
										<th><img src="../img/icon-05.png" /></th>
										<td>
											<p>较昨日 <span v-text="guowaitongjishuju.deadIncr">0</span></p>
											<p><span v-text="guowaitongjishuju.deadCount">0</span></p>
											<p>国外死亡人数</p>
										</td>
										<th><img src="../img/icon-06.png" /></th>
										<td>
											<p>较昨日 <span v-text="guoneitongjishuju.deadIncr">0</span></p>
											<p><span v-text="guoneitongjishuju.deadCount">0</span></p>
											<p>中国死亡人数</p>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-r" style="padding-left:0;">
						<div class="chart-wrapper">
							<h3 class="chart-title">国内各省、自治区、直辖市疫情</h3>
							<div class="chart-div" id="mapChart">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex-row">
					<div class="flex-cell flex-cell-lc" style="padding-bottom:0;">
						<div class="chart-wrapper">
							<h3 class="chart-title">美国疫情趋势图</h3>
							<div class="chart-div" id="trendChart">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
					<div class="flex-cell flex-cell-r" style="padding-bottom:0;">
						<div class="chart-wrapper">
							<h3 class="chart-title">各国累计确诊占比</h3>
							<div class="chart-div" id="countrysChart">
								<div class="chart-loader"><div class="loader"></div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</body>
	</div>
</template>


<script>
export default {
	data(){
		return{
			guoneitongjishuju:{},
			guowaitongjishuju:{},
		}
	},

	mounted(){
		this.axios.get('https://lab.isaaclin.cn/nCoV/api/overall').then(res=>{
			this.guoneitongjishuju = res.data.results[0];
			this.guowaitongjishuju = res.data.results[0].globalStatistics;
			console.log(this.guoneitongjishuju)
			console.log(this.guowaitongjishuju)
		})

	},

	methods:{

	}
}
</script>


<style scoped>
/* global */
* {margin:0;padding:0;box-sizing:border-box;}
html, body {
	width:100%;
	height:100%;
	min-width:1200px;
	min-height:600px;
	overflow:hidden;
}
body {
	position:relative;
	font-family:"Microsoft Yahei", Arial, sans-serif;
	background:rgb(40, 30, 47) url("../img/bg.png") repeat;
}

/* layout */
#header {
	position:relative;
	height:72px;
	background:url("../img/header.png") 0 0 / 100% 100% no-repeat;
	overflow:hidden;
}
.header-title {line-height:64px;text-align:center;font-size:34px;font-weight:400;color:#fff;}
.header-info {position:absolute;top:32px;font-size:18px;color:#73aae5;}
.header-info-l {left:20px;}
.header-info-r {right:20px;}
#footer {
	position:absolute;
	bottom:0;
	left:0;
	right:0;
	height:28px;
	background:url("../img/footer.png") 0 0 / 100% 100% no-repeat;
}
#container {position:absolute;top:72px;bottom:22px;left:0;right:0;}

#flexCon {
	height:100%;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-flex-direction:column;
	-ms-flex-direction:column;
	flex-direction:column;
}
.flex-row {
	-webkit-flex:1;
	-ms-flex:1;
	flex:1;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
}
.flex-cell {-webkit-flex:1;-ms-flex:1;flex:1;padding:15px;}
.flex-cell-l,
.flex-cell-r {-webkit-flex:2;-ms-flex:2;flex:2;}
.flex-cell-c {-webkit-flex:3;-ms-flex:3;flex:3;}
.flex-cell-lc {-webkit-flex:5;-ms-flex:5;flex:5;}

.chart-wrapper {position:relative;height:100%;}
.chart-title {height:32px;font-size:22px;font-weight:normal;color:#9aa8d4;}
.chart-div {position:absolute;top:32px;bottom:0;left:0;right:0;}

.data-t {table-layout:fixed;width:100%;height:100%;border-collapse:collapse;}
.data-t th,
.data-t td {min-height:48px;}
.data-t th {width:60px;text-align:center;background:url("../img/icon-bg.png") center / 100% no-repeat;}
.data-t th img {width:30px;height:30px;}
.data-t td {padding-left:15px;}
.data-t p {margin:5px 0;line-height:1;font-size:14px;color:#b0c2f9;}
.data-t p span {font-size:32px;font-weight:bold;color:#fff;}

/* media query */
@media (max-width:1900px) {
	#header {height:48px;}
	.header-title {line-height:42px;font-size:24px;}
	.header-info {top:17px;font-size:14px;}
	.header-info-l {left:15px;}
	.header-info-r {right:15px;}
	.flex-cell {padding:10px;}
	.chart-title {height:24px;font-size:18px;}
	.chart-div {top:24px;}
	.data-t p span {font-size:24px;}
	#footer {height:16px;}
	#container {top:48px;bottom:12px;}
}

/* chart-loader */
.chart-loader {
	position:absolute;
	top:0;
	left:0;
	z-index:99;
	width:100%;
	height:100%;
	background:rgba(255, 255, 255, 0);
	transition:all .8s;
}
.chart-loader .loader {
	position:absolute;
	left:50%;
	top:50%;
	width:60px;
	height:60px;
	margin:-30px 0 0 -30px;
	border:3px solid transparent;
	border-top-color:#3498db;
	border-radius:50% !important;
	-webkit-animation:spin 2s linear infinite;
	animation:spin 2s linear infinite;
}
.chart-loader .loader:before {
	content:"";
	position:absolute;
	top:3px;
	left:5px;
	right:5px;
	bottom:5px;
	border:3px solid transparent;
	border-top-color:#e74c3c;
	border-radius:50% !important;
	-webkit-animation:spin 3s linear infinite;
	animation:spin 3s linear infinite;
}
.chart-loader .loader:after {
	content:"";
	position:absolute;
	top:9px;
	left:10px;
	right:10px;
	bottom:10px;
	border:3px solid transparent;
	border-top-color:#f9c922;
	border-radius:50% !important;
	-webkit-animation:spin 1.5s linear infinite;
	animation:spin 1.5s linear infinite;
}
.chart-done .chart-loader {display:none;}
@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg)
	}
	100% {
		-webkit-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		transform: rotate(360deg)
	}
}
@keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg)
	}
	100% {
		-webkit-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		transform: rotate(360deg)
	}
}
</style>