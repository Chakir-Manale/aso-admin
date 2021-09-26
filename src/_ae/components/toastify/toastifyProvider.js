import React, {createContext, useContext, useEffect} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const ToastifyContext = createContext();
export function useToastifyContext() {
  return useContext(ToastifyContext);
}
export function ToastifyProvider({ children }) {

  return (
    <ToastifyContext.Provider value={{}}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </ToastifyContext.Provider>
  );
}
