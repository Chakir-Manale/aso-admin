import React, {useMemo} from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {ICONS} from "../../../../_ae/components/svg";
import {AEEmail} from "../../../../_ae/components/AELink";
import {AEAvatar} from "../../../../_ae/components/AEAvatar";
import clsx from "clsx";
import {EntityCartLabel, localField, SIZES} from "../../../../_ae/helpers/UIHelper";
import {useAuthState} from "../../../../redux/auth";
import {AERouteAction, AERouteActions} from "../../../../_ae/components/AERouteActions";
import {AEMoment} from "../../../../_ae/components/moment";
import {PaymentStatus} from "./PaymentStatus";
import {DeliveryStatus} from "./DeliveryStatus";
import {PaymentMethod} from "./PaymentMethod";
import {UserEntityCard} from "../../Users";
import {CONFIG} from "../../../../_ae/config";

const {xs, sm, md, lg, xl, xxl} = SIZES;
const classes = {
  xs: {
    symbol: 30,
  },
  sm: {
    symbol: 50,
  },
  md: {
    symbol: 60,
  },
  lg: {
    symbol: 70,
  },
  xl: {
    symbol: 80,
  },
  xxl: {
    symbol: 80,
  },
}


export const EntityCard = ({
                             entity,
                             size= "md",
                             className = '',
                             avatar,
                             editAction,
                             deleteAction,
                             detailAction
                           }) => {

  const {CUSTOMER, SHIPPER} = CONFIG.ROLES
  const {sizeP, sizeClasses} = useMemo(()=>({
      sizeP: SIZES[size],
      sizeClasses: classes[size],
    }),
    [size])


  const actions = useMemo(()=>{

    return [
      {id: 'ORDERS.EDIT', params: {id: entity.id}, show: editAction},
      {id: 'ORDERS.DETAIL', params: {id: entity.id}, show: detailAction},
    ].filter(action=>action.show);
  }, [entity, editAction, deleteAction, detailAction])


  return (
    <Card className={`${className}`}>
      <CardBody className={`p-${sizeP}`}>
        <div className='d-flex justify-content-between -align-items-center w-100'>
          <div className={`${clsx('d-flex align-items-center', sizeP > sm && 'pb-3')}`}>
            <AERouteAction
              className="font-weight-bold"
              routeKey={`ORDERS.DETAIL`}
              params={{id: entity.id}}
            >
              #{entity.id}
            </AERouteAction>

            {/*<FullName*/}
            {/*  user={entity}*/}
            {/*  fontSize={`h${xxl-sizeP}`}*/}
            {/*  fontWeight={'bold'}*/}
            {/*/>*/}
          </div>
          <AERouteActions actions={actions} />
        </div>

        {
          sizeP > xs &&
          <div className={`d-flex align-items-center`}>
            <div>
              <EntityCartLabel
                id={CUSTOMER}
                iconPath={ICONS.USER}
                size={size}
              >
                <UserEntityCard
                  entity={entity.createdBy}
                  size={'xs'}
                  avatar
                  className={'card-border  m-0 border-0'}
                />
              </EntityCartLabel>
              {
                entity.shipper &&
                <EntityCartLabel
                  id={SHIPPER}
                  iconPath={ICONS.USER}
                  size={size}
                >
                  <UserEntityCard
                    entity={entity.shipper}
                    size={'xs'}
                    avatar
                    className={'card-border  m-0 border-0'}
                  />
                </EntityCartLabel>
              }



              <EntityCartLabel
                id={'PAYMENT_STATUS'}
                iconPath={ICONS.EMAIL}
                size={size}
              >
                <PaymentStatus status={entity.paymentStatus} />
              </EntityCartLabel>

              <EntityCartLabel
                id={'DELIVERY_STATUS'}
                iconPath={ICONS.EMAIL}
                size={size}
              >
                <DeliveryStatus status={entity.deliveryStatus} />
              </EntityCartLabel>

              <EntityCartLabel
                id={'PAYMENT_METHOD'}
                iconPath={ICONS.EMAIL}
                size={size}
              >
                <PaymentMethod method={entity.paymentMethodKey} />
              </EntityCartLabel>




              <EntityCartLabel
                id={'ORDERED_AT'}
                iconPath={ICONS.CALENDAR}
                size={size}
              >
                <AEMoment
                  format={'LLL'}
                  date={entity.createdAt}
                />
              </EntityCartLabel>
            </div>
          </div>
        }

      </CardBody>
    </Card>
  )
}