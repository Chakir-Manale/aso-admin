import {useState} from "react";
import {localField} from "./helpers/UIHelper";

export class AEMetadata {
  constructor( pagination = {}, sort = {}, filters = {}, columns = {'*':[]}, id= "id") {
    const { page = 1, pages = 0, perPage = 10, total = 0} = pagination;
    const { field = 'id', asc = true} = sort;
    this.pagination = { page, pages, perPage, total };
    this.sort = { field, asc };
    this.filters = filters;

    this.columns = columns;
    this.id = id;
  }
  get toJson () {

    return ()=>({
      pagination: this.pagination,
      sort: this.sort,
      filters: this.filters,
      columns: this.columns,
    })
  }
}

//todo remove
export function useMetadata(metadata = new AEMetadata()) {
  // console.log('eee',metadata)
  const [state, setState] = useState(metadata);

  const {pagination:{pages, page, total, perPage}, sort:{field, asc}, filters:{search, createdAt, updatedAt}, columns} = state;

  // setPages,
  const setPages = (pages) =>{
    setState({...state, pagination:{...state.pagination, pages}});
  }
  const setPerPage = perPage =>{
    setState({...state, pagination:{...state.pagination, perPage}});
  }
  const setTotal = total =>{
    setState({...state, pagination:{...state.pagination, total}});
  }
  const setSortField = field =>{
    setState({...state, sort:{...state.sort, field}});
  }
  const setSort = (field = 'id',asc=true) =>{
    setState({...state, sort:{field, asc}});
  }
  const setSortAsc = asc =>{
    setState({...state, sort:{...state.sort, asc}});
  }
  const setFilters = filters =>{
    setState({...state, filters});
  }
  const setSearch = search =>{
    setState({...state, filters:{...state.filters, search}});
  }

  const setCreatedAt = createdAt =>{
    setState({...state, filters:{...state.filters, createdAt}});
  }

  const setColumns = columns =>{
    setState({...state, columns});
  }

  const to = (_page)=>{
    switch (true){
      case _page === page : return;

      case _page < 1 : first(); break;
      case _page > pages : last(); break;

      default: setState({...state, pagination:{...state.pagination, page: _page}});
    }
  }
  const first = ()=>{ to(1) }
  const last = ()=>{ to(state.pagination.pages) }
  const next = ()=>{ to(state.pagination.page+1); }
  const prev = ()=>{ to(state.pagination.page-1); }
  const serialize = ()=>{
    // console.log()
    return new AEMetadata(
      {page,perPage,total,pages},
      {field, asc},
      {search, createdAt, updatedAt, ...state.filters},
      columns
    )
  }


  return {
    meta: state, setMeta : setState,
    page: state.pagination.page,
    pages: state.pagination.pages,
    perPage: state.pagination.perPage,
    total: state.pagination.total,
    sortField: state.sort.field,
    sortAsc: state.sort.asc,
    filters: state.filters,
    sort: state.sort,
    columns: state.columns,
    first,
    last,
    next,
    prev,
    to,
    serialize,
    setPages,
    setPerPage,
    setTotal,
    setSort,
    setSortField,
    setSortAsc,
    setFilters,
    setSearch,
    setCreatedAt,
    setColumns
  }
}