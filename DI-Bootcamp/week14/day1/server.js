import express from 'express';
import productRouter from './routes/product.Routes.js';
import path from 'path';

const app= express()
const PORT=5001
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
const __dirname = path.resolve();

app.use('/',express.static(__dirname + '/public'))
app.use("/api/products",productRouter);
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API !');
});
