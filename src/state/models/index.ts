import program, { ProgramModel } from "./program";
import period, { PeriodModel } from "./period";
import description, { DescriptionModel } from "./description";
import facility, { FacilityModel } from "./facility";

export interface StoreModel {
  program: ProgramModel;
  period: PeriodModel;
  description: DescriptionModel;
  facility: FacilityModel;
}

const model: StoreModel = {
  program,
  period,
  description,
  facility
};

export default model;
