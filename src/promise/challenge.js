import fetch from "node-fetch";

const API = "https://api.escuelajs.co/api/v1";

function fetchData(urlAPI) {
  return fetch(urlAPI);
}

// fetchData(`${API}/products`)
//   .then((data) => data.json())
//   .then((products) => console.log(products))
//   .catch((error) => console.error(error));

fetchData(`${API}/products`)
  .then((response) => response.json())
  .then((products) => {
    console.log(products);
    return fetchData(`${API}/products/${products[1].id}`);
  })
  .then((response) => response.json)
  .then((product) => {
    console.log(product.title);
    return fetchData(`${API}/categories/${product.category.id}`);
  })
  .then((response) => response.json())
  .then((category) => console.log(category.name))
  .catch((error) => console.error(error))
  .finally(() => console.log("finish"));
