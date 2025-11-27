

//const productoantibioticos = []//
fetch('./data/db.js')
.then(response =>response.json())
.then(productoantibioticos => {
  let carritoStorage = localStorage.getItem("carrito")
let carrito =  JSON.parse(carritoStorage) || []

const calcularTamanio = (lista)=> {
  
    return lista.reduce((acumulador,item)=>{
      return acumulador+item.cantidad
    },0)
}


const agregarCarrito = (idSearch) =>{

  
  let objetoExistente = carrito.some((element) => element.id === idSearch) 

  if (objetoExistente){
    
    let objetoEncontrado = carrito.find((element) => element.id === idSearch) 
    objetoEncontrado.cantidad++
  }

  else{
    let objetoEncontrado = productoantibioticos.find((element) => element.id === idSearch)
    let objetoAgregar = {
      id: idSearch,
      nombre: objetoEncontrado.nombre,
      precio: objetoEncontrado.precio,
      imagen: objetoEncontrado.imagen,
      cantidad: 1
    }
    carrito.push (objetoAgregar)
  }
}

let listaAntibioticos = document.querySelector ('#lista-antibioticos')

let contadorCarrito = document.createElement("label")




let navBar = document.querySelector ('.nav-bar')

productoantibioticos.forEach((element)=>{

  let boton = document.createElement('button')
  boton.onclick = ()=>{
    agregarCarrito (element.id)
    contadorCarrito.innerText = calcularTamanio(carrito)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    agregado("Agregado")
  }
  boton.innerText = 'Agregar'
  boton.className="boton-cantidad"



  let imagen = document.createElement('li')
  imagen.innerHTML = `<h1>${element.nombre}</h1>
                      <img class="imagen" src = "${element.imagen}" />
                      <h2> $ ${element.precio}</h2>`
  imagen.className="elemento-carrito"

  imagen.appendChild (boton)
  

  
  listaAntibioticos.appendChild (imagen)
}) 




contadorCarrito.innerText = calcularTamanio(carrito)
navBar.appendChild (contadorCarrito)







let agregado =(mensaje)=>{

  Toastify({
  text: mensaje,
  className: "info",
  gravity: "bottom", 
  position: "center", 
  style: {
    background: "linear-gradient(to right, #22bfacff, #43473dff)",
  }
}).showToast();


}
})



