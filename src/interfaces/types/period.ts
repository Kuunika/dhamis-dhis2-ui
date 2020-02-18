import Quarter from "./quarter";

interface Period {
  years: string[];
  quarters: Quarter[];
  uiQuarters: string[];
  currentYear: string;
  currentQuarter: string;
}

export default Period;
