const {createServer} =require('http')
const socked =require('socket.io')
const fs =require('fs')
const path =require('path')

const server =  createServer((req,res)=>{
if(req.url==='/'){
    const filepath =path.join(__dirname,'index.html')
    const ar =fs.readFileSync(filepath)
    res.end(ar)
}else if(req.url==='/socket.js'){
    const filepath =path.join(__dirname,'./socket.js')
    const ar =fs.readFileSync(filepath)
    res.end(ar)
}
})

server.listen(8080,()=>{
    console.log('8080端口已启动')
})
const io =socked.listen(server)

io.on('connection',client=>{
    client.on('msg',data=>{
        // console.log(data)
        io.emit('msg',`${data.ip}:${data.val}`)
    })
    client.on('disconnect',()=>{
        console.log('socked is disconnect')
    })
})
