import {createSlice} from "@reduxjs/toolkit";
import {shallowEqual, useSelector} from "react-redux";
import {HTTP_NOT_ACCEPTABLE} from "../_ae/helpers/AxiosHelpers";
import {getIntlMessage} from "../_metronic/i18n";

export const getSlice = ({name, metadata, data}) => {
  const isArray = data instanceof Array;

  const initialState = {
    initialData: data,
    data,
    isLoading: false,
    error: null
  }

  if (metadata && data instanceof Array) {
    initialState.metadata = metadata
  }

  return createSlice({
    name,
    initialState,
    reducers: {
      startCall: (state, action) => {
        state.error = null;
        state.isLoading = true;
      },
      endCall: (state, action) => {
        state.isLoading = false;
      },
      catchError: (state, {payload}) => {
        const {status, data} = payload.response;
        switch (status) {
          case HTTP_NOT_ACCEPTABLE:
            state.error = {};
            data.forEach(({message:id, propertyPath: path})=>{
              state.error[path] = getIntlMessage({id}, {path})
            });
            break;

        }
      },
      reset: (state, action) => {
        state.data = data;
      },
      fetched: (state, action) => {
        const {entities, meta} = action.payload.data;

        state.error = {};

        state.data = entities ? entities : action.payload.data;

        switch (true) {
          case isArray:
            if (metadata && meta) {

              const {total, pages, page} = meta.pagination;

              state.metadata.pagination.total = total;
              state.metadata.pagination.pages = pages;
              state.metadata.pagination.page = page;
            }
            break;
        }
      },
      setPage:(state, {payload: page}) => {
        state.metadata.pagination.page = page
      },
      setPerPage:(state, {payload: perPage}) => {
        state.metadata.pagination.perPage = perPage
      },
      setSortField:(state, {payload: field}) => {
        state.metadata.sort.field = field
      },
      setSortAsc:(state, {payload: asc}) => {
        state.metadata.sort.asc = asc
      },
      setFilters:(state, {payload: filters}) => {
        state.metadata.filters = filters
      },
    }
  });
}

export const useCustomSelector = (sliceName) => {
  return useSelector(s=>s[sliceName], shallowEqual)
}