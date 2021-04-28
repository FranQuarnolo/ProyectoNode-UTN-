var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
mongoose.connect('mongodb://localhost/proyectoNode', { useNewUrlParser: true }, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Estoy conectado a MongoDB!');
    }
});
mongoosePaginate.paginate.options={
    limit:1,
    lean:false
}
mongoose.mongoosePaginate = mongoosePaginate;
module.exports = mongoose; 