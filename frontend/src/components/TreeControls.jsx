// src/components/FamilyTree/TreeControls.jsx
import React from "react";
import { CustomIcons } from "./CustomIcons";
import "../../styles/treeControls.css";

const TreeControls = ({ onZoomIn, onZoomOut, onAddMember }) => {
  return (
    <div className="tree-controls">
      <button
        onClick={onZoomIn}
        className="tree-controls__button"
        title="Zoom in"
      >
        <CustomIcons.zoomIn />
      </button>
      <button
        onClick={onZoomOut}
        className="tree-controls__button"
        title="Zoom out"
      >
        <CustomIcons.zoomOut />
      </button>
      <button onClick={onAddMember} className="tree-controls__add-button">
        <CustomIcons.plus />
        Add Independent Member
      </button>
    </div>
  );
};

export default TreeControls;
