      const formulario= document.getElementById("forma");
      const db = firebase.firestore();
      const subirDatos = (nombre, apellido)=>db.collection("personas").doc().set({nombre, apellido})
      const verDatos = ()=>db.collection("personas").get()
      formulario.addEventListener('submit', async(e)=>{
          e.preventDefault ()
            const nombre=formulario["nombre"], apellido=formulario["apellido"];
            await subirDatos(nombre.value, apellido.value)
            formulario.reset()
            imprimir()
      })
      
      imprimir= async ()=>{
        datos.innerHTML=''
        const query = await verDatos()
        query.forEach(element => {
            datos.innerHTML+=`<p>${element.data().nombre} </p>
            <p>${element.data().apellido} </p>`
            
        });
      }

      datos=document.getElementById("datos");
      window.addEventListener("DOMContentLoaded", async()=>{
          imprimir()
      })