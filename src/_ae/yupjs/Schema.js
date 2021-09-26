import * as Yup from "yup";
import {getIntlMessage} from "../../_metronic/i18n";
import {EmailDomains} from "../helpers/UIHelper";





export const YupAuthEmail = ()=>{

  return Yup
    .string()
    .email()
    .required()
    // .test(
    //   'email-accepted-domains',
    //   getIntlMessage({id:"VALIDATION.MIXED.ONE_OF"},{path:"email",values:EmailDomains.join(", ")}),
    //   value => {
    //     if(!value) return false;
    //     return EmailDomains.includes(
    //       value.substring(value.lastIndexOf("@")+1)
    //     );
    // },
  // )
}

export const YupAuthPassword = ()=> Yup.string().min(6).max(50).required()
export const YupAuthPasswordConfirm = (ref = 'password')=> {
  return Yup.string().required()
    .when(ref, {
      is: v => v && v.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref(ref)],
        getIntlMessage({id:"VALIDATION.PASSWORD_CONFIRM_MATCH"})
      ),
    })
}
// export const YupAuthUsername = ()=> Yup.string().min(3).max(50).matches(/^[a-zA-Z]+$/).required()
export const YupAuthUsername = ()=> Yup.string().min(3).max(50).required().test(
  'alphanumeric-and-underscore',
  getIntlMessage({id:"VALIDATION.CUSTOM.USERNAME"},{path:"USERNAME"}),
  (value, context) => /^[a-zA-Z0-9_]+$/.test(value),
)