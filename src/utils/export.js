export const exportCard = async (stage, format = 'png') => {
  if (!stage) {
    throw new Error('Stage reference is required for export');
  }

  // Get the stage dimensions
  const width = stage.width();
  const height = stage.height();

  // Create a temporary canvas at the same size
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = width;
  tempCanvas.height = height;

  // Draw the stage onto the canvas
  const context = tempCanvas.getContext('2d');
  stage.toCanvas({
    pixelRatio: 2, // Higher quality export
    callback: (canvas) => {
      context.drawImage(canvas, 0, 0);
    }
  });

  // Convert to desired format
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const quality = format === 'png' ? 1 : 0.92;

  // Create download link
  const link = document.createElement('a');
  link.download = `card-export-${Date.now()}.${format}`;
  
  // Convert canvas to blob
  const blob = await new Promise(resolve => tempCanvas.toBlob(resolve, mimeType, quality));
  link.href = URL.createObjectURL(blob);
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Cleanup
  URL.revokeObjectURL(link.href);
};

export const batchExport = async (cards, format = 'png') => {
  const results = {
    successful: [],
    failed: []
  };

  for (const card of cards) {
    try {
      await exportCard(card.stage, format);
      results.successful.push(card.name);
    } catch (error) {
      results.failed.push({
        name: card.name,
        error: error.message
      });
    }
  }

  return results;
};

export const exportToPDF = async (stage) => {
  // This is a placeholder for PDF export functionality
  // You would typically use a library like jsPDF here
  throw new Error('PDF export not implemented yet');
};
