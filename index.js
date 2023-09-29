const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/pages/homePage.html');
});
app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/public/pages/productPages/products.html');
});
app.get('/products/detail', (req, res) => {
    res.sendFile(__dirname + '/public/pages/productPages/productDetail.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/pages/loginAndRegister.html');
});
app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/public/pages/userProfile.html');
});
app.get('/shop', (req, res) => {
  res.sendFile(__dirname + '/public/pages/shopCart.html');
});

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
