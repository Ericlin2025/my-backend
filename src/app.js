import express from 'express'
import cors from 'cors'
import {apiRouter} from './apiRouter.js'
const app = express()


//加入中间件来解决访问接口问题

//解决浏览器访问跨域问题
app.use(cors())

//解决axios解析请求数据问题
app.use(express.json())

//使用接口路由
app.use('/api',apiRouter)

//根据部署的环境动态设置端口
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    // console.log('服务器已经启动，请访问：http://localhost:3000')
    console.log('服务器已经启动')
})