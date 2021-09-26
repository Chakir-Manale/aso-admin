import {useEffect} from "react";
import {useHeader} from "../../_metronic/layout";

export const Loader = ({isLoading}) => {
  const header = useHeader();

  useEffect(()=>{
    header.setIsLoading(isLoading)
  }, [isLoading]);

  return null;
}