import React, {useEffect} from "react";
import Moment from "react-moment";
import {useIntl} from "react-intl";
import moment from "moment";


const MomentLocaleMap = {
  ar: "ar-ma",
  // de: "de",
  en: "en-gb",
  es: "es",
  fr: "fr",
  // ja: "ja",
  // zh: "zh-hk"
};

const langLoader = (lang) => import(`moment/locale/${MomentLocaleMap[lang]}`);

export const AEMoment = (
  {
    date,
    format = "LL",
    ...props
  }) =>{

  const {locale} = useIntl();
  useEffect(()=>{
    if(locale !== "en") langLoader(locale);
  }, [locale])

  return (
    <React.Fragment>
      {
        date ?
          <Moment format={format} locale={locale} {...props}>{date}</Moment> :
          ''
      }

      {/*{moment(date).locale('es').format(format)}*/}
    </React.Fragment>
  )
}

//https://momentjs.com/docs/#/durations/
export const AEDuration = (
  {
    duration,
    unit  = "minutes",
    argWithSuffix = false,
    ...props
  }) =>{

  const {locale} = useIntl();
  useEffect(()=>{
    if(locale !== "en") langLoader(locale);
  }, [locale])


  return (
    <React.Fragment>
      {
        moment.duration(duration, unit).locale(locale).humanize(argWithSuffix)
      }

      {/*{moment(date).locale('es').format(format)}*/}
    </React.Fragment>
  )
}

AEMoment.propTypes = {
  //TODO
};