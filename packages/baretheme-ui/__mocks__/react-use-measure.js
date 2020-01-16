export default jest.fn().mockImplementation(() => {
  const ref = { current: null };
  return [ref, {
    width: 100,
    height: 100,
  }];
});
