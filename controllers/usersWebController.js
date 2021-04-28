const usersWebModel = require("../models/usersWebModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports={
  //Obtener todos los usuarios
    getAll:async function(req, res, next) {
      try{
        const productos = await productsModel.find()
        res.json(productos)
      }catch(e){
        next(e)
      }
    },
    //Dar de alta un usuario
    create:async function(req, res, next) {
      try{
        const document = new usersWebModel({
          name:req.body.name,
          edad:req.body.edad,
          email:req.body.email,
          password:req.body.password
        })

        const response = await document.save()

        res.json(response)
      }catch(e){
        //e.status=200
        next(e)
      }
        
    },
    //Login
    login:async function(req, res, next) {
      try{
        
        const userWeb = await usersWebModel.findOne({email:req.body.email})
        //findOne Filtro devuelve solo un objeto 
        if(!userWeb){
          //Si viene vacio
          res.json({error:true,message:"Email incorrecto"})
          return
        }
        if(bcrypt.compareSync(req.body.password,userWeb.password)){
          const token = jwt.sign({userId:userWeb._id},req.app.get("ClaveSecreta"),{expiresIn:"1h"})
          res.json({error:false,message:"Usuario Logueado Correctamente!",token:token})
          return
        }else{
          res.json({error:true,message:"Contraseña incorrecta"})
          return
        }
      }catch(e){
        //e.status=200
        next(e)
      }
        
    },
    
}