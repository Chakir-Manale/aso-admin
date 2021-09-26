import React from "react";
import PropTypes from 'prop-types';
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../_metronic/_helpers";


/* TODO
*   list all icons
*   icon classes
* */

export const ICONS = {
  LIST:'/Layout/Layout-grid.svg',
  PLUS:'/Code/Plus.svg',
  EDIT:'/Design/Edit.svg',
  SAVE:'/Code/Done-circle.svg',
  DELETE:'/Code/Error-circle.svg',
  MAP_MARKER:'/Map/Marker1.svg',
  AREA:'/Home/Globe.svg',
  EMAIL: '/Communication/Mail.svg',
  HEARTH: '/General/Heart.svg',
  DOTS:'/General/Other2.svg',
  DETAIL:'/General/Other2.svg',
  HOME:'/Home/Home.svg',
  GENDER:'/Clothes/Tie.svg',
  MALE:'/Clothes/Tie.svg',
  FEMALE:'/Clothes/Dress.svg',
  CALENDAR:'/Design/Select.svg',
  KEY:'/Design/Select.svg',
  USERS_DELETE:'/Communication/Delete-user.svg',

  ADD_USER: '/Communication/Add-user.svg',
  USER:'/General/User.svg',
  USERS:'/Communication/Group.svg',
  CITIES: '/Home/Building.svg',
  TASKS: '/Navigation/Double-check.svg',
  MODELS: '/Files/Selected-file.svg',
  REPORTS: '/Communication/Clipboard-check.svg',
  ROLES: '/General/Shield-protected.svg',

  CATEGORIES: '/Layout/Layout-top-panel-5.svg',
  POSTS: '/Text/Bold.svg',
  PACKS: '/Shopping/Box3.svg',
  SALES: '/Shopping/Sale2.svg',
  PRODUCTS: '/Clothes/Shirt.svg',
  VARIANTS: '/General/Duplicate.svg',
  ATTRIBUTES: '/Home/Commode2.svg',
  ORDERS: '/Shopping/Loader.svg',
  BANNERS: '/Layout/Layout-top-panel-3.svg',
  STOCK_ORDERS: '/Shopping/Settings.svg',
  VENDORS: '/Home/Home.svg',
}


export const AEIcon = ({ path, variant, size , className, prefix = '/icons', ...props}) =>{
  let classes = [className, "svg-icon", "menu-icon"];
  if(variant) classes.push(`svg-icon-${variant}`)
  if(size) classes.push(`svg-icon-${size}`)
  return (
    <span className={classes.join(' ')} {...props}>
      <SVG src={toAbsoluteUrl(`/media/svg/${prefix}/${path}`)} style={{pointerEvents: 'none' }}/>
    </span>
  )
}
AEIcon.propTypes = {
  // icon: PropTypes.oneOf(["General/Search.svg"]),//todo
  path: PropTypes.string,
  variant: PropTypes.string
};