let R=require('ramda');
let createDataMiddle=(option)=>{
    let {useDatabase}=option
    let out;
    if(R.type(useDatabase)==='Object'){
        let {lib,option}=useDatabase;
        if(typeof lib==='function'){
            out=lib(option);
            
        }
    }
    return out;
};


module.exports=createDataMiddle;