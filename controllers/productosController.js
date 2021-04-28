const e = require("express")
const productsModel = require("../models/productosModel")
const categoryModel = require("../models/categoriesModel")

module.exports = {
  //Obtener TODOS los productos
  getAll: async function (req, res, next) {
    try {
      let queryFind = {}
      if (req.query.buscar) {
        queryFind = { name: { $regex: ".*" + req.query.buscar + ".*", $options: "i" } }
      }
      if (req.query.category) {
        queryFind = { category: req.query.category.toString() }
      }
      const productos = await productsModel.find(queryFind).populate("category")
        .select("price name").sort({ price: -1, name: 1 })
      res.json(productos)
    } catch (e) {
      next(e)
    }
  },
  //Obtener el paginado de productos
  getAllPaginate: async function (req, res, next) {
    try {
      let queryFind = {}
      if (req.query.buscar) {
        queryFind = { name: { $regex: ".*" + req.query.buscar + ".*", $options: "i" } }
      }
      const productos = await productsModel.paginate(queryFind, {
        sort: { name: 1 },
        populate: "category",
        limit: req.query.limit || 3,
        page: req.query.page || 1
      })
      res.json(productos)
    } catch (e) {
      next(e)
    }
  },
  //Obtener un producto por id
  getById: async function (req, res, next) {
    try {
      console.log(req.params)
      const producto = await productsModel.findById(req.params.id)
      res.json(producto)
    } catch (e) {
      console.log(e)
    }

  },
  //Obtener un Producto por el tag
  getByTagId: async function (req, res, next) {
    try {
      console.log(req.params)
      const producto = await productsModel.findOne({ "tags._id": req.params.id })
      res.json(producto)
    } catch (e) {
      next(e)
    }
  },
  //Crear un nuevo Producto
  create: async function (req, res, next) {
    try {
      const categoria = await categoryModel.findBydIdAndValidate(req.body.category);
      if (categoria.error) {
        res.json(categoria);
        return;
      }
      const document = new productsModel({
        name: req.body.name,
        sku: req.body.sku,
        description: req.body.description,
        pages: req.body.pages,
        stock: req.body.stock,
        price: req.body.price,
        category: categoria._id,
        tags: req.body.tags
      })

      const response = await document.save()

      res.json(response)
    } catch (e) {
      next(e)
    }
  },
//Actualizar un Producto
  update: async function (req, res, next) {
    try {
      const producto = await productsModel.updateOne({ _id: req.params.id }, req.body)
      res.json(producto)
    } catch (e) {
      console.log(e)
    }

  },
  //Borrar un Producto
  delete: async function (req, res, next) {
    try {
      const producto = await productsModel.deleteOne({ _id: req.params.id })
      res.json(producto)
    } catch (e) {
      console.log(e)
    }

  }
}