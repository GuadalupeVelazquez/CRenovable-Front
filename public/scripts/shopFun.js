document.addEventListener("DOMContentLoaded", function () {
    const productos = [{
        "_id": {
            "$oid": "65668815cbdc43de50d8ec33"
        },
        "name": "Maceta orgánica",
        "description": "Maceta biodegradable, 20 x 20 cm, 100% material reciclado",
        "price": 1500,
        "image": "",
        "category": "Decoración de exteriores",
        "__v": 0,
        "i": "2"
    },
    {
        "_id": {
            "$oid": "65668931cbdc43de50d8ec35"
        },
        "name": "Lampara de botella",
        "description": "Lampara botella 20 x 20 cm\n100% material reciclado.",
        "price": 2500,
        "image": "",
        "category": "Decoración de exteriores",
        "__v": 0,
        "i": "3"
    },
    {
        "_id": {
            "$oid": "65668936cbdc43de50d8ec43"
        },
        "name": "Maceta biodegradable",
        "description": "Maceta biodegradable, 20 x 20 cm, 100% material reciclado",
        "price": 1000,
        "image": "",
        "category": "exteriores",
        "__v": 0,
        "i": "5"
    },
    {
        "_id": {
            "$oid": "65668937cbdc43de50d8ec45"
        },
        "name": "Maceta biodegradable",
        "description": "Maceta biodegradable, 20 x 20 cm, 100% material reciclado",
        "price": 1000,
        "image": "",
        "category": "exteriores",
        "__v": 0,
        "i": "6"
    }];

    const div = document.querySelector(".containerProd");
    productos.forEach(producto => {
        const proDiv = `<div class="prod">
        <img src="../../images/products/macetas.webp" alt="Maceta">
        <h3>${producto.name}</h3>
        <p>${producto.description}</p>
        <p id="precio">$ ${producto.price}</p>
        <button class="res" data-id="${producto.i}">- </button><p id="${producto.i}" class="cantidad"> 0 </p><button class="sum" data-id="${producto.i}">+ </button>
        <button class="add" data-id="${producto.i}">Agregar al carrito</button>
        </div>`;
        div.innerHTML += proDiv;
    });

    const shop = document.querySelector('#shopNum'),
        btnRes = document.querySelectorAll('.res'),
        btnSum = document.querySelectorAll('.sum'),
        add = document.querySelectorAll('.add'),
        c = document.querySelectorAll('.cantidad');

    // agregar productos
    btnSum.forEach(btn => {
        btn.addEventListener('click', (event) => {
            sum(event.target.dataset.id);
        });
    });

    btnRes.forEach(btn => {
        btn.addEventListener('click', (event) => {
            res(event.target.dataset.id);
        });
    });

    add.forEach(btn => {
        btn.addEventListener('click', (event) => {
            cart(event.target.dataset.id);
        });
    });

    // Funciones

    // Sumar
    function sum(id) {
        let cantidad = parseInt(document.getElementById(id).innerHTML);
        if (cantidad >= 0) {
            cantidad += 1;
        }
        document.getElementById(id).innerHTML = cantidad;
    }

    // Restar
    function res(id) {
        let cantidad = parseInt(document.getElementById(id).innerHTML);
        if (cantidad > 0) {
            cantidad -= 1;
        }
        document.getElementById(id).innerHTML = cantidad;
    }

    // Añadir al carrito
    function cart(id) {
        let s = parseInt(shop.innerHTML);
        s += parseInt(document.getElementById(id).innerHTML);
        shop.innerHTML = s;
    }
});


    const g=document.querySelector('#liG'),
    ret=document.querySelector('#liRet'),
    e=document.querySelector('#liEn'),

    sG=document.querySelector('#bg-gr'),
    sRet=document.querySelector('#bg-ret'),
    sE=document.querySelector('#bg-en'),

    bG=document.querySelector('#ball-gr'),
    bRet=document.querySelector('#ball-ret'),
    bE=document.querySelector('#ball-en');

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

