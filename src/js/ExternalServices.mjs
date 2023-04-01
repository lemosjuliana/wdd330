//const baseURL = "http://server-nodejs.cit.byui.edu:3000/";
//const baseURL = "https://wdd330-backend.vercel.app/";
//const baseURL = "http://localhost:3000/json/products.json/";
const baseURL = window.location.origin;

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor() {
  }
  async getData() {
    const response = await fetch(baseURL + `/json/products.json`);
    const data = await convertToJson(response);
    return data;
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
