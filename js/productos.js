const formulario= document.getElementById("forma2");
const db = firebase.firestore();
const db2 = firebase.storage();
const datos = document.getElementById("datosproductos");
const subirDatos = async (producto, precio, url)=> {
    const link = await db2.ref("Imagenes/"+url.name).put(url)
    const link2 = await link.ref.getDownloadURL();
    db.collection("productos").doc().set({producto, precio, link2})}
const verDatos = ()=>db.collection("productos").get()

imprimir= async ()=>{
    datos.innerHTML=''
    const query = await verDatos()
    query.forEach(element => {
        datos.innerHTML+=`<p>${element.data().producto} </p>
        <p>${element.data().precio} </p> <p><img src="${element.data().link2}" alt=""> </p>`
        
    });
  }

  formulario.addEventListener('submit', async(e)=>{
    e.preventDefault ()
      const producto=formulario["producto"], precio=formulario["precio"], url=formulario["imagen"];
      await subirDatos(producto.value, precio.value, url.files[0])
      formulario.reset()
      imprimir()
})

window.addEventListener("DOMContentLoaded", async()=>{
    imprimir()
})