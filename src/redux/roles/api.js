import axios from "axios";
import {axiosFormDataConfigs, getFormData} from "../../_ae/helpers/AxiosHelpers";
import {toAbsoluteApiUrl} from "../../_metronic/_helpers";
import {MODULES} from "../../_ae/helpers/RoutingHelpers";

export const API_URI = toAbsoluteApiUrl(`/${MODULES.ROLES}`);

const normalize = _entity => {

  if (_entity.routes) {
    _entity.routes = _entity.routes.map(roleRoute=>({
      ...roleRoute,
      route: {id: roleRoute.id}
    }))
  }

  const {id, nameFr, roleKey, routes} = _entity;


  return {id, nameFr, roleKey, routes}
}

export const all = metadata => {
  const {filters} = metadata
  // const {routes} = filters

  let meta = {
    ...metadata,
    filters: {
      ...filters,
      // routes: routes ? {id: routes.id} : undefined
    }
  };

  return axios.get(API_URI, { params: { meta }});
}
export const find = (id, metadata) => axios.get(`${API_URI}/${id}`, { params: { meta: metadata }});
export const destroy = id => axios.delete(`${API_URI}/${id}`);
export const create = (entity, files) => axios.post(API_URI, getFormData(normalize(entity), files), axiosFormDataConfigs );
export const update = entity => axios.post(`${API_URI}/${entity.id}?_method=PUT`, getFormData(normalize(entity)), axiosFormDataConfigs);
