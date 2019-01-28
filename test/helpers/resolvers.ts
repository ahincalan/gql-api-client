import {database} from "./data";

export const resolvers = {

    user: (parent: any) => {
        for (let i in database.users.items) {
            if (database.users.items[i]['id'] == parent.id) {
                return database.users.items[i];
            }
        }
    },
    users: () => {
        return "users";
    }

};
