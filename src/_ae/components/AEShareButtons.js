import React from "react";
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookShareCount} from "react-share";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
export const AEShareButtons = ({pathname, facebook = false, twitter = false, linkedin = false})=>{
  const url = toAbsoluteUrl(pathname)
  // const url = "https://www.google.com"
  return (
    <>
      {
        facebook &&
          <FacebookShareButton url={url} className={'mx-2 btn btn-icon btn-light-facebook'} resetButtonStyle={false}>
            {/*<AEButton variant={"light-facebook"} icon>*/}
              <i className="socicon-facebook"/>
            {/*</AEButton>*/}
          </FacebookShareButton>
      }
      {
        twitter &&
        <TwitterShareButton url={url} className={'mx-2 btn btn-icon btn-light-twitter'} resetButtonStyle={false}>
          {/*<AEButton variant={"light-twitter"} icon>*/}
            <i className="socicon-twitter"/>
          {/*</AEButton>*/}
        </TwitterShareButton>
      }

      {
        twitter &&
        <LinkedinShareButton url={url} className={'mx-2 btn btn-icon btn-light-linkedin'} resetButtonStyle={false}>
          {/*<AEButton variant={"light-linkedin"} icon>*/}
            <i className="socicon-linkedin"/>
          {/*</AEButton>*/}
        </LinkedinShareButton>
      }

    </>
  )
}
