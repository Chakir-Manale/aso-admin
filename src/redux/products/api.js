import axios from "axios";
import {axiosFormDataConfigs, getFormData} from "../../_ae/helpers/AxiosHelpers";
import {toAbsoluteApiUrl} from "../../_metronic/_helpers";
import {MODULES} from "../../_ae/helpers/RoutingHelpers";

export const API_URI = toAbsoluteApiUrl(`/${MODULES.PRODUCTS}`);

const normalize = ({id, nameFr, descFr, categories, attributes, ...entity}) => {

  if (categories) {
    categories = categories.map(({id})=>({id}))
  }
  if (attributes) {
    attributes = attributes.map(({id})=>({id}))
  }


  return {id, nameFr, descFr, categories, attributes}
}

export const all = metadata => {
  const {filters} = metadata
  const {categories, attributes} = filters

  let meta = {
    ...metadata,
    filters: {
      ...filters,
      categories: categories ? {id: categories.id} : undefined,
      attributes: attributes ? {id: attributes.id} : undefined
    }
  };

  return axios.get(API_URI, { params: { meta }});
}
export const find = (id, metadata) => axios.get(`${API_URI}/${id}`, { params: { meta: metadata }});
export const destroy = id => axios.delete(`${API_URI}/${id}`);
export const create = (entity, files) => axios.post(API_URI, getFormData(normalize(entity), files), axiosFormDataConfigs );
export const update = entity => axios.post(`${API_URI}/${entity.id}?_method=PUT`, getFormData(normalize(entity)), axiosFormDataConfigs);
