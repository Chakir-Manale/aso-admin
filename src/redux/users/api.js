import axios from "axios";
import {axiosFormDataConfigs, getFormData} from "../../_ae/helpers/AxiosHelpers";
import {toAbsoluteApiUrl} from "../../_metronic/_helpers";
import set from "lodash/set";

export const API_URI = toAbsoluteApiUrl("/users");

export const normalize = _entity => {
  const {
    id, username, firstName, lastName, email, password, role,
    attributes
  } = _entity;

  let result = {
    id, username, firstName, lastName, email, password,
    attributes
  };
  if (role) {
    set(result, 'role.id', role.id)
  }

  return result
}

export const all = metadata => {
  const {filters} = metadata
  const {role} = filters

  let meta = {
    ...metadata,
    filters: {
      ...filters,
      role: role ? {id: role.id} : undefined
    }
  };

  return axios.get(API_URI, { params: { meta }});
}

export const find = (id, metadata) => axios.get(`${API_URI}/${id}`, { params: { meta: metadata }});
export const destroy = id => axios.delete(`${API_URI}/${id}`);
export const create = (entity, files) => axios.post(API_URI, getFormData(normalize(entity), files), axiosFormDataConfigs );
export const update = (entity, files) => axios.post(`${API_URI}/${entity.id}?_method=PUT`, getFormData(normalize(entity), files), axiosFormDataConfigs);


