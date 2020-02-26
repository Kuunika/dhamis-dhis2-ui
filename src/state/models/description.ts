import { Action, action } from "easy-peasy";
import Clearable from "../../interfaces/types/clearable";

export interface DescriptionModel extends Clearable<DescriptionModel> {
  text: string;
  setDescription: Action<DescriptionModel, { text: string }>;
}

const description: DescriptionModel = {
  text: "",
  setDescription: action((state, payload) => {
    state.text = payload.text;
  }),
  clear: action(state => {
    state.text = "";
  })
};

export default description;
