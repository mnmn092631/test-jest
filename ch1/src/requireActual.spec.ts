jest.mock("./mockFunc");
jest.mock("./mockClass");

import func from "./mockFunc";
import c from "./mockClass";

it("func와 c가 정의되어 있어야 한다.", () => {
  console.log(func, new c().methodA, new c().methodB);
  // 모킹 안된 원본을 가져오기
  const original = jest.requireActual("./mockFunc");
  console.log(original);
  // toBeDefined는 값이 undefined만 아니면 pass 됨
  expect(func).toBeDefined();
  expect(c).toBeDefined();
});
