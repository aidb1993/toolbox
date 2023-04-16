jest.mock('react-redux', () => {
    return {
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn().mockImplementation(() => ({})),
      useDispatch: () => jest.fn(),
    };
  });
  