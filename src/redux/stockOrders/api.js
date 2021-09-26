import axios from "axios";
import {axiosFormDataConfigs, getFormData} from "../../_ae/helpers/AxiosHelpers";
import {toAbsoluteApiUrl} from "../../_metronic/_helpers";
import {MODULES} from "../../_ae/helpers/RoutingHelpers";

export const API_URI = toAbsoluteApiUrl(`/${MODULES.STOCK_ORDERS}`);

const normalize = ({id, orderedAt, number, vat, vendor, stockOrderLines,  ...entity}) => {

  if (vendor) {
    vendor = {id: vendor.id}
  }
  if (stockOrderLines) {
    stockOrderLines = stockOrderLines.map(({id, price, qty, variant})=>({
      id, price, qty,
      variant: variant ? {id: variant.id} : undefined
    }))
  }

  return {id, orderedAt, number, vat, vendor, stockOrderLines,}
}

export const all = metadata => {
  const {filters} = metadata
  const {vendor, variant} = filters

  let meta = {
    ...metadata,
    filters: {
      ...filters,
      vendor: vendor ? {id: vendor.id} : undefined,
      variant: variant ? {id: variant.id} : undefined
    }
  };

  return axios.get(API_URI, { params: { meta }});
}
export const find = (id, metadata) => axios.get(`${API_URI}/${id}`, { params: { meta: metadata }});
export const destroy = id => axios.delete(`${API_URI}/${id}`);
export const create = (entity, files) => axios.post(API_URI, getFormData(normalize(entity), files), axiosFormDataConfigs );
export const update = entity => axios.post(`${API_URI}/${entity.id}?_method=PUT`, getFormData(normalize(entity)), axiosFormDataConfigs);
