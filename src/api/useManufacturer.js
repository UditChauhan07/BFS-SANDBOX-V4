import { DestoryAuth, originAPi } from "../lib/store";
import { useFetch } from "./useFetch";

export const useManufacturer = () => {
  const manufacturers = useFetch(
    originAPi+"/beauty/v3/yRNGIO",
    {
      method: "POST",
    }
  );
  if(manufacturers.status==300){
    DestoryAuth();
  }
  return manufacturers;
};
