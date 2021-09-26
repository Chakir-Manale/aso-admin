import React from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {AEIcon} from "../../../../_ae/components/svg";
import {FormattedMessage, useIntl} from "react-intl";
import {Name} from "./Name";
import {Carousel} from "react-bootstrap";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {toAbsoluteUploadUrl} from "../../../../_metronic/_helpers";
import {AECurrency} from "../../../../_ae/components/Currency";
import {Quantity} from "../../Products/components/Quantity";
import {AEDuration} from "../../../../_ae/components/moment";
import {AERating} from "../../../../_ae/components/rating";
import {Rate} from "./Rate";
import {AERouteActions} from "../../../../_ae/components/AERouteActions";

export const EntityCard = ({
  entity,
  size= "md",
  className = '',
  editAction,
  deleteAction,
}) => {
  const {formatMessage} = useIntl()

  const classes = {
    xs:{
      card: 'shadow-none ',
      cardBody: 'p-1',
      symbol: 'symbol-40 mr-2',
      title: 'h6',
    },
    sm:{
      card: 'shadow-none ',
      cardBody: 'p-2',
      symbol: 'symbol-70 mr-2',
      title: 'h5',
    },
    md:{
      symbol: 'symbol-70 mr-5',
      cardBody: 'p-3 d-flex flex-column',
      title: 'h4',
    },
    lg:{
      symbol: 'symbol-80 mr-5',
      title: 'h3',
      cardBody: 'p-4',
    },
  }

  const sizeClasses = classes[size];
  const isLg = size === 'lg'
  const isMd = size === 'md'
  const isSm = size === 'sm'
  const isXs = size === 'xs'

  const actions = [
    {id: 'VARIANTS.EDIT', params: {id: entity.id}, show: editAction},
    {id: 'VARIANTS.DELETE', params: {id: entity.id}, show: deleteAction},
  ].filter(action=>action.show);



  return (
    <>
      <Card className={`${className}`}>
        <CardBody className={`${sizeClasses.cardBody}`}>
          <div className="row">
            <div className="col-lg-5 mb-lg-0">
              <Card className="card-stretch">
                <CardBody
                  className="d-flex align-items-center justify-content-center rounded bg-light"
                  // style={{backgroundColor: '#FFCC69'}}
                >
                  {
                    entity.images.length === 0 ?
                      <img
                        src={toAbsoluteUploadUrl(`/variant_images/${entity._fileName}`)}
                        className="mw-100 w-200px"
                        // style={{transform: 'scale(1.6)'}}
                        alt={entity[localField()]}
                      /> :
                      <Carousel
                        fade
                        nextIcon={<AEIcon size={'lg'} variant={'dark'} path={'/Navigation/Arrow-right.svg'} />}
                        prevIcon={<AEIcon size={'lg'} variant={'dark'} path={'/Navigation/Arrow-left.svg'} />}
                      >
                        {
                          entity.images.map(image=>(
                            <Carousel.Item
                              key={image.id}
                              className={'d-flex align-items-center justify-content-center'}
                            >
                              <img
                                className="mw-100 w-200px"
                                // className="d-block w-100"
                                src={toAbsoluteUploadUrl(`/variant_images/${image.fileName}`)}
                                alt={entity[localField()]}
                              />
                            </Carousel.Item>
                          ))
                        }
                      </Carousel>
                  }
                </CardBody>
              </Card>
            </div>
            <div className="col-lg-7 pl-lg-5">
              <div className='d-flex justify-content-between'>
                <Name entity={entity} fontSize={sizeClasses.title} fontWeight={'bold'}/>
                <AERouteActions actions={actions} />
              </div>
              {/*<h2*/}
              {/*  className="font-size-h4 font-weight-bold text-dark mb-3"*/}
              {/*  // style={{fontSize: 32}}*/}
              {/*>*/}
              {/*  {entity[localField()]}*/}
              {/*</h2>*/}
              <div className="mb-3 text-dark-50">
                <FormattedMessage id={'PRICE'} />
                <span className="text-info font-weight-boldest ml-2 font-size-h4">
                  <AECurrency value={entity._sellingPrice} />
                  {
                    entity._discountRate > 0 &&
                    <>
                      <del className='font-weight-normal pl-3'>
                        <AECurrency value={entity.price} />
                      </del>
                      {`  `}
                      <span className={'text-danger pl-3'}>
                        <Rate rate={-entity._discountRate} />
                      </span>
                    </>
                  }
                </span>
                {
                  ! isXs  && ! isSm && entity._discountRate > 0 &&
                  <div>
                    {
                      entity.sales
                        // .filter(sale=>sale._active)
                        .map((sale, index)=>(
                          <div key={sale.id} className={`text-${sale._active ? 'success ' : 'danger'}`}>
                            <FormattedMessage
                              id={'VARIANT.SALE.DESC'}
                              values={{rate: -sale.rate, name: sale[localField()]}}
                            />
                          </div>
                        ))
                    }
                  </div>
                }

              </div>
              {
                isLg &&
                <div className="line-height-xl">
                  {entity[localField('desc')]}
                </div>
              }

            </div>
          </div>
          <div className="row">
            {
              [
                { id: 'IN_STOCK', value: <Quantity value={entity._qty} /> , useI18: true },
                { id: 'SHIPPING_DELAY', value: <AEDuration duration={entity.shippingDelay} unit={'hours'} />, useI18: true },
                {
                  id: 'RATES',
                  value: (<FormattedMessage
                    id={'REVIEW.COUNT'}
                    values={{count: entity._rates}}
                  />),
                  useI18: true
                },
                { id: 'RATING', value: <AERating value={entity._rating} />, useI18: true },
                ...entity.options.map(({attribute, value})=>({useI18:false, id: attribute[localField()], value}))
              ].map(row=>(
                <div key={row.id} className="col-xs-6 col-md-3 col-sm-6">
                  <div className="mb-3 d-flex flex-column">
                    <span className="text-dark font-weight-bold mb-1">
                      {row.useI18 ? <FormattedMessage id={row.id} /> : row.id}
                    </span>
                    <span className="text-muted font-weight-bolder font-size-lg">
                      {row.value}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        </CardBody>
      </Card>
    </>
  )
}