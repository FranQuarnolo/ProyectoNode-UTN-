const mongoose = require("../bin/mongodb");

const categorySchema = new mongoose.Schema({
    name: String
});
categorySchema.statics.findBydIdAndValidate = async function(id){
    const document = await this.findById(id);
    if(!document){
        return{
            error:true,
            message:"Ojo no existe categoria!"
            //Busca por Id la categoria y valida si existe, sino manda msje de arriba
        }
        
    }
    return document;
}
module.exports = mongoose.model("categories", categorySchema)