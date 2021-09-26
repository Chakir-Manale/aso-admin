import React from "react";
import {useIntl} from "react-intl";
import {AEAutocompleteField, AEField} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {useRoutesForSelectState} from "../../../../../redux/routes";
import {FieldArray} from "formik";
import {AEButton} from "../../../../../_ae/components/buttons";
import {AEIcon, ICONS} from "../../../../../_ae/components/svg";
import {localField} from "../../../../../_ae/helpers/UIHelper";
import {RouteField} from "../../components/RouteField";


//todo server validation errors
export const Form = ({
                       values,
                       errors,
                       touched,
                       handleChange,
                       handleBlur,
                       handleSubmit,
                       isSubmitting,
  loading,
                       btnRef,
}) => {

  const {formatMessage} = useIntl()
  const routesState = useRoutesForSelectState()

  return (
    <div className="form form-label-right">
      <div className="form-group row">
        <div className="col-sm">
          <AEField
            name="nameFr"
            label={'NAME'}
          />
        </div>
        <div className={"col-sm"}>
          <AEField
            name="priority"
            label={'PRIORITY'}
            type={'number'}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-group row">
          <div className="col-sm">
            <RouteField
              name="routes"
              label={'ROUTES'}
              multiple
              />
          </div>
        </div>
      </div>



      <button
        style={{ display: "none" }}
        ref={btnRef}
        onClick={handleSubmit}
      />
    </div>
  );
}

