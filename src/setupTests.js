import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock Konva
jest.mock('react-konva', () => ({
  Stage: 'Stage',
  Layer: 'Layer',
  Image: 'Image',
  Text: 'Text',
  Group: 'Group',
}));

// Mock useImage hook
jest.mock('use-image', () => ({
  __esModule: true,
  default: () => [null, { loading: false, error: null }],
}));
