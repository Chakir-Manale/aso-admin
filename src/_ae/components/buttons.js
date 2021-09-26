import React from "react";
import PropTypes from 'prop-types';



export const AEButton = ({
                           type= "button", variant = "primary", round,  size,  block=false, active=false, shadow = false, fontWeight = "bold",
                           icon = false,
                           variantHover, children,
                           className,
  ...props
                         }) =>{
  // const {
  //   type="button", variant = "primary", round = "pill",  size,  block=false, active=false, shadow = false, fontWeight = "normal",
  //   icon = false,
  //   variantHover, className = "", children,
  // } = props;
  className = `btn btn-${variant} font-weight-${fontWeight} ${className}`


  if(variantHover) className += ` btn-hover-${variantHover}`;
  if(size) className += ` btn-${size}`;
  if(block) className += ` btn-block`;
  if(icon) className += ` btn-icon`;
  if(round) className += ` btn-${round}`;
  if(active) className += ` active`;
  if(shadow) className += ` shadow`;


  // console.log(props)
  return (
    <button
      type={type}
      className={className}
      onMouseDown={props.onMouseDown}
      onClick={props.onClick}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  )
}
AEButton.propTypes = {
  variant: PropTypes.oneOf([
    "default","white","dark", 'clean',
    "light-facebook","light-twitter","light-linkedin",
    "primary", "secondary", "success", "danger", "info", "warning","light",
    "link", "link-primary", "link-secondary", "link-success", "link-danger", "link-info", "link-warning","link-light",
    "light-primary", "light-secondary", "light-success", "light-danger", "light-info", "light-warning",
    "outline-primary", "outline-secondary", "outline-success", "outline-danger", "outline-info", "outline-warning",
    "transparent-primary", "transparent-secondary", "transparent-success", "transparent-danger", "transparent-info", "transparent-warning",

  ]),
  variantHover: PropTypes.oneOf([
    "default","white", "primary", "secondary", "success", "danger", "info", "warning","light",
    // "light-primary", "light-secondary", "light-success", "light-danger", "light-info", "light-warning",
    // "outline-primary", "outline-secondary", "outline-success", "outline-danger", "outline-info", "outline-warning",
    // "transparent-primary", "transparent-secondary", "transparent-success", "transparent-danger", "transparent-info", "transparent-warning",

  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  fontWeight: PropTypes.oneOf(["lighter", "light", "normal", "bold", "bolder", "boldest"]),
  round: PropTypes.oneOf(["pill", "square"]),
  block: PropTypes.bool,
  className: PropTypes.string,
};