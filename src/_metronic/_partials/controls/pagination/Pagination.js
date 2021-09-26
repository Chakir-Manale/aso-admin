import React from "react";
import {Card, CardBody} from "../Card";
import {Pager} from "./Pager";
import {Paginator} from "./Paginator";

export function Pagination({ page, pages, total, perPage, setPage, setPerPage, isLoading, counts = [12, 24, 48, 96], pager = true, ...props}) {


  return (
    <Card {...props}>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <Paginator
            isLoading={isLoading}
            pages={pages}
            page={page}
            setPage={setPage}
          />
          {
            pager &&
            <Pager
              counts={counts}
              setPerPage={setPerPage}
              total={total}
              perPage={perPage}
            />
          }
        </div>
      </CardBody>
    </Card>
  );
}
