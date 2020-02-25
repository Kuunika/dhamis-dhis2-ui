import { Action } from "easy-peasy";
export default interface Clearable<T extends Object> {
  clear: Action<T, void>;
}
