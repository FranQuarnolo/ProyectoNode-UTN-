var express = require('express');
var router = express.Router();
const productosController = require("../controllers/productosController")
/* GET de Productos listener */
router.get('/', productosController.getAll);
router.get('/paginate', productosController.getAllPaginate);
router.get('/tags/:id', productosController.getByTagId);
router.get('/:id', productosController.getById);
router.post('/',(req,res,next)=>{req.app.validateUser(req,res,next)}, productosController.create);
router.put('/:id', productosController.update);
router.delete('/:id', productosController.delete);
module.exports = router;
