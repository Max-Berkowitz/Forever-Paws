test('should fail', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});
