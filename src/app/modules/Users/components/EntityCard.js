import React, {useMemo} from "react";
import {Card, CardBody} from "../../../../_metronic/_partials/controls";
import {ICONS} from "../../../../_ae/components/svg";
import {AEEmail} from "../../../../_ae/components/AELink";
import {AEAvatar} from "../../../../_ae/components/AEAvatar";
import {FullName} from "./FullName";
import clsx from "clsx";
import {EntityCartLabel, localField, SIZES} from "../../../../_ae/helpers/UIHelper";
import {useAuthState} from "../../../../redux/auth";
import {AERouteActions} from "../../../../_ae/components/AERouteActions";
import {AEMoment} from "../../../../_ae/components/moment";

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
}) => {

  const { user:authUser } = useAuthState()

  const {sizeP, sizeClasses} = useMemo(()=>({
      sizeP: SIZES[size],
      sizeClasses: classes[size],
    }),
    [size])


  const actions = useMemo(()=>{
    const isPrior = entity.role && authUser.role.priority < entity.role.priority;

    return [
      {id: 'USERS.EDIT', params: {id: entity.id}, show: editAction && isPrior},
      {id: 'USERS.DELETE', params: {id: entity.id}, show: deleteAction},
    ].filter(action=>action.show);
  }, [entity, authUser, editAction, deleteAction])

  const Image = useMemo(()=>{
    return () => avatar ? (
      <AEAvatar
        entity={entity}
        size={sizeClasses.symbol}
        className={`mr-${sizeP}`}
      />
    ) : null
  }, [entity, sizeP])


  return (
    <Card className={`${className}`}>
      <CardBody className={`p-${sizeP}`}>
        <div className='d-flex justify-content-between -align-items-center w-100'>
          <div className={`${clsx('d-flex align-items-center', sizeP > sm && 'pb-3')}`}>
            {
              sizeP === xs && <Image />
            }

            <FullName
              user={entity}
              fontSize={`h${xxl-sizeP}`}
              fontWeight={'bold'}
            />
          </div>
          <AERouteActions actions={actions} />
        </div>

        {
          sizeP > xs &&
          <div className={`d-flex align-items-center`}>
            <Image />
            <div>
              {
                entity.email &&
                <EntityCartLabel
                  id={'EMAIL'}
                  iconPath={ICONS.EMAIL}
                  size={size}
                >
                  <AEEmail value={entity.email} />
                </EntityCartLabel>
              }

              {
                entity.role &&
                <EntityCartLabel
                  id={'ROLE'}
                  iconPath={ICONS.ROLES}
                  size={size}
                >
                  {entity.role[localField()]}
                </EntityCartLabel>
              }

              <EntityCartLabel
                id={'CREATION_DATE'}
                iconPath={ICONS.CALENDAR}
                size={size}
              >
                <AEMoment date={entity.createdAt} format={sizeP > md ? 'LLL' : 'LL'} />
              </EntityCartLabel>
            </div>
          </div>
        }

      </CardBody>
    </Card>
  )
}