import filesReducer, { setFileData, setSelection, setOptions } from '../features/files/filesSlice';

describe('filesSlice', () => {
  it('should set file data correctly', () => {
    const initialState = {
      fileData: {
        data: [],
        error: null,
        loading: false
      },
      selection: "all",
      options : []
    };

    const newFileData = {
      data: [{ id: 1, name: 'file1' }],
      error: null,
      loading: false
    };

    const action = setFileData(newFileData);
    const state = filesReducer(initialState, action);

    expect(state.fileData).toEqual(newFileData);
  });

  it('should set selection correctly', () => {
    const initialState = {
      fileData: {
        data: [],
        error: null,
        loading: false
      },
      selection: "all",
      options : []
    };

    const newSelection = "file1";

    const action = setSelection(newSelection);
    const state = filesReducer(initialState, action);

    expect(state.selection).toEqual(newSelection);
  });

  it('should set options correctly', () => {
    const initialState = {
      fileData: {
        data: [],
        error: null,
        loading: false
      },
      selection: "all",
      options : []
    };

    const newOptions = ['file1', 'file2'];

    const action = setOptions(newOptions);
    const state = filesReducer(initialState, action);

    expect(state.options).toEqual(newOptions);
  });
});
