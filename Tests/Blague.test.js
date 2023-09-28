import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import Blague from '../WidgetFaces/Blague';

jest.mock('blagues-api', () => {
  return jest.fn().mockImplementation(() => {
    return {
      random: jest.fn().mockResolvedValue({
        joke: 'Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?',
        answer: 'Parce que sinon ils tombent toujours dans le bateau.'
      })
    };
  });
});

describe('<Blague />', () => {
  it('has initial state correctly set', async () => {
    const { queryByText } = render(<Blague />);
    expect(queryByText(/Pourquoi/)).toBeNull();
    expect(queryByText(/Parce que/)).toBeNull();
  });

  it('fetches and displays joke and answer', async () => {
    const { getByText } = render(<Blague />);
    await waitFor(() => {
      expect(getByText('Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?')).toBeTruthy();
      expect(getByText('Parce que sinon ils tombent toujours dans le bateau.')).toBeTruthy();
    });
  });
});
