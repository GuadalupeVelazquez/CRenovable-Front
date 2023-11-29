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