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
import {MODULES} from "../../../../_ae/helpers/RoutingHelpers";
import {AECurrency} from "../../../../_ae/components/Currency";
import {Rate} from "../../Variants/components/Rate";
import {localField} from "../../../../_ae/helpers/UIHelper";
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
    {id: 'PACKS.EDIT', params: {id: entity.id}, show: editAction},
    {id: 'PACKS.DELETE', params: {id: entity.id}, show: deleteAction},
  ].filter(action=>action.show);


  return (
    <>
      <Card className={`${className}`}>
        <CardBody className={clsx(sizeClasses.cardBody)}>
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
                <img src={toEntityFileNameUrl(entity, MODULES.PACKS)} alt={` `}/>
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
                              id: "PRICE",
                              value: (
                                <span className="text-info font-weight-boldest">
                                  <AECurrency value={entity.price} />
                                  {
                                    entity._rate !== 0 &&
                                    <>
                                      <del className='font-weight-normal pl-3'>
                                        <AECurrency value={entity._defaultSellingPrice} />
                                      </del>
                                      {`  `}
                                      <span className={'text-danger pl-3'}>
                                        <Rate rate={entity._rate} />
                                      </span>
                                    </>
                                  }
                              </span>
                              )
                            },
                            {
                              id: "VARIANTS",
                              hidden: isSm,
                              titleHidden: true,
                              value: (
                                <table className='table table-sm table-borderless'>
                                  <tbody>
                                  {
                                    entity.packVariantLines.map(line=>(
                                      <tr key={line.id}>
                                        <td>{line.qty}</td>
                                        <td>{` x `}</td>
                                        <td>{line.variant[localField()]}</td>
                                      </tr>
                                    ))
                                  }
                                  </tbody>

                                </table>
                              )
                            },
                          ]
                            .filter(op=>!op.hidden)
                            .map(op=>(
                              <div key={op.id} className="d-flex pb-1">
                                <span className="">
                                  {op.value}
                                  {
                                    ! isXs && ! op.titleHidden &&
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