import { useState } from 'react';
import { batchExport } from '../utils/export';

const BatchProcessor = () => {
  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState({ successful: [], failed: [] });

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setQueue(prevQueue => [...prevQueue, ...files]);
  };

  const handleProcess = async (format) => {
    if (queue.length === 0 || processing) return;

    setProcessing(true);
    const batchResults = await batchExport(queue, format);
    setResults(batchResults);
    setProcessing(false);
    setQueue([]);
  };

  return (
    <div className="batch-processor">
      <h2>Batch Processing</h2>
      
      <div className="batch-controls">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={processing}
        />
        
        <div className="queue-info">
          {queue.length} files in queue
        </div>
        
        <div className="export-buttons">
          <button 
            onClick={() => handleProcess('png')}
            disabled={queue.length === 0 || processing}
          >
            Export as PNG
          </button>
          <button 
            onClick={() => handleProcess('jpeg')}
            disabled={queue.length === 0 || processing}
          >
            Export as JPEG
          </button>
        </div>
      </div>

      {processing && (
        <div className="processing-status">
          Processing...
        </div>
      )}

      {(results.successful.length > 0 || results.failed.length > 0) && (
        <div className="results">
          <h3>Results</h3>
          
          {results.successful.length > 0 && (
            <div className="successful">
              <h4>Successful ({results.successful.length})</h4>
              <ul>
                {results.successful.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {results.failed.length > 0 && (
            <div className="failed">
              <h4>Failed ({results.failed.length})</h4>
              <ul>
                {results.failed.map((item, index) => (
                  <li key={index}>
                    {item.name}: {item.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BatchProcessor;
