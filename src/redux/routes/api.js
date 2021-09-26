import axios from "axios";
import {axiosFormDataConfigs, getFormData} from "../../_ae/helpers/AxiosHelpers";
import {toAbsoluteApiUrl} from "../../_metronic/_helpers";
import {MODULES} from "../../_ae/helpers/RoutingHelpers";

export const API_URI = toAbsoluteApiUrl(`/${MODULES.ROUTES}`);

const normalize = _entity => {
  const {id, name, description, deadline, status} = _entity;
  const assignTo = {id: _entity.assignTo.id}

  return {id, name, description, deadline, status, assignTo}
}

export const all = metadata => {
  let meta;
  if (metadata) {
    const {filters} = metadata
    meta = {
      ...metadata,
      filters: {
        ...filters,
        // parent: parent ? {id: parent.id} : undefined
      }
    };
  }

  return axios.get(API_URI, { params: { meta }});
}
export const find = (id, metadata) => axios.get(`${API_URI}/${id}`, { params: { meta: metadata }});
export const destroy = id => axios.delete(`${API_URI}/${id}`);
export const create = (entity, files) => axios.post(API_URI, getFormData(normalize(entity), files), axiosFormDataConfigs );
export const update = entity => axios.post(`${API_URI}/${entity.id}?_method=PUT`, getFormData(normalize(entity)), axiosFormDataConfigs);
