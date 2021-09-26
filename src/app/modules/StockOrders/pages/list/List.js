import React, {useEffect} from "react";
import {Card, CardBody, Pagination} from "../../../../../_metronic/_partials/controls";
import {useDispatch} from "react-redux";
import {EntityCard} from "../../components/EntityCard";
import {Filter} from "./Filter/Filter";
import {fetchStockOrders, stockOrdersActions, useStockOrdersState} from "../../../../../redux/stockOrders";
import {Loader} from "../../../../../_ae/components/loader";
import {AECurrency} from "../../../../../_ae/components/Currency";
import {AEMoment} from "../../../../../_ae/components/moment";
import {AEIcon} from "../../../../../_ae/components/svg";
import {AERouteAction} from "../../../../../_ae/components/AERouteActions";
import {FormattedMessage} from "react-intl";

export const List = () => {
  const dispatch = useDispatch();
  const {data, isLoading, metadata} = useStockOrdersState();
  const {pagination, filters, sort} = metadata;
  const {setPage, setPerPage} = stockOrdersActions;

  useEffect(()=>{
    dispatch(fetchStockOrders(metadata));
  }, [
    pagination.page, pagination.perPage, sort.field, sort.asc,
    filters.search, filters.variant, filters.vendor
  ])

  return (
    <>
      <Loader isLoading={isLoading} />
      <Filter />
      <Card>
        <CardBody>
          <div className="table-responsive">
            <table className="table table-sm table-head-custom table-head-bg table-borderless table-vertical-center">
              <thead>
              <tr className="text-uppercase">
                {
                  [
                    {id: 'ORDER_NUMBER'},
                    {id: 'VENDOR'},
                    {id: 'VAT'},
                    {id: 'TAX_EXCLUDED_PRICE'},
                    {id: 'TAX_INCLUDED_PRICE'},
                    {id: 'ORDER_LINES'},
                    {id: 'ORDERED_AT'},
                  ].map(row=>(
                    <th key={row.id}>
                      <FormattedMessage id={row.id} />
                    </th>
                  ))
                }
                <th />
              </tr>
              </thead>
              <tbody>
              {
                data.map(row=>(
                  <tr key={row.id}>
                    <td>
                      {row.number}
                    </td>
                    <td>
                      {row.vendor.name}
                    </td>
                    <td>
                      {row.vat} <sup>%</sup>
                    </td>
                    <td>
                      <AECurrency value={row._taxExcludedPrice} />
                    </td>
                    <td>
                      <AECurrency value={row._taxIncludedPrice} />
                    </td>
                    <td>
                      {row.stockOrderLines.length}
                    </td>
                    <td>
                      <AEMoment date={row.orderedAt} />
                    </td>
                    <td className="text-right pr-0">
                      <AERouteAction
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                        routeKey={'STOCK_ORDERS.DETAIL'}
                        params={{id: row.id}} >
                        <AEIcon
                          path={'/Navigation/Arrow-right.svg'}
                        />
                      </AERouteAction>
                    </td>

                  </tr>
                ))
              }



              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Pagination
        isLoading={isLoading}
        total={metadata.pagination.total}
        perPage={metadata.pagination.perPage}
        page={metadata.pagination.page}
        pages={metadata.pagination.pages}
        setPage={(page)=>{
          dispatch(setPage(page))
        }}
        setPerPage={(perPage)=>{
          dispatch(setPerPage(perPage))
        }}
        counts={[12, 24, 48, 96]}
      />
    </>
  );
}
