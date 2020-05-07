export class Http {
  static HEADERS = { "Content-type": "application/json" };

  static async get(url) {
    try {
      return await req(url);
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  static async post(url, data = {}) {
    try {
      return await req(url, "POST", data);
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  static async delete(url) {
    try {
      return await req(url, "DELETE");
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  static async patch(url, data = {}) {
    try {
      return await req(url, "PATCH", data);
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}

async function req(url, method = "GET", data = {}) {
  const config = {
    method,
    headers: Http.HEADERS,
  };

  if (method === "POST" || method === "PATCH") {
    config.body = JSON.stringify(data);
  }

  const res = await fetch(url, config);
  return res.json();
}
