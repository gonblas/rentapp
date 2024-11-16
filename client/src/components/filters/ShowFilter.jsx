import React from "react"
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material"

function ShowFilter({
  name,
  label,
  type,
  filters,
  handleOnChange,
  options = [],
}) {
  switch (type) {
    case "checkbox":
      return (
        <FormControlLabel
          id={name}
          control={
            <Checkbox
              checked={filters[name]}
              onChange={handleOnChange}
              name={name}
            />
          }
          label={label}
          labelPlacement="end"
        />
      )

    case "select":
      return (
        <FormControl>
          <FormLabel htmlFor={name} color="black">
            {label}
          </FormLabel>
          <Select
            id={name}
            name={name}
            value={filters[name] || ""}
            onChange={handleOnChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Seleccionar...</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )

    case "number":
      return (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <TextField
            id={name}
            name={name}
            type="number"
            value={filters[name]}
            onChange={handleOnChange}
            slotProps={{ min: 1 }}
          />
        </FormControl>
      )

    case "text":
      return (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <TextField
            id={name}
            name={name}
            type="text"
            value={filters[name]}
            onChange={handleOnChange}
          />
        </FormControl>
      )

    case "multiselect":
      return (
        <FormControl>
          <FormLabel htmlFor={name} color="black">
            {label}
          </FormLabel>
          <div>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={filters[name]?.includes(option.value) || false}
                    onChange={handleOnChange}
                    name={name}
                    value={option.value} // Ensure the checkbox sends the correct value
                  />
                }
                label={option.label}
              />
            ))}
          </div>
        </FormControl>
      )

    default:
      return null
  }
}

export default ShowFilter
