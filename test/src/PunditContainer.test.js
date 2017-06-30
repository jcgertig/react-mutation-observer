// import PunditContainer from '../../src/PunditContainer';
//
// test('getGenerator should work when the request exists', () => {
//   expect(PunditContainer.getGenerator('rectangle')).toBe(PunditContainer.rectangle);
// });
//
// test('getGenerator should work when the request does not exist', () => {
//   expect(PunditContainer.getGenerator('bogus')).toBeNull();
// });
//
// test('parallelogram should work', () => {
//   expect(PunditContainer.parallelogram(0, 1, 0, 1)).toEqual(
//     [
//       { q: 0, r: 0, s: -0 },
//       { q: 0, r: 1, s: -1 },
//       { q: 1, r: 0, s: -1 },
//       { q: 1, r: 1, s: -2 },
//     ],
//   );
// });
//
// test('triangle should work', () => {
//   expect(PunditContainer.triangle(1)).toEqual(
//     [
//       { q: 0, r: 0, s: -0 },
//       { q: 0, r: 1, s: -1 },
//       { q: 1, r: 0, s: -1 },
//     ],
//   );
// });
//
// test('hexagon should work', () => {
//   expect(PunditContainer.hexagon(1)).toEqual(
//     [
//       { q: -1, r: 0, s: 1 },
//       { q: -1, r: 1, s: 0 },
//       { q: 0, r: -1, s: 1 },
//       { q: 0, r: 0, s: -0 },
//       { q: 0, r: 1, s: -1 },
//       { q: 1, r: -1, s: 0 },
//       { q: 1, r: 0, s: -1 },
//     ],
//   );
// });
//
// test('rectangle should work', () => {
//   expect(PunditContainer.rectangle(3, 3)).toEqual(
//     [
//       { q: -0, r: 0, s: 0 },
//       { q: 1, r: 0, s: -1 },
//       { q: 2, r: 0, s: -2 },
//       { q: -0, r: 1, s: -1 },
//       { q: 1, r: 1, s: -2 },
//       { q: 2, r: 1, s: -3 },
//       { q: -1, r: 2, s: -1 },
//       { q: 0, r: 2, s: -2 },
//       { q: 1, r: 2, s: -3 },
//     ],
//   );
// });
//
// test('orientedRectangle should work', () => {
//   expect(PunditContainer.orientedRectangle(3, 3)).toEqual(
//     [
//       { q: 0, r: -0, s: 0 },
//       { q: 0, r: 1, s: -1 },
//       { q: 0, r: 2, s: -2 },
//       { q: 1, r: -0, s: -1 },
//       { q: 1, r: 1, s: -2 },
//       { q: 1, r: 2, s: -3 },
//       { q: 2, r: -1, s: -1 },
//       { q: 2, r: 0, s: -2 },
//       { q: 2, r: 1, s: -3 },
//     ],
//   );
// });
