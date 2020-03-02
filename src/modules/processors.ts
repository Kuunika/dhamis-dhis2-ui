import Axios from "axios";
import Facility from "../interfaces/types/facility";
import Program from "../interfaces/types/program";
import _ from "lodash";

export const processFacilities = async (
  facilities: Facility[],
  checkedPrograms: Program[],
  periodId: string
) => {
  const {
    REACT_APP_DHAMIS_API_URL = "",
    REACT_APP_DHAMIS_API_KEY = ""
  } = process.env;
  const allProgramsData: any[] = [];
  const facilityIdsArr = facilities.map(facility => facility.id);
  const chunkedidsArr = _.chunk(facilityIdsArr, 500);
  for (const chunkedIdArr of chunkedidsArr) {
    const facilityIdsStr = chunkedIdArr
      .reduce((acc, cur) => `${acc},${cur}`, "")
      .slice(1);

    for (const program of checkedPrograms) {
      try {
        const url = `${REACT_APP_DHAMIS_API_URL}/${program.value}/get/${REACT_APP_DHAMIS_API_KEY}/${periodId}/${facilityIdsStr}`;
        console.log(url);
        const response = await Axios.get(url);
        allProgramsData.push(response.data);
      } catch (e) {
        console.log(e.message);
      }
    }
  }
  return allProgramsData;
};

export const sendPayloadToInterop = async (payload: any) => {
  // TODO: this needs to go
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: true
      });
    }, 5000);
  });

  // const {
  //   REACT_APP_INTEROP_CLIENT_USERNAME = "",
  //   REACT_APP_INTEROP_CLIENT_PASSWORD = ""
  // } = process.env;

  // TODO: as we are awaiting, we need to have the loading show up somehow
  // const ilResponse = await Axios.post(
  //   `${REACT_APP_INTEROP_URL}/data-elements`,
  //   payload,
  //   {
  //     auth: {
  //       username: REACT_APP_INTEROP_CLIENT_USERNAME,
  //       password: REACT_APP_INTEROP_CLIENT_PASSWORD
  //     }
  //   }
  // );
  // console.log(ilResponse);
};
