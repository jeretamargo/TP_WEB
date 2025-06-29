function cargarProductos(productosJson){
    let productos= document.querySelector("#productos");//document hace referencia al DOM, productos es el section del html
    productos.innerHTML="";                                  //limpiamos el cotenedor
    //productos Json es un arreglo de objetos, cada iteracion devuelve un objeto que se asigna a "producto"
    productosJson.forEach((producto, index) => {//producto es cada elemento del objeto json (con sus atributos precio imagen)

            /*Pasamos un segundo argumento que el forEach usa para como indice y le llamamos index, es el que nos va a indicar en que
            elemento estamos, tambien podriamos usar un for tradicional*/

            // template empieza con la comilla invertida del template literals
            //data- es un atributo de html5 permite guardar datos del objeto, por defecto data es string
            
            /*Dentro del titlo del producto, vamos a insertar un elemento <a>, para generar un link al html que cargara todos nuestros
            productos, llamado "producto.html".
            
            Usamos un "Parametro de busqueda" que se especifica con el simbolo "?" , a continuacion, 
            creamos un parametro de busqueda llamado "index" al que le asignaremos el index del array de objetos, asi, cada producto tendra
            su propia url que llevara a productos.html, donde hay un script que se encarga de leer el index y traer el producto especificado*/
        let template= `
                
                <article data-precio= ${producto.precio} class="productos json col-6 col-sm-6 col-md-3 align-items-center  justify-content-center  " >
                
                    <div class="position-relative r img-wrap">
                        <img src=${producto.imagen} class="img-fluid foto  rounded" alt="">
                        <button class="btn  btn-dark position-absolute bottom-0 end-0  rounded-pill">+</button>
                    </div>
                    <div class="d-flex flex-column gap-1 mt-2">
                        <p class="mb-0">${producto.categoria}</p>
                    <a href="producto.html?index=${index}" >
                            <h3 class="h5 mb-0">${producto.titulo}</h3> 
                    </a>
                            <div>${formatearPrecio(producto.precio)}</div>
                        
                    </div>
                
                </article>
          
        
        
        `;
        //antes del final del section inserta cada producto ,  los convierte en nodos
        productos.insertAdjacentHTML("beforeend", template);
    }
)}
//fin funcion
//funcion cargar ficha


function formatearPrecio(precio){
    //int1.numerformat es una herrramienta de JS formatea numeros segun la region
    return new Intl.NumberFormat("es-AR", {
        style: "currency", //estilo moneda
        currency: "ARS",
        maximumFractionDigits: 0//sin decimales
    }).format(precio);//aplica este formato al num reccibido y devuelve como string

}
//fin formatear precio

//comienzo fetch,  envia solicitud http para traer datos de esa url. el resultado es una promesa(lleva tiempo y se resuelve mas tarde)
fetch("https://raw.githubusercontent.com/fedegonzal/tuda-web1/refs/heads/main/supermercado/api/productos.json")
//funcion flecha es igual a  
//.then(function(response) {
  //return response.json();
//})
  .then(response => response.json())//la respuesta la convierte en objeto json, tmb devuelve promesa
  .then(data => {
        let productosJson = data; // Reemplazamos el array de productos con los datos de la API
        cargarProductos(productosJson); // Llamamos a la función para renderizar los productos
    })
    .catch(error => console.error("Error al cargar los productos:", error));
        
        
        
        
        
        