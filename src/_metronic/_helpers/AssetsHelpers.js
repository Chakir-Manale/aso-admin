import {API_UPLOAD_PATH} from "../../_ae/helpers/UIHelper";

export function removeCSSClass(ele, cls) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
}

export function addCSSClass(ele, cls) {
    ele.classList.add(cls);
}

const removeSlashes = url => url.replace(/([^:]\/)\/+/g, "$1");
export const toAbsoluteUrl = (pathname= "") => process.env.REACT_APP_PUBLIC_URL + pathname;
export const toAbsoluteApiUrl = (pathname= "") => removeSlashes(process.env.REACT_APP_API_URL + pathname);
export const toAbsoluteUploadUrl = (pathname= "") => process.env.REACT_APP_API_URL + '/' + API_UPLOAD_PATH + pathname;
export const toEntityFileNameUrl = (entity, folder, prop = 'fileName') => toAbsoluteUploadUrl(`/${folder}/${entity[prop]}`);
