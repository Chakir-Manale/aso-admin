import React from "react";
import {Link} from "react-router-dom";

export const AELink = ({to, children, className}) => {
  return (
    <Link to={to} className={className}>
      { children }
    </Link>
  )
}

export const AEPhone = ({value}) => {
  return (
    <a href={`tel:${value}`} >
      {value}
    </a>
  )
}

export const AEEmail = ({value, variant}) => {
  return (
    <a href={`mailto:${value}`} className={`text-${variant} text-hover-${variant}`}>
      {value}
    </a>
  )
}

export const AEUrl = ({value}) => {

  const link = value.startsWith("http://") || value.startsWith("https://")|| value.startsWith("www") ?
    value :
    `//${value}`;

  return (
    <a target='_blank' href={link} >
      {value}
    </a>
  )
}

const getClickableLink = link => {
  return link.startsWith("http://") || link.startsWith("https://") ?
    link
    : `http://${link}`;
};