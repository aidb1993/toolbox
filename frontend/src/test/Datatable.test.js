import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Datatable from '../components/Datatable';
import '@testing-library/jest-dom/extend-expect';


describe('Datatable Component', () => {
  const mockStore = configureStore();
  let store;
  let component;

  beforeEach(() => {
    const initialState = {
      files: {
        fileData: {
          loading: false,
          error: null,
          data: [
            {
              file: 'test1.csv',
              lines: [
                { text: 'line 1', number: 1, hex: '0x1' },
                { text: 'line 2', number: 2, hex: '0x2' },
              ],
            },
          ],
        },
      },
    };
    store = mockStore(initialState);
    component = render(
      <Provider store={store}>
        <Datatable />
      </Provider>
    );
  });

  it('renders table with expected headers', () => {
    const headers = component.getAllByRole('columnheader');
    expect(headers[0]).toHaveTextContent('File Name');
    expect(headers[1]).toHaveTextContent('Text');
    expect(headers[2]).toHaveTextContent('Number');
    expect(headers[3]).toHaveTextContent('Hex');
  });

  it('renders table with expected data', () => {
    const rows = component.getAllByRole('row');
    const dataRows = rows.slice(1);
    expect(dataRows).toHaveLength(2);
    expect(dataRows[0]).toHaveTextContent('test1.csv');
    expect(dataRows[0]).toHaveTextContent('line 1');
    expect(dataRows[0]).toHaveTextContent('1');
    expect(dataRows[0]).toHaveTextContent('0x1');
    expect(dataRows[1]).toHaveTextContent('test1.csv');
    expect(dataRows[1]).toHaveTextContent('line 2');
    expect(dataRows[1]).toHaveTextContent('2');
    expect(dataRows[1]).toHaveTextContent('0x2');
  });

  it('renders loading message when data is loading', () => {
    store = mockStore({
      files: {
        fileData: {
          loading: true,
          error: null,
          data: null,
        },
      },
    });
    component.rerender(
      <Provider store={store}>
        <Datatable />
      </Provider>
    );
    expect(component.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    store = mockStore({
      files: {
        fileData: {
          loading: false,
          error: 'Failed to load data',
          data: null,
        },
      },
    });
    component.rerender(
      <Provider store={store}>
        <Datatable />
      </Provider>
    );
    expect(component.getByText('Failed to load data')).toBeInTheDocument();
  });
});
