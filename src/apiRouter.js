import express from 'express'

export const apiRouter = express.Router()

//模拟数据库存储用户数据
const userList = [
    {
        userName:'EricLin',
        password:'1234',
        isadmin:true
    },
    {
        userName:'admin',
        password:'1234',
        isadmin:true
    },

]

//正则表达式
const ureg = /^[a-zA-Z0-9_]{3,10}$/
const preg = /^[a-zA-Z0-9]{4,10}$/


apiRouter.get('/',(req,res)=>{
    res.send('欢迎访问并使用我的后端!!')
})

//定义登录接口
apiRouter.post('/login',async(req,res)=>{
    try{
        const {userName,userPassword} = req.body
        if(!userName||!userPassword){
            return res.status(401).json({
                msg:'用户名或者密码不能为空',
                code:401
            })
        }
        const found = userList.find(u=>u.password===userPassword&&u.userName===userName)
        if(found){
            res.status(201).json({
                msg:'登录成功',
                code:201,
                data:found
            })
        }else{
            res.status(401).json({
                msg:'用户名或者密码错误，请重新输入',
                code:401
            })
        }
    }catch(error){
         res.status(500).json({
            msg: '服务器错误',
            code: 500
        })
    }
    
})


//定义注册接口
apiRouter.post('/register',(req,res)=>{

})