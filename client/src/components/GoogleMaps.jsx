import * as React from "react"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import parse from "autosuggest-highlight/parse"
import Grid from "@mui/material/Grid2"
import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  debounce,
} from "@mui/material"

const GOOGLE_MAPS_API_KEY = "AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE"

function loadScript(src, position, id) {
  if (!position) {
    return
  }

  const script = document.createElement("script")
  script.setAttribute("async", "")
  script.setAttribute("id", id)
  script.src = src
  position.appendChild(script)
}

const autocompleteService = { current: null }

export default function GoogleMaps({ handleOnChange, value }) {
  const [inputValue, setInputValue] = React.useState("")
  const [options, setOptions] = React.useState([])
  const loaded = React.useRef(false)

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps",
      )
    }

    loaded.current = true
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback)
      }, 400),
    [],
  )

  React.useEffect(() => {
    let active = true

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === "") {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetch(
      {
        input: inputValue,
        componentRestrictions: { country: "AR" },
      },
      (results) => {
        if (active) {
          let newOptions = []

          if (value) {
            newOptions = [value]
          }

          if (results) {
            newOptions = [
              ...newOptions,
              ...results.filter((option) =>
                option.description.includes("Buenos Aires"),
              ),
            ]
          }

          setOptions(newOptions)
        }
      },
    )

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])

  const handleInputChange = (event, newInputValue) => {
    // If the input is cleared, set the value to null
    if (newInputValue === "") {
      handleOnChange({
        target: { name: "address", value: null },
      })
    }
    setInputValue(newInputValue)
  }

  return (
    <Autocomplete
      sx={{ width: "auto" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="Sin resultados"
      onChange={(event, newValue) => {
        // If the user selects a new value, handle it
        if (newValue) {
          setOptions([newValue, ...options])
          handleOnChange({
            target: { name: "address", value: newValue.description },
          })
        } else {
          // If newValue is null or undefined, set the value to null
          handleOnChange({
            target: { name: "address", value: null },
          })
        }
      }}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label="Ingrese una dirección" fullWidth />
      )}
      renderOption={(props, option) => {
        // Check if the option is valid before accessing its properties
        if (!option || !option.structured_formatting) {
          return null
        }

        const { key, ...optionProps } = props
        const matches =
          option.structured_formatting.main_text_matched_substrings || []

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        )
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
