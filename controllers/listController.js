import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import List from "../models/List.js";
import User from "../models/User.js";

export const getLists = async (req, res) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  const { email } = user;
  const lists = await List.find({ userId: id });

  const otherLists = await List.find({ users: { $in: email } });

  res.status(StatusCodes.OK).json({ lists, otherLists });
};

export const delList = async (req, res) => {
  const { id } = req.body;
  await List.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({});
};

export const delItem = async (req, res) => {
  const { id, item } = req.body;
  const list = await List.findById(id);
  const { items } = list;
  const newItems = items.filter((oldItem) => {
    return oldItem._id != item._id;
  });
  await List.findByIdAndUpdate(id, { items: newItems }, { new: true });
  res.status(StatusCodes.OK).json({});
};

export const addList = async (req, res) => {
  const id = req.user.userId;
  const { name, items } = req.body.list;
  const users = req.body.users;
  const newItems = items.map((item, i) => {
    return { name: item };
  });
  const list = await List.create({
    name: name,
    items: [...newItems],
    userId: id,
    users: users,
  });

  res.status(StatusCodes.OK).json({
    list,
  });
};

export const updateList = async (req, res) => {
  const { values, users } = req.body;
  const newItems = values.items.map((item, i) => {
    return { name: item };
  });
  const list = await List.findByIdAndUpdate(values.id, {
    items: [...newItems],
    name: values.name,
    users: users,
  });
  res.status(StatusCodes.OK).json({});
};

export const addUser = async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) {
    throw new BadRequestError("could not find user");
  }
  res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
};

export const addFriend = async (req, res) => {
  const id = req.user.userId;
  const friend = await User.findOne(req.body);

  if (!friend) {
    throw new BadRequestError("could not find user");
  }
  await User.findOneAndUpdate(req.body, {
    requests: [...friend.requests, id],
  });
};

export const delFriend = async (req, res) => {
  const id = req.user.userId;
  const { email } = req.body;
  const friend = await User.findOneAndUpdate(
    { email: email },
    { $pull: { friends: id } }
  );
  await User.findByIdAndUpdate(id, { $pull: { friends: String(friend._id) } });
  res.status(StatusCodes.OK).json({});
};

export const getRequests = async (req, res) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  const { requests } = user;
  const requstedUser = await User.find({ _id: { $in: requests } });
  const requestsFormatted = requstedUser.map((user) => {
    return { email: user.email, name: user.name };
  });
  res.status(StatusCodes.OK).json(requestsFormatted);
};

export const getFriends = async (req, res) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  const friends = await User.find({ _id: { $in: user.friends } });

  const friendsFormatted = friends.map((friend) => {
    return { email: friend.email, name: friend.name };
  });

  res.status(StatusCodes.OK).json(friendsFormatted);
};

export const handleRequest = async (req, res) => {
  const { email, type } = req.body;
  const id = req.user.userId;

  if (type === true) {
    const userRequest = await User.findOneAndUpdate(
      { email },
      {
        $push: { friends: id },
      }
    );

    const userRequestId = String(userRequest._id);

    await User.findOneAndUpdate(
      { _id: id },
      {
        $push: { friends: userRequestId },
        $pull: { requests: userRequestId },
      }
    );
  } else {
    const userRequest = await User.findOne({ email });
    const userRequestId = String(userRequest._id);

    await User.findOneAndUpdate(
      { _id: id },
      {
        $pull: { requests: userRequestId },
      }
    );
  }
  res.status(StatusCodes.OK).json({});
};

export const getAllData = async (req, res) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  const { requests, email } = user;

  const requstedUser = await User.find({ _id: { $in: requests } });
  const requestsFormatted = requstedUser.map((user) => {
    return { email: user.email, name: user.name };
  });

  const friends = await User.find({ _id: { $in: user.friends } });
  const friendsFormatted = friends.map((friend) => {
    return { email: friend.email, name: friend.name };
  });

  const lists = await List.find({ userId: id });
  const otherLists = await List.find({ users: { $in: email } });

  res
    .status(StatusCodes.OK)
    .json({ requestsFormatted, lists, otherLists, friendsFormatted });
};
