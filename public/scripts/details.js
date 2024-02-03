document.addEventListener('DOMContentLoaded', async () => {
    try {
        const productId = window.location.pathname.split('/').pop(); 
        //Solicitud de producto por id a base de datos
        const response = await fetch(`http://localhost:3000/getProduct/${productId}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }

        const productos = await response.json();
        console.log('Productos obtenidos:', productos);
        
        //Div que recibe información
        const div = document.querySelector(".product-detail-wraper");

        //Informacion que recibe div del back

        console.log('Acá llegamos');
        const proDiv = `<div class="product-detail flex">
            <div class="padding">
                <div class="detail-header flex">
                    <button onclick="redirigir('/products/${productos.category}')" class="btn-close flex-button">
                        <img class="close" src="../../images/icons/close.svg" alt="">
                    </button>
                </div>
                <div class="detail-body flex">
                    <div class="product-image flex">
                        <img src="${productos.image}" alt="Imagen del producto">
                    </div>
                    <div class="product-description flex">
                        <h2>${productos.name}</h2>
                        <h2>$ ${productos.price}</h2>
                        <p class="textdescription">
                        ${productos.masInfo}
                        </p>
                        <h4>${productos.extra}</h4>
                        <div class="div-buttons flex">
                            <button class="btn-romder flex-button">
                                <img src="../../images/icons/remove.svg" alt="">
                            </button>
                            <p>1</p>
                            <button class="btn-romder flex-button">
                                <img src="../../images/icons/add.svg" alt="">
                            </button>
                        </div>
                        <div class="carrito div-buttons flex">
                            <button class="btn-agregar flex btn button-primary">
                                <span>Agregar al carrito</span>
                            </button>
                            <button class="btn-comprar flex btn button-primary">
                                <span>Comprar ahora</span>
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        div.innerHTML += proDiv;


    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
});
