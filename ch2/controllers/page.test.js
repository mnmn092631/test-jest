jest.mock("../models");

const {
  renderProfile,
  renderJoin,
  renderMain,
  renderHashtag,
} = require("./page");
const { Post } = require("../models");

it("rendersProfile은 res.render profile을 호출해야 한다", () => {
  const res = { render: jest.fn() };

  renderProfile({}, res);
  expect(res.render).toHaveBeenCalledWith("profile", {
    title: "내 정보 - NodeBird",
  });
});

it("renderJoin은 res.render join을 호출해야 한다", () => {
  const res = { render: jest.fn() };

  renderJoin({}, res);
  expect(res.render).toHaveBeenCalledWith("join", {
    title: "회원가입 - NodeBird",
  });
});

describe("renderMain", () => {
  it("게시글 조회 시 에러가 발생한다면 에러처리함수로 에러를 넘긴다", async () => {
    const error = new Error();
    jest.spyOn(Post, "findAll").mockRejectedValue(error);
    const res = {
      render: jest.fn(),
    };
    const next = jest.fn();

    await renderMain({}, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });

  it("게시글 조회한 것을 res.render로 화면에 렌더링한다", async () => {
    jest.spyOn(Post, "findAll").mockResolvedValue([{ id: 1 }, { id: 2 }]);
    const res = {
      render: jest.fn(),
    };
    const next = jest.fn();

    await renderMain({}, res, next);
    expect(res.render).toHaveBeenCalledWith("main", {
      title: "NodeBird",
      twits: [{ id: 1 }, { id: 2 }],
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("renderHashtag", async () => {
  it("hashtag 쿼리스트링이 없으면 /로 돌려보낸다", async () => {
    const res = {
      render: jest.fn(),
      redirect: jest.fn(),
    };
    const next = jest.fn();

    await renderHashtag({ query: {} }, {}, () => {});
    expect(res.render).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});
