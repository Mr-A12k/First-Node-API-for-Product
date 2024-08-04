const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require('./model/products.models.js');
const app = express();

app.use(express.json())

 
app.listen(8001,()=>{
    console.log("server run on port 3000");
})

app.get('/',(req,res)=>{    
    res.send("hello from node");
})

app.get('/api/products',async(req,res)=>{
        try {
            const product = await Product.find({});
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({message: error.message});
        }
})

//get product details with id
app.get('/api/products/:id',async(req,res)=>{
        try {
           const {id} = req.params;
           const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
})

//post a product
app.post('/api/product',async(req,res)=>{
    try {
       const product=await Product.create(req.body);
       console.log("Product created");
       return res.status(200).json(product);
   } catch (error) {
      return res.status(500).json({message: "Product not found!"});
   }
    console.log(req.body);
})

//update product
app.put('/api/product/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message:"Product not found"})
        }
        const updatedProduct=await Product.findByIdAndUpdate(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message:"Product not found"});
    }
})

//delete item by id
app.delete('/api/product/:id', async(req,res)=>{
    try { 
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({message:"Product deleted successfully"});
    }catch (error){
        res.status(404).json({message:"Product not found!"});
    }   
})

mongoose.connect("mongodb://localhost:27017/Kabix",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => {
        console.log("Sucessfully connected");
        app.listen(8081, () => {
            console.log('server is unning on port 8081');
        })
    })
    .catch((error) => {
        console.log("connection error", error);
    })