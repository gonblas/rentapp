import React from "react"
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  Slider,
} from "@mui/material"

function ShowFilter({
  name,
  label,
  type,
  filters,
  setFilters,
  scope,
  options = {},
}) {
  const handleOnChange = (event) => {
    const { name, value, type, checked } = event.target

    // Handle zero values and set them to null
    const newValue = type === "checkbox" ? checked : value
    const finalValue = newValue === "0" || newValue === 0 ? null : newValue

    setFilters((prevFilters) => ({
      ...prevFilters,
      [scope]: {
        ...prevFilters[scope],
        [name]: finalValue, // Update the specific field with null if it's 0
      },
    }))
  }

  const handleSliderChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [scope]: {
        ...prevFilters[scope],
        [`min${name}`]: newValue[0] === 0 ? null : newValue[0], // Set to null if zero
        [`max${name}`]: newValue[1] === 0 ? null : newValue[1], // Set to null if zero
      },
    }))
  }

  switch (type) {
    case "checkbox":
      return (
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters[scope][name] || false}
                onChange={handleOnChange}
                name={name}
              />
            }
            label={label}
          />
        </FormControl>
      )

    case "text":
      return (
        <FormControl>
          <FormLabel htmlFor={name} color="black">
            {label}
          </FormLabel>
          <TextField
            id={name}
            name={name}
            value={filters[scope][name] || ""}
            onChange={handleOnChange}
          />
        </FormControl>
      )

    case "number":
      return (
        <FormControl>
          <FormLabel htmlFor={name} color="black">
            {label}
          </FormLabel>
          <TextField
            id={name}
            name={name}
            type="number"
            value={filters[scope][name] || ""}
            onChange={handleOnChange}
            // slotProps={htmlInput:{min="0"}}
            slotProps={{ htmlInput: { min: "0" } }}
          />
        </FormControl>
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
            value={filters[scope][name] || ""}
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
                    checked={
                      filters[scope][name]?.includes(option.value) || false
                    }
                    onChange={(event) => {
                      const { checked } = event.target
                      setFilters((prevFilters) => ({
                        ...prevFilters,
                        [scope]: {
                          ...prevFilters[scope],
                          [name]: checked
                            ? [
                                ...(prevFilters[scope][name] || []),
                                option.value,
                              ]
                            : prevFilters[scope][name].filter(
                                (item) => item !== option.value,
                              ),
                        },
                      }))
                    }}
                    name={name}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </div>
        </FormControl>
      )

    case "slider":
      return (
        <FormControl>
          <FormLabel htmlFor={name} color="black">
            {label}
          </FormLabel>
          <Slider
            value={[
              filters[scope][`min${name}`] || options?.min || 0,
              filters[scope][`max${name}`] || options?.max || 100,
            ]}
            onChange={handleSliderChange}
            min={options?.min || 0}
            max={options?.max || 100}
            step={options?.step || 1}
            valueLabelDisplay="auto"
            sx={{ color: "primary.dark", width: "300px" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Min"
              type="number"
              value={filters[scope][`min${name}`] || ""}
              onChange={(e) => {
                const minValue = Number(e.target.value)
                const clampedMin = Math.min(
                  minValue,
                  filters[scope][`max${name}`] || options?.max || 100,
                )
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [scope]: {
                    ...prevFilters[scope],
                    [`min${name}`]: clampedMin === 0 ? null : clampedMin, // Set to null if zero
                  },
                }))
              }}
              sx={{ width: "100px" }}
            />
            <TextField
              label="Max"
              type="number"
              value={filters[scope][`max${name}`] || ""}
              onChange={(e) => {
                const maxValue = Number(e.target.value)
                // Enforce max value constraint
                const maxLimit = options?.max || 500000 // Default to 500000 if not provided
                const clampedMax = Math.min(maxValue, maxLimit) // Ensure the max value does not exceed the slider's max
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  [scope]: {
                    ...prevFilters[scope],
                    [`max${name}`]: clampedMax === 0 ? null : clampedMax, // Set to null if zero
                  },
                }))
              }}
              sx={{ width: "100px" }}
            />
          </div>
        </FormControl>
      )

    default:
      return null
  }
}

export default ShowFilter
