import { useSelector, useDispatch } from 'react-redux';
import { updateLayer, updateCardProperties } from '../store/cardSlice';

const ZODIAX_ESSENCES = [
  "Guardian's Force",
  "Healer's Touch",
  "Warrior's Might",
  "Scholar's Mind",
  "Seer's Vision",
  "Alchemist's Transmutation",
  "Shadow's Embrace",
  "Elemental's Fury",
  "Mystic's Aura",
  "Beastmaster's Command",
  "Timekeeper's Chronology",
  "Illusionist's Deceit",
  "Cosmic's Infinity"
];

const DAWN_ASPECTS = [
  "First Awakening",
  "Healing Source",
  "Desire to Fight",
  "Depth of Wisdom",
  "Foresight Clarity",
  "Alchemical Transformation",
  "Shadow Movement",
  "Elemental Connection",
  "Mystical Energy",
  "Beast Harmony",
  "Time Flow",
  "Illusion Art",
  "Cosmic Resonance"
];

const DIMENSIONAL_INFLUENCES = [
  "Ignisara",
  "Aquafall",
  "Terrafirma",
  "Aerolite",
  "Etherion",
  "Luxnova",
  "Umbracore",
  "Chrono World"
];

const PropertiesPanel = () => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.card.selectedLayer);
  const layers = useSelector((state) => state.card.layers);
  const cardProperties = useSelector((state) => state.card.cardProperties);
  const currentLayer = selectedLayer !== null ? layers[selectedLayer] : null;

  const handleLayerChange = (property, value) => {
    dispatch(updateLayer({
      index: selectedLayer,
      layer: { [property]: value }
    }));
  };

  const handleCardPropertyChange = (property, value) => {
    dispatch(updateCardProperties({
      [property]: value
    }));
  };

  return (
    <div className="properties-panel">
      <h2>Properties</h2>

      {/* Card Type Selection */}
      <div className="property-group">
        <h3>Card Type</h3>
        <select 
          value={cardProperties.cardType}
          onChange={(e) => handleCardPropertyChange('cardType', e.target.value)}
        >
          <option value="character">Character Card</option>
          <option value="ability">Ability Card</option>
          <option value="dimensional">Dimensional Card</option>
        </select>
      </div>

      {/* Zodiax Essence Selection */}
      <div className="property-group">
        <h3>Zodiax Essence</h3>
        <select
          value={cardProperties.zodiaxEssence || ''}
          onChange={(e) => handleCardPropertyChange('zodiaxEssence', e.target.value)}
        >
          <option value="">Select Essence</option>
          {ZODIAX_ESSENCES.map(essence => (
            <option key={essence} value={essence}>{essence}</option>
          ))}
        </select>
      </div>

      {/* Dawn Aspect Selection */}
      <div className="property-group">
        <h3>Dawn Aspect</h3>
        <select
          value={cardProperties.dawnAspect || ''}
          onChange={(e) => handleCardPropertyChange('dawnAspect', e.target.value)}
        >
          <option value="">Select Aspect</option>
          {DAWN_ASPECTS.map(aspect => (
            <option key={aspect} value={aspect}>{aspect}</option>
          ))}
        </select>
      </div>

      {/* Light Source & Shadow Depth */}
      <div className="property-group">
        <h3>Light & Shadow</h3>
        <label>
          Light Source:
          <input
            type="range"
            min="0"
            max="100"
            value={cardProperties.lightSource}
            onChange={(e) => handleCardPropertyChange('lightSource', parseInt(e.target.value))}
          />
          {cardProperties.lightSource}
        </label>
        <label>
          Shadow Depth:
          <input
            type="range"
            min="0"
            max="100"
            value={cardProperties.shadowDepth}
            onChange={(e) => handleCardPropertyChange('shadowDepth', parseInt(e.target.value))}
          />
          {cardProperties.shadowDepth}
        </label>
      </div>

      {/* Dimensional Influences */}
      <div className="property-group">
        <h3>Dimensional Influences</h3>
        {DIMENSIONAL_INFLUENCES.map(dimension => (
          <label key={dimension}>
            <input
              type="checkbox"
              checked={cardProperties.dimensionalInfluence.includes(dimension)}
              onChange={(e) => {
                const newInfluences = e.target.checked
                  ? [...cardProperties.dimensionalInfluence, dimension]
                  : cardProperties.dimensionalInfluence.filter(d => d !== dimension);
                handleCardPropertyChange('dimensionalInfluence', newInfluences);
              }}
            />
            {dimension}
          </label>
        ))}
      </div>

      {/* Character Stats (only for character cards) */}
      {cardProperties.cardType === 'character' && (
        <div className="property-group">
          <h3>Stats</h3>
          <label>
            Power:
            <input
              type="number"
              value={cardProperties.power}
              onChange={(e) => handleCardPropertyChange('power', parseInt(e.target.value))}
            />
          </label>
          <label>
            Defense:
            <input
              type="number"
              value={cardProperties.defense}
              onChange={(e) => handleCardPropertyChange('defense', parseInt(e.target.value))}
            />
          </label>
        </div>
      )}

      {/* Layer Properties (when a layer is selected) */}
      {currentLayer && (
        <div className="property-group">
          <h3>Layer Properties</h3>
          <label>
            X Position:
            <input
              type="number"
              value={currentLayer.x}
              onChange={(e) => handleLayerChange('x', parseInt(e.target.value))}
            />
          </label>
          <label>
            Y Position:
            <input
              type="number"
              value={currentLayer.y}
              onChange={(e) => handleLayerChange('y', parseInt(e.target.value))}
            />
          </label>
          {currentLayer.type === 'text' && (
            <>
              <label>
                Text:
                <input
                  type="text"
                  value={currentLayer.text}
                  onChange={(e) => handleLayerChange('text', e.target.value)}
                />
              </label>
              <label>
                Font Size:
                <input
                  type="number"
                  value={currentLayer.fontSize}
                  onChange={(e) => handleLayerChange('fontSize', parseInt(e.target.value))}
                />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
