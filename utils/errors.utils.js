module.exports.uploadError=(err)=>{
    const error={format:'',maxSize:''}

    if(err.message.includes('invalde file')){
        error.format='format incompatibe'
    }
    return error
}