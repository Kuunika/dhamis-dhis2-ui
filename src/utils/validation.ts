import Program from "../interfaces/types/program";
import Period from "../interfaces/types/period";

export const validatePeriod = (period: Period): boolean => {
  const { currentQuarter, currentYear } = period;
  return (
    currentQuarter !== "0" &&
    currentQuarter !== "" &&
    currentYear !== "0" &&
    currentYear !== ""
  );
};

export const validatePrograms = (programs: Program[]): boolean => {
  return programs.filter(program => program.checked).length > 0;
};

export const validateDescription = (text: string): boolean => {
  return text.length >= 5;
};
