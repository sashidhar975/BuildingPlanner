// ViewTool.jsx
import React, { useState } from 'react';

function ViewTool() {
  const [showAnnotations, setShowAnnotations] = useState(true);

  const handleToggleAnnotations = () => {
    setShowAnnotations(!showAnnotations);
  };

  return (
    <div className="view-tool">
      <label>
        Show Annotations
        <input
          type="checkbox"
          checked={showAnnotations}
          onChange={handleToggleAnnotations}
        />
      </label>
    </div>
  );
}

export default ViewTool;
