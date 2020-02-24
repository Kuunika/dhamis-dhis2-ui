import { Action, Computed, computed, action } from "easy-peasy";

export enum Initializer {
  FACILITIES,
  PERIOD
}

export interface AppModel {
  facilitiesInitialized: boolean;
  periodInitialized: boolean;
  isMigrating: boolean;
  appInitialized: Computed<AppModel, boolean>;
  init: Action<AppModel, Initializer>;
  setMigrating: Action<AppModel, boolean>;
}

const app: AppModel = {
  facilitiesInitialized: false,
  periodInitialized: false,
  isMigrating: false,
  appInitialized: computed(state => {
    const { facilitiesInitialized, periodInitialized } = state;
    return facilitiesInitialized && periodInitialized;
  }),
  init: action((state, payload) => {
    switch (payload) {
      case Initializer.FACILITIES:
        state.facilitiesInitialized = true;
        break;
      case Initializer.PERIOD:
        state.periodInitialized = true;
        break;
    }
  }),
  setMigrating: action((state, payload) => {
    state.isMigrating = payload;
  })
};

export default app;
