import { createSlice } from '@reduxjs/toolkit';

export const cardTemplates = {
  blank: {
    name: 'Blank Card',
    width: 2.5,
    height: 3.5,
  },
  creature: {
    name: 'Creature Card',
    width: 2.5,
    height: 3.5,
    zones: ['art', 'name', 'type', 'description', 'stats'],
  },
  spell: {
    name: 'Spell Card',
    width: 2.5,
    height: 3.5,
    zones: ['art', 'name', 'type', 'description', 'cost'],
  },
};

const initialState = {
  cardSize: {
    width: 2.5, // inches
    height: 3.5, // inches
  },
  safeZone: {
    enabled: true,
    margin: 0.125, // inches
  },
  bleedArea: {
    enabled: true,
    size: 0.125, // inches
  },
  layers: [],
  selectedLayer: null,
  template: 'blank',
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addLayer: (state, action) => {
      state.layers.push(action.payload);
    },
    updateLayer: (state, action) => {
      const { index, layer } = action.payload;
      state.layers[index] = { ...state.layers[index], ...layer };
    },
    removeLayer: (state, action) => {
      state.layers.splice(action.payload, 1);
      if (state.selectedLayer === action.payload) {
        state.selectedLayer = null;
      }
    },
    setSelectedLayer: (state, action) => {
      state.selectedLayer = action.payload;
    },
    setTemplate: (state, action) => {
      state.template = action.payload;
      // You could add logic here to set up default layers based on the template
    },
  },
});

export const { addLayer, updateLayer, removeLayer, setSelectedLayer, setTemplate } = cardSlice.actions;

export default cardSlice.reducer;
