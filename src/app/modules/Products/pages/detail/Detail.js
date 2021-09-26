/* eslint-disable no-restricted-imports */
import React, {useEffect, useState} from "react";
import {ButtonGroup, Dropdown} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useIntl} from "react-intl";
import {fetchProductForDetail, useProductsDetailState} from "../../../../../redux/products";
import {AEButton} from "../../../../../_ae/components/buttons";
import {Loader} from "../../../../../_ae/components/loader";
import {EntityCard} from "../../components/EntityCard";
import {Card, CardBody, Pagination} from "../../../../../_metronic/_partials/controls";
import {FormikProvider, useFormik} from "formik";
import {useMetadata} from "../../../../../_ae/AEPagination";
import {fetchVariants, useVariantsState} from "../../../../../redux/variants";
import {AEAutocompleteField, AEField, AESliderField} from "../../../../../_metronic/_partials/controls/forms/AEField";
import {localField} from "../../../../../_ae/helpers/UIHelper";
import {AEIcon} from "../../../../../_ae/components/svg";
import {VariantEntityCard} from "../../../Variants";



const fieldProps = {
  withFeedbackLabel: false,
  validation: false
}

const sorts = [
  {prop: localField(), label: "NAME"},
  {prop: "shippingDelay", label: "SHIPPING_DELAY"},
  {prop: "price", label: "PRICE"},
]

export function Detail({history, match:{params:{id}}}) {
  const dispatch = useDispatch();
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const { formatMessage } = useIntl();
  const productState = useProductsDetailState()
  const variantsState = useVariantsState()
  const metadata = useMetadata({
    ...variantsState.metadata,
    filters: {
      ...variantsState.metadata.filters,
      product: {id},
      priceRange: [0, 9999],
      options: []
    }
  })

  const formik = useFormik({
    initialValues: metadata.filters,
    onSubmit:({options, ...values}) => {
      values.options = options.filter(option=>option).map(option=>({id: option.id}))

      setFilters(values)
    }
  })

  const { page, perPage, sortAsc, filters, sortField, setFilters, setSortAsc, sort, setSort } = metadata;

  useEffect(() => {
    dispatch(fetchProductForDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchVariants(metadata.serialize()));
  }, [
    dispatch, page, perPage, sortField, sortAsc,
    filters.search, filters.product, filters.priceRange, filters.options
  ]);

  useEffect(()=>{
    formik.handleSubmit()
  }, [formik.values])

  return (
    <>
      <Loader isLoading={productState.isLoading} />
      <Card>
        <CardBody>
          <FormikProvider value={formik}>
            <div className="d-flex align-items-center">
              <div className={`position-relative w-md-400px me-md-2`}>
                <AEField
                  name="search"
                  label={'SEARCH'}
                  {...fieldProps}
                />
              </div>
              <div className={'d-flex align-items-center'}>
                <Dropdown as={ButtonGroup} className={"pl-2"} >
                  <AEButton variant={"light"} fontWeight={"bolder"} onClick={()=>{
                    setSortAsc(!sort.asc)
                  }}>
                    <AEIcon path={`/Navigation/${sortAsc ? 'UP':'DOWN'}-2.svg`} variant={"primary"}/>
                    {
                      formatMessage({id: sorts.findIndex(o=>o.prop === sortField) !== -1 ? sorts.find(o=>o.prop === sort.field).label:"SORT"})
                    }
                  </AEButton>
                  <Dropdown.Toggle split variant="light"/>
                  <Dropdown.Menu className={"py-5"}>
                    {
                      sorts.map(o=>(
                        <Dropdown.Item key={o.prop} onClick={() => {setSort(o.prop, o.asc)}}>
                          {formatMessage({id:o.label},{asc:o.asc})}
                        </Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>

                <div className={''}>
                  <AEButton
                    variant={'link'}
                    fontWeight={'bold'}
                    onClick={()=>{
                      setAdvancedSearch(!advancedSearch)
                    }}
                  >
                    {formatMessage({id: advancedSearch ? 'HIDE_ADVANCED_SEARCH' : 'ADVANCED_SEARCH'})}
                  </AEButton>
                </div>
              </div>
            </div>
            {
              advancedSearch &&
              <>
                <div className="separator separator-dashed mt-9 mb-6" />
                <div className={'row'}>
                  {
                    productState.data.attributes.map((attribute, index)=>(
                      <div key={attribute.id} className="col-lg form-group">
                        <AEAutocompleteField
                          name={`options.${index}`}
                          label={attribute[localField()]}
                          options={attribute.options}
                          getOptionLabel={attribute=>attribute.value}
                          useI18n={false}
                          {...fieldProps}
                        />
                      </div>
                    ))
                  }
                </div>
                <div className={'row'}>
                  <div className="col-lg form-group">
                    <AESliderField
                      name={'priceRange'}
                      label={'PRICE'}
                      min={productState.data._minSellingPrice}
                      max={productState.data._maxSellingPrice}
                      {...fieldProps}
                    />
                  </div>
                </div>
              </>
            }

          </FormikProvider>

        </CardBody>
      </Card>

      {!productState.isLoading && (
        <EntityCard
          entity={productState.data}
          className="-mb-0 card-border border-3 border-primary"
          size={'lg'}
          addVariantAction
          editAction
        />
      )}

      <div className={'row'}>

        {
          variantsState.data.map(variant=>(
            <div key={variant.id} className={'col-12'}>
              <VariantEntityCard
                entity={variant}
                size={'lg'}
                deleteAction
                editAction
              />
            </div>
          ))
        }
        <Pagination
          total={metadata.total}
          perPage={metadata.perPage}
          page={metadata.page}
          pages={metadata.pages}
          setPage={metadata.to}
          setPerPage={metadata.setPerPage}
          className={'w-100'}
        />

        {/*<div className={'col-lg'}>*/}
        {/*  <Card>*/}
        {/*    <CardBody>*/}
        {/*      <div className={'row'}>*/}
        {/*        {*/}
        {/*          variantsState.data.map(variant=>(*/}
        {/*            <div key={variant.id} className="col-sm-6 col-md-4 col-lg-3 col-xxl-2">*/}
        {/*              <div className="card card-custom gutter-b card-stretch">*/}
        {/*                <div className="card-body d-flex flex-column rounded bg-light justify-content-between">*/}
        {/*                  <div className="text-center rounded mb-7">*/}
        {/*                    <div className="overlay">*/}
        {/*                      <div className="overlay-wrapper rounded bg-light text-center">*/}
        {/*                        <img*/}
        {/*                          src={toAbsoluteUploadUrl(`/variant_images/${variant._fileName}`)}*/}
        {/*                          alt=""*/}
        {/*                          className="mw-100 w-200px"*/}
        {/*                        />*/}
        {/*                      </div>*/}
        {/*                      <div className="overlay-layer">*/}
        {/*                        <a href="#" className="btn font-weight-bolder btn-sm btn-primary mr-2">Quick View</a>*/}
        {/*                        <a href="#" className="btn font-weight-bolder btn-sm btn-light-primary">Purchase</a>*/}
        {/*                      </div>*/}
        {/*                    </div>*/}
        {/*                  </div>*/}
        {/*                  <div>*/}
        {/*                    <h4 className="font-size-h5">*/}
        {/*                      <a href="#" className="text-dark-75 font-weight-bolder">*/}
        {/*                        {variant[localField()]}*/}
        {/*                      </a>*/}
        {/*                    </h4>*/}
        {/*                    <div className="font-size-h6 text-muted font-weight-bolder">*/}
        {/*                      <AECurrency value={variant._sellingPrice} />*/}
        {/*                    </div>*/}
        {/*                    <div className="font-size-h6 text-muted font-weight-bolder">*/}
        {/*                      <AECurrency value={variant.price} />*/}
        {/*                    </div>*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              </div>*/}
        {/*            </div>*/}
        {/*          ))*/}
        {/*        }*/}

        {/*      </div>*/}

        {/*    </CardBody>*/}
        {/*  </Card>*/}
        {/*  <Pagination
        total={metadata.total}
        perPage={metadata.perPage}
        page={metadata.page}
        pages={metadata.pages}
        setPage={metadata.to}
        setPerPage={metadata.setPerPage}
      />*/}

        {/*</div>*/}
      </div>


    </>
  );
}

