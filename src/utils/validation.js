export const validateCard = (card) => {
  const errors = [];
  const warnings = [];

  // Check DPI
  if (card.cardSize.dpi < 300) {
    warnings.push('Card resolution is below 300 DPI, which may result in poor print quality');
  }

  // Check image layers for resolution
  card.layers.forEach((layer, index) => {
    if (layer.type === 'image') {
      // Create an image element to check dimensions
      const img = new Image();
      img.src = layer.src;
      
      const requiredPixelWidth = card.cardSize.width * card.cardSize.dpi;
      const requiredPixelHeight = card.cardSize.height * card.cardSize.dpi;
      
      if (img.width < requiredPixelWidth || img.height < requiredPixelHeight) {
        warnings.push(`Image in layer ${layer.name} has lower resolution than the card size`);
      }
    }
  });

  // Check text layers for safe zone
  const safeMargin = card.safeZone.margin;
  card.layers.forEach((layer, index) => {
    if (layer.type === 'text') {
      if (
        layer.x < safeMargin ||
        layer.y < safeMargin ||
        layer.x + layer.width > card.cardSize.width - safeMargin ||
        layer.y + layer.fontSize > card.cardSize.height - safeMargin
      ) {
        warnings.push(`Text in layer ${layer.name} extends beyond the safe zone`);
      }
    }
  });

  // Check for empty required fields in templates
  if (card.template !== 'blank') {
    const requiredFields = {
      creature: ['Title', 'Type Line', 'Stats'],
      spell: ['Title', 'Effect Text'],
      equipment: ['Title', 'Equipment Type', 'Bonus Stats'],
    };

    const required = requiredFields[card.template];
    if (required) {
      required.forEach(fieldName => {
        const field = card.layers.find(layer => layer.name === fieldName);
        if (!field || (field.type === 'text' && (!field.text || field.text.trim() === ''))) {
          errors.push(`Required field "${fieldName}" is empty`);
        }
      });
    }
  }

  // Check for overlapping elements
  card.layers.forEach((layer1, i) => {
    card.layers.slice(i + 1).forEach(layer2 => {
      if (checkOverlap(layer1, layer2)) {
        warnings.push(`Layers "${layer1.name}" and "${layer2.name}" are overlapping`);
      }
    });
  });

  return { errors, warnings };
};

const checkOverlap = (layer1, layer2) => {
  const rect1 = {
    left: layer1.x,
    right: layer1.x + (layer1.width || 0),
    top: layer1.y,
    bottom: layer1.y + (layer1.height || layer1.fontSize || 0),
  };

  const rect2 = {
    left: layer2.x,
    right: layer2.x + (layer2.width || 0),
    top: layer2.y,
    bottom: layer2.y + (layer2.height || layer2.fontSize || 0),
  };

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};
