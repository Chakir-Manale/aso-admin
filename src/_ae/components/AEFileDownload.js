import React from "react";
import {toAbsoluteApiUrl, toAbsoluteUploadUrl, toAbsoluteUrl} from "../../_metronic/_helpers";
import {AEIcon} from "./svg";
import axios from "axios";
import {AETruncate} from "../helpers/UIHelper";

export const AEFileDownload = ({target = '', id,  fileName, length = 100 }) => {

  const i = fileName.lastIndexOf('.');
  const name = fileName.substr(0, i);
  const ext = fileName.substr(i + 1);

  const iconMap = {
    'image': ['png', 'jpg', 'jpeg', 'svg'],
    'document': ['txt'],
    'doc': ['doc', 'docx'],
    'pdf': ['pdf'],
    'css': ['css'],
    'csv': ['csv'],
    'html': ['html'],
    'javascript': ['javascript'],
    'mp4': ['mp4'],
    'xml': ['xml'],
    'zip': ['zip', 'rar', '7zip'],
  }

  const getIconName = (ext) => {
    let iconName = 'unknown';
    Object.keys(iconMap).forEach((key) => {
      if (iconMap[key].includes(ext)) return iconName = key;
    })

    return iconName;
  }

  // console.log(ext, getIconName(ext))

  return (
    <span className="label label-white border label-inline label-xl mb-2 mr-2">
      <AEIcon prefix={'files'} path={`/${getIconName(ext)}.svg`} className={'pr-2'}/>
      <span dir={'ltr'}>
        <AETruncate text={name} length={length - ext.length}/>
        {`.${ext}`}
      </span>
      <a
        href={toAbsoluteUploadUrl(`/${target}/${fileName}`)}
        className={"pl-5"}
        download
        target='_blank'
        onClick={e => {
          e.preventDefault();
          axios.get(
            toAbsoluteApiUrl(`/${target}/${id}/download`), {responseType: 'blob'})
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', fileName);
              document.body.appendChild(link);
              link.click();
            });
        }}
      >
        <AEIcon path={"/Files/Download.svg"}/>
      </a>
    </span>
  )
}