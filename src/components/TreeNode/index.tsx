import React, { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Row from "../Row";
import { DataApi } from "../../types";
import isEmpty from "lodash/isEmpty";
import "./style.css";

interface TreeNodeProps {
  node: DataApi | null;
  searchTerm: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, searchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsOpen(true)
    } else {
      setIsOpen(false) 
    }
  }, [searchTerm.length]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      {!isEmpty(node) ? (
        <Row
          node={node}
          isOpen={isOpen}
          handleClick={handleClick}
          searchTerm={searchTerm}
        />
      ) : (
        <div>No one file or folder with this name</div>
      )}

      {node?.children && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <div className="row_title">
            {node.children.map((child: any) => (
              <TreeNode key={child.uuid} node={child} searchTerm={searchTerm} />
            ))}
          </div>
        </Collapse>
      )}
    </React.Fragment>
  );
};

export default TreeNode;
