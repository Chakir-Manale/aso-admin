/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect} from "react";
import clsx from "clsx";
import { Dropdown } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../_helpers";
import { useLang, setLanguage } from "../../../../i18n";
import { DropdownItemToggler } from "../../../../_partials/dropdowns";
import {AEOverlayTrigger} from "../../../../../_ae/AEOverlayTrigger";
import {languages} from "../../../../../_ae/helpers/UIHelper";
import {useIntl} from "react-intl";



export function LanguageSelectorDropdown({subheader = false}) {
  const lang = useLang();
  const {formatMessage} = useIntl();
  const currentLanguage = languages.find((x) => x.lang === lang);
  useEffect(()=>{
    const dir = currentLanguage.rtl ? "rtl" : "ltr";
    document.body.setAttribute('dir', dir);
    document.body.setAttribute('direction', dir);
    document.body.setAttribute('style', `direction: ${dir}`);
  },[currentLanguage.rtl])

  // if (languages.length > 1) {
  //   return ''
  // }

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownItemToggler}
        id="dropdown-toggle-my-cart"
        className="mb-2"
      >
        <AEOverlayTrigger
          placement={subheader ? currentLanguage.rtl ? 'right':'left' : null}
          overlay={ <Tooltip id="language-panel-tooltip">{formatMessage({id:'CHANGE_LANGUAGE'})}</Tooltip> }
        >
          <div className="btn btn-icon btn-clean btn-lg">
            <img
              className="w-25px h-25px rounded"
              src={currentLanguage.flag}
              alt={currentLanguage.name}
            />
          </div>
        </AEOverlayTrigger>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-left">
        <ul className="navi navi-hover py-4">
          {languages.map((language) => (
            <li
              key={language.lang}
              className={clsx("navi-item", {
                active: language.lang === currentLanguage.lang,
              })}
            >
              <a
                href="#"
                onClick={() => setLanguage(language.lang, language.rtl)}
                className="navi-link"
              >
                <span className="symbol symbol-20 mr-3">
                  <img src={language.flag} alt={formatMessage({id:`LANG.${language.lang.toUpperCase()}`})} />
                </span>
                <span className="navi-text">{formatMessage({id:`LANG.${language.lang.toUpperCase()}`})}</span>
              </a>
            </li>
          ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}
