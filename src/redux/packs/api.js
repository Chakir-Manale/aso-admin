import axios from "axios";
import {axiosFormDataConfigs, getFormData} from "../../_ae/helpers/AxiosHelpers";
import {toAbsoluteApiUrl} from "../../_metronic/_helpers";
import {MODULES} from "../../_ae/helpers/RoutingHelpers";

export const API_URI = toAbsoluteApiUrl(`/${MODULES.PACKS}`);

const normalize = ({id, nameFr, descFr, status, price, packVariantLines,...entity}) => {

  if (packVariantLines) {
    packVariantLines = packVariantLines.map(({id, variant, qty})=>({
      id, qty,
      variant: variant ? {id: variant.id} : undefined
    }))
  }

  return {id, nameFr, descFr, status, price, packVariantLines}
}

export const all = metadata => {
  const {filters} = metadata
  const {variant} = filters

  let meta = {
    ...metadata,
    filters: {
      ...filters,
      variant: variant ? {id: variant.id} : undefined
    }
  };

  return axios.get(API_URI, { params: { meta }});
}
export const find = (id, metadata) => axios.get(`${API_URI}/${id}`, { params: { meta: metadata }});
export const destroy = id => axios.delete(`${API_URI}/${id}`);
export const create = (entity, files) => axios.post(API_URI, getFormData(normalize(entity), files), axiosFormDataConfigs );
export const update = (entity, files) => axios.post(`${API_URI}/${entity.id}?_method=PUT`, getFormData(normalize(entity), files), axiosFormDataConfigs);
