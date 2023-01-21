import PrivateReqHandler from './privateReqHander';

 const privateAPI = {

    get: async (url) => {
      try {
        const response = await PrivateReqHandler.get(url);
        return response;
      } catch (err) {
        return err;
      }
    },
    post: async (url, body) => {
      try {
        const postResponse = await PrivateReqHandler.post(url, {
          ...body
        });
        return postResponse;
      } catch (err) {
        return err;
      }
    },
    delete: async (url, body) => {
      try {
        const delReponse = await PrivateReqHandler.delete(url);
        return delReponse;
      } catch(err) {
        return err;
      }
    },
    patch: async (url, body) => {
      try {
        const postResponse = await PrivateReqHandler.patch(url, {
          ...body
        });
        return postResponse;
      } catch(err) {
        return err;
      }
    }

 } 


export { 
  privateAPI,
 }