import React from "react";
import {AEButton} from "../../../../_ae/components/buttons";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";
import {AEIcon} from "../../../../_ae/components/svg";
import {useIntl} from "react-intl";

export function AECheckbox({
                           field:{ name, value},
                           form: { touched, errors, setFieldValue, values },
                           label,
                           // isSelected,
                           // onChange,
                           children,
                             withFeedbackLabel = false, customFeedbackLabel = "Enabled"
})
{
  const {formatMessage} = useIntl()
  label = formatMessage({id:label})

  return (
    <React.Fragment>
      <AEButton
        onClick={e =>{ setFieldValue(name, !value); }}
        variant={"light"} block>
        <AEIcon
          path={value ?  "/Navigation/Check.svg" :"/Navigation/Minus.svg" }
          variant={value?"primary":""}/>
        {label}
      </AEButton>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[name]}
          touched={touched[name]}
          label={label}
          type={"checkbox"}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </React.Fragment>

  );

  // return (
  //   <FormControlLabel
  //     control={ <Checkbox checked={isSelected} onChange={onChange} color="primary" /> }
  //     label="primary"
  //   />
  // )
  //
  //
  // return (
  //   <>
  //     <input type="checkbox" style={{display: "none"}} />
  //     <label className="checkbox checkbox-lg checkbox-single">
  //       <input type="checkbox" checked={isSelected} onChange={onChange} />
  //       {children}
  //       <span />
  //     </label>
  //   </>
  // );
}
