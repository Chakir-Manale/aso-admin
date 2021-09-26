import React, {useEffect} from "react";
import {AEButton} from "../../../../../../_ae/components/buttons";
import {ButtonGroup, Dropdown} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {useDispatch} from "react-redux";
import {AEField, AESliderField} from "../../../../../../_metronic/_partials/controls/forms/AEField";
import {packsActions, usePacksState} from "../../../../../../redux/packs";
import clsx from "clsx";
import {localField} from "../../../../../../_ae/helpers/UIHelper";
import {VariantField} from "../../../../Variants";

const sorts = [
  {prop: 'orderedAt', label: 'ORDER_DATE'},
  {prop: 'createdAt', label: 'CREATION_DATE'},
  {prop: 'number', label: 'ORDER_NUMBER'},
  {prop: 'vat', label: 'VAT'},
]

const fieldProps = {
  withFeedbackLabel: false,
  validation: false
}


export const Form = ({ formik, advancedSearch }) => {
  const dispatch = useDispatch();
  const {metadata: {sort}} = usePacksState();
  const {setSortAsc, setSortField, setFilters} = packsActions;


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
            <VariantField />
          </div>
          {/*<div className={'col-lg-6 mb-2'}>*/}
          {/*  <AESliderField*/}
          {/*    name={'priceRange'}*/}
          {/*    label={'PRICE'}*/}
          {/*    min={formik.initialValues.priceRange[0]}*/}
          {/*    max={formik.initialValues.priceRange[1]}*/}
          {/*    {...fieldProps}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  )
}