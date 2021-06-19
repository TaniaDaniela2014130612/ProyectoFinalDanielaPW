datos = document.getElementById("datos");
const formulario = document.getElementById("forma");
const db = firebase.firestore();
const subirDatos = (nombre, apellido) =>
db.collection("personas").doc().set({ nombre, apellido });
const verDatos = () => db.collection("personas").get();

imprimir = async () => {
    datos.innerHTML = "";
  const query = await verDatos();
  query.forEach((element) => {
      datos.innerHTML += `<div class="card col-3 m-4">
      <div class="card-body">
            <p><label class="col-form-label"> Nombre:</label> ${
                element.data().nombre
            } </p>
            <p><label class="col-form-label"> Nombre:</label> ${
                element.data().apellido
            } </p>
            </div>
            </div>`;
        });
    };
    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nombre = formulario["nombre"],
        apellido = formulario["apellido"];
      await subirDatos(nombre.value, apellido.value);
      formulario.reset();
      imprimir();
    });

    window.addEventListener("DOMContentLoaded", async () => {
        imprimir();
    });
