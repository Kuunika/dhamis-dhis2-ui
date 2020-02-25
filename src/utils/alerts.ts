import Swal from "sweetalert2";
import Period from "../interfaces/types/period";

export const confirmMigrationAlert = (
  migrate: Function,
  programsText: string,
  periodState: Period
) => {
  Swal.fire({
    title: "Confirm Migration",
    html: `
        <div style="margin: 0;">
          <h5 style="margin: 0;">Programs: </h5>
          ${programsText}
          <h5>Period</h5>
          ${periodState.currentYear} Quarter ${periodState.currentQuarter}
        </div>
      `,
    confirmButtonColor: "#2196f3",
    confirmButtonText: "Yes, Migrate",
    showCancelButton: true,
    cancelButtonColor: "#d33"
  }).then(result => {
    if (result.value) {
      migrate();
    }
  });
};

export const migrationInitiatedAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Migration Initiated",
    text: "An email will be sent once the migration has finished",
    confirmButtonColor: "#2196f3",
    confirmButtonText: "okay"
  }).then(result => {
    if (result.value) {
      // TODO: push the client to the ADX console
    }
  });
  Swal.fire(
    "Migration Initiated",
    "An email will be sent once the migration has finished",
    "success"
  );
};
