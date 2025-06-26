import { Inngest } from "inngest";
import dbConnect from "./db";

import Order from "@/models/Order";
import User from "@/models/User";
// import User from "../models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//ingesst function to save user data a databse

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await dbConnect();
    await User.create(userData);
  }
);

//ingest function to update user data in databse

export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await dbConnect();
    await User.findByIdAndUpdate(id, userData);
  }
);

//inngest function to delete user from database

export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await dbConnect();
    await User.findByIdAndDelete(id);
  }
);

//ingest fuction to create usrs odrdr in database
export const createUserOrder = inngest.createFunction(
  {
    id: "create-user-order",
    batchEvents: {
      maxSize: 25,
      timeout: "5s",
    },
  },
  { event: "order/created" },
  async ({ events }) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        // status:event.data.status,
        date: event.data.date,
      };
    });
    await dbConnect();
    await Order.insertMany(orders);
    return { success: true, processed: orders.length };
  }
);
