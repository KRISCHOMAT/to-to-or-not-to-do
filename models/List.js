import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({ name: String });
const myItems = mongoose.model("Item", ItemSchema);

const ListSchema = new mongoose.Schema({
  name: String,
  items: [{ name: String }],
  userId: String,
  users: { type: Array },
});

export default mongoose.model("List", ListSchema);
