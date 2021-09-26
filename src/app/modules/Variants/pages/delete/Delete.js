/* eslint-disable no-restricted-imports */
import React, {useEffect} from "react";
import {Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useIntl} from "react-intl";
import {deleteVariant, fetchVariantForDelete, useVariantsDeleteState} from "../../../../../redux/variants";
import {AEButton} from "../../../../../_ae/components/buttons";
import {Loader} from "../../../../../_ae/components/loader";
import {EntityCard} from "../../components/EntityCard";

export function Delete({history, match}) {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const { isLoading, data } = useVariantsDeleteState()

  const id = match.params.id;
  const onHide = ()=>{
    history.goBack()
  }

  useEffect(() => {
    dispatch(fetchVariantForDelete(id));
  }, [id, dispatch]);

  const deleteEntity = () => {
    dispatch(deleteVariant(id)).then(() => {
      onHide();
    });
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Modal.Dialog
        className={'max-w-100'}
      >
        <Modal.Body>
          {!isLoading && data && (
            <EntityCard
              entity={data}
              className="mb-0 card-border"
              size={'lg'}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <AEButton
            variant={'light'}
            onClick={onHide}
          >
            {formatMessage({id:'CANCEL'})}
          </AEButton>

          <AEButton
            variant={'warning'}
            onClick={deleteEntity}
          >
            {formatMessage({id:'CONFIRM_DELETION'})}
          </AEButton>
        </Modal.Footer>
      </Modal.Dialog>
    </>

  );
}

