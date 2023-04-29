import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "moment/locale/es";

export default function BasicDatePicker(props) {
  moment.locale("es");

  const handleDateChange = (givenDate) => {
    props.setSelectedDate(givenDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale()}>
      <DatePicker label="Elija una fecha" onChange={handleDateChange} />
    </LocalizationProvider>
  );
}
