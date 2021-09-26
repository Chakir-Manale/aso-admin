import React, {useEffect} from "react";
import {getConfig} from "../../_metronic/i18n";
import {ROLES} from "../config";
import {shallowEqual, useSelector} from "react-redux";
import {useAuthState} from "../../redux/auth";


/* Role checker */

export const AERole = ({roles = [], children}) =>{
  // const {role} = getConfig()
  const {authRole} = useAuthState();
// console.log(authRole, roles)

  // useEffect(()=>{}, [])

  // const roleExists = accept.filter((s,i,self)=>self.indexOf(s) === i).includes(role);
  const roleExists = roles.includes(authRole)
  // console.log(accept, role, roleExists)
  if(! roleExists) return '';

  return children
}