import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "moment/locale/es";

export default function BasicDatePicker(props) {
  moment.locale("es");

  let oldDateFormated;

  const handleDateChange = (givenDate) => {
    props.setSelectedDate(givenDate);
  };

  if (props.oldDate) {
    oldDateFormated = moment(props.oldDate);
  } else {
    return (
        <p>Cargando</p>
    );
  }

  return (
      <LocalizationProvider dateAdapter={AdapterMoment}
                            locale={moment.locale()}>
        <DatePicker label={props.label}
                    onChange={handleDateChange}
                    value={oldDateFormated}/>
      </LocalizationProvider>
  );
}
