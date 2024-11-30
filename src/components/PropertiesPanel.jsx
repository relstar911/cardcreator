import { useSelector, useDispatch } from 'react-redux';
import { updateLayer } from '../store/cardSlice';

const PropertiesPanel = () => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.card.selectedLayer);
  const layers = useSelector((state) => state.card.layers);
  const currentLayer = selectedLayer !== null ? layers[selectedLayer] : null;

  if (!currentLayer) {
    return (
      <div className="properties-panel-content">
        <h2>Properties</h2>
        <p>Select a layer to edit its properties</p>
      </div>
    );
  }

  const handleChange = (property, value) => {
    dispatch(updateLayer({
      index: selectedLayer,
      layer: { [property]: value }
    }));
  };

  return (
    <div className="properties-panel-content">
      <h2>Properties</h2>
      
      <div className="property-group">
        <h3>Position</h3>
        <label>
          X:
          <input
            type="number"
            value={currentLayer.x}
            onChange={(e) => handleChange('x', Number(e.target.value))}
          />
        </label>
        <label>
          Y:
          <input
            type="number"
            value={currentLayer.y}
            onChange={(e) => handleChange('y', Number(e.target.value))}
          />
        </label>
      </div>

      {currentLayer.type === 'text' && (
        <div className="property-group">
          <h3>Text Properties</h3>
          <label>
            Text:
            <input
              type="text"
              value={currentLayer.text}
              onChange={(e) => handleChange('text', e.target.value)}
            />
          </label>
          <label>
            Font Size:
            <input
              type="number"
              value={currentLayer.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
            />
          </label>
          <label>
            Color:
            <input
              type="color"
              value={currentLayer.fill}
              onChange={(e) => handleChange('fill', e.target.value)}
            />
          </label>
        </div>
      )}

      {currentLayer.type === 'image' && (
        <div className="property-group">
          <h3>Image Properties</h3>
          <label>
            Width:
            <input
              type="number"
              value={currentLayer.width}
              onChange={(e) => handleChange('width', Number(e.target.value))}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={currentLayer.height}
              onChange={(e) => handleChange('height', Number(e.target.value))}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
