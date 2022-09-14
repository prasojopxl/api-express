import { response } from "express";
import Product from "../models/productModel.js";
import path from "path";
import fs from "fs";

export const getProduct= async (req,res) =>{
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getProductById=async(req,res) =>{
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message)
    }

}

export const saveProduct=(req,res) =>{
 if (req.files === null) return res.status(400).json({msg: "No FIle Uploaded"});
 const name = req.body.title;
 const file = req.files.file;
 const fileSize= file.data.length;
 const ext = path.extname(file.name);
 const fileName = file.md5+ext;
//  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
 const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
 const allowedType = ['.png','.jpg','jpeg']

 if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"invalid image"})
 if(fileSize > 5000000) return res.status(422).json({msg:"Image must be less than 5 MB"});

 file.mv(`./public/images/${fileName}`, async(err) => {
    if (err) return res.status(500).json({msg:err.message})
    try {
        await Product.create({name:name, image: fileName, url: url});
        res.status(201).json({msg:"product created successfully"})
    } catch (error) {
        console.log(error.message);

    }
})

}

export const updateProduct=(req,res) =>{

}

export const deleteProduct= async (req,res) =>{
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:"no data found"});
    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({        
            where: {
            id: req.params.id
        }})
        res.status(200).json({msg:"product deleted"})
    }catch (error) {
        console.log(error.message)
    }
}


