import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { updateLayer, setSelectedLayer } from '../store/cardSlice';
import useImage from 'use-image';

const PIXELS_PER_INCH = 96; // Standard screen resolution

const LayerPropTypes = {
  type: PropTypes.oneOf(['image', 'text']).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  name: PropTypes.string.isRequired,
  effects: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['shadow', 'glow', 'outline', 'gradient']).isRequired,
    blur: PropTypes.number,
    color: PropTypes.string,
    opacity: PropTypes.number,
    size: PropTypes.number,
  })),
  // Text-specific props
  text: PropTypes.string,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  fill: PropTypes.string,
  // Image-specific props
  src: PropTypes.string,
};

const LayerComponentPropTypes = {
  layer: PropTypes.shape(LayerPropTypes).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ImageLayer = ({ layer, isSelected, onSelect, onChange }) => {
  const [image] = useImage(layer.src);
  
  const applyEffects = (node) => {
    if (!layer.effects) return;
    
    layer.effects.forEach(effect => {
      switch (effect.type) {
        case 'shadow':
          node.shadowBlur(effect.blur);
          node.shadowColor(effect.color);
          node.shadowOpacity(effect.opacity);
          break;
        case 'glow':
          node.shadowBlur(effect.blur);
          node.shadowColor(effect.color);
          node.shadowOpacity(effect.opacity);
          node.shadowOffset({ x: 0, y: 0 });
          break;
        case 'outline':
          node.stroke(effect.color);
          node.strokeWidth(effect.size);
          break;
        case 'gradient':
          // Gradient effects require more complex handling with custom shaders
          // This is a simplified version
          break;
      }
    });
  };
  
  return (
    <Image
      image={image}
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({
          ...layer,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      ref={node => {
        if (node) {
          applyEffects(node);
        }
      }}
      stroke={isSelected ? '#00ff00' : null}
      strokeWidth={isSelected ? 2 : 0}
    />
  );
};

ImageLayer.propTypes = LayerComponentPropTypes;

const TextLayer = ({ layer, isSelected, onSelect, onChange }) => {
  const applyEffects = (node) => {
    if (!layer.effects) return;
    
    layer.effects.forEach(effect => {
      switch (effect.type) {
        case 'shadow':
          node.shadowBlur(effect.blur);
          node.shadowColor(effect.color);
          node.shadowOpacity(effect.opacity);
          break;
        case 'glow':
          node.shadowBlur(effect.blur);
          node.shadowColor(effect.color);
          node.shadowOpacity(effect.opacity);
          node.shadowOffset({ x: 0, y: 0 });
          break;
        case 'outline':
          node.stroke(effect.color);
          node.strokeWidth(effect.size);
          break;
        case 'gradient':
          // Gradient effects for text require custom shaders
          break;
      }
    });
  };

  return (
    <Text
      text={layer.text}
      x={layer.x}
      y={layer.y}
      fontSize={layer.fontSize}
      fontFamily={layer.fontFamily}
      fill={layer.fill}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({
          ...layer,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      ref={node => {
        if (node) {
          applyEffects(node);
        }
      }}
      stroke={isSelected ? '#00ff00' : null}
      strokeWidth={isSelected ? 2 : 0}
    />
  );
};

TextLayer.propTypes = LayerComponentPropTypes;

const CardCanvas = () => {
  const dispatch = useDispatch();
  const stageRef = useRef(null);
  const cardSize = useSelector((state) => state.card.cardSize);
  const safeZone = useSelector((state) => state.card.safeZone);
  const bleedArea = useSelector((state) => state.card.bleedArea);
  const layers = useSelector((state) => state.card.layers);
  const selectedLayer = useSelector((state) => state.card.selectedLayer);

  // Share stage reference with parent components
  useEffect(() => {
    if (stageRef.current) {
      // You might want to store this reference in Redux or pass it to parent components
      window.stageRef = stageRef.current;
    }
  }, [stageRef]);

  // Convert inches to pixels for display
  const width = cardSize.width * PIXELS_PER_INCH;
  const height = cardSize.height * PIXELS_PER_INCH;
  const bleedSize = bleedArea.enabled ? bleedArea.size * PIXELS_PER_INCH : 0;
  const safeMargin = safeZone.enabled ? safeZone.margin * PIXELS_PER_INCH : 0;

  const totalWidth = width + (bleedSize * 2);
  const totalHeight = height + (bleedSize * 2);

  const handleLayerChange = (index, newProps) => {
    dispatch(updateLayer({ index, layer: newProps }));
  };

  return (
    <Stage 
      width={totalWidth} 
      height={totalHeight}
      ref={stageRef}
    >
      {/* Bleed area */}
      <Layer>
        <Rect
          x={0}
          y={0}
          width={totalWidth}
          height={totalHeight}
          fill="#ff000015"
          visible={bleedArea.enabled}
        />
      </Layer>

      {/* Card area */}
      <Layer>
        <Rect
          x={bleedSize}
          y={bleedSize}
          width={width}
          height={height}
          fill="white"
          stroke="#999"
        />
      </Layer>

      {/* Safe zone */}
      {safeZone.enabled && (
        <Layer>
          <Rect
            x={bleedSize + safeMargin}
            y={bleedSize + safeMargin}
            width={width - (safeMargin * 2)}
            height={height - (safeMargin * 2)}
            stroke="#00ff00"
            strokeWidth={1}
            dash={[5, 5]}
          />
        </Layer>
      )}

      {/* Content layers */}
      <Layer>
        {layers.map((layer, index) => {
          const isSelected = selectedLayer === index;
          const props = {
            key: layer.name,
            layer,
            isSelected,
            onSelect: () => dispatch(setSelectedLayer(index)),
            onChange: (newProps) => handleLayerChange(index, newProps),
          };

          switch (layer.type) {
            case 'image':
              return <ImageLayer {...props} />;
            case 'text':
              return <TextLayer {...props} />;
            default:
              return null;
          }
        })}
      </Layer>
    </Stage>
  );
};

export default CardCanvas;
