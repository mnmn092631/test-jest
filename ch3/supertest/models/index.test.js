beforeEach(() => {
  jest.resetModules();
});

it("models/index.js가 잘 실행된다", () => {
  const db = require("./index");
  jest.spyOn(db.Hashtag, "initiate").mockImplementation();
  jest.spyOn(db.Post, "initiate").mockImplementation();
  jest.spyOn(db.User, "initiate").mockImplementation();
  expect(db).toBeDefined();
});

it("models/indes.js가 NODE_ENV가 undefined일 때도 잘 실행된다", () => {
  delete process.env.NODE_ENV;
  const db = require("./index");
  process.env.NODE_ENV = undefined;
  jest.spyOn(db.Hashtag, "initiate").mockImplementation();
  jest.spyOn(db.Post, "initiate").mockImplementation();
  jest.spyOn(db.User, "initiate").mockImplementation();
  expect(db).toBeDefined();
});
