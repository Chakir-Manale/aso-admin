import React, {useEffect} from "react";
import {Card, CardBody, Pagination} from "../../../../../_metronic/_partials/controls";
import {useDispatch} from "react-redux";
import {EntityCard} from "../../components/EntityCard";
import {Filter} from "./Filter/Filter";
import {fetchOrders, ordersActions, useOrdersState} from "../../../../../redux/orders";
import {Loader} from "../../../../../_ae/components/loader";
import {CONFIG} from "../../../../../_ae/config";
import {FormattedMessage} from "react-intl";
import {AERouteAction, AERouteActions} from "../../../../../_ae/components/AERouteActions";
import {PaymentStatus} from "../../components/PaymentStatus";
import {DeliveryStatus} from "../../components/DeliveryStatus";
import {PaymentMethod} from "../../components/PaymentMethod";
import {UserEntityCard} from "../../../Users";
import {AEMoment} from "../../../../../_ae/components/moment";

export const Td = ({hidden, ...props}) => {

    return hidden ? null : <td {...props} />
}

export const List = () => {
    const dispatch = useDispatch();
    const {data, isLoading, metadata} = useOrdersState();
    const {pagination, filters, sort} = metadata;
    const {setPage, setPerPage} = ordersActions;
    const {CUSTOMER, SHIPPER} = CONFIG.ROLES

    useEffect(() => {
        dispatch(fetchOrders(metadata));
    }, [
        pagination.page, pagination.perPage, sort.field, sort.asc,
        filters.search, filters.createdBy, filters.shipper, filters.paymentStatus, filters.deliveryStatus, filters.paymentMethodKey
    ])

    return (
        <>
            <Loader isLoading={isLoading}/>
            <Filter/>
            <Card>
                <CardBody>
                    <div className="table-responsive">
                        <table
                            className="table table-sm table-hover table-head-custom table-head-bg table-borderless table-vertical-center">
                            <thead>
                            <tr className="text-uppercase">
                                {
                                    [
                                        {id: 'ID'},
                                        {id: 'PAYMENT_STATUS', hidden: filters.paymentStatus},
                                        {id: 'DELIVERY_STATUS', hidden: filters.deliveryStatus},
                                        {id: 'PAYMENT_METHOD', hidden: filters.paymentMethodKey},
                                        {id: CUSTOMER, hidden: filters.customer},
                                        {id: SHIPPER, hidden: filters.shipper},
                                        {id: 'ORDERED_AT'},
                                    ]
                                        .filter(({hidden}) => !hidden)
                                        .map(row => (
                                            <th key={row.id}>
                                                <FormattedMessage id={row.id}/>
                                            </th>
                                        ))
                                }
                                <th/>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                data.map(row => {
                                    const actions = [
                                        {id: 'ORDERS.DETAIL', params: {id: row.id}},
                                        {id: 'ORDERS.EDIT', params: {id: row.id}},
                                    ];

                                    return (
                                        <tr key={row.id} className={`bg-hover-light-danger`}>
                                            <td>
                                                <AERouteAction
                                                    className="font-weight-bold"
                                                    routeKey={`ORDERS.DETAIL`}
                                                    params={{id: row.id}}
                                                >
                                                    #{row.id}
                                                </AERouteAction>
                                            </td>
                                            <Td hidden={filters.paymentStatus}>
                                                <PaymentStatus status={row.paymentStatus}/>
                                            </Td>
                                            <Td hidden={filters.deliveryStatus}>
                                                <DeliveryStatus status={row.deliveryStatus}/>
                                            </Td>
                                            <Td hidden={filters.paymentMethodKey}>
                                                <PaymentMethod method={row.paymentMethodKey}/>
                                            </Td>
                                            <Td hidden={filters.createdBy}>
                                                <UserEntityCard
                                                    entity={row.createdBy}
                                                    size={'xs'}
                                                    avatar
                                                    className={'card-border  m-0 border-0'}
                                                />
                                            </Td>
                                            <Td hidden={filters.shipper}>
                                                {
                                                    row.shipper &&
                                                    <UserEntityCard
                                                        entity={row.shipper}
                                                        size={'xs'}
                                                        avatar
                                                        className={'card-border m-0 border-0'}
                                                    />
                                                }

                                            </Td>
                                            <td>
                                                <AEMoment
                                                    format={'LLL'}
                                                    date={row.createdAt}
                                                />
                                            </td>
                                            <td className="text-right pr-0">
                                                <AERouteActions actions={actions}/>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
            {/*<div className={'row'}>*/}
            {/*  {*/}
            {/*    data.map(r=>(*/}
            {/*      <div key={r.id} className={'col-12 -col-sm-6 -col-md-4 -col-xxl-3'}>*/}
            {/*        <EntityCard*/}
            {/*          key={r.id}*/}
            {/*          entity={r}*/}
            {/*          size={'lg'}*/}
            {/*          className={'card-stretch'}*/}
            {/*          editAction*/}
            {/*          deleteAction*/}
            {/*          detailAction*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    ))*/}
            {/*  }*/}
            {/*</div>*/}

            <Pagination
                isLoading={isLoading}
                total={metadata.pagination.total}
                perPage={metadata.pagination.perPage}
                page={metadata.pagination.page}
                pages={metadata.pagination.pages}
                setPage={(page) => {
                    dispatch(setPage(page))
                }}
                setPerPage={(perPage) => {
                    dispatch(setPerPage(perPage))
                }}
                counts={[12, 24, 48, 96]}
            />
        </>
    );
}
