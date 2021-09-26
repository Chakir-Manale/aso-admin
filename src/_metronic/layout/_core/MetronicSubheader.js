import React, {createContext, useState, useContext} from "react";
import {SITE_NAME} from "../../../_ae/helpers/UIHelper";

export function getBreadcrumbsAndTitle(menuId, pathName) {
  const result = {
    breadcrumbs: [],
    title: ""
  };
  const menu = document.getElementById(menuId);
  if (!menu) {
    return result;
  }
  // console.log(menu, result)

  const activeLinksArray = Array.from(menu.getElementsByClassName("active") || []);
  const activeLinks = activeLinksArray.filter(el => el.tagName === "A");
  if (!activeLinks) {
    return result;
  }


  activeLinks.forEach(link => {
    const titleSpans = link.getElementsByClassName("menu-text");

    if (titleSpans) {
      const titleSpan = Array.from(titleSpans).find(t => t.innerHTML && t.innerHTML.trim().length > 0);
      if (titleSpan) {
        result.breadcrumbs.push(
            {
              pathname: link.pathname,
              title: titleSpan.innerHTML
            }
        );
      }
    }
  });
  result.title = getTitle(result.breadcrumbs, pathName);
  return result;
}

export function getTitle(breadCrumbs, pathname) {
  if (!breadCrumbs || !pathname) {
    return "";
  }

  const length = breadCrumbs.length;
  if (!length) {
    return "";
  }

  return breadCrumbs[length - 1].title;
}

const SubheaderContext = createContext();

export function useHeader() {
  return useContext(SubheaderContext);
}

// export const SubheaderConsumer = SubheaderContext.Consumer;

export function HeaderProvider({ children }) {
  const [context, setContext] = useState('SITE_NAME');
  const [contextPathname, setContextPathname] = useState('/');
  const [title, setTitle] = useState('SITE_NAME');
  const [titlePathname, setTitlePathname] = useState('SITE_NAME');
  const [isLoading, setIsLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [toolbarActions, setToolbarActions] = useState([]);
  const [actions, setActions] = useState([]);
  /*
  *
  {
    title:"CREATE_NEW",
    pathname: '',
    svg:"/Navigation/Plus.svg",
    variant:'primary',
    accept:[]
  }
  *
  * */


  const value = {
    // context, contextPathname, setContext, setContextPathname,
    // title, setTitle, titlePathname, setTitlePathname,
    isLoading, setIsLoading,
    breadcrumbs,  setBreadcrumbs,
    toolbarActions, setToolbarActions,
    actions, setActions
  };

  return <SubheaderContext.Provider value={value}>{children}</SubheaderContext.Provider>;
}
