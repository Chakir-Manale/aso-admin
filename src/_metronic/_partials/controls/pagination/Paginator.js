import React from "react";
import {AEButton} from "../../../../_ae/components/buttons";
import {usePagination} from "@material-ui/lab";

const Button = ({icon = true, disabled, onClick, className, selected,...props}) => (
  <AEButton
    icon={icon}
    disabled={disabled}
    onClick={onClick}
    variant={"light"}
    variantHover={"primary"}
    size={"sm"}
    className={`${className} mr-2`}
    active={selected}
    {...props}
  />
)

export function Paginator({page, pages, setPage, isLoading}) {
  const { items } = usePagination({
    count: pages,
    // defaultPage: 5,
    page
  });
  // console.log(page)

  return (
    <div className="d-flex flex-wrap mr-3">
      {items.map(({ ...item }, index) => {
        let itemProps = {
          onClick: () =>{
            setPage(item.page)
          },
          disabled: isLoading
        };

        switch (item.type) {
          case 'start-ellipsis':
          case 'end-ellipsis':
            itemProps.children = '...';
            itemProps.disabled = true;
            break;
          case 'page':
            itemProps.children = item.page;
            break;
          case "next":
            itemProps.children = (<i className={`ki ki-bold-arrow-next icon-xs`}/>);
            break;
          case "previous":
            itemProps.children = (<i className={`ki ki-bold-arrow-back icon-xs`}/>);
            break;
          default:
            itemProps.children = item.type
            break;
        }

        return (
          <Button
            key={index}
            {...item}
            {...itemProps}
          />
        );
      })}
    </div>
  );
}
