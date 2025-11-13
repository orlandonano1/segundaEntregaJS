
let carritoStorage = localStorage.getItem("carrito")
carritoStorage = JSON.parse(carritoStorage)
console.log(carritoStorage)

const totalCarrito =(lista) => {
    
    return lista.reduce((total,sumatoria)=>{
        return total+(sumatoria.cantidad * sumatoria.precio)
    },0)
}
let total = document.querySelector('#total')
    total.innerText =  " Total:$  "+ totalCarrito(carritoStorage)



let listaCarrito = document.querySelector('#lista-carrito')
carritoStorage.forEach(element => {
    let elementoCarrito = document.createElement("li")
    elementoCarrito.innerHTML = `<h1 class="titulo">${element.nombre}</h1>
                                 <img class="imagen" src="${element.imagen}"/>
                                 <h2> $ ${element.precio}</h2>`
    elementoCarrito.className="elemento-carrito"

      
    let elementoCantidad = document.createElement("h2")
    elementoCantidad.innerText = "Cantidad:  "+element.cantidad

    let botonEliminar = document.createElement('button')
    let botonIncrementar = document.createElement('button')
    let botonDecrementar = document.createElement('button')
    botonEliminar.innerText = `Eliminar`
    botonDecrementar.innerText = `-`
    botonIncrementar.innerText = `+`
    botonEliminar.className="boton-eliminar"
    botonDecrementar.className="boton-cantidad"
    botonIncrementar.className="boton-cantidad"

    botonEliminar.onclick = () =>{
        elementoCarrito.remove ()
        carritoStorage = carritoStorage.filter((item) => item.id !== element.id )
        localStorage.setItem("carrito",JSON.stringify(carritoStorage))
        total.innerText =  " Total:$  "+totalCarrito(carritoStorage)
    }
    botonDecrementar.onclick = () => {
        const auxCantidad = element.cantidad -1
       if(auxCantidad > 0){
         elementoCantidad.innerText ="Cantidad: "+(-- element.cantidad)
        localStorage.setItem("carrito",JSON.stringify(carritoStorage))
        total.innerText =  " Total:$  "+totalCarrito(carritoStorage)
       }
       

    }
    botonIncrementar.onclick = () => {
        elementoCantidad.innerText = "Cantidad: "+(++ element.cantidad)
        localStorage.setItem("carrito",JSON.stringify(carritoStorage))
        total.innerText =  " Total:$  "+totalCarrito(carritoStorage)
    }

    elementoCarrito.appendChild(elementoCantidad)
    elementoCarrito.appendChild(botonEliminar)
    elementoCarrito.appendChild(botonDecrementar)
    elementoCarrito.appendChild(botonIncrementar)

    
    listaCarrito.appendChild (elementoCarrito)


});

