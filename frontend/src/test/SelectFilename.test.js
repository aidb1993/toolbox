import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SelectFilename from '../components/SelectFilename';
import '@testing-library/jest-dom/extend-expect';

describe('SelectFilename component', () => {
  const mockStore = configureStore();
  const options = ['test1.csv', 'test2.csv', 'test3.csv'];
  const selection = 'test2.csv';
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      files: { options, selection }
    });
    component = render(
      <Provider store={store}>
        <SelectFilename />
      </Provider>
    );
  });

  it('renders a select element with the given options and selection', () => {
    const select = component.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(selection);
    expect(select.options.length).toBe(options.length + 1);
    options.forEach(option => {
      expect(select).toHaveTextContent(option);
    });
  });

  it('dispatches the setSelection action when the select value changes', () => {
    const select = component.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'test3.csv' } });
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'files/setSelection', payload: 'test3.csv' }]);
  });
});
