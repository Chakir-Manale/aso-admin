import React, {useState} from "react";
import {Card, CardBody} from "../../../../../../_metronic/_partials/controls";
import {Formik} from "formik";
import {Form} from "./Form";
import {AEIcon} from "../../../../../../_ae/components/svg";
import {AEButton} from "../../../../../../_ae/components/buttons";
import {usePostsState} from "../../../../../../redux/posts";

export const Filter = ({ }) => {
  const [advancedSearch, setAdvancedSearch] = useState(true)
  const {metadata: {filters}} = usePostsState();

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
        <Formik
          initialValues={filters}
          onSubmit={() => {}}
        >
          {
            (formik)=>(
              <Form
                formik={formik}
                advancedSearch={advancedSearch}
              />
            )
          }
        </Formik>
      </CardBody>
    </Card>
  )
}