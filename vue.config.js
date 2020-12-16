// module.exports={
//   //配置客户端http代理跨域请求
//   devServer: {
//     proxy: {
//       // detail: https://cli.vuejs.org/config/#devserver-proxy
//       '/api': {
//         target: `https://lab.isaaclin.cn/nCoV`,//真实服务器地址
//         changeOrigin: true, //是否跨域
//         pathRewrite: {
//           '^/api' : '' //将程序中的/api，替换为空字符串，再和target中的基础路径拼接起来作为发送到服务器的最终请求地址。
//         }
//       }
//     }
//   }
// }