import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {toAbsoluteUrl} from "../../_metronic/_helpers";

const example = [
  {
    title: "image 1",
    src: toAbsoluteUrl(`/media/logos/Logo.png`),
  }
]
export const AESlider = ({images = []}) => {
  // const defaultImage = toAbsoluteUrl(`/media/logos/logo-dark.png`);
  const [active, setActive] = useState(images[0]);

  if(images.length === 0) return "not image";

  return (
    <>
      <img
        className="rounded mw-100"
        src={active.src}
        alt={active.title}
      />
      <div className={"symbol-list d-flex flex-wrap"}>
        {
          images.map((image, i)=>(
            <div
              key={i}
              className="symbol symbol-50 symbol-2by3 m-1 cursor-pointer"
              onClick={() => {
                setActive(image)
              }}
            >
              <div
                className="symbol-label"
                style={{backgroundImage: `url('${image.src}'  )`}}
              />
            </div>
          ))
        }
      </div>
    </>
  )
}