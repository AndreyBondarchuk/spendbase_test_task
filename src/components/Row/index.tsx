import React, { useState, useEffect } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DataApi } from "../../types";
import "./style.css";

interface RowProps {
  node: DataApi;
  handleClick: () => void;
  isOpen: boolean;
  searchTerm: string;
}

const Row: React.FC<RowProps> = ({ node, handleClick, isOpen, searchTerm }) => {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (node?.name === searchTerm) setSelected(true);
    else setSelected(false);
  }, [searchTerm, node?.name]);

  const styles = {
    "&": {
      backgroundColor: isSelected ? "green" : "white",
    },
    "&:hover": {
      backgroundColor: isSelected ? "green" : "white",
    },
  };

  return (
    <ListItemButton onClick={handleClick} sx={styles}>
      <React.Fragment>
        <ListItemText
          primary={
            <div className="row">
              {node?.type === "file" ? <DescriptionIcon /> : <FolderIcon />}
              <p>{node?.name}</p>
            </div>
          }
        />
        {node?.children ? isOpen ? <ExpandLess /> : <ExpandMore /> : ""}
      </React.Fragment>
    </ListItemButton>
  );
};

export default Row;
