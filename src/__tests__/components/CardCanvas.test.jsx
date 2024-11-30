// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CardCanvas from '../../components/CardCanvas';

const mockStore = configureStore([]);

describe('CardCanvas', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      card: {
        cardProperties: {
          cardType: 'character',
          name: 'Test Card',
          description: 'Test Description',
          attack: 1000,
          defense: 1000,
          essence: 'guardian',
          dawnAspect: 'warrior'
        },
        effects: [],
        template: 'character-frame'
      }
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <CardCanvas />
      </Provider>
    );
    expect(screen.getByTestId('card-canvas')).toBeInTheDocument();
  });

  it('displays card name', () => {
    render(
      <Provider store={store}>
        <CardCanvas />
      </Provider>
    );
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('uses correct template based on card type', () => {
    render(
      <Provider store={store}>
        <CardCanvas />
      </Provider>
    );
    const canvas = screen.getByTestId('card-canvas');
    expect(canvas.getAttribute('data-template')).toBe('character-frame');
  });
});
