import {useState} from "react";

export const useModal = () => { //todo Move outside module
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  return {
    open, id,
    openModal: (id) => {
      setId(id);
      setOpen(true);
    },
    closeModal: () => {
      setId(null);
      setOpen(false);
    },
  }
}