

const productoantibioticos = [
  {
    id: 1,
    nombre: "Amoxicilina",
    precio: 120,
    imagen: "../imagenes/amoxicilina.png" 
  },
  {
    id: 2,
    nombre: "Clindamicina",
    precio: 140,
    imagen: "../imagenes/clindamicina.png"
  },
  {
    id: 3,
    nombre: "Ceftriaxona",
    precio: 90,
    imagen: "../imagenes/ceftriaxona.png" 
  },
  {
    id: 4,
    nombre: "Gentamicina",
    precio: 70,
    imagen: "../imagenes/gentamicina.jpg"
  },
  {
    id: 5,
    nombre: "Amikasina",
    precio: 50,
    imagen: "../imagenes/amikasina.jpg" 
  },
  {
    id: 6,
    nombre: "Cefixima",
    precio: 260,
    imagen: "../imagenes/cefixima.png"
  },
  {
    id: 7,
    nombre: "Cefadroxilo",
    precio: 175,
    imagen: "../imagenes/cefadroxilo.jpg" 
  },
  {
    id: 8,
    nombre: "Azitromicina",
    precio: 70,
    imagen: "../imagenes/azitromicina.jpg"
  }
];




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
  }
  boton.innerText = 'agregar'
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



