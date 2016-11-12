const fs = require('fs');
const path = require('path');
const fileType = require('file-type');

function getString(data){
    let result = data.toString('ascii')
                .replace(/_/g, 1)
                .replace(/\n/g, ' ')
                .split(' ')
                .map((x,i) =>{
                    let index = parseInt(x,2);
                    let char = String.fromCharCode(index);
                    return char;
                })
                .join('')
    return result;
}

fs.readFile(path.join(__dirname, 'source.txt'),(err, data)=>{
    if(err) throw err;
    let content = new Buffer(getString(data), 'base64');
    let ext = fileType(content).ext;
    let fileName = `key.${ext}`;
    fs.writeFile(path.join(__dirname, fileName), content, (err,result) => {
        if(err) throw err;
        console.log(`done. checkout ${fileName}`);
    })
});