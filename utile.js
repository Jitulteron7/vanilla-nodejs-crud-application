// Utility-program definitions.
//  A program that performs a specific task related to the management of computer functions, resources, or files,
//  as password protection, memory management, virus protection, and file compression.
const fs =require("fs");
// note using fs we can directly write in the file irrespective opened or closed file 
const writeDataInFile=(filename,content)=>{
    fs.writeFile(filename,JSON.stringify(content),{encoding:"utf-8"},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("written succesfully");
        }
    })
}

module.exports={
    writeDataInFile
};