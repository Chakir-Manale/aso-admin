/* eslint-disable no-restricted-imports */
import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import {fetchOrderForDetail, useOrdersDetailState} from "../../../../../redux/orders";
import {Loader} from "../../../../../_ae/components/loader";
import {AEMoment} from "../../../../../_ae/components/moment";
import {toAbsoluteUploadUrl} from "../../../../../_metronic/_helpers";
import {AECurrency} from "../../../../../_ae/components/Currency";
import {useReactToPrint} from 'react-to-print';
import {AEButton} from "../../../../../_ae/components/buttons";
import {CONFIG} from "../../../../../_ae/config";
import {PaymentStatus} from "../../components/PaymentStatus";
import {DeliveryStatus} from "../../components/DeliveryStatus";
import {PaymentMethod} from "../../components/PaymentMethod";
import {UserEntityCard} from "../../../Users";
import {AELabel} from "../../../../../_ae/components/AELabel";
import {AEEmail, AEPhone} from "../../../../../_ae/components/AELink";
import {FullName, getFullName} from "../../../Users/components/FullName";
import {localField} from "../../../../../_ae/helpers/UIHelper";
import {AERouteAction} from "../../../../../_ae/components/AERouteActions";

const ComponentToPrint = React.forwardRef(({data, ...props}, ref) => {
  const {formatMessage} = useIntl()
  const {SHIPPER} = CONFIG.ROLES

  let total = 0;
  data.orderVariantLines.forEach(variantLine=>{
    total += variantLine._total
  })
  data.orderPackLines.forEach(packLine=>{
    total += packLine._total
  })


  return (
    <div ref={ref}>
      <div className="row justify-content-center py-8 px-8 py-md-27 px-md-0">
        <div className="col-md-10">
          <div className="d-flex justify-content-between pb-5 pb-md10 flex-column flex-md-row">
            <h1 className="display-5 font-weight-boldest mb-5">
              {formatMessage({id: 'ORDER'})}
              {` `}
              {formatMessage({id: 'ORDER_NUMBER'})}
              {` `}
              {data.id}
            </h1>
          </div>
          <div className="border-bottom w-100" />
          <div className="d-flex flex-wrap justify-content-between pt-6">
            {
              [
                // {id: 'ORDER_NUMBER', value: data.id },
                {id: 'NAME', value: data.fullName },
                {id: 'EMAIL', value: <AEEmail value={data.email} /> },
                {id: 'PHONE', value: <AEPhone value={data.phoneNumber} /> },
                {id: 'CREATION_DATE', value: (<AEMoment date={data.createdAt} format={'LLLL'}/>) },
                {
                  id: 'ORDERED_BY',
                  value: (
                    <FullName
                      user={data.createdBy}
                      fontWeight={'normal'}
                    />
                  )
                },
                {
                  id: SHIPPER,
                  value: data.shipper && getFullName(data.shipper),
                  hidden: !data.shipper
                },
                {
                  id: 'ADDRESSES', value: (
                    <>
                      <div>-{data.line1}</div>
                      <div>-{data.line2}</div>
                    </>
                  )
                },
              ].map(row=>(
                <div key={row.id} className="d-flex flex-column -flex-root px-2 pb-4">
                  <span className="font-weight-bolder mb-2">
                    {formatMessage({id: row.id})}
                  </span>
                  <span className="-opacity-70">
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
                  {formatMessage({id: 'SUB_TOTAL'})}
                </th>
              </tr>
              </thead>
              <tbody>
              {
                data.orderVariantLines.map(orderVariantLine=>(
                  <tr key={orderVariantLine.id} className="font-weight-boldest">
                    <td className="border-0 pl-0 py-3 d-flex align-items-center">
                      <div className="symbol symbol-40 flex-shrink-0 mr-4 bg-light">
                        <div
                          className="symbol-label"
                          style={{backgroundImage: `url("${toAbsoluteUploadUrl(`/variant_images/${orderVariantLine.variant._fileName}`)}")`}}
                        />
                      </div>
                      {orderVariantLine._variant[localField()]}
                    </td>
                    <td className="text-right pt-7 align-middle">
                      {orderVariantLine.qty}
                    </td>
                    <td className="text-right pt-7 align-middle">
                      <AECurrency value={orderVariantLine._variant._sellingPrice} />
                    </td>
                    <td className="text-primary pr-0 pt-7 text-right align-middle">
                      <AECurrency value={orderVariantLine._total} />
                    </td>
                  </tr>
                ))
              }


              {
                data.orderPackLines.map(orderPackLine=>(
                  <tr key={orderPackLine.id} className="font-weight-boldest">
                    <td className="border-0 pl-0 py-3 d-flex align-items-center">
                      <div className="symbol symbol-40 flex-shrink-0 mr-4 bg-light">
                        <div
                          className="symbol-label"
                          style={{backgroundImage: `url("${toAbsoluteUploadUrl(`/packs/${orderPackLine.pack.fileName}`)}")`}}
                        />
                      </div>
                      {orderPackLine._pack[localField()]}
                    </td>
                    <td className="text-right pt-7 align-middle">
                      {orderPackLine.qty}
                    </td>
                    <td className="text-right pt-7 align-middle">
                      <AECurrency value={orderPackLine._pack.price} />
                    </td>
                    <td className="text-primary pr-0 pt-7 text-right align-middle">
                      <AECurrency value={orderPackLine._total} />
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
                  {formatMessage({id: 'PAYMENT_METHOD'})}
                </th>
                <th className="font-weight-bold text-muted text-uppercase">
                  {formatMessage({id: 'PAYMENT_STATUS'})}
                </th>
                <th className="font-weight-bold text-muted text-uppercase">
                  {formatMessage({id: 'DELIVERY_STATUS'})}
                </th>
                <th className="font-weight-bold text-muted text-uppercase text-right">
                  {formatMessage({id: 'TOTAL'})}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr className="font-weight-bolder">
                <td className={'font-size-h4'}>
                  <PaymentMethod method={data.paymentMethodKey} />
                </td>
                <td className={'font-size-h4'}>
                  <PaymentStatus status={data.paymentStatus} />
                </td>
                <td className={'font-size-h4'}>
                  <DeliveryStatus status={data.deliveryStatus} />
                </td>
                <td className="text-primary font-size-h3 font-weight-boldest text-right">
                  <AECurrency value={total}/>
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
  const { isLoading, data } = useOrdersDetailState()
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "p-20"
    // copyStyles: true
  });
  const id = match.params.id;

  useEffect(() => {
    dispatch(fetchOrderForDetail(id));
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
                  <div>
                    <AERouteAction
                      className="btn btn-secondary font-weight-bold"
                      routeKey={`ORDERS.EDIT`}
                      params={{id: data.id}}
                    />
                  </div>

                  <div className={'pl-2'}>
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
        </div>
      )}
    </>

  );
}

