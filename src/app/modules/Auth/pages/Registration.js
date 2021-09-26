import React, {useEffect, useState} from "react";
import {Field, Formik, useFormik} from "formik";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../../../../redux/auth/authRedux";
//
import {AEButton} from "../../../../_ae/components/buttons";
import "../../../../_metronic/_assets/sass/pages/wizard/wizard-6.scss"
import {
  YupAuthEmail,
  YupAuthPassword,
  YupAuthPasswordConfirm,
  YupAuthUsername
} from "../../../../_ae/yupjs/Schema";
import {AEAutoComplete, AEInput} from "../../../../_metronic/_partials/controls";
import {AEIcon} from "../../../../_ae/components/svg";
import {getIntlMessage, useLang} from "../../../../_metronic/i18n";
import {register} from "../../../../redux/auth/api";



const initialValues = process.env.NODE_ENV === "development" ?
  {
    //1
    username: "aelfannir_02",
    phone: "+01 23456789",
    email: "aelfannir_02@gmail.com",
    password: "azerty",
    _confirm: "azerty",
    //2
    legal_form_id: 1,
    commercial_name: "Elfannir Abderrahmane",
    location_id: 1,
  }:{
    //1
    username: undefined,
    phone: undefined,
    email: undefined,
    password: undefined,
    _confirm: undefined,
    //2
    legal_form_id: undefined,
    commercial_name: undefined,
    location_id: undefined,
  };



/*TODO stats been changed*/
function Registration(props) {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const lang = useLang();
  const { locations = [] } = useSelector( state => ({
    // locations : state.locations[locationActionTypes.List].entities
  }), shallowEqual );

  const { intl:{formatMessage} } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      // getLocations(new AEMetadata({},{} ,{} , ['id',`name_${lang}`,'country']))
    );
  }, [dispatch, lang]);

  const RegistrationSchema = Yup.object().shape({
    username: YupAuthUsername(),
    phone: Yup.string(),
    email: YupAuthEmail(),
    password: YupAuthPassword(),
    _confirm: YupAuthPasswordConfirm(),
    location_id: Yup.number().required(),
  });



  const enableLoading = () => { setLoading(true); };
  const disableLoading = () => { setLoading(false); };
  const stepIsValid = (step) => false

  /**/

  const steps = [
    {title:formatMessage({id:"AUTH.REGISTER.STEP.ACCOUNT"})},
    {title:formatMessage({id:"AUTH.REGISTER.STEP.INFO"})},
    // {title:formatMessage({id:"AUTH.REGISTER.STEP.ENJOY"},{name:SITE_NAME})},
  ];
  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };
  const map = {
    0:[
      {name:"username", intlId:"USERNAME"},
      {name:"phone", intlId:"PHONE", type:'tel'},
      {name:"email", intlId:"EMAIL", type:"email", i18nPath:"Domain name"},
      {name:"password", intlId:"PASSWORD", type:"password"},
      {name:"_confirm", intlId:"PASSWORD_CONFIRM", type:"password"},
    ],
    1:[
      {name:"location_id", intlId:"LOCATION", type: "select" , options: locations, getLabel : entity=>entity.country[`name_${lang}`]+' - '+entity[`name_${lang}`]},
      // {name:"roles", intlId:"ROLES", type: "select" , multiple:true, options: [ROLES.C, ROLES.A], getLabel : o=>o},
    ]
  }




  return (
    <div className="login-form login-signin d-block" >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={(values, { setStatus, setSubmitting, setErrors }) => {
          // console.log(values);

          register(values)
            .then(response => {
              const { data: { token } } = response
              props.register(token);
              // setStatus({variant:'success', content:formatMessage({ id: "VALIDATION.REGISTER.VALID" })} );

              disableLoading();
            })
            .catch(error => {

              const {data, status} = error.response;
              switch (status){
                case 422 : {
                  //
                  let errors = {};
                  Object.keys(data).forEach((k)=>{
                    errors[k] = getIntlMessage({id:data[k][0]})
                  })
                  // console.log(errors)
                  setErrors(errors)//todo
                } break;
                default:{
                  // setStatus(formatMessage({ id: "AUTH.VALIDATION.INVALID_REGISTER" }) );
                }
              }
              setStatus({variant:'danger', content:formatMessage({ id: "VALIDATION.REGISTER.INVALID" })} );
              setSubmitting(false);
              disableLoading();
            });
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched,setFieldTouched, setTouched, status, isValid, validateField, validateForm }) => (
          <React.Fragment>
            <div className="pb-10 pb-lg-12">
              <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
                <FormattedMessage id="AUTH.REGISTER.TITLE" />
              </h3>
              <div className="text-muted font-weight-bold font-size-h4">
                {formatMessage({id:'AUTH.REGISTER.SUBTITLE'})}

                <Link to="/auth/login" className="text-primary font-weight-bolder ml-2">
                  {formatMessage({id:'SIGN_IN'})}
                </Link>
              </div>
            </div>
            <div >
              {/* begin: Alert */}
              {status && (
                <div className={`mb-10 alert alert-custom alert-light-${status.variant} alert-dismissible`}>
                  <div className="alert-text font-weight-bold">{status.content}</div>
                </div>
              )}
              {/* end: Alert */}
              {/* <STEPPER  */}
              <div className="row">
                {
                  steps.map((row,s)=>{
                      return (
                        <div key={s} className="col-lg-6 d-flex d-flex align-items-center pr-lg-7 pr-5 gutter-b cursor-pointer"
                             // onClick={()=>{setActiveStep(s)}}
                        >
                          <div className={`symbol symbol-white bg-white`}>
                              <span className={`symbol-label font-size-h3 font-weight-boldest text-${activeStep === s ? "primary":'muted'}`}>
                                {
                                  stepIsValid(s) ? <AEIcon variant={"primary"} size={"xl"} path={"/Navigation/Check.svg"} /> : s+1
                                }
                              </span>
                          </div>
                          <div className="font-size-h6 font-weight-bolder mr-3 ml-2">
                            {row.title}
                          </div>
                          {/*{ s < steps.length-1 && <AESVG icon={"/Navigation/Right-2.svg"} /> }*/}
                        </div>
                      )
                    }
                  )
                }
              </div>
              {
                map[activeStep].map(({name, intlId, type = "text", options = [], multiple = false, getLabel})=>{
                  let _props = {
                    name, type, label:intlId, component: AEInput, customFeedbackLabel:" ", borderless:true,
                    className:`p-3`
                  }
                  if(type === "select") {
                    _props.component = AEAutoComplete
                    _props.options = options.map(o=>o.id);
                    _props.multiple = multiple;
                    _props.getOptionLabel = id=> {
                      // console.log(id)
                      return getLabel(options.find(o=>o.id === id))
                    }
                    // _props.getOptionLabel = id=> {
                    //   const _i = options.findIndex(o=>o.id === id)
                    //   console.log(id, options, _i)
                    //   return _i !== -1 ? getLabel(options[_i]):'--'
                    // }
                    _props.className="m-0"
                    _props.size="medium"

                  }
                  // console.log( formik.getFieldProps(name))
                  return (
                    <div key={name} className="form-group">
                      <Field {..._props} />

                    </div>)
                } )
              }
              <div className="form-group d-flex flex-wrap flex-center">
                <Link to="/auth/login">
                  <AEButton
                    variant={"secondary"}
                    fontWeight={"bolder"}
                    className={"font-size-h6 px-8 py-4 my-3 mr-3"}
                  >
                    {formatMessage({id:'CANCEL'})}
                  </AEButton>
                </Link>
                <AEButton
                  variant={"light-info"}
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  fontWeight={"bolder"}
                  className={"font-size-h6 px-8 py-4 my-3 mr-3"}
                >
                  {formatMessage({id:'BACK'})}
                </AEButton>


                <AEButton
                  type={"button"}
                  variant={"primary"}
                  onClick={e=>{
                    if(activeStep === steps.length - 1) handleSubmit();
                    else {
                      validateForm().then(r=>{
                        const keys = map[activeStep].map(o=>o.name);

                        const inters = Object.keys(r).filter(e=>keys.includes(e));
                        if(inters.length === 0) setActiveStep(activeStep+1)
                        else {
                          let t = touched;
                          inters.forEach(e=>{ t[e] = true })
                          setTouched(t)
                        }
                        // console.log(inters.map(e=>r[e]))
                      })

                    }
                  }}
                  fontWeight={"bolder"}
                  className={"font-size-h6 px-8 py-4 my-3 mr-3"}
                  // disabled={!stepIsValid(activeStep)}

                >
                  {formatMessage({id:activeStep === steps.length - 1 ? 'SUBMIT' : 'NEXT'})}
                  {loading && <span className="ml-3 spinner spinner-white" />}
                </AEButton>

              </div>

            </div>
          </React.Fragment>
        )}
      </Formik>
    </div>
  );
}

export default injectIntl(connect(null, auth.authActions)(Registration));
