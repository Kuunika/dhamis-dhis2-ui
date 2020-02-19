import { Action, action } from "easy-peasy";
import Program from "../../interfaces/types/program";

export interface ProgramModel {
  items: Program[];
  allProgramsChecked: boolean;
  toggleAllProgramsSelected: Action<ProgramModel, void>;
  setAllProgramsChecked: Action<ProgramModel, boolean>;
  setChecked: Action<ProgramModel, number>;
}

const program: ProgramModel = {
  items: [
    { name: "ART Clinic", value: "artclinic", checked: false },
    { name: "HCC", value: "hivcareclinic", checked: false },
    {
      name: "Primary and Secondary Outcomes",
      value: "artoutcomesprimarysecondary",
      checked: false
    }
  ],
  allProgramsChecked: false,
  setChecked: action((state, payload) => {
    const programChecked = state.items[payload].checked;
    state.items[payload].checked = !programChecked;
  }),
  toggleAllProgramsSelected: action((state, payload) => {
    state.allProgramsChecked = !state.allProgramsChecked;
    const checked = state.allProgramsChecked;
    state.items = state.items.map(item => ({
      ...item,
      checked
    }));
  }),
  setAllProgramsChecked: action((state, payload) => {
    state.allProgramsChecked = payload;
  })
};

export default program;
