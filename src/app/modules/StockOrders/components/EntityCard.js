import React from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {useIntl} from "react-intl";
import {Name} from "./Name";
import clsx from "clsx";
import {useRoutesForAppState} from "../../../../redux/routes";
import {useAuthState} from "../../../../redux/auth";
import {AERouteActions} from "../../../../_ae/components/AERouteActions";

export const EntityCard = ({
  entity,
  size= "md",
  className = '',
  editAction,
  deleteAction,
  detailAction
}) => {

  const { formatMessage } = useIntl()
  const { user:authUser } = useAuthState()
  const {data: routes, routesLoading} = useRoutesForAppState();
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
  const isXs = size === 'xs'

  const actions = [
    {id: 'STOCK_ORDERS.DETAIL', params: {id: entity.id}, show: detailAction },
    {id: 'STOCK_ORDERS.EDIT', params: {id: entity.id}, show: editAction },
    {id: 'STOCK_ORDERS.DELETE', params: {id: entity.id}, show: deleteAction },
  ].filter(action=>action.show);

  return (
    <>
      <Card className={`${className}`}>
        <CardBody className={`${sizeClasses.cardBody}`}>
          <div className={`d-flex`}>
            <div className="flex-grow-1">
              <div className={`d-flex justify-content-between flex-wrap mt-1`}>
                <div className={`${isXs ? '' : '-d-flex align-items-center'}`}>
                  <Name entity={entity} fontSize={sizeClasses.title} fontWeight={'bold'}/>
                  <div className={clsx('flex-grow-1', !isXs && 'pt-1')} >
                    {
                      [
                        // {
                        //   id: "USERS",
                        //   hidden: !entity.users,
                        //   value: entity.users && formatMessage({id: 'MEMBER.COUNT'}, {count: entity.users.length})
                        // },
                      ]
                        .filter(op=>!op.hidden)
                        .map(op=>(
                          <div key={op.id} className="d-flex pb-1">
                            <span className="">
                              {op.value}
                              {
                                !isXs &&
                                <span className={"text-muted ml-2"}> {formatMessage({id: op.id})} </span>
                              }
                            </span>
                          </div>
                        ))
                    }
                  </div>
                </div>
                <AERouteActions actions={actions} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}