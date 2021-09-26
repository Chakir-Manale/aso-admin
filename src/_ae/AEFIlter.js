import React, {useState} from "react";
import {Card, CardBody} from "../_metronic/_partials/controls";
import {AEButton} from "./components/buttons";
import {AEIcon} from "./components/svg";

export const AEFilter = ({ children }) => {
  const [advancedSearch, setAdvancedSearch] = useState(true)

  return (
    <Card>
      <CardBody className="position-relative">
        <AEButton
          variant={'light-primary'}
          icon
          shadow
          size={'sm'}
          className='position-absolute top-0 right-0'
          style={{transform: 'translate(50%, 50%)'}}
          onClick={e=>{
            setAdvancedSearch(!advancedSearch)
          }}
        >
          <AEIcon
            path={`/Navigation/Up-down.svg`}
          />
        </AEButton>
        {children}
      </CardBody>
    </Card>
  )
}