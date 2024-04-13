import {Storage} from "@ionic/storage";

let store: Storage | null = null
export default async function GetStore() {
    if (store === null) {
        store = new Storage();
        await store.create();
    }
    return store
}

