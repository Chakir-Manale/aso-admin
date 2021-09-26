/* eslint-disable no-restricted-imports */
import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useIntl} from "react-intl";
import {fetchStockOrderForDetail, useStockOrdersDetailState} from "../../../../../redux/stockOrders";
import {Loader} from "../../../../../_ae/components/loader";
import {AEMoment} from "../../../../../_ae/components/moment";
import {toAbsoluteUploadUrl} from "../../../../../_metronic/_helpers";
import {localField} from "../../../../../_ae/helpers/UIHelper";
import {AECurrency} from "../../../../../_ae/components/Currency";
import {useReactToPrint} from 'react-to-print';
import {AEButton} from "../../../../../_ae/components/buttons";

const ComponentToPrint = React.forwardRef(({data, ...props}, ref) => {
  const {formatMessage} = useIntl()
  return (
    <div ref={ref}>
      <div className="row justify-content-center py-8 px-8 py-md-27 px-md-0">
        <div className="col-md-10">
          <div className="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row">
            <h1 className="display-4 font-weight-boldest mb-10">
              {formatMessage({id: 'ORDER'})}
              {` `}
              {formatMessage({id: 'ORDER_NUMBER'})}
              {` `}
              {data.number}
            </h1>
          </div>
          <div className="border-bottom w-100" />
          <div className="d-flex justify-content-between pt-6">
            {
              [
                {id: 'ORDER_NUMBER', value: data.number },
                {id: 'CREATION_DATE', value: (<AEMoment date={data.orderedAt} format={'LLLL'}/>) },
                {id: 'ORDERED_AT', value: (<AEMoment date={data.orderedAt}/>) },
                {id: 'VENDOR', value: data.vendor.name }
              ].map(row=>(
                <div key={row.id} className="d-flex flex-column flex-root">
                      <span className="font-weight-bolder mb-2">
                        {formatMessage({id: row.id})}
                      </span>
                  <span className="opacity-70">
                        {row.value}
                      </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
        <div className="col-md-10">
          <div className="table-responsive">
            <table className="table">
              <thead>
              <tr>
                <th className="pl-0 font-weight-bold text-muted  text-uppercase">
                  {formatMessage({id: 'VARIANT'})}
                </th>
                <th className="text-right font-weight-bold text-muted text-uppercase">
                  {formatMessage({id: 'QUANTITY'})}
                </th>
                <th className="text-right font-weight-bold text-muted text-uppercase">
                  {formatMessage({id: 'PRICE'})}
                </th>
                <th className="text-right pr-0 font-weight-bold text-muted text-uppercase">
                  {formatMessage({id: 'TAX_EXCLUDED_PRICE'})}
                </th>
              </tr>
              </thead>
              <tbody>
              {
                data.stockOrderLines.map(row=>(
                  <tr key={row.id} className="font-weight-boldest">
                    <td className="border-0 pl-0 py-3 d-flex align-items-center">
                      <div className="symbol symbol-40 flex-shrink-0 mr-4 bg-light">
                        <div
                          className="symbol-label"
                          style={{backgroundImage: `url("${toAbsoluteUploadUrl(`/variant_images/${row.variant._fileName}`)}")`}}
                        />
                      </div>
                      {row.variant[localField()]}
                    </td>
                    <td className="text-right pt-7 align-middle">
                      {row.qty}
                    </td>
                    <td className="text-right pt-7 align-middle">
                      <AECurrency value={row.price} />
                    </td>
                    <td className="text-primary pr-0 pt-7 text-right align-middle">
                      <AECurrency value={row._taxExcludedPrice} />
                    </td>
                  </tr>
                ))
              }

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row justify-content-center bg-gray-100 py-8 px-8 py-md-10 px-md-0 mx-0">
        <div className="col-md-10">
          <div className="table-responsive">
            <table className="table">
              <thead>
              <tr>
                <th className="font-weight-bold text-muted text-uppercase">
                  {formatMessage({id: 'VAT'})}
                </th>
                <th className="font-weight-bold text-muted text-uppercase">
                  {formatMessage({id: 'TAX_EXCLUDED_PRICE'})}
                </th>
                <th className="font-weight-bold text-muted text-uppercase text-right">
                  {formatMessage({id: 'TAX_INCLUDED_PRICE'})}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr className="font-weight-bolder">
                <td className={'font-size-h4'}>{data.vat} %</td>
                <td className={'font-size-h4'}>
                  <AECurrency value={data._taxExcludedPrice}/>
                </td>
                <td className="text-primary font-size-h3 font-weight-boldest text-right">
                  <AECurrency value={data._taxIncludedPrice}/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
})




export function Detail({history, match}) {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data } = useStockOrdersDetailState()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "p-20"
    // copyStyles: true
  });
  const id = match.params.id;

  useEffect(() => {
    dispatch(fetchStockOrderForDetail(id));
  }, [id, dispatch]);

  return (
    <>
      <Loader isLoading={isLoading} />
      {!isLoading && data.id && (
        <div className="card card-custom gutter-b">
          <div className="card-body p-0">
            <ComponentToPrint data={data} ref={componentRef} />

            <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
              <div className="col-md-10">
                <div className="d-flex justify-content-end">
                  <AEButton
                    fontWeight={'bold'}
                    onClick={handlePrint}
                  >
                    {formatMessage({id: 'PRINT'})}
                  </AEButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
}

