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


}
