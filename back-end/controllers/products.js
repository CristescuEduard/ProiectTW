const ProductDB=require("../models").Products;
const sequelize=require("../models/index").sequelize;
const { Op } = require("sequelize");
const controller={
    addProduct: async(req,res)=>{
        try {
            let reqBody = req.body;
            if (
              reqBody.name &&
              reqBody.quantity &&
              reqBody.expirationDate&&
              reqBody.category&&
              reqBody.id
            ) {
                req.body.expirationDate= new Date(req.body.expirationDate);
                let product = await ProductDB.create(req.body);
                res
                  .status(201)
                  .send({ message: "Created product successfully" });
              
            } 
            else res.status(400).send({message: "nu sunt date",reqbody:reqbody});
          } catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    setAvailable: async(req,res)=>{
        try {
            const products = await ProductDB.findOne({where:{Productid:req.params.productID}});
            if (products) {
                products.update({isAvailable:true});
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    EraseCart: async(req,res)=>{
        try {
            const products = await ProductDB.findOne({where:{Productid:req.params.productID}});
            if (products) {
                products.update({CartId:null});
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    setClaimed: async(req,res)=>{
        try {
            const products = await ProductDB.findOne({where:{Productid:req.params.productID}});
            if (products) {
                products.update({wasClaimedBy:req.params.id});
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },


    getAvailable: async(req,res)=>{
        try {
            const products = await ProductDB.findAll({where:{ [Op.and]:[{isAvailable:true}], wasClaimedBy:{[Op.ne]:req.params.productID}, id:{[Op.ne]:req.params.productID}}});
            if (products) {
                return res.status(200).send(products);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    setFree: async(req,res)=>
    {
        try {
            const products = await ProductDB.findOne({where:{Productid:req.params.productID}});
            if (products) {
                products.update({wasClaimedBy:0});
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getClamedByUser: async(req,res)=>{
        try {
            const products = await ProductDB.findAll({where:{ wasClaimedBy:req.params.ID}});
            if (products) {
                return res.status(200).send(products);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getAllProductsCart: async(req,res)=>{
        try {
            const products = await ProductDB.findAll({where:{CartId:req.params.ID}});
            if (products) {
                return res.status(200).send(products);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getProductsByCategory:async(req,res)=>{
        try {
            const products = await ProductDB.findAll({where:{category:req.params.category,id:req.params.userId}});
            if (products) {
                return res.status(200).send(products);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    addToCart:async(req,res)=>{
        try {
            const products = await ProductDB.findOne({where:{Productid:req.params.productID}});
            if (products) {
                products.update({CartId:req.params.CartID});
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    ProductExpiration: async(req,res)=>{

        try{
        
            const timeElapsed = Date.now();
            const today= new Date(timeElapsed);
            let products = await ProductDB.findAll({where: {[Op.or]:[{expirationDate : today },{expirationDate:  today.setDate(today.getDate()+1)},{expirationDate:  today.setDate(today.getDate()+1)},{expirationDate:  today.setDate(today.getDate()+1)}],isAvailable:false,id:req.params.ID}});


            if(products==null){
                res.status(404).send({ message: "Products not found" });
            } else {
                return res.status(200).send(products);
            }
        } catch(err){
            res.status(500).send({ message: `${err}` });
        }
    },
    deleteProductbyUser: async(req,res)=>{
        try {
              let product = await ProductDB.findAll({ where: { id: req.params.id } });
              if (product == null) {
                res.status(404).send({ message: "Product not found" });
              }else {
              ProductDB.destroy({where:{id: req.params.id}});
              res.status(201).send({message: "Product deleted"});
          } 
        }catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    deleteProductbyId: async(req,res)=>{
        try {
            if (req.params.productId>0) {
              let product = await ProductDB.findOne({ where: { Productid: req.params.productId } });
              if (product == null) {
                res.status(404).send({ message: "Product not found" });
              }else {
              ProductDB.destroy({where:{Productid: req.params.productId}});
              res.status(201).send({message: "Product deleted"});
            }
          } 
        }catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },
}

module.exports = controller;