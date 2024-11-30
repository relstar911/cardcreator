import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  template: 'character',
  selectedLayer: null,
  layers: [],
  cardProperties: {
    name: '',
    zodiaxEssence: '',
    dawnAspect: '',
    lightSource: 0,
    shadowDepth: 0,
    dimensionalInfluence: [],
    cardType: 'character',
    power: 0,
    defense: 0,
    effect: '',
  },
  templates: {
    character: {
      name: 'Character Card',
      layers: [
        {
          type: 'image',
          name: 'Background Frame',
          x: 0,
          y: 0,
          width: 744,
          height: 1039,
          src: '/templates/character-frame.svg',
          effects: [
            {
              type: 'glow',
              blur: 10,
              color: '#4a90e2',
              opacity: 0.5
            }
          ]
        },
        {
          type: 'image',
          name: 'Character Art',
          x: 62,
          y: 100,
          width: 620,
          height: 500,
          effects: [
            {
              type: 'shadow',
              blur: 15,
              color: '#000000',
              opacity: 0.3
            }
          ]
        },
        {
          type: 'image',
          name: 'Essence Icon',
          x: 50,
          y: 35,
          width: 90,
          height: 90,
          src: '/templates/essence-frame.svg',
          effects: [
            {
              type: 'glow',
              blur: 8,
              color: '#e8c170',
              opacity: 0.7
            }
          ]
        },
        {
          type: 'text',
          name: 'Card Name',
          x: 372,
          y: 50,
          width: 500,
          text: 'Character Name',
          fontSize: 42,
          fontFamily: 'Cinzel',
          fill: '#ffffff',
          align: 'center',
          effects: [
            {
              type: 'glow',
              blur: 4,
              color: '#4a90e2',
              opacity: 0.8
            }
          ]
        },
        {
          type: 'text',
          name: 'Dawn Aspect',
          x: 372,
          y: 650,
          width: 500,
          text: 'Dawn Aspect',
          fontSize: 28,
          fontFamily: 'Philosopher',
          fill: '#e8c170',
          align: 'center',
          effects: [
            {
              type: 'glow',
              blur: 3,
              color: '#614b21',
              opacity: 0.6
            }
          ]
        },
        {
          type: 'text',
          name: 'Stats',
          x: 372,
          y: 750,
          width: 500,
          text: 'Power: 0 / Defense: 0',
          fontSize: 24,
          fontFamily: 'Philosopher',
          fill: '#ffffff',
          align: 'center'
        },
        {
          type: 'text',
          name: 'Effect Text',
          x: 372,
          y: 850,
          width: 600,
          text: 'Card Effect',
          fontSize: 20,
          fontFamily: 'Philosopher',
          fill: '#d4d4d4',
          align: 'center'
        }
      ]
    },
    ability: {
      name: 'Ability Card',
      layers: [
        {
          type: 'image',
          name: 'Background Frame',
          x: 0,
          y: 0,
          width: 744,
          height: 1039,
          src: '/templates/ability-frame.svg',
          effects: [
            {
              type: 'glow',
              blur: 10,
              color: '#9b59b6',
              opacity: 0.5
            }
          ]
        },
        {
          type: 'image',
          name: 'Ability Art',
          x: 62,
          y: 100,
          width: 620,
          height: 400,
          effects: [
            {
              type: 'shadow',
              blur: 15,
              color: '#000000',
              opacity: 0.3
            }
          ]
        },
        {
          type: 'text',
          name: 'Card Name',
          x: 372,
          y: 50,
          width: 500,
          text: 'Ability Name',
          fontSize: 42,
          fontFamily: 'Cinzel',
          fill: '#ffffff',
          align: 'center',
          effects: [
            {
              type: 'glow',
              blur: 4,
              color: '#9b59b6',
              opacity: 0.8
            }
          ]
        },
        {
          type: 'text',
          name: 'Effect Text',
          x: 372,
          y: 600,
          width: 600,
          text: 'Ability Effect',
          fontSize: 24,
          fontFamily: 'Philosopher',
          fill: '#d4d4d4',
          align: 'center'
        }
      ]
    },
    dimensional: {
      name: 'Dimensional Card',
      layers: [
        {
          type: 'image',
          name: 'Background Frame',
          x: 0,
          y: 0,
          width: 744,
          height: 1039,
          src: '/templates/dimensional-frame.svg',
          effects: [
            {
              type: 'glow',
              blur: 10,
              color: '#9c27b0',
              opacity: 0.5
            }
          ]
        },
        {
          type: 'image',
          name: 'Dimension Art',
          x: 62,
          y: 100,
          width: 620,
          height: 600,
          effects: [
            {
              type: 'shadow',
              blur: 15,
              color: '#000000',
              opacity: 0.3
            }
          ]
        },
        {
          type: 'text',
          name: 'Card Name',
          x: 372,
          y: 50,
          width: 500,
          text: 'Dimension Name',
          fontSize: 42,
          fontFamily: 'Cinzel',
          fill: '#ffffff',
          align: 'center',
          effects: [
            {
              type: 'glow',
              blur: 4,
              color: '#9c27b0',
              opacity: 0.8
            }
          ]
        },
        {
          type: 'text',
          name: 'Effect Text',
          x: 372,
          y: 800,
          width: 600,
          text: 'Dimensional Effect',
          fontSize: 24,
          fontFamily: 'Philosopher',
          fill: '#d4d4d4',
          align: 'center'
        }
      ]
    }
  }
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setTemplate: (state, action) => {
      state.template = action.payload;
      state.layers = [...state.templates[action.payload].layers];
    },
    setSelectedLayer: (state, action) => {
      state.selectedLayer = action.payload;
    },
    updateCardProperties: (state, action) => {
      state.cardProperties = { ...state.cardProperties, ...action.payload };
      
      // Update text layers based on card properties
      state.layers = state.layers.map(layer => {
        if (layer.type === 'text') {
          switch (layer.name) {
            case 'Card Name':
              return { ...layer, text: state.cardProperties.name || layer.text };
            case 'Dawn Aspect':
              return { ...layer, text: state.cardProperties.dawnAspect || layer.text };
            case 'Stats':
              return { ...layer, text: `Power: ${state.cardProperties.power} / Defense: ${state.cardProperties.defense}` };
            case 'Effect Text':
              return { ...layer, text: state.cardProperties.effect || layer.text };
            default:
              return layer;
          }
        }
        return layer;
      });
    },
    addLayer: (state, action) => {
      state.layers.push(action.payload);
    },
    updateLayer: (state, action) => {
      const { index, ...updates } = action.payload;
      if (index >= 0 && index < state.layers.length) {
        state.layers[index] = {
          ...state.layers[index],
          ...updates
        };
      }
    },
    removeLayer: (state, action) => {
      state.layers = state.layers.filter((_, index) => index !== action.payload);
    },
    moveLayer: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex >= 0 && 
        fromIndex < state.layers.length && 
        toIndex >= 0 && 
        toIndex < state.layers.length
      ) {
        const [movedLayer] = state.layers.splice(fromIndex, 1);
        state.layers.splice(toIndex, 0, movedLayer);
      }
    }
  }
});

export const {
  setTemplate,
  setSelectedLayer,
  updateCardProperties,
  addLayer,
  updateLayer,
  removeLayer,
  moveLayer
} = cardSlice.actions;

export default cardSlice.reducer;
