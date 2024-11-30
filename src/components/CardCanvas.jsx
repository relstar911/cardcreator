import { Stage, Layer, Image, Text, Group, Rect } from 'react-konva';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useImage from 'use-image';

// Standard TCG card size (63mm x 88mm) at 300 DPI
const CARD_WIDTH = 744;
const CARD_HEIGHT = 1039;
const SCALE = 0.6;

// Template frame paths
const TEMPLATE_FRAMES = {
  character: '/templates/character-frame.svg',
  ability: '/templates/ability-frame.svg',
  dimensional: '/templates/dimensional-frame.svg'
};

const CARD_TYPE_STYLES = {
  character: {
    frameColor: '#4CAF50',
    symbolColor: '#81C784',
    titleColor: '#ffffff',
    textColor: '#e0e0e0'
  },
  ability: {
    frameColor: '#2196F3',
    symbolColor: '#64B5F6',
    titleColor: '#ffffff',
    textColor: '#e0e0e0'
  },
  dimensional: {
    frameColor: '#9C27B0',
    symbolColor: '#BA68C8',
    titleColor: '#ffffff',
    textColor: '#e0e0e0'
  }
};

const ImageLayer = ({ layer, isSelected }) => {
  const [image] = useImage(layer.src);
  
  return (
    <Group
      x={layer.x}
      y={layer.y}
      draggable={isSelected}
    >
      {image && (
        <Image
          image={image}
          width={layer.width}
          height={layer.height}
          shadowBlur={layer.effects?.[0]?.blur || 0}
          shadowColor={layer.effects?.[0]?.color || 'black'}
          shadowOpacity={layer.effects?.[0]?.opacity || 0}
          shadowOffset={{ x: 5, y: 5 }}
        />
      )}
      {isSelected && (
        <Rect
          width={layer.width}
          height={layer.height}
          stroke="#00ff00"
          strokeWidth={2}
          dash={[5, 5]}
        />
      )}
    </Group>
  );
};

const TextLayer = ({ layer, isSelected }) => {
  const glowEffect = layer.effects?.find(e => e.type === 'glow');
  
  return (
    <Group
      x={layer.x}
      y={layer.y}
      draggable={isSelected}
    >
      <Text
        text={layer.text}
        fontSize={layer.fontSize}
        fontFamily={layer.fontFamily}
        fill={layer.fill}
        width={layer.width}
        align={layer.align}
        shadowBlur={glowEffect?.blur || 0}
        shadowColor={glowEffect?.color || 'black'}
        shadowOpacity={glowEffect?.opacity || 0}
        shadowOffset={{ x: 2, y: 2 }}
      />
      {isSelected && (
        <Rect
          width={layer.width}
          height={30}
          stroke="#00ff00"
          strokeWidth={2}
          dash={[5, 5]}
        />
      )}
    </Group>
  );
};

const CardFrame = ({ cardType }) => {
  const [frameImage] = useImage(TEMPLATE_FRAMES[cardType]);
  const typeStyle = CARD_TYPE_STYLES[cardType];

  return (
    <Group>
      {/* Base Frame */}
      <Rect
        x={20}
        y={20}
        width={CARD_WIDTH - 40}
        height={CARD_HEIGHT - 40}
        fill="#1a1a1a"
        cornerRadius={15}
        shadowColor="black"
        shadowBlur={20}
        shadowOpacity={0.5}
        shadowOffset={{ x: 8, y: 8 }}
      />

      {/* Template Frame */}
      {frameImage && (
        <Image
          x={20}
          y={20}
          image={frameImage}
          width={CARD_WIDTH - 40}
          height={CARD_HEIGHT - 40}
        />
      )}

      {/* Card Type Indicator */}
      <Group>
        <Rect
          x={40}
          y={40}
          width={200}
          height={40}
          fill={typeStyle.frameColor}
          cornerRadius={8}
          opacity={0.9}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.3}
        />
        <Text
          x={50}
          y={48}
          text={cardType.toUpperCase()}
          fontSize={24}
          fontFamily="Cinzel"
          fill={typeStyle.titleColor}
          shadowColor="black"
          shadowBlur={2}
          shadowOpacity={0.5}
        />
      </Group>
    </Group>
  );
};

ImageLayer.propTypes = {
  layer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    src: PropTypes.string,
    effects: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      blur: PropTypes.number,
      color: PropTypes.string,
      opacity: PropTypes.number
    }))
  }).isRequired,
  isSelected: PropTypes.bool
};

TextLayer.propTypes = {
  layer: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    text: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    fill: PropTypes.string,
    align: PropTypes.string,
    effects: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      blur: PropTypes.number,
      color: PropTypes.string,
      opacity: PropTypes.number
    }))
  }).isRequired,
  isSelected: PropTypes.bool
};

CardFrame.propTypes = {
  cardType: PropTypes.string.isRequired
};

const CardCanvas = () => {
  const layers = useSelector((state) => state.card.layers);
  const selectedLayer = useSelector((state) => state.card.selectedLayer);
  const cardProperties = useSelector((state) => state.card.cardProperties);

  return (
    <div 
      className="card-canvas-container"
      data-testid="card-canvas"
      data-template={cardProperties.cardType}
    >
      <Stage
        width={CARD_WIDTH * SCALE}
        height={CARD_HEIGHT * SCALE}
        scale={{ x: SCALE, y: SCALE }}
      >
        <Layer>
          {/* Base Card Background */}
          <Rect
            x={0}
            y={0}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            fill="#1a1a1a"
            cornerRadius={20}
          />

          {/* Card Frame with Template */}
          <CardFrame cardType={cardProperties.cardType} />

          {/* Card Layers */}
          {layers.map((layer, index) => {
            const isSelected = selectedLayer === index;
            return layer.type === 'image' ? (
              <ImageLayer 
                key={index} 
                layer={layer} 
                isSelected={isSelected} 
              />
            ) : (
              <TextLayer 
                key={index} 
                layer={layer} 
                isSelected={isSelected} 
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default CardCanvas;
