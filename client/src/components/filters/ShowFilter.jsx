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

function ShowFilter({ name, label, type, filters, setFilters, options = {} }) {
  const handleOnChange = (event) => {
    const { name, value, checked } = event.target

    if (name === "services") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        services: checked
          ? [...prevFilters.services, value]
          : prevFilters.services.filter((service) => service !== value),
      }))
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }))
    }
  }

  const handleSliderChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }))
  }

  switch (type) {
    case "checkbox":
      return (
        <FormControl>
          <FormLabel htmlFor={name} color="black">
            {label}
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters[name] || false}
                onChange={handleOnChange}
                name={name}
                slotProps={{ checked: filters[name] || false }}
              />
            }
            label={label}
            labelPlacement="end"
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
            value={filters[name]}
            onChange={handleOnChange}
            slotProps={{
              input: { value: filters[name], onChange: handleOnChange },
            }}
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
            value={filters[name] || ""}
            onChange={handleOnChange}
            displayEmpty
            slotProps={{
              select: { value: filters[name] || "", onChange: handleOnChange },
            }}
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
          <FormLabel htmlFor={name} color="black">
            {label}
          </FormLabel>
          <TextField
            id={name}
            name={name}
            type="number"
            value={filters[name]}
            onChange={handleOnChange}
            slotProps={{
              htmlInput: {
                min: options?.min || 0,
                max: options?.max || 100,
              },
            }}
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
                    value={option.value}
                    slotProps={{
                      checked: filters[name]?.includes(option.value) || false,
                    }}
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
            value={filters[name] || 0}
            onChange={handleSliderChange}
            name={name}
            min={options?.min || 0}
            max={options?.max || 100}
            step={options?.step || 1}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => value}
            sx={{
              color: "primary.dark", // Set the color of the slider to primary.dark
              width: "300px", // Custom width for the slider
            }}
          />
          <TextField
            type="number"
            value={filters[name] || 0}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, [name]: e.target.value }))
            }
            slotProps={{
              htmlInput: {
                min: options?.min || 0,
                max: options?.max || 100,
              },
            }}
          />
        </FormControl>
      )

    default:
      return null
  }
}

export default ShowFilter
