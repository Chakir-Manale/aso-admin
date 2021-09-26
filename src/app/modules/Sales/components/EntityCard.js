import React from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {AEIcon, ICONS} from "../../../../_ae/components/svg";
import {useIntl} from "react-intl";
import {AELink} from "../../../../_ae/components/AELink";
import {Name} from "./Name";
import clsx from "clsx";
import {DropdownCustomToggler,} from "../../../../_metronic/_partials/dropdowns";
import {Dropdown} from "react-bootstrap";
import {AERole} from "../../../../_ae/components/AERole";
import {useRoutesForAppState} from "../../../../redux/routes";
import {toEntityFileNameUrl} from "../../../../_metronic/_helpers";
import {AEMoment} from "../../../../_ae/components/moment";
import {AERouteActions} from "../../../../_ae/components/AERouteActions";

export const EntityCard = ({
  entity,
  size= "md",
  className = '',
  editAction,
  deleteAction,
}) => {

  const { formatMessage } = useIntl()
  const {data: routes} = useRoutesForAppState();
  const classes = {
    xs:{
      card: 'shadow-none ',
      cardBody: 'p-2',
      symbol: 'symbol-30 mr-2',
      title: '',
    },
    sm:{
      card: 'shadow-none ',
      cardBody: 'p-3',
      symbol: 'symbol-90 mr-2',
      title: 'h5',
    },
    md:{
      symbol: 'symbol-100 mr-5',
      cardBody: 'p-4 d-flex flex-column',
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
    {id: 'SALES.EDIT', params: {id: entity.id}, show: editAction},
    {id: 'SALES.DELETE', params: {id: entity.id}, show: deleteAction},
  ].filter(action=>action.show);


  return (
    <>
      <Card className={`${className}`}>
        <CardBody className={clsx(sizeClasses.cardBody, `rounded border border-3 border-light-${entity._active ? 'success' : 'danger'}`)}>
          <div className='d-flex justify-content-between pb-3'>
            <div>
              <Name
                entity={entity}
                fontSize={sizeClasses.title}
                fontWeight={'bold'}
              />
            </div>
            <AERouteActions actions={actions} />
          </div>
          <div className={`d-flex align-items-center`}>
            {
              !isXs && entity.fileName &&
              <div className={`symbol ${sizeClasses.symbol}`}>
                <img src={toEntityFileNameUrl(entity, 'sales')} alt={` `}/>
              </div>
            }
            <div className="flex-grow-1">
              <div className={`d-flex justify-content-between flex-wrap mt-1`}>
                <div className={`${isXs ? '' : '-d-flex align-items-center'}`}>
                  {
                    ! isXs && (
                      <div className={clsx('flex-grow-1 pt-1', true)} >
                        {
                          [
                            {
                              id: "RATE",
                              hidden: isSm,
                              value: (
                                <>
                                  {entity.rate}
                                  <sup>%</sup>
                                </>
                              )
                            },
                            {
                              id: "START_DATE",
                              hidden: ! entity.startAt,
                              value:<AEMoment date={entity.startAt} format={'LLLL'} />
                            },
                            {
                              id: "END_DATE",
                              hidden: ! entity.endAt,
                              value:<AEMoment date={entity.endAt} format={'LLLL'} />
                            },
                            {
                              id: "VARIANTS",
                              hidden: isSm,
                              value: entity.variants.length
                            },
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
                    )
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