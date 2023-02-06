const XMLHttprequest = require("xmlhttprequest").XMLHttpRequest;
const API = "https://api.escuelajs.co/api/v1";

function fetchData(urlAPI, callback) {
  let xhttp = new XMLHttprequest();

  xhttp.open("GET", urlAPI, true);
  xhttp.onreadystatechange = function (event) {
    // UNSENT = 0; // estado inicial
    // OPENED = 1; // llamada abierta
    // HEADERS_RECEIVED = 2; // cabeceras de respuesta recibidas
    // LOADING = 3; // la respuesta está cargando (un paquete de datos es recibido)
    // DONE = 4; // solicitud completa
    console.log("esto es readyState", xhttp.readyState);
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        return callback(null, JSON.parse(xhttp.responseText));
      } else {
        const error = new Error("Error", urlAPI);
        return callback(error, null);
      }
    }
  };
  //configurar la respuesta para que devuelva un tipo de archivo en concreto, no funciona en todos los entornos
  // xhr.responseType = 'json';
  xhttp.send();

  xhttp.onprogress = function (event) {
    console.log("Esto es onprogress", event);
    if (event.lengthComputable) {
      return console.log(`Recibidos ${event.loaded} de ${event.total} bytes`);
    } else {
      return console.log(`Recibidos ${event.loaded} bytes`);
    }
  };

  xhttp.onload = function () {
    if (xhttp.readyState === 3) {
      return console.log(`Error ${xhttp.status}: ${xhttp.statusText}`);
    } else {
      return console.log(`Hecho, obtenidos ${xhttp?.response?.length} bytes`);
    }
  };
}

fetchData(`${API}/products`, function (error1, data1) {
  if (error1) {
    return console.error(error1);
  }
  fetchData(`${API}/products/${data1[0].id}`, function (error2, data2) {
    if (error2) {
      return console.error(error2);
    }
    fetchData(
      `${API}/categories/${data2?.category?.id}`,
      function (error3, data3) {
        if (error3) {
          return console.error(error3);
        }
        console.log(`${data1[1]}`);
        console.log(`${data2.title}`);
        console.log(`${data3.name}`);
      }
    );
  });
});
