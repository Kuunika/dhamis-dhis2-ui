import program, { ProgramModel } from "./program";
import period, { PeriodModel } from "./period";
import description, { DescriptionModel } from "./description";
import facility, { FacilityModel } from "./facility";
import error, { ErrorModel } from "./error";

export interface StoreModel {
  program: ProgramModel;
  period: PeriodModel;
  description: DescriptionModel;
  facility: FacilityModel;
  error: ErrorModel;
}

const model: StoreModel = {
  program,
  period,
  description,
  facility,
  error
};

export default model;
