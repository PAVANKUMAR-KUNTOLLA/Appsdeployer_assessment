import React, { useState } from "react";
import StickyNote from "../components/sticky_notes";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import DrawerAppBar from "../components/appbar";
import Tooltip from "@mui/material/Tooltip";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import {
  blue,
  green,
  yellow,
  pink,
  orange,
  purple,
  red,
  teal,
  cyan,
  lime,
  amber,
  deepOrange,
  deepPurple,
  lightGreen,
} from "@mui/material/colors"; // Importing some color options

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleOpenColorPicker = () => {
    setIsColorPickerOpen(true);
  };

  const handleCloseColorPicker = () => {
    setIsColorPickerOpen(false);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    handleCloseColorPicker();
    // Create a note after selecting the color
    createNote(color);
  };

  const createNote = (color) => {
    if (color) {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          color: color,
        },
      ]);
    }
  };

  const removeNote = (noteId) => {
    setNotes(notes.filter((item) => item.id !== noteId));
  };

  const colorPalette = [
    blue[200],
    green[200],
    yellow[200],
    pink[200],
    orange[200],
    purple[200],
    red[200],
    teal[200],
    cyan[200],
    lime[200],
    amber[200],
    deepOrange[200],
    deepPurple[200],
    lightGreen[200],
  ]; // Adjust the colors as needed

  return (
    <Box>
      <DrawerAppBar />

      <Box
        sx={{
          marginTop: "10px",
          marginLeft: "20px",
          height: "90vh",
          width: "50px",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <Tooltip title="Sticky Note" placement="right">
          <Button
            onClick={handleOpenColorPicker}
            sx={{ marginBottom: "100px", zIndex: 1 }}
          >
            <StickyNote2OutlinedIcon
              sx={{
                fontSize: 30,
                marginTop: "20px",
                paddingRight: "10px",
              }}
            />
          </Button>
        </Tooltip>
      </Box>

      <Dialog open={isColorPickerOpen} onClose={handleCloseColorPicker}>
        <DialogTitle>Select Color</DialogTitle>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="flex-start"
        >
          {Array.from(
            { length: Math.ceil(colorPalette.length / 2) },
            (_, index) => colorPalette.slice(index * 2, index * 2 + 2)
          ).map((columnColors, colIndex) => (
            <Grid
              container
              item
              key={colIndex}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              {columnColors.map((color, rowIndex) => (
                <Grid item key={rowIndex}>
                  <IconButton
                    style={{
                      backgroundColor: color,
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={() => handleColorSelection(color)}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Dialog>

      {notes.map((item) => (
        <StickyNote
          key={item.id}
          color={item.color}
          onClose={() => removeNote(item.id)}
        />
      ))}
    </Box>
  );
};

export default HomePage;
