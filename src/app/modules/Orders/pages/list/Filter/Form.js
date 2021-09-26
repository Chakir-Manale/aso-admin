import React, {useEffect} from "react";
import {AEButton} from "../../../../../../_ae/components/buttons";
import {ButtonGroup, Dropdown} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";
import {useDispatch} from "react-redux";
import {AEAutocompleteField, AEField} from "../../../../../../_metronic/_partials/controls/forms/AEField";
import {ordersActions, useOrdersState} from "../../../../../../redux/orders";
import clsx from "clsx";
import {localField} from "../../../../../../_ae/helpers/UIHelper";
import {ShipperField} from "../../../../Users/components/ShipperField";
import {CustomerField} from "../../../../Users/components/CustomerField";
import {getPaymentStatusKeys, PaymentStatus} from "../../../components/PaymentStatus";
import {DeliveryStatus, getDeliveryStatusKeys} from "../../../components/DeliveryStatus";
import {getPaymentMethodsKeys, PaymentMethod} from "../../../components/PaymentMethod";
import {PaymentStatusField} from "../../../components/PaymentStatusField";
import {DeliveryStatusField} from "../../../components/DeliveryStatusField";
import {PaymentMethodField} from "../../../components/PaymentMethodKeyField";

const sorts = [
  {prop: 'id', label: "ID"},
  {prop: 'createdAt', label: "ORDER_DATE"},
  {prop: 'updatedAt', label: "UPDATED_AT"},
]

const fieldProps = {
  withFeedbackLabel: false,
  validation: false
}


export const Form = ({ formik, advancedSearch }) => {
  const dispatch = useDispatch();
  const {metadata: {sort}} = useOrdersState();
  const {setSortAsc, setSortField, setFilters} = ordersActions;
  const { formatMessage } = useIntl()

  useEffect(()=>{
    dispatch(setFilters(formik.values))
  }, [formik.values])

  return (
    <>
      <div className="d-flex align-items-center">
        <div className={`position-relative w-md-400px`}>
          <AEField
            name="search"
            label={'SEARCH'}
            {...fieldProps}
          />
        </div>
        <div className={'d-flex align-items-center ml-2'}>
          <span className="font-weight-bolder d-none d-md-block">
            <FormattedMessage id={'SORT_BY'} />
            :
          </span>
          <Dropdown
            as={ButtonGroup}
            className={"pl-2"}
          >

            <Dropdown.Toggle
              variant="light-primary"
              size={'sm'}
              className="font-weight-bolder"
            >
              <FormattedMessage
                id={sorts.find(s=>s.prop === sort.field)?.label || 'CHOOSE'}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className={"py-5"}>
              {
                sorts.map(o=>(
                  <Dropdown.Item
                    key={o.prop}
                    onClick={() => {
                      dispatch(setSortField(o.prop))
                    }}
                  >
                    <FormattedMessage
                      id={o.label}
                      values={{asc:o.asc}}
                    />
                  </Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
          <div className={'ml-2'}>
            <AEButton
              size={"sm"}
              variant={"primary"}
              fontWeight={"bolder"}
              onClick={()=>{
                dispatch(setSortAsc(!sort.asc))
              }}
            >
              <FormattedMessage
                id={sort.asc ? 'ASC':'DESC'}
              />
            </AEButton>
          </div>
          <AEButton
            size={"sm"}
            variant={"link"}
            fontWeight={"bolder"}
            onClick={formik.resetForm}
          >
            <FormattedMessage id={'RESET'} />
          </AEButton>
        </div>
      </div>
      <div className={clsx(! advancedSearch && 'd-none')}>
        <div className="separator separator-dashed my-4" />
        <div className={'row'}>
          <div className={'col-lg-6 mb-2'}>
            <ShipperField />
          </div>
          <div className={'col-lg-6 mb-2'}>
            <CustomerField
              name={'createdBy'}
            />
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-lg-4 form-group'}>
            <PaymentStatusField />
          </div>
          <div className={'col-lg-4 form-group'}>
            <DeliveryStatusField />
          </div>
          <div className={'col-lg-4 form-group'}>
            <PaymentMethodField />
          </div>
        </div>
      </div>
    </>
  )
}