import fetch from "node-fetch";
const API = "https://api.escuelajs.co/api/v1";

function postData(urlAPI, data) {
  const response = fetch(urlAPI, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

const data = {
  title: "New Product on demand2",
  price: 1030492303,
  description: "A description about how to make a post with fetch",
  categoryId: 6,
  images: ["https://placeimg.com/640/480/any"],
};

postData(`${API}/products`, data)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
  .finally(() => console.log("finished"));
