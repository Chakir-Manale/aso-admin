import axios from "axios";
import {axiosFormDataConfigs, getFormData} from "../../_ae/helpers/AxiosHelpers";
import {toAbsoluteApiUrl} from "../../_metronic/_helpers";
import {MODULES} from "../../_ae/helpers/RoutingHelpers";
import {normalize} from "../users/api";

export const API_URI = toAbsoluteApiUrl(`/${MODULES.AUTH}`);


export const all = metadata => {
  const {filters} = metadata
  // const {parent} = filters

  let meta = {
    ...metadata,
    filters: {
      ...filters,
      // parent: parent ? {id: parent.id} : undefined
    }
  };

  return axios.get(API_URI, { params: { meta }});
}
export const find = (id, metadata) => axios.get(`${API_URI}/${id}`, { params: { meta: metadata }});
export const destroy = id => axios.delete(`${API_URI}/${id}`);
export const create = (entity, files) => axios.post(API_URI, getFormData(normalize(entity), files), axiosFormDataConfigs );
export const update = (entity, files) => axios.post(`${API_URI}/profile?_method=PUT`, getFormData(normalize(entity), files), axiosFormDataConfigs);
export const updatePassword = entity => axios.put(`${API_URI}/password`, entity);

export const login = (email, password) => {
  console.log(`${API_URI}/login`)
  return axios.post(`${API_URI}/login`, { username:email, password });
}
export const register = entity => axios.post(`${API_URI}/register`, entity);
export const requestPassword = email => axios.post(`${API_URI}/password/forgot`, { email });
export const resetPassword = (token, data) => axios.post(`${API_URI}/password/reset/${token}`, data);
export const requestEmailVerificationLink = () => axios.post(`${API_URI}/request_email_verification`);
export const verifyEmail = (token, object) => axios.post(`${API_URI}/verify_email/${token}`, object);
// export const getUserByToken = () => axios.get(`${API_URI}/me`,{params : { meta : new AEMetadata({},{},{},['*','location'])}});
export const getUserByToken = () => axios.get(`${API_URI}/me`);
export const getAuthUserRoutes = () => axios.get(`${API_URI}/routes`);

