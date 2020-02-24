import { Action, action } from "easy-peasy";
import Period from "../../interfaces/types/period";
import Clearable from "../../interfaces/types/clearable";
export interface PeriodModel extends Clearable<PeriodModel> {
  period: Period;
  updateYear: Action<PeriodModel, string>;
  updateQuarter: Action<PeriodModel, string>;
  initializePeriod: Action<PeriodModel, Period>;
}

const years: string[] = [""];
const [currentYear] = years;
const quarters = ["1", "2", "3", "4"];
const [currentQuarter] = quarters;

const period: PeriodModel = {
  period: {
    currentYear,
    currentQuarter,
    years,
    uiQuarters: quarters,
    quarters: []
  },
  updateYear: action((state, payload) => {
    state.period.currentYear = payload;
  }),
  updateQuarter: action((state, payload) => {
    state.period.currentQuarter = payload;
  }),
  initializePeriod: action((state, payload) => {
    state.period = payload;
    state.period.years = state.period.years.filter(
      year => parseInt(year) < new Date().getFullYear() + 1
    );
  }),
  clear: action(state => {
    state.period.currentQuarter = quarters[0];
    state.period.currentYear = state.period.years[0];
  })
};

export default period;
