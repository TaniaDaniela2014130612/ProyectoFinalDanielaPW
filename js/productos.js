const formulario = document.getElementById("forma2");
const db = firebase.firestore();
const db2 = firebase.storage();
const datos = document.getElementById("datosproductos");
const subirDatos = async (producto, precio, url) => {
  const link = await db2.ref("Imagenes/" + url.name).put(url);
  const link2 = await link.ref.getDownloadURL();
  db.collection("productos").doc().set({ producto, precio, link2 });
};
const verDatos = () => db.collection("productos").get();

imprimir = async () => {
  datos.innerHTML = "";
  const query = await verDatos();
  query.forEach((element) => {
    datos.innerHTML += `<div class="m-5 card" style="width: 15rem; ">
        <img src="${element.data().link2}" alt="5" class="card-img-top" style="max-width: 100%" height="180">
        <div class = "card-body">
        <h5 class="card-title">${element.data().producto} </h5>
        <p class="card-text"> <div class="input-group m-2" ><span class="input-group-text">$</span><input type="text" class="form-control" disable value="${element.data().precio}"></div></p> 
        </div>
        </div>`;
  });
};

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const producto = formulario["producto"],
    precio = formulario["precio"],
    url = formulario["imagen"];
  await subirDatos(producto.value, precio.value, url.files[0]);
  formulario.reset();
  imprimir();
});

window.addEventListener("DOMContentLoaded", async () => {
  imprimir();
});
