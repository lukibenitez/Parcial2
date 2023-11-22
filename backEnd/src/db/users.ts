// src/db/users.ts
import { User } from "../models/user";

const users: User[] = [
    // {
    //     id: 0,
    //     username: "lucas",
    //     password: "$2b$10$RrSFL15qgPQs90JYWctoTe5iO3OmVUiLo3Z098xbV.eb/WFznljUy",
    // },
];

export const findUserByUsername = (username: string): User | undefined => {
    return users.find((user) => user.username === username);
};

// export const saveUser = (username: string, password: string): void => {
//     const newUserId = users.length++;
//     const newUser: User = { id: newUserId, username, password };
//     users.concat(newUser);
// };
export const saveUser = (username: string, password: string): void => {
    const newUserId = users.length;
    const newUser: User = { id: newUserId, username, password };
    users.push(newUser);
};
