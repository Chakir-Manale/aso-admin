import React from "react";
import {localField} from "../helpers/UIHelper";

export const AELabel = ({title, variant, size = 'md', children, className, ...props}) => (
  <span className={`label label-${size} label-inline label-${variant} m-1 font-weight-bold ${className}`} {...props}>
    {title}
    {children}
  </span>
)

export const AELabels = ({options, limit = 2, variant = 'light', size}) => (
  <div>
    {
      options
        .slice(0, limit)
        .map(options => (
          <AELabel key={options.id} title={options[localField()]} variant={variant} size={size}/>
        ))
    }
    {
      options.length > limit &&
      <AELabel title={'+' + options.length} variant={variant}/>
    }
  </div>
)