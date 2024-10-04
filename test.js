// const isVarified = false;
// // if (isVarified === true){
// //     console.log();

// // }
// // else{
// //     console.log(`${isVarified === true ?"user is varified" :"user ins not varified"}`)
// // }
// console.log(`${isVarified === true ?"user is varified" :"user is not varified"}`)
 
;

const converter = (time)=>{
    const hour = parseInt( time/(3600));
    let remaining = time % 3600 ;
    const min = parseInt(remaining/60);
    return(`${hour}hrs ${min}min ago `);
};

