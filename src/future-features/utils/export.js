// Standard TCG card dimensions (63mm x 88mm) at 300 DPI
const CARD_WIDTH = 744; // 63mm * 300DPI / 25.4mm per inch
const CARD_HEIGHT = 1039; // 88mm * 300DPI / 25.4mm per inch

export const exportCard = async (cardData, format = 'png') => {
  try {
    // Create a temporary canvas for rendering
    const canvas = document.createElement('canvas');
    canvas.width = CARD_WIDTH;
    canvas.height = CARD_HEIGHT;
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

    // Draw layers in order
    for (const layer of cardData.layers) {
      await drawLayer(ctx, layer);
    }

    // Convert to desired format
    let dataUrl;
    switch (format.toLowerCase()) {
      case 'png':
        dataUrl = canvas.toDataURL('image/png');
        break;
      case 'jpg':
      case 'jpeg':
        dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    // Create download link
    const link = document.createElement('a');
    link.download = `card_${Date.now()}.${format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Error exporting card:', error);
    return false;
  }
};

const drawLayer = async (ctx, layer) => {
  if (layer.type === 'image') {
    const img = await loadImage(layer.src);
    ctx.drawImage(img, layer.x, layer.y, layer.width, layer.height);
  } else if (layer.type === 'text') {
    ctx.font = `${layer.fontStyle || 'normal'} ${layer.fontSize}px ${layer.fontFamily}`;
    ctx.fillStyle = layer.fill || '#000000';
    ctx.textAlign = layer.align || 'left';
    ctx.fillText(layer.text, layer.x, layer.y);
  }
};

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const batchExport = async (cards, format = 'png') => {
  const results = {
    successful: [],
    failed: []
  };

  for (const card of cards) {
    try {
      await exportCard(card, format);
      results.successful.push(card.id || card.name);
    } catch (error) {
      results.failed.push({
        card: card.id || card.name,
        error: error.message
      });
    }
  }

  return results;
};

export const exportToPDF = async () => {
  // This is a placeholder for PDF export functionality
  // You would typically use a library like jsPDF here
  throw new Error('PDF export not implemented yet');
};
