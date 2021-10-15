import Counter from '../comments/commentCounter';

test('Counter should be a function', () => {
  expect(typeof Counter).toBe('function');
});
test('Counter should return a number', () => {
  const commentList = [];
  expect(typeof Counter(commentList)).toBe('number');
});
test('Counter should return 2', () => {
  const commentList = [
    {
      id: '1',
    },
    {
      id: '2',
    },
  ];
  expect(Counter(commentList)).toBe(2);
});