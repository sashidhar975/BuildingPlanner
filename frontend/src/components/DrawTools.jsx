

function DrawTools({ selectedTool, setSelectedTool }) {
  const handleToolChange = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <div className="draw-tools">
      <button
        className={selectedTool === 'rectangle' ? 'active' : ''}
        onClick={() => handleToolChange('rectangle')}
      >
        Rectangle
      </button>
      <button
        className={selectedTool === 'circle' ? 'active' : ''}
        onClick={() => handleToolChange('circle')}
      >
        Circle
      </button>
      <button
        className={selectedTool === 'line' ? 'active' : ''}
        onClick={() => handleToolChange('line')}
      >
        Line
      </button>
    
    </div>
  );
}

export default DrawTools;
