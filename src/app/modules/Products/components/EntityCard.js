import React from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {useIntl} from "react-intl";
import {Name} from "./Name";
import {useRoutesForAppState} from "../../../../redux/routes";
import {localField} from "../../../../_ae/helpers/UIHelper";
import {AECurrency} from "../../../../_ae/components/Currency";
import {AELabels} from "../../../../_ae/components/AELabel";
import {AERouteActions} from "../../../../_ae/components/AERouteActions";

export const EntityCard = ({
  entity,
  size= "md",
  className = '',
  editAction,
  deleteAction,
  detailAction,
  addVariantAction
}) => {

  const { formatMessage } = useIntl()
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
    {id: 'VARIANTS.NEW', params: {productId: entity.id}, show: addVariantAction},
    {id: 'PRODUCTS.DETAIL', params: {id: entity.id}, show: detailAction},
    {id: 'PRODUCTS.EDIT', params: {id: entity.id}, show: editAction},
    {id: 'PRODUCTS.DELETE', params: {id: entity.id}, show: deleteAction},
  ].filter(action=>action.show);



  return (
    <>
      <Card className={`${className}`}>
        <CardBody className={`${sizeClasses.cardBody}`}>
          <div className={`d-flex align-items-center`}>
            <div className="flex-grow-1">
              <div className={`d-flex justify-content-between flex-wrap mt-1`}>
                <div className={`w-100 ${isXs ? '' : '-d-flex align-items-center'}`}>
                  <div className='d-flex justify-content-between'>
                    <Name entity={entity} fontSize={sizeClasses.title} fontWeight={'bold'}/>
                    <AERouteActions actions={actions} />
                  </div>
                  {
                    ! isXs &&
                    <div className="text-muted font-weight-bold mb-6">
                      {formatMessage({id:'VARIANTS.COUNT'}, {count: entity._totalVariants})}
                    </div>
                  }

                  {
                    isLg &&
                    <div className="font-size-sm mb-6">
                      {entity[localField('desc')]}
                    </div>
                  }
                  {
                    ! isXs && ! isSm &&
                      <>
                        <div className="d-flex mb-3">
                          <span className="text-dark-50 flex-root font-weight-bold">
                            {formatMessage({id: 'PRICE'})}
                          </span>
                          <span className="text-dark flex-root font-weight-bold">
                            <AECurrency value={entity._minSellingPrice} />
                            {` - `}
                            <AECurrency value={entity._maxSellingPrice} />
                          </span>
                        </div>

                        {
                          entity.categories.length > 0 &&
                          <div className="d-flex mb-2">
                            <span className="text-dark-50 flex-root font-weight-bold">
                              {formatMessage({id: 'CATEGORIES'})}
                            </span>
                            <span className="text-dark flex-root font-weight-bold">
                              <AELabels
                                variant={'secondary'}
                                options={entity.categories}
                              />
                            </span>
                          </div>
                        }

                        {
                          entity.attributes.length > 0 &&
                          <div className="d-flex mb-3">
                      <span className="text-dark-50 flex-root font-weight-bold">
                        {formatMessage({id: 'ATTRIBUTES'})}
                      </span>
                            <span className="text-dark flex-root font-weight-bold">
                        <AELabels options={entity.attributes} />
                      </span>
                          </div>
                        }
                        </>
                  }

                </div>

              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}