import { Action, action } from "easy-peasy";
import Facility from "../../interfaces/types/facility";

export interface FacilityModel {
  items: Facility[];
  initializeFacilities: Action<FacilityModel, Facility[]>;
}

const facility: FacilityModel = {
  items: [],
  initializeFacilities: action((state, payload) => {
    state.items = payload;
  })
};

export default facility;
