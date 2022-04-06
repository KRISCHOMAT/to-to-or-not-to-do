import express from "express";
const app = express();
const router = express.Router();

import {
  getLists,
  addList,
  delList,
  delItem,
  updateList,
  addUser,
  addFriend,
  delFriend,
  getRequests,
  handleRequest,
  getFriends,
  getAllData,
} from "../controllers/listController.js";

router.route("/get-lists").get(getLists);
router.route("/add-list").post(addList);
router.route("/del-list").delete(delList);
router.route("/del-item").patch(delItem);
router.route("/update-list").patch(updateList);
router.route("/add-user").post(addUser);
router.route("/add-friend").post(addFriend);
router.route("/del-friend").patch(delFriend);
router.route("/get-requests").get(getRequests);
router.route("/handle-request").post(handleRequest);
router.route("/get-friends").get(getFriends);
router.route("/get-all-data").get(getAllData);

export default router;
