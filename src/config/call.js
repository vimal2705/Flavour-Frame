import api from "./api";

const auth = {
  userDetail: () => api.get("/api/v1/user"),
  singup: (data) => api.post("/users/social/singup", data),
  updateUser: (data) => api.patch("/users",data)
};

const common = {
  generateImage: (data) => api.post("/api/v1/", data),
  getListing: () => api.get("/api/v1/request/user"),
  getDetails: (id) => api.get("/api/v1/requestId/" + id),
  addCollection: (data) => api.post("/api/v1/collection", data),
  getCollection: (data) => api.get("/api/v1/collection", data),
  updatePLU: (id, data) => api.patch("/api/v1/image/" + id, data),
  GetExcelApi:(collectionid,day) => api.get("/api/v1/excel?collectionId=" + collectionid + "&day=" + day),
  regenerateImage: (id,data) => api.post("/api/v1/"+id, data),
  getbycollection: (id) => api.get("api/v1/bycollection/"+id)
};

export { auth, common };
