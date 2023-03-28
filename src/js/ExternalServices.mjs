//const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
//const baseURL = "https://wdd330-backend.vercel.app/";
const baseURL = "http://localhost:3000/json/products.json/";

async function convertToJson(res) {
  const data = await res.json();
  console.log(res);
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(name) {
    const response = await fetch(baseURL + `products/${name}`);
    const data = await convertToJson(response);
    return data.Result;
}
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(baseURL + "checkout/", options).then(convertToJson);
    return response;
  }
  async longinRequest(creds){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    };
    const response = await fetch(baseURL + "login", options).then(convertToJson);
    return response.accessToken;

  }
  async getOrders(token){
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(baseURL + "orders", options).then(convertToJson);
    return response;

  }
  
}
