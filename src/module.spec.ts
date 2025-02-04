import { obj } from "./module";

// jest.mock은 호이스팅 됨
// 모듈로 불러온 객체의 메서드 전부에 spy를 삽입한 것
// 두번째 인수에 콜백함수로 모듈을 바꿀 수도 있음
// jest.mock("./module", () => {
//   return {
//     obj: { a: "b" },
//   };
// });
jest.mock("./module", () => {
  return {
    ...jest.requireActual("./module"), // 모듈의 원본을 가져옴
    obj: {
      ...jest.requireActual("./module").obj,
      // 특정 메서드만 바꿈
      method3: jest.fn(),
    },
  };
});
test("모듈을 전부 모킹", () => {
  console.log(obj);
});

// 모듈에 있는 속성만 모킹
test("모듈에 있는 속성만 모킹", () => {
  jest.replaceProperty(obj, "prop", "replaced");
});
