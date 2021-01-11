const Products=require("../model/model");

// @desc gets all the Products data
// @route GET /api/Products
async function getProducts(req,res){
    try{
        const products=await Products.findAll();
        res.writeHead(200,{"content-type":"application/json"});
        res.end(JSON.stringify(products));
    }
    catch(err){
        console.log(err);
    }
}

// @desc gets a particular product data
 // @route GET /api/products/id
 async function getProduct(req,res,id){
    try{
        const product=await Products.findById(id);
        if(!product){
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify({message:"product not found"}));
        }
        else{
            res.writeHead(200,{"content-type":"application/json"});
            res.end(JSON.stringify(product));
        }
        
    }
    catch(err){
        console.log(err);
    }
}

// @desc create new product
 // @route POST /api/products/
  function createProduct(req,res){
    try{
        
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        })
        req.on("end",async ()=>{
            const {title,description,price}=JSON.parse(body);
            const product={
                title,
                description,
                price
            };
            const newProduct=await Products.Create(product);
            
                if(newProduct){
                    res.writeHead(201,{"content-type":"application/json"});
                    return res.end(JSON.stringify(newProduct));
                }else{
                    console.log("something went wrong will creating the product");
                }
        })
        
        
        
    }
    catch(err){
        console.log(err);
    }
}

async function updateProduct(req,res,id){
    try{
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        })
        const product=await Products.findById(id);
        req.on("end",async ()=>{
            const {title,description,price} =JSON.parse(body);
            const updateProd={
                title:title||product.title,
                description:description||product.description,
                price:price||product.price
            }
            const update=await Products.update(id,updateProd);
        if(!update){
            res.writeHead(404,{"content-type":"application/json"})
            return res.end({message:"route not found"});
        }
        else{
            res.writeHead(201,{"content-type":"application/json"})
            return res.end(JSON.stringify(update));
        }
        })
        
    }
    catch(err){

    }
}
async function removeProduct(req,res,id){
    
    const Delete=Products.findById(id)
    if(!Delete){
        res.writeHead(404,{"content-type":"application/json"})
        return res.end({message:"route not found"});
    }
    else{
        await Products.remove(id);
        res.writeHead(200,{"content-type":"application/json"})
        return res.end(JSON.stringify({message:"product id: "+id+" is deleted "}));
    }
    
}
module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
};