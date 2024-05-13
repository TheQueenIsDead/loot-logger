import * as Realm from "realm-web";

export type MongoHistoryLog = {
    _id?: Realm.BSON.ObjectId,
    owner_id: string,
    start: Date,
    end: Date,
    wage: number,
}
