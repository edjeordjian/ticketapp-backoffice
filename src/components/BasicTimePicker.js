import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";

export default function BasicTimePicker(props) {
  const handleTimeChange = (newTime) => {
    props.setSelectedTime(newTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker label="Elija una hora" onChange={handleTimeChange} />
    </LocalizationProvider>
  );
}
