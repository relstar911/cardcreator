import { useDispatch, useSelector } from 'react-redux';
import { setTemplate, updateCardProperties } from '../store/cardSlice';
import './Toolbar.css';

const Toolbar = () => {
  const dispatch = useDispatch();
  const cardProperties = useSelector((state) => state.card.cardProperties);
  const template = useSelector((state) => state.card.template);

  const handleTemplateChange = (e) => {
    dispatch(setTemplate(e.target.value));
  };

  const handlePropertyChange = (property, value) => {
    dispatch(updateCardProperties({ [property]: value }));
  };

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h3>Card Type</h3>
        <select 
          value={cardProperties.cardType} 
          onChange={(e) => handlePropertyChange('cardType', e.target.value)}
          className="card-type-select"
        >
          <option value="character">Character Card</option>
          <option value="ability">Ability Card</option>
          <option value="dimensional">Dimensional Card</option>
        </select>
      </div>

      <div className="toolbar-section">
        <h3>Template</h3>
        <select 
          value={template} 
          onChange={handleTemplateChange}
          className="template-select"
        >
          <option value="character">Standard Template</option>
          <option value="ability">Premium Template</option>
          <option value="dimensional">Legendary Template</option>
        </select>
      </div>

      <div className="toolbar-section">
        <h3>Properties</h3>
        <div className="property-group">
          <label>Card Name</label>
          <input
            type="text"
            value={cardProperties.name}
            placeholder="Enter card name"
            onChange={(e) => handlePropertyChange('name', e.target.value)}
          />
        </div>

        <div className="property-group">
          <label>Zodiax Essence</label>
          <select
            value={cardProperties.zodiaxEssence}
            onChange={(e) => handlePropertyChange('zodiaxEssence', e.target.value)}
            className="essence-select"
          >
            <option value="">Select Essence</option>
            <option value="solar">Solar Essence</option>
            <option value="lunar">Lunar Essence</option>
            <option value="stellar">Stellar Essence</option>
            <option value="cosmic">Cosmic Essence</option>
          </select>
        </div>

        <div className="property-group">
          <label>Dawn Aspect</label>
          <select
            value={cardProperties.dawnAspect}
            onChange={(e) => handlePropertyChange('dawnAspect', e.target.value)}
            className="aspect-select"
          >
            <option value="">Select Aspect</option>
            <option value="light">Light Aspect</option>
            <option value="dark">Dark Aspect</option>
            <option value="nature">Nature Aspect</option>
            <option value="cosmic">Cosmic Aspect</option>
          </select>
        </div>

        {cardProperties.cardType === 'character' && (
          <div className="property-group">
            <label>Power</label>
            <input
              type="number"
              value={cardProperties.power}
              onChange={(e) => handlePropertyChange('power', parseInt(e.target.value) || 0)}
              min="0"
              max="9999"
            />
            <label>Defense</label>
            <input
              type="number"
              value={cardProperties.defense}
              onChange={(e) => handlePropertyChange('defense', parseInt(e.target.value) || 0)}
              min="0"
              max="9999"
            />
          </div>
        )}

        <div className="property-group">
          <label>Effect</label>
          <textarea
            value={cardProperties.effect}
            onChange={(e) => handlePropertyChange('effect', e.target.value)}
            placeholder="Enter card effect"
            rows="4"
          />
        </div>
      </div>

      <div className="toolbar-section">
        <h3>Actions</h3>
        <button onClick={() => console.log('Export as PNG')}>
          Export as PNG
        </button>
        <button onClick={() => console.log('Export as JPEG')}>
          Export as JPEG
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
