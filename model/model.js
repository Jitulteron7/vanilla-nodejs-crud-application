let productData=require("../data/prod.json");
const {v4:uuidv4}=require("uuid");
const {writeDataInFile} =require("../utile");
const findAll=()=>{
    return new Promise((resolve,reject)=>{
        if(productData){
            resolve(productData)
        }
        else{
            reject("error");
        }

    });
}
const findById=async (id)=>{
    const product= await productData.find((p)=>p.id===id)
    return new Promise((resolve,reject)=>{
        if(product){
            resolve(product);
        }
        else{
            reject("error");
        }
    })
}
const Create=async (product)=>{
    return new Promise((resolve,reject)=>{
        if(product){
            const newData={id:uuidv4(),...product}
            productData.push(newData);
            writeDataInFile("./data/prod.json",productData);
            resolve(newData)
        }
        else{
            reject(false);
        }
    })
}
const update=(id,update)=>{
    return new Promise((resolve,reject)=>{
        if(update){
            const index=productData.findIndex(p=>p.id==id);
            productData[index]={id,...update};
            writeDataInFile("./data/prod.json",productData);
            resolve(productData[index]);
        }   
        else{
            reject(false);
        }
    })
}
const remove=(id)=>{
    return new Promise((resolve,reject)=>{
        productData=productData.filter(p=>p.id!==id);
        writeDataInFile("./data/prod.json",productData);
            resolve();
    })
}
module.exports={
    findAll,
    findById,
    Create,
    update,
    remove
};