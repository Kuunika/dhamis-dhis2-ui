import { Action, action } from "easy-peasy";

export interface DescriptionModel {
  text: string;
  setDescription: Action<DescriptionModel, { text: string }>;
}

const description: DescriptionModel = {
  text: "Description right??",
  setDescription: action((state, payload) => {
    state.text = payload.text;
  })
};

export default description;
