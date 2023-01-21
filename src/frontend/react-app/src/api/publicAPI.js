import RequestHandler from "./requestHandler";

 const publicAPI = {

    get: async (url) => {
      try {
        const response = await RequestHandler.get(url);
        return response;
      } catch(err) {
        return err;
      }
    },
    post: async (url, body) => {
      try {
        const postResponse = await RequestHandler.post(url, {
          ...body
        });
        return postResponse;
      } catch(err) {
        return err;
      }
    },
    delete: async (url, body) => {
      try {
        const postResponse = await RequestHandler.delete(url , {
          ...body
        });
        return postResponse;
      } catch(err) {
        return err;
      }
    },
    patch: async (url, body) => {
      try {
        const postResponse = await RequestHandler.patch(url, {
          ...body
        });
        return postResponse;
      } catch(err) {
        return err;
      }
    }

 } 

export { 
  publicAPI,
 }