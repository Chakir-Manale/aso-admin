export const HTTP_OK = 200
export const HTTP_CREATED  = 201
export const HTTP_UPDATED  = 202
export const HTTP_DELETED  = 204
export const HTTP_FOUND  = 302
export const HTTP_BAD_REQUEST  = 400
export const HTTP_UNAUTHORIZED  = 401
export const HTTP_PAYMENT_REQUIRED  = 402
export const HTTP_PERMISSION_DENIED  = 403
export const HTTP_NOT_FOUND  = 404
export const HTTP_NOT_ACCEPTABLE  = 406
export const HTTP_INVALID_ENTITY  = 422
export const HTTP_INTERNAL_SERVER_ERROR  = 500
export const axiosFormDataConfigs = {
  headers: {
    'accept': 'application/json',
    'Content-Type': `multipart/form-data;`,
  }
}
export const getFormData = (entity, files = {}) => {
  let formData = new FormData();

  if(files instanceof File){
    formData.append(`fileName`, files); //single file
  } else {
    if (files instanceof Array) {
      files.forEach(file=>{
        formData.append(`fileName[]`, file);
      })
    } else {
      Object.keys(files).forEach((key)=>{
        if(Array.isArray(files[key])){
          files[key].forEach(file=>{
            formData.append(`${key}[]`, file);
          })
        } else {
          formData.append(`${key}`, files[key]);
        }
      })
    }

  }

  formData.append("object", JSON.stringify(entity));
  return formData;
}