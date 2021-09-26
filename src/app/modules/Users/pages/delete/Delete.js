/* eslint-disable no-restricted-imports */
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {FormattedMessage} from "react-intl";
import {deleteUser, fetchUserForDelete, useUsersDeleteState} from "../../../../../redux/users";
import {AEButton} from "../../../../../_ae/components/buttons";
import {Loader} from "../../../../../_ae/components/loader";
import {EntityCard} from "../../components/EntityCard";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../_metronic/_partials/controls";

export function Delete({history, match}) {
  const dispatch = useDispatch();
  const { isLoading, data } = useUsersDeleteState()

  const id = match.params.id;


  useEffect(() => {
    dispatch(fetchUserForDelete(id));
  }, [id, dispatch]);

  const deleteEntity = () => {
    dispatch(deleteUser(id)).then(() => {
      history.goBack()
    });
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Card>
        <CardHeader className='d-flex justify-content-end'>
          <CardHeaderToolbar>
            <AEButton
              variant={'light'}
              onClick={history.goBack}
              className={'mr-3'}
            >
              <FormattedMessage id={'CANCEL'} />
            </AEButton>

            <AEButton
              variant={'danger'}
              onClick={deleteEntity}
            >
              <FormattedMessage id={'CONFIRM_DELETION'} />
            </AEButton>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          {
            ! isLoading && data.id &&
            <EntityCard
              size={'lg'}
              entity={data}
              avatar
              className="card-border border-0"
            />
          }
        </CardBody>
      </Card>
    </>

  );
}

