import { sum } from "./toBe";

// jest를 설치하면 전역으로 test라는 함수를 넣어줌
// 첫번째 인수: 설명
// 두번째 인수: 실제로 실행될 테스트
test("sum 함수는 두 숫자를 더해야 한다", () => {
  // expect 안에서 실제 테스트를 실행하면 됨
  // sum(1, 2)가 3이 되기를 기대한다는 뜻
  expect(sum(1, 2)).toBe(3);
});
