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
    {
        userName:'erye',
        password:'8888',
        isadmin:true,
        
    },
    {
        userName:'snake',
        password:'8888',
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
        console.log(req.body)
        const {userName,userPassword} = req.body
        if(!userName||!userPassword){
            console.log('用户名或者密码不能为空')
            return res.status(401).json({
                msg:'用户名或者密码不能为空',
                code:401
            })
        }
        const found = userList.find(u=>u.password===userPassword&&u.userName===userName)
        if(found){
            console.log('登录成功')
            res.status(201).json({
                msg:'登录成功',
                code:201,
                data:found
            })
        }else{
            console.log('用户名或者密码错误，请重新输入')
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
apiRouter.post('/register',async(req,res)=>{
    try{
        console.log(req.body)
        const {userName,userPassword,confirm} = req.body
        if(!userName||!userPassword||!confirm){
            console.log('创建信息未填写完整，请填写完整后再创建')
            return res.status(401).json({
                msg:'创建信息未填写完整，请填写完整后再创建',
                code:401
            })
        }
        if(ureg.test(userName)===false){
            console.log('用户名不符合规范，请重新输入')
            return res.status(401).json({
                msg:'用户名不符合规范，请重新输入',
                code:401
            })
        }
        if(preg.test(userPassword)===false){
            console.log('密码不符合规范，请重新输入')
            return res.status(401).json({
                msg:'密码不符合规范，请重新输入',
                code:401
            })
        }
        if(confirm!==userPassword){
            console.log('两次输入的密码不一致，请重新输入')
            return res.status(401).json({
                msg:'两次输入的密码不一致，请重新输入',
                code:401
            })
        }
        const found = userList.find(u=>u.userName===userName )
        if(found){
            console.log('该用户名已被注册，请更换其他用户名')
            res.status(401).json({
                msg:'该用户名已被注册，请更换其他用户名',
                code:401
            })
        }else{
            const newUser = {
                userName,
                password:userPassword,
                isadmin:false
            }
            userList.push(newUser)
            console.log(userList)
            res.status(201).json({
                msg:'注册成功',
                code:201,
                newUser,
            })
        }
    }catch(error){
         res.status(500).json({
            msg: '服务器错误',
            code: 500
        })
    }
})