const http=require("http");
const data=require("./data/prod.json");
const {getProducts,getProduct,createProduct,updateProduct,removeProduct} =require("./controller/controller");
const server =http.createServer((req,res)=>{
    // res.statusCode=200;
    // res.setHeader("content-type","text.html");
    // short cut of the above
    // res.writeHead(200,{'Content-Type':'application/json'});
    // when you are in express json is automatically converted to string 
    // res.write(JSON.stringify(data));
    // if end not given then the line will not finish and it will load continuesly
    // res.end()
    // the shortes way of doing this res.write and res.end
    if(req.url=="/api/products" && req.method=="GET"){
        // note GET all should be in capital letter  
        getProducts(req,res);
    }
    else if(req.url.match(/\/api\/\products\/[1-9]+/)&&req.method=="GET"){
            const id=req.url.split("/")[3];
            getProduct(req,res,id);
    }
    else if(req.url.match(/\/api\/products\/[1-9]+/)&&req.method=="PUT"){
        const id =req.url.split("/")[3];
        updateProduct(req,res,id);
    }
    else if(req.url.match(/\/api\/\products\/[1-9]+/)&&req.method=="DELETE"){
        const id=req.url.split("/")[3];
        removeProduct(req,res,id);
}
    else if(req.url=="/api/products" && req.method=="POST"){
        createProduct(req,res);
    }
    else{
        res.writeHead(404,{"content-type":"application/json"});
        // Routing is the process of selecting a path for traffic in a network or between or across multiple networks
        // traffic is the flow of data within the internet
        res.end(JSON.stringify({message:"route not found"}));
    }
    

});
const PORT=process.env.PORT||5000;
server.listen(PORT,()=>{
    console.log("port running on 5000");
})