// DrawingArea.jsx
import React, { useState } from 'react';
import DrawTools from './DrawTools';
import ViewTool from './ViewTool';
import DrawingCanvas from './DrawingCanvas';

function DrawingArea() {
  const [selectedTool, setSelectedTool] = useState('rectangle'); // default to rectangle
  const [showAnnotations, setShowAnnotations] = useState(true);

  const handleToggleAnnotations = (newState) => {
    setShowAnnotations(newState);
  };

  return (
    <div className="drawing-area">
      <DrawTools selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <ViewTool onToggleAnnotations={handleToggleAnnotations} />
      <DrawingCanvas selectedTool={selectedTool} showAnnotations={showAnnotations} />
    </div>
  );
}

export default DrawingArea;
