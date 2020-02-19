import Program from "../interfaces/types/program";
import Period from "../interfaces/types/period";

export const validatePeriod = (period: Period): boolean => {
  return (
    period.currentQuarter !== "0" &&
    period.currentQuarter !== "" &&
    period.currentYear !== "0" &&
    period.currentYear !== ""
  );
};

export const validatePrograms = (programs: Program[]): boolean => {
  return programs.filter(program => program.checked).length > 0;
};

export const validateDescription = (text: string): boolean => {
  return text.length >= 5;
};
