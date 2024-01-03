

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Rect, Circle, Line, Text } from 'react-konva';

function DrawingCanvas({  selectedTool, showAnnotations }) {
  const [shapes, setShapes] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [tempShape, setTempShape] = useState(null);
  const [undoShapes, setUndoShapes] = useState([]);
  const [previewShapes, setPreviewShapes] = useState([]);
  const [savedDrawings, setSavedDrawings] = useState([]);
 

  const drawingRef = useRef(null);

  useEffect(() => {
    const fetchSavedDrawings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/drawings');
        if (response.ok) {
          const fetchedDrawings = await response.json();
          setSavedDrawings(fetchedDrawings);
        } else {
          console.error('Error fetching drawings:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSavedDrawings();
  }, []);

  const handleMouseDown = (e) => {
    const pointerPos = e.target.getStage().getPointerPosition();
    setStartPoint({ x: pointerPos.x, y: pointerPos.y });
    setDrawing(true);

    const newShape = {
      id: new Date().getTime(),
      type: selectedTool,
      points: [pointerPos.x, pointerPos.y],
    };

    setShapes([...shapes, newShape]);
    setUndoShapes([]);
    setPreviewShapes([]); // Clear preview shapes on new action
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const pointerPos = e.target.getStage().getPointerPosition();

    switch (selectedTool) {
      case 'rectangle':
      case 'circle':
      case 'line':
        setTempShape({
          type: selectedTool,
          points: [startPoint.x, startPoint.y, pointerPos.x, pointerPos.y],
        });
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);

    if (tempShape) {
      setShapes([...shapes, tempShape]);
      setTempShape(null);
    }
  };

  const handleUndo = () => {
    if (shapes.length > 0) {
      setUndoShapes([...undoShapes, shapes[shapes.length - 1]]);
      setShapes(shapes.slice(0, -1));
      setPreviewShapes([]); // Clear preview shapes on undo
    }
  };

  const handlePreview = () => {
    // Assuming that each shape in undoShapes has a unique id
    const newPreviewShapes = undoShapes.map((shape) => ({
      ...shape,
      id: new Date().getTime(),
    }));

    setPreviewShapes(newPreviewShapes);
  };

  const handleClear = () => {
    setShapes([]);
    setUndoShapes([]);
    setPreviewShapes([]);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/drawings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shapes),
      });

      const data = await response.json();
      console.log('Drawing saved successfully:', data);
    } catch (error) {
      console.error('Error saving drawing:', error);
    }
  };

  const handleDownload = () => {
    const uri = drawingRef.current.toDataURL();
    const link = document.createElement('a');
    link.href = uri;
    link.download = 'drawing.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderDimensions = (shape) => {
    if (!showAnnotations) return null;

    const calculateDistance = (x1, y1, x2, y2) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };

    switch (shape.type) {
      case 'rectangle':
        const width = calculateDistance(shape.points[0], shape.points[1], shape.points[2], shape.points[1]);
        const height = calculateDistance(shape.points[0], shape.points[1], shape.points[0], shape.points[3]);
        return (
          <React.Fragment key={shape.id}>
            <Rect
              x={shape.points[0]}
              y={shape.points[1]}
              width={shape.points[2] - shape.points[0]}
              height={shape.points[3] - shape.points[1]}
              stroke="black"
              strokeWidth={2}
            />
            <Text
              x={shape.points[0] + width / 2}
              y={shape.points[1] - 10}
              text={`Width: ${width.toFixed(2)}, Height: ${height.toFixed(2)}`}
              fontSize={12}
              fill="black"
            />
          </React.Fragment>
        );
      case 'circle':
        const radius = calculateDistance(shape.points[0], shape.points[1], shape.points[2], shape.points[1]);
        return (
          <React.Fragment key={shape.id}>
            <Circle
              x={shape.points[0]}
              y={shape.points[1]}
              radius={radius}
              stroke="black"
              strokeWidth={2}
            />
            <Text
              x={shape.points[0]}
              y={shape.points[1] - radius - 10}
              text={`Radius: ${radius.toFixed(2)}`}
              fontSize={12}
              fill="black"
            />
          </React.Fragment>
        );
      case 'line':
        const length = calculateDistance(shape.points[0], shape.points[1], shape.points[2], shape.points[3]);
        return (
          <React.Fragment key={shape.id}>
            <Line
              points={shape.points}
              stroke="black"
              strokeWidth={2}
            />
            <Text
              x={(shape.points[0] + shape.points[2]) / 2}
              y={(shape.points[1] + shape.points[3]) / 2 - 10}
              text={`Length: ${length.toFixed(2)}`}
              fontSize={12}
              fill="black"
            />
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  return (
    <div className="drawing-board">
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handlePreview}>Preview</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDownload}>Download</button>
      <Stage
        width={500}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={drawingRef}
      >
        <Layer>
          <Rect width={500} height={400} stroke="black" strokeWidth={2} />
          {shapes.map((shape) => {
            switch (shape.type) {
              case 'rectangle':
                return (
                  
                    <Rect
                      key={shape.id}
                      x={shape.points[0]}
                      y={shape.points[1]}
                      width={shape.points[2] - shape.points[0]}
                      height={shape.points[3] - shape.points[1]}
                      stroke="black"
                      strokeWidth={2}
                    />
                    
                );
              case 'circle':
                return (
                  
                  <Circle
                    key={shape.id}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    radius={Math.sqrt(
                      (shape.points[2] - shape.points[0]) ** 2 +
                      (shape.points[3] - shape.points[1]) ** 2
                    )}
                    stroke="black"
                    strokeWidth={2}
                  />
                  
                );
              case 'line':
                return (
                  
                  <Line
                    key={shape.id}
                    points={shape.points}
                    stroke="black"
                    strokeWidth={2}
                  />
                  
                  
                );
              default:
                return null;
            }
          })}

          {previewShapes.map((shape) => {
            switch (shape.type) {
              case 'rectangle':
                return (
                  <Rect
                    key={shape.id}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    width={shape.points[2] - shape.points[0]}
                    height={shape.points[3] - shape.points[1]}
                    stroke="gray"
                    strokeWidth={2}
                    opacity={0.5}
                  />
                );
              case 'circle':
                return (
                  <Circle
                    key={shape.id}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    radius={Math.sqrt(
                      (shape.points[2] - shape.points[0]) ** 2 +
                      (shape.points[3] - shape.points[1]) ** 2
                    )}
                    stroke="gray"
                    strokeWidth={2}
                    opacity={0.5}
                  />
                );
              case 'line':
                return (
                  <Line
                    key={shape.id}
                    points={shape.points}
                    stroke="gray"
                    strokeWidth={2}
                    opacity={0.5}
                  />
                );
              default:
                return null;
            }
          })}

          
          {tempShape && (
            <>
              {tempShape.type === 'rectangle' && (
                <Rect
                  x={tempShape.points[0]}
                  y={tempShape.points[1]}
                  width={tempShape.points[2] - tempShape.points[0]}
                  height={tempShape.points[3] - tempShape.points[1]}
                  stroke="black"
                  strokeWidth={2}
                  opacity={0.5}
                />
              )}
              {tempShape.type === 'circle' && (
                <Circle
                  x={tempShape.points[0]}
                  y={tempShape.points[1]}
                  radius={Math.sqrt(
                    (tempShape.points[2] - tempShape.points[0]) ** 2 +
                    (tempShape.points[3] - tempShape.points[1]) ** 2
                  )}
                  stroke="black"
                  strokeWidth={2}
                  opacity={0.5}
                />
              )}
              {tempShape.type === 'line' && (
                <Line
                  points={tempShape.points}
                  stroke="black"
                  strokeWidth={2}
                  opacity={0.5}
                />
              )}
            </>
          )}
        </Layer>
      </Stage>
    </div>
  );
}

DrawingCanvas.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  showAnnotations: PropTypes.bool.isRequired,
};

export default DrawingCanvas;
