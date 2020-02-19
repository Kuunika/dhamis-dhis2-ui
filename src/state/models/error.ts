import { Action, action } from "easy-peasy";

export interface ErrorModel {
  items: string[];
  showErrors: boolean;
  setShowErrors: Action<ErrorModel, boolean>;
  clear: Action<ErrorModel, void>;
  add: Action<ErrorModel, string>;
}

const error: ErrorModel = {
  items: [],
  showErrors: false,
  add: action((state, payload) => {
    const { items } = state;
    state.items = [...items, payload];
  }),
  clear: action(state => {
    state.items = [];
    state.showErrors = false;
  }),
  setShowErrors: action((state, payload) => {
    state.showErrors = payload;
  })
};

export default error;
