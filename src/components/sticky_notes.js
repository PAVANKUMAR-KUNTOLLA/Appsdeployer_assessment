import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const StickyNote = ({ onClose, color }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const stickyNoteRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const offsetX =
      e.clientX - stickyNoteRef.current.getBoundingClientRect().left;
    const offsetY =
      e.clientY - stickyNoteRef.current.getBoundingClientRect().top;
    setDragOffset({ x: offsetX, y: offsetY });

    // Set pointer-events to 'none' to allow the cursor to remain on the sticky note while dragging
    stickyNoteRef.current.style.pointerEvents = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const stickyNote = stickyNoteRef.current;
    const maxX = window.innerWidth - stickyNote.clientWidth;
    const maxY = window.innerHeight - stickyNote.clientHeight;

    const adjustedX = Math.min(maxX, Math.max(0, e.clientX - dragOffset.x));
    const adjustedY = Math.min(maxY, Math.max(0, e.clientY - dragOffset.y));

    stickyNote.style.left = adjustedX + "px";
    stickyNote.style.top = adjustedY + "px";
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Restore pointer-events to 'auto' after dragging is finished
    stickyNoteRef.current.style.pointerEvents = "auto";
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const [content, setContent] = useState("");
  const [noteSize, setNoteSize] = useState({ width: 200, height: 200 });
  const [allowMove, setAllowMove] = useState(false);

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && content === "") {
      event.preventDefault(); // Prevent default backspace behavior if content is empty
      return;
    }

    if (event.key === "Backspace") {
      setNoteSize((prevSize) => ({
        width: Math.max(prevSize.width - 10, 200),
        height: Math.max(prevSize.height - 10, 200),
      }));
    }

    if (event.key === "Enter") {
      setNoteSize((prevSize) => ({
        ...prevSize,
        height: prevSize.height + 20,
      }));
    }
  };

  useEffect(() => {
    const updatedWidth = stickyNoteRef.current.scrollWidth + 2;
    const updatedHeight = stickyNoteRef.current.scrollHeight + 2;

    setNoteSize({
      width: Math.max(updatedWidth, 200),
      height: Math.max(updatedHeight, 200),
    });
  }, [content]);

  return (
    <Box
      ref={stickyNoteRef}
      sx={{
        width: noteSize.width + "px",
        height: noteSize.height + "px",
        border: "2px solid",
        borderRadius: "10px",
        cursor: allowMove ? "grabbing" : "pointer",
        position: "absolute",
        userSelect: "none",
        overflow: "hidden",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: color || "white",
      }}
      onMouseDown={handleMouseDown}
    >
      <Box sx={{ padding: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Sticker</Typography>
          <CancelOutlinedIcon sx={{ marginTop: "4px" }} />
        </Box>

        <TextField
          id="standard-textarea"
          multiline
          variant="standard"
          value={content}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{
            width: "100%",
            resize: "none",
            overflow: "hidden",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            fontFamily: "inherit",
            fontSize: "inherit",
            padding: 0,
            lineHeight: "1.2em",
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default StickyNote;
