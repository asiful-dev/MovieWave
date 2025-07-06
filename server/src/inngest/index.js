import { Inngest } from "inngest"
import { User } from "../models/user.models.js"

export const inngest = new Inngest({
    id: "MovieWave", 
    eventKey: process.env.INNGEST_EVENT_KEY,
    signingKey: process.env.INNGEST_SIGNING_KEY,
});

export const testFunction= inngest.createFunction(
  { id: "test-sync" },
  { event: "test.sync" },
  async () => {
    console.log("✅ Synced successfully!");
    return { success: true };
  }
)

const syncUserCreation = inngest.createFunction(
    { id: "sync-user-creation" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const {
            id,
            first_name,
            last_name,
            email_addresses,
            image_url
        } = event.data;


        const user = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            avatar: image_url
        }

        await User.create(user);
    }
)


const syncUserDeletion = inngest.createFunction(
    { id: "sync-user-deletion" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;
        await User.findByIdAndDelete(id);
    }
)

const syncUserUpdation = inngest.createFunction(
    { id: "sync-user-updation" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        const updatedUser = {
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            avatar: image_url
        }
        await User.findByIdAndUpdate(
            id,
            updatedUser,
            {
                new: true
            }
        );
    }
)



export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    testFunction
]