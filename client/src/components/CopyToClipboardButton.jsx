import React from "react"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import Tooltip from "@mui/material/Tooltip"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Fade from "@mui/material/Fade"

function CopyToClipboardButton({ textToCopy }) {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
    setOpen(false)
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setOpen(true)
      })
      .catch((err) => {
        console.error("Error al copiar: ", err)
      })
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          placement="top-start"
          title="Copiado"
        >
          <Button
            onClick={handleCopy}
            sx={{
              borderColor: "#D9D9D9",
              justifyContent: "center",
              display: "flex",
              padding: "0px!important",
            }}
          >
            <ContentCopyIcon />
          </Button>
        </Tooltip>
      </div>
    </ClickAwayListener>
  )
}

export default CopyToClipboardButton
