const fs = require("fs");
function writeTemplate(name) {
    let capName = name.charAt(0).toUpperCase()+name.slice(1);
    let template = `const mongoose = require("mongoose");\n
    const Schema = mongoose.Schema;\n
    const ${name}Schema = new Schema({\n
    });\n
    const ${capName} = mongoose.model("${capName}", ${name}Schema);\n
    module.exports = ${capName};`
    indexString += `    ${capName}: require("./${capName}"),\n`;
    fs.writeFile(`./models/${capName}.js`, template, err => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(`${capName}.js successfully created`);
        }
    });   
    
}
let indexString = `module.exports={\n`;
let names = process.argv.slice(2);
if(!fs.existsSync("./models")){
    fs.mkdirSync("./models");
}
names.forEach(name =>{
    writeTemplate(name);
});
indexString += `};`;
fs.writeFile("./models/index.js", indexString, err => {
    if(err)
    {
        console.log(err);
    }
});

