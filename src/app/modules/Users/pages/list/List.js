import React, {useEffect} from "react";
import {Pagination} from "../../../../../_metronic/_partials/controls";
import {useDispatch} from "react-redux";
import {EntityCard} from "../../components/EntityCard";
import {Filter} from "./Filter/Filter";
import {fetchUsers, usersListActions, useUsersListState} from "../../../../../redux/users";
import {Loader} from "../../../../../_ae/components/loader";

export const List = () => {
  const dispatch = useDispatch();
  const {data, isLoading, metadata} = useUsersListState();
  const {pagination, filters, sort} = metadata;
  const {setPage, setPerPage} = usersListActions;

  useEffect(()=>{
    dispatch(fetchUsers(metadata));
  }, [
    pagination.page, pagination.perPage, sort.field, sort.asc,
    filters.search, filters.role,
  ])

  return (
    <>
      <Loader isLoading={isLoading} />
      <Filter />
      <div className={'row'}>
        {
          data.map(r=>(
            <div key={r.id} className={'col-sm-6 col-md-6 col-lg-6 col-xxl-4'}>
              <EntityCard
                key={r.id}
                entity={r}
                size={'lg'}
                className={'card-stretch'}
                avatar
                editAction
                deleteAction
              />
            </div>
          ))
        }
      </div>


      <Pagination
        total={metadata.pagination.total}
        perPage={metadata.pagination.perPage}
        page={metadata.pagination.page}
        pages={metadata.pagination.pages}
        setPage={(page)=>{
          dispatch(setPage(page))
        }}
        setPerPage={(perPage)=>{
          dispatch(setPerPage(perPage))
        }}
        counts={[12, 24, 48, 96]}
      />
    </>
  );
}
