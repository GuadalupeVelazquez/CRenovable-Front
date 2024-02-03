let cartItems = [];
let shop = 0;
let category = '';
const filters = {
    isTakeAway: false,
    isFreeShiptment: false,
    hasShitpment: false,

}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        console.log('Contenido del carrito desde localStorage:', cartItems);

        category = window.location.pathname.split('/').pop();

        await renderProductsByCategory(category, filters);

    } catch (error) {
        console.error('Error al obtener productos:', error);
    }

    shop = document.querySelector('#shopNum');
    updateShopCount(); // Llamada para actualizar la cantidad inicial al cargar la página

    const btnRes = document.querySelectorAll('.res'),
        btnSum = document.querySelectorAll('.sum'),
        add = document.querySelectorAll('.add');

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
        if (cantidad >= 1) {
            cantidad += 1;
        }
        document.getElementById(id).innerHTML = cantidad;
    }

    // Restar
    function res(id) {
        let cantidad = parseInt(document.getElementById(id).innerHTML);
        if (cantidad > 1) {
            cantidad -= 1;
        }
        document.getElementById(id).innerHTML = cantidad;
    }

    // Añadir al carrito
    function cart(id) {
        console.log('Intentando agregar al carrito:', id);

        const cantidad = parseInt(document.getElementById(id).innerHTML);
        const currentShopValue = parseInt(shop.textContent) || 0;

        console.log('Cantidad:', cantidad);

        // Obtener el nombre y la descripción del producto seleccionado
        const productName = document.getElementById(id).parentNode.querySelector('h3').innerText;
        const productPrecio = document.getElementById(id).parentNode.querySelector('#precio').innerText;

        const precioNumerico = parseFloat(productPrecio.replace("$", ""));

        console.log('Producto:', productName, 'Precio:', precioNumerico);

        const existingProductIndex = cartItems.findIndex(item => item.id === id);

        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            cartItems[existingProductIndex].quantity += cantidad;
            console.log('Producto ya en el carrito. Actualizando cantidad:', cartItems[existingProductIndex]);
        } else {
            // Si el producto no está en el carrito, agregarlo con información adicional
            cartItems.push({
                id: id,
                quantity: cantidad,
                name: productName,
                precio: precioNumerico,
                // Puedes agregar más información del producto aquí si es necesario
            });
            console.log('Producto añadido al carrito:', cartItems[cartItems.length - 1]);
        }

        // Actualizar el carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Actualizar la cantidad en la interfaz
        shop.textContent = (currentShopValue + cantidad).toString();
        updateShopCount();
    }

    function updateShopCount() {
        // Sumar cantidades en cartItems y actualizar en shop
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        shop.textContent = totalQuantity.toString();
    }

    const g = document.querySelector('#liG'),
        ret = document.querySelector('#liRet'),
        e = document.querySelector('#liEn'),

        sG = document.querySelector('#bg-gr'),
        sRet = document.querySelector('#bg-ret'),
        sE = document.querySelector('#bg-en'),

        bG = document.querySelector('#ball-gr'),
        bRet = document.querySelector('#ball-ret'),
        bE = document.querySelector('#ball-en');


    // filtros

    g.addEventListener('click', () => {
        toggle(sG, 'toogleOn', 'toogleOff');
        toggle(bG, 'ballOn', 'ballOff');
        filters.isFreeShiptment = !filters.isFreeShiptment;
        renderProductsByCategory(category, filters);
    });
    ret.addEventListener('click', () => {
        toggle(sRet, 'toogleOn', 'toogleOff');
        toggle(bRet, 'ballOn', 'ballOff');
        filters.isTakeAway = !filters.isTakeAway;
        renderProductsByCategory(category, filters);
    });
    e.addEventListener('click', () => {
        toggle(sE, 'toogleOn', 'toogleOff');
        toggle(bE, 'ballOn', 'ballOff');
        filters.hasShitpment = !filters.hasShitpment;
        renderProductsByCategory(category, filters);
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
});

async function renderProductsByCategory(category, filters) {
    // URL base de la API
    const apiUrl = `http://localhost:3000/getProductsByCategory/${category}`;

    // Parámetros de consulta
    const queryParams = {
        shiptment: calculateShiptmentQueryParam(filters),
        isFreeShiptment: calculateIsFreeShiptmentQueryParam(filters),
    };

    // Construir la URL con los parámetros de consulta
    const urlWithParams = new URL(apiUrl);
    Object.keys(queryParams).forEach(key => urlWithParams.searchParams.append(key, queryParams[key]));
    console.log({ urlWithParams });

    const response = await fetch(urlWithParams);
    console.log(category, filters)
    if (!response.ok) {
        throw new Error('Error al obtener productos');
        console.log('Acá llegamos');
    }

    const productos = await response.json();

    // Cambiar titulo de pagina
    const title = document.querySelector("#catTitle");
    title.innerHTML = `${category}`;
    if (`${category}` == 'Perfumes%20y%20fragancias') {
        let PF = document.querySelector('#PF');
        PF.style.fontWeight = 'Semi Bold';
        PF.style.fontSize = '17px';
        title.innerHTML = `Perfumes y Fragancias`;
    } else if (`${category}` == 'Decoraci%C3%B3n%20de%20exteriores') {
        let DE = document.querySelector('#DE');
        DE.style.fontWeight = 'Semi Bold';
        DE.style.fontSize = '17px';
        title.innerHTML = `Decoración de Exteriores`;
    } else if (`${category}` == 'Higiene%20personal') {
        let HP = document.querySelector('#HP');
        HP.style.fontWeight = 'Semi Bold';
        HP.style.fontSize = '17px';
        title.innerHTML = `Higiene Personal`;
    } else if (`${category}` == 'Cuidado%20personal') {
        let CP = document.querySelector('#CP');
        CP.style.fontWeight = 'Semi Bold';
        CP.style.fontSize = '17px';
        title.innerHTML = `Cuidado Personal`;
    }

    // Cards
    const div = document.querySelector(".containerProd");
    div.innerHTML = '';
    if (productos.length === 0) {
        div.innerHTML = 'No se encontraron productos. Intenta con otros filtros.';
    }
    productos.forEach((producto) => {
        console.log('Acá llegamos');
        const isFreeShiptmentP = producto.isFreeShiptment ? '<p class="is-free-shiptment">Envio gratis</p>' : '';
        const proDiv = `<div class="prod">
                <img src="${producto.image}" alt="${producto.name}">
                <div class="flex"><h3>${producto.name}</h3> <a class="info" title="¡Más información del producto!" href="/products/unico/${producto._id}">+info</a></div>
                <p>${producto.description}</p>
                ${isFreeShiptmentP}
                <p id="precio">$${producto.price}</p>
                <button class="res" data-id="${producto._id.toString()}">- </button>
                <p id="${producto._id.toString()}" class="cantidad"> 1 </p>
                <button class="sum" data-id="${producto._id.toString()}">+ </button>
                <button class="add" data-id="${producto._id.toString()}">Agregar al carrito</button>
            </div>`;
        div.innerHTML += proDiv;
    });
}

function calculateShiptmentQueryParam(filters) {
    if (filters.isTakeAway && !filters.hasShitpment) {
        return false;
    }
    if (!filters.isTakeAway && filters.hasShitpment) {
        return true;
    }
    return null;
}

function calculateIsFreeShiptmentQueryParam(filters) {
    if (filters.isFreeShiptment) {
        return true;
    }
    return null;
}