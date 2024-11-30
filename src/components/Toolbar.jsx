import React from 'react';
import { useDispatch } from 'react-redux';
import { addLayer, setTemplate } from '../store/cardSlice';
import { exportCard } from '../utils/export';
import BatchProcessor from './BatchProcessor';
import { cardTemplates } from '../store/cardSlice';

const Toolbar = () => {
  const dispatch = useDispatch();

  const handleAddImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          dispatch(addLayer({
            type: 'image',
            src: reader.result,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            name: `Image ${Date.now()}`,
            effects: [],
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleAddText = () => {
    dispatch(addLayer({
      type: 'text',
      text: 'New Text',
      x: 0,
      y: 0,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#000000',
      name: `Text ${Date.now()}`,
      effects: [],
    }));
  };

  const handleExport = async (format) => {
    try {
      if (window.stageRef) {
        await exportCard(window.stageRef, format);
      } else {
        console.error('Stage reference not found');
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="toolbar-content">
      <h2>Tools</h2>
      <div className="toolbar-section">
        <button onClick={handleAddImage}>Add Image</button>
        <button onClick={handleAddText}>Add Text</button>
      </div>

      <h2>Templates</h2>
      <div className="toolbar-section">
        <select onChange={(e) => dispatch(setTemplate(e.target.value))}>
          {Object.entries(cardTemplates).map(([key, template]) => (
            <option key={key} value={key}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <h2>Export</h2>
      <div className="toolbar-section">
        <button onClick={() => handleExport('png')}>Export as PNG</button>
        <button onClick={() => handleExport('jpeg')}>Export as JPEG</button>
      </div>

      <BatchProcessor />
    </div>
  );
};

export default Toolbar;
