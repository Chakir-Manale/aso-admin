import React, {useEffect} from "react";
import {useLang} from "./Metronici18n";
import {IntlProvider} from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/de";
import "@formatjs/intl-relativetimeformat/dist/locale-data/es";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";
import "@formatjs/intl-relativetimeformat/dist/locale-data/ja";
import "@formatjs/intl-relativetimeformat/dist/locale-data/zh";

import arMessages from "../../_ae/i18n/messages/ar";
import enMessages from "../../_ae/i18n/messages/en";
import frMessages from "./messages/fr.json";
import {setLocale} from "yup";

import "moment/locale/ar-ma";
import "moment/locale/en-gb";
import "moment/locale/fr";
import moment from "moment";



export const getIntlMessage = (descriptor = {}, props = {}) => ({descriptor, props})

setLocale({
  mixed:{
    default: (props)=>getIntlMessage({id:'VALIDATION.MIXED.INVALID'}, props),
    required: (props)=>getIntlMessage({id:'VALIDATION.MIXED.REQUIRED'}, props),
    oneOf: (props)=>getIntlMessage({id:'VALIDATION.MIXED.ONE_OF'}, props),
    notOneOf: (props)=>getIntlMessage({id:'VALIDATION.MIXED.NO_ONE_OF'}, props),
    notType: ({ path, type, value, originalValue, ...props }) =>getIntlMessage({id:!value ? "VALIDATION.MIXED.REQUIRED": "VALIDATION.MIXED.NOT_TYPE"}, props),
    defined: (props)=>getIntlMessage({id:'VALIDATION.MIXED.DEFINED'}, props),
  },

  number : {
    min: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.MIN"}, props),
    max: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.MAX"}, props),
    lessThan: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.LESS_THAN"}, props),
    moreThan: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.MORE_THAN"}, props),
    notEqual: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.NOT_EQUAL"}, props),
    positive: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.POSITIVE"}, props),
    negative: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.NEGATIVE"}, props),
    integer: (props)=>getIntlMessage({id:"VALIDATION.NUMBER.INTEGER"}, props),
  },

  string : {
    length: (props)=>getIntlMessage({id:'VALIDATION.STRING.LENGTH'}, props),
    min: (props)=>getIntlMessage({id:'VALIDATION.STRING.MIN'}, props),
    max: (props)=>getIntlMessage({id:'VALIDATION.STRING.MAX'}, props),
    matches: (props)=>getIntlMessage({id:'VALIDATION.STRING.MATCHES'}, props),
    email: (props)=>getIntlMessage({id:'VALIDATION.STRING.EMAIL'}, props),
    url: (props)=>getIntlMessage({id:'VALIDATION.STRING.URL'}, props),
    uuid: (props)=>getIntlMessage({id:'VALIDATION.STRING.UUID'}, props),
    trim: (props)=>getIntlMessage({id:'VALIDATION.STRING.TRIM'}, props),
    lowercase: (props)=>getIntlMessage({id:'VALIDATION.STRING.LOWERCASE'}, props),
    uppercase: (props)=>getIntlMessage({id:'VALIDATION.STRING.UPPERCASE'}, props),
  },
  date : {
    min: (props)=>getIntlMessage({id:'VALIDATION.DATE.MIN'}, props),
    max: (props)=>getIntlMessage({id:'VALIDATION.DATE.MAX'}, props),
  },
  object : {
    noUnknown: (props)=>getIntlMessage({id:'VALIDATION.OBJECT.NO_UNKNOWN'}, props),
  },
  array : {
    min:  (props)=>getIntlMessage({id:'VALIDATION.ARRAY.MIN'}, props),
    max:  (props)=>getIntlMessage({id:'VALIDATION.ARRAY.MAX'}, props),
  }
});

export const allMessages = {
  ar: arMessages,
  en: enMessages,
  fr: frMessages
};


const MomentLocaleMap = {
  ar: "ar-ma",
  en: "en-gb",
  fr: "fr"
};

export function I18nProvider({ children }) {
  const locale = useLang();
  const messages = allMessages[locale];

  useEffect(()=>{
    moment.locale(MomentLocaleMap[locale])
  },[locale])

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
