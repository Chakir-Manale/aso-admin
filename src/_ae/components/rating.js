import React from "react";
import PropTypes from 'prop-types';
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import {AEIcon} from "./svg";
import {getArrayOfNumbers} from "../helpers/UIHelper";


/* TODO
*   list all icons
*   icon classes
* */


export const AERating = ({ value = 0, ...props}) =>{

  return (
    <div>
      {
        getArrayOfNumbers(5)
          .map(number=>(
            <AEIcon
              key={number}
              variant={number <= value+(Number.isInteger(value) ? 0 : 1) ? 'warning' : 'light'}
              path={`/General/${!Number.isInteger(value) && number-1 === parseInt(value) ? 'Half-star' : 'Star'}.svg`}
              // path={`/General/Star.svg`}
            />
          ))
      }
    </div>
  )
}
AERating.propTypes = {
  // path: PropTypes.string
};