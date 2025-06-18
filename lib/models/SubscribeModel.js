import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  blogAuthorEmail: {
    type: String,
    required: true,
  },
  blogAuthorImg: {
    type: String,
  },
  subscriberEmail: {
    type: String,
    required: true,
  },
  subscriberImg: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SubscribeModel =
  mongoose.models.Subscribe || mongoose.model("Subscribe", subscribeSchema);

export default SubscribeModel;
