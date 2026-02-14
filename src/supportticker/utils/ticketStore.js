// ticketStore.js
import { openDB } from "idb";

const DB_NAME = "celitixSupportDB";
const STORE_NAME = "user_tickets";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveTicketLocal = async (ticket) => {
  const db = await initDB();
  // We store the full object: res.data from the ticket creation API
  return db.put(STORE_NAME, ticket);
};

export const getLocalTickets = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};
