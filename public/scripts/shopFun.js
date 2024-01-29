const shop = document.querySelector('#shopNum'),
    btnRes= document.querySelector('.res'),
    btnSum=document.querySelector('.sum'),
    add=document.querySelector('.add'),
    c= document.querySelector('.cantidad'),

    g=document.querySelector('#liG'),
    ret=document.querySelector('#liRet'),
    e=document.querySelector('#liEn'),

    sG=document.querySelector('#bg-gr'),
    sRet=document.querySelector('#bg-ret'),
    sE=document.querySelector('#bg-en'),

    bG=document.querySelector('#ball-gr'),
    bRet=document.querySelector('#ball-ret'),
    bE=document.querySelector('#ball-en');




// Eventos
document.addEventListener('DOMContentLoaded', async () => {

    try {
       
        const category = window.location.pathname.split('/').pop();

        const response = await fetch(`http://localhost:3000/getProductsByCategory/${category}`);
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }

        const productos = await response.json();

        const containerProd = document.querySelector("#containerProd");

productos.forEach((producto, index) => {
  let cantidad = 1;
  const card = `<div class="prod">
    <img src="../../images/products/macetas.webp" alt="Maceta">
    <h3>${producto.name}</h3>
    <p>${producto.description}</p>
    <p id="precio">$ ${producto.price}</p>
    <button class="res" onclick="decrementarCantidad(${index})">-</button>
    <p class="cantidad" id="cantidad-${index}">${cantidad}</p>
    <button class="sum" onclick="incrementarCantidad(${index})">+</button>
    <button class="add">Agregar al carrito</button>
  </div>`;

  containerProd.innerHTML += card;
});
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
});

btnSum.addEventListener('click', ()=>{
    sum();
})

btnRes.addEventListener('click',()=>{
    res()
});

add.addEventListener('click',()=>{
    cart()
})
// filtros

g.addEventListener('click', () => {
    toggle(sG, 'toogleOn', 'toogleOff');
    toggle(bG, 'ballOff', 'ballOn');
});
ret.addEventListener('click', () => {
    toggle(sRet, 'toogleOn', 'toogleOff');
    toggle(bRet, 'ballOff', 'ballOn');
});
e.addEventListener('click', () => {
    toggle(sE, 'toogleOn', 'toogleOff');
    toggle(bE, 'ballOff', 'ballOn');
});



// Funciones

function incrementarCantidad(index) {
    const cantidadElement = document.getElementById(`cantidad-${index}`);
    let cantidad = parseInt(cantidadElement.textContent, 10);
    cantidad += 1;
    cantidadElement.textContent = cantidad;
  }
  
  function decrementarCantidad(index) {
    const cantidadElement = document.getElementById(`cantidad-${index}`);
    let cantidad = parseInt(cantidadElement.textContent, 10);
    cantidad = Math.max(1, cantidad - 1);
    cantidadElement.textContent = cantidad;
  }

// Sumar
function sum(){
    let cantidad = parseInt(c.innerHTML);
    if (cantidad>=0){
        cantidad += 1;
    }
    c.innerHTML=cantidad
}

//restar

function res(){
    let cantidad = parseInt(c.innerHTML);
    if (cantidad>0){
        cantidad -= 1;
    }
    c.innerHTML=cantidad
}
//añadir al carrito
function cart(){
    let s=parseInt(shop.innerHTML);
    shop.innerHTML= s + parseInt(c.innerHTML)
}

//mover botones

function toggle(span, cl1, cl2) {
    if (span.classList.contains(cl1)) {
        span.classList.remove(cl1);
        span.classList.add(cl2);
    } else {
        span.classList.remove(cl2);
        span.classList.add(cl1);
    }
}