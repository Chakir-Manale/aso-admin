// import {toAbsoluteUrl} from "../../_metronic/_helpers";


import {getConfig} from "../../_metronic/i18n";
import {AEIcon, ICONS} from "../components/svg";
import {FormattedMessage} from "react-intl";
import React from "react";

export const API_UPLOAD_PATH = `/uploads`;
export const API_DOCUMENTS_PATH = `${API_UPLOAD_PATH}/documents`;


//TODO use toAbsoluteUrl from AssetsHelpers.js
export const toAbsoluteUrl = (pathname= "") => process.env.REACT_APP_PUBLIC_URL + pathname;
export const languages = [
  // {
  //   lang: "ar",
  //   name: "ARABIC",
  //   flag: toAbsoluteUrl("/media/svg/flags/166-morocco.svg"),
  //   rtl: true,
  //
  // },
   {
     lang: "en",
     name: "ENGLISH",
     flag: toAbsoluteUrl("/media/svg/flags/226-united-states.svg"),
   },
  {
    lang: "fr",
    name: "FRENCH",
    flag: toAbsoluteUrl("/media/svg/flags/195-france.svg"),
  },
  // {
  //   lang: "es",
  //   name: "SPANISH",
  //   flag: toAbsoluteUrl("/media/svg/flags/128-spain.svg"),
  // }
];
export const languagesKeys = languages.map(l=>l.lang)
// export const localField = (name = 'name') => `${name}_${getConfig().selectedLang}`
export const localField = (name = 'name') => {
  return `${name}Fr`; //Remove me when server i18n is enabled
  const lang = getConfig().selectedLang; // fr, en nameFr, localField('desc')
  const capitalizedLg = lang.slice(0,1).toUpperCase() + lang.slice(1, lang.length)
  return `${name}${capitalizedLg}`
}
export const SITE_NAME = process.env.REACT_APP_NAME
export const getArrayOfNumbers = length => Array.from(Array(length).keys()).map(k => k + 1)
export const EmailDomains = ['*']

export const AETruncate = ({text, length, useWordBoundary, className = ''} )=>{
  if (!text) return '';
  if (!length) return text;
  if (text.length <= length) return text;
  const subString = text.substr(0, length-1); // the original check

  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(" "))
    : subString) + " ...";
};

export const SIZES = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  xxl: 6,
}
export const EntityCartLabel = ({id, size, iconPath = ICONS.MINUS, children}) => {
  const {xs, sm} = SIZES;
  const sizeP = SIZES[size]

  return (
    <div className="d-flex align-items-center">
      {
        sizeP > xs &&
        <AEIcon
          size={'md'}
          className={"flex-shrink-0 mr-2"}
          path={iconPath}
        />
      }

      <div>
        {children}
      </div>
      <div>
        {
          sizeP > sm &&
          <span className={"text-muted ml-2"}>
          <FormattedMessage id={id}/>
        </span>
        }
      </div>
    </div>
  )
}