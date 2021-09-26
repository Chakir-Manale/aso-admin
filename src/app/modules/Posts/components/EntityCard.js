import React from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {useIntl} from "react-intl";
import {Name} from "./Name";
import clsx from "clsx";
import {toEntityFileNameUrl} from "../../../../_metronic/_helpers";
import {AERouteActions} from "../../../../_ae/components/AERouteActions";
import {AEMoment} from "../../../../_ae/components/moment";
import {getFullName} from "../../Users/components/FullName";
import {AETruncate, localField} from "../../../../_ae/helpers/UIHelper";
import {SlateEditorPreview} from "../../../../_ae/components/SlateEditor";

export const EntityCard = ({
  entity,
  size= "md",
  className = '',
  editAction,
  deleteAction,
}) => {

  const { formatMessage } = useIntl()
  const classes = {
    xs:{
      card: 'shadow-none ',
      cardBody: 'p-1',
      symbol: 'symbol-30 mr-2',
      title: '',
    },
    sm:{
      card: 'shadow-none ',
      cardBody: 'p-2',
      symbol: 'symbol-70 mr-2',
      title: '',
    },
    md:{
      symbol: 'symbol-70 mr-5',
      cardBody: 'p-3 d-flex flex-column',
      title: 'h6',
    },
    lg:{
      symbol: 'symbol-80 mr-5',
      title: 'h5',
      cardBody: 'p-4',
    },
  }

  const sizeClasses = classes[size];
  const isLg = size === 'lg'
  const isMd = size === 'md'
  const isXs = size === 'xs'

  const actions = [
    {id: 'POSTS.EDIT', params: {id: entity.id}, show: editAction},
    {id: 'POSTS.DELETE', params: {id: entity.id}, show: deleteAction},
  ].filter(action=>action.show);


  return (
    <>
      <Card className={`${className}`}>
        <CardBody className={`${sizeClasses.cardBody}`}>
          <div className={`d-flex align-items-center`}>
            {
              entity.fileName &&
              <div className={`symbol ${sizeClasses.symbol}`}>
                <img src={toEntityFileNameUrl(entity, 'posts')} alt={` `}/>
              </div>
            }
            <div className="flex-grow-1">
              <div className={`d-flex justify-content-between flex-wrap mt-1`}>
                <div className={`${isXs ? '' : '-d-flex align-items-center'}`}>
                  <Name
                    entity={entity}
                    fontSize={sizeClasses.title}
                    fontWeight={'bold'}
                  />
                  {/*<div>*/}
                  {/*  <SlateEditorPreview*/}
                  {/*    value={entity[localField('content')]}*/}
                  {/*    />*/}
                    {/*<AETruncate length={200} text={entity[localField('content')]}/>*/}
                  {/*</div>*/}
                  <div className={clsx('flex-grow-1', !isXs && 'pt-1')} >
                    {
                      [
                        {
                          id: 'CREATION_DATE',
                          value: (<AEMoment date={entity.createdAt} format={'LL'}/>)
                        },
                        {
                          id: "AUTHOR",
                          hidden: ! entity.createdBy,
                          value: entity.createdBy && getFullName(entity.createdBy)
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