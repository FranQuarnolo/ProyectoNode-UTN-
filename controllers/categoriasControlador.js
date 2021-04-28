const productsModel = require("../models/categoriesModel")

module.exports = {
  //Obtengo todas las categorias existentes
  getAll: async function (req, res, next) {
    try {
      const productos = await productsModel.find()
      res.json(productos)
    } catch (e) {
      next(e)
    }
  },
  //Creo una categoria que tiene el nombre solamente
  create: async function (req, res, next) {
    try {
      const document = new productsModel({
        name: req.body.name
      })

      const response = await document.save()

      res.json(response)
    } catch (e) {
      //e.status=200
      next(e)
    }
  },
}