import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEffect, removeEffect, updateEffect } from '../store/cardSlice';
import { effectTypes } from '../store/cardSlice';

const EffectsPanel = () => {
  const dispatch = useDispatch();
  const selectedLayer = useSelector((state) => state.card.selectedLayer);
  const layers = useSelector((state) => state.card.layers);
  
  if (selectedLayer === null || !layers[selectedLayer]) {
    return null;
  }

  const layer = layers[selectedLayer];
  const effects = layer.effects || [];

  const handleAddEffect = (effectType) => {
    dispatch(addEffect({
      layerIndex: selectedLayer,
      effect: { ...effectTypes[effectType] },
    }));
  };

  const handleUpdateEffect = (effectIndex, updates) => {
    dispatch(updateEffect({
      layerIndex: selectedLayer,
      effectIndex,
      updates,
    }));
  };

  const renderEffectControls = (effect, index) => {
    switch (effect.type) {
      case 'shadow':
      case 'glow':
        return (
          <div className="effect-controls">
            <label>
              Blur:
              <input
                type="range"
                min="0"
                max="20"
                value={effect.blur}
                onChange={(e) => handleUpdateEffect(index, { blur: Number(e.target.value) })}
              />
            </label>
            <label>
              Color:
              <input
                type="color"
                value={effect.color}
                onChange={(e) => handleUpdateEffect(index, { color: e.target.value })}
              />
            </label>
            <label>
              Opacity:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={effect.opacity}
                onChange={(e) => handleUpdateEffect(index, { opacity: Number(e.target.value) })}
              />
            </label>
          </div>
        );
      case 'outline':
        return (
          <div className="effect-controls">
            <label>
              Size:
              <input
                type="range"
                min="1"
                max="10"
                value={effect.size}
                onChange={(e) => handleUpdateEffect(index, { size: Number(e.target.value) })}
              />
            </label>
            <label>
              Color:
              <input
                type="color"
                value={effect.color}
                onChange={(e) => handleUpdateEffect(index, { color: e.target.value })}
              />
            </label>
          </div>
        );
      case 'gradient':
        return (
          <div className="effect-controls">
            <label>
              Start Color:
              <input
                type="color"
                value={effect.colors[0]}
                onChange={(e) => handleUpdateEffect(index, {
                  colors: [e.target.value, effect.colors[1]]
                })}
              />
            </label>
            <label>
              End Color:
              <input
                type="color"
                value={effect.colors[1]}
                onChange={(e) => handleUpdateEffect(index, {
                  colors: [effect.colors[0], e.target.value]
                })}
              />
            </label>
            <label>
              Direction:
              <select
                value={effect.direction}
                onChange={(e) => handleUpdateEffect(index, { direction: e.target.value })}
              >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
                <option value="diagonal">Diagonal</option>
              </select>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="effects-panel">
      <h3>Effects</h3>
      <div className="effects-list">
        {effects.map((effect, index) => (
          <div key={index} className="effect-item">
            <div className="effect-header">
              <span>{effect.type}</span>
              <button
                onClick={() => dispatch(removeEffect({ layerIndex: selectedLayer, effectIndex: index }))}
              >
                Remove
              </button>
            </div>
            {renderEffectControls(effect, index)}
          </div>
        ))}
      </div>
      <div className="add-effect">
        <select
          onChange={(e) => {
            if (e.target.value) {
              handleAddEffect(e.target.value);
              e.target.value = '';
            }
          }}
        >
          <option value="">Add Effect...</option>
          {Object.keys(effectTypes).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EffectsPanel;
