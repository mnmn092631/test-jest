const { afterUploadImage, uploadPost } = require("./post");
const { Post, Hashtag } = require("../models");

it("afterUploadImage는 res.json으로 url을 반환해야 한다", () => {
  const req = {
    file: {
      filename: "test.png",
    },
  };
  const res = {
    json: jest.fn(),
  };
  afterUploadImage(req, res);
  expect(res.json).toHaveBeenCalledWith({ url: "/img/test.png" });
});

describe("uploadPost", () => {
  it("게시글 등록 시 실패하면 에러 처리 함수를 호출한다", async () => {
    const error = new Error();
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    jest.spyOn(Post, "create").mockRejectedValue(error);

    await uploadPost({ body: {}, user: {} }, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(res.redirect).not.toHaveBeenCalled();
  });

  it("게시글 등록 성공 후 해시태그가 없으면 /로 돌려보낸다", async () => {
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    const newPost = {
      addHashtag: jest.fn(),
    };
    jest.spyOn(Post, "create").mockResolvedValue(newPost);
    jest.spyOn(Hashtag, "findOrCreate").mockImplementation();

    await uploadPost(
      {
        body: {
          content: "게시글",
          url: "주소",
        },
        user: { id: 1 },
      },
      res,
      next,
    );
    expect(Post.create).toHaveBeenCalledWith({
      content: "게시글",
      img: "주소",
      UserId: 1,
    });
    expect(next).not.toHaveBeenCalled();
    expect(newPost.addHashtag).not.toHaveBeenCalled();
    expect(Hashtag.findOrCreate).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/");
  });

  it("게시글 등록 성공 후 해시태그가 있으면 해시태그까지 저장 후 /로 돌려보낸다", async () => {
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    const newPost = {
      addHashtags: jest.fn(),
    };
    jest.spyOn(Post, "create").mockResolvedValue(newPost);
    jest
      .spyOn(Hashtag, "findOrCreate")
      .mockResolvedValueOnce(["결과1"])
      .mockResolvedValueOnce(["결과2"]);

    await uploadPost(
      {
        body: {
          content: "#게시글 #해시태그",
          url: "주소",
        },
        user: { id: 1 },
      },
      res,
      next,
    );
    expect(Post.create).toHaveBeenCalledWith({
      content: "#게시글 #해시태그",
      img: "주소",
      UserId: 1,
    });
    expect(next).not.toHaveBeenCalled();
    expect(Hashtag.findOrCreate).toHaveBeenCalledTimes(2);
    expect(Hashtag.findOrCreate.mock.calls[0][0].where.title).toBe("게시글");
    expect(Hashtag.findOrCreate.mock.calls[1][0].where.title).toBe("해시태그");
    expect(newPost.addHashtags).toHaveBeenCalledTimes(1);
    expect(newPost.addHashtags).toHaveBeenCalledWith(["결과1", "결과2"]);
    expect(res.redirect).toHaveBeenCalledWith("/");
  });
});
