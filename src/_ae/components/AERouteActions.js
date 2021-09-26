import React from "react";
import {Dropdown} from "react-bootstrap";
import {DropdownCustomToggler} from "../../_metronic/_partials/dropdowns";
import {AEIcon, ICONS} from "./svg";
import {AELink} from "./AELink";
import {useRoutesForAppState} from "../../redux/routes";
import {useIntl} from "react-intl";

/// params example
// {
//   id: entity.id
// }
export const AERouteActions = ({actions, params = {}}) => {

  const {data: routes} = useRoutesForAppState();
  actions = actions.map(({id, ...action})=>({
    routeKey: id,
    ...action
  }))

  if (actions.length === 0) {
    return null
  }
  return (
    <Dropdown>
      <Dropdown.Toggle as={DropdownCustomToggler} >
        <AEIcon path={ICONS.DOTS} variant={'primary'} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          actions
            .filter(action=>routes.find(r=>r.routeKey === action.id) !== -1)
            .map(action=><AERouteAction key={action.routeKey} {...action} />)
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}


export const AERouteAction = ({routeKey, params = {}, children, ...props}) => {
  const {data: routes} = useRoutesForAppState();
  const {formatMessage} = useIntl();
  const route = routes.find(r=>r.routeKey === routeKey);

  if (! route) {
    console.error('Route Not Found')
    return null;
  }


  let path = route.path;

  Object.keys(params).forEach((paramKey)=>{
    path = path.replace(`:${paramKey}`, params[paramKey])
  })
  return (
    <AELink
      to={path}
      className="dropdown-item"
      {...props}
    >
      {
        children ?
          children :
          <>
            <AEIcon className={'pr-2'} path={route.svg}/>
            {formatMessage({id: route.routeKey})}
          </>
      }

    </AELink>
  )
}