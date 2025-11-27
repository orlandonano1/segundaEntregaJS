
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
       
        Swal.fire({
        title: "Seguro que desea eliminar el producto?",
        showDenyButton: true,
        confirmButtonText: "No Eliminar",
        denyButtonText: `Eliminar`
        }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire("No se Elimino", "", "success");
        } else if (result.isDenied) {
            elementoCarrito.remove ()
            carritoStorage = carritoStorage.filter((item) => item.id !== element.id )
            localStorage.setItem("carrito",JSON.stringify(carritoStorage))
            total.innerText =  " Total:$  "+totalCarrito(carritoStorage)
            Swal.fire("Eliminado", "", "info");
            }
        });


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

let elementosCarrito = document.querySelectorAll(".elemento-carrito")
let botonVaciar  = document.querySelector("#limpiarCarrito")
botonVaciar.onclick =()=>{
     Swal.fire({
        title: "Seguro que desea vaciar el carrito?",
        showDenyButton: true,
        confirmButtonText: "No Vaciar",
        denyButtonText: `Eliminar`
        }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire("No se Vacio", "", "success");
        } else if (result.isDenied) {
            elementosCarrito.forEach((element)=>{
                element.remove()
            })
            carritoStorage = []
            localStorage.setItem("carrito",JSON.stringify(carritoStorage))
            total.innerText =  " Total:$  "+ totalCarrito(carritoStorage)
            Swal.fire("Carrito Vaciado", "", "info");
        }
    });
   
}

let finalizarCompra = document.querySelector("#finalizarCompra")

finalizarCompra.onclick =()=>{
    Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Gracias por tu compra",
    showConfirmButton: false,
    timer: 1500
    });
    elementosCarrito.forEach((e)=>{
        e.remove()

    })
    carritoStorage = []
    localStorage.setItem("carrito",JSON.stringify(carritoStorage))
    total.innerText =  " Total:$  "+ totalCarrito(carritoStorage)


}




