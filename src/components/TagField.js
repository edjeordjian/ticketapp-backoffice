import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function TagField(props) {
  const [types, setTypes] = React.useState(props.selectableTypes);

  const [selectedValues, setSelectedValues] = React.useState([]);

  React.useEffect(() => {
    if (selectedValues.length > 0) {
      const values = types.filter((type) => selectedValues.includes(type.id));

      if (values.length > 0) {
        setSelectedValues(values);
      }
    }
  }, [selectedValues]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    props.onTypesChange(event.target.value);

    // On autofill we get a stringified value.
    setSelectedValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Categorías</InputLabel>

        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Categorías" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem key={type.id} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
