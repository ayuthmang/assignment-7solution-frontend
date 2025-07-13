import {data} from "@remix-run/node";
import {UserResponse} from "./type";
import {groupBy} from 'lodash'

async function getUsers(): Promise<UserResponse> {
    const response = await fetch("https://dummyjson.com/users");
    return await response.json();
}

function usersByDepartment(users: UserResponse) {
    return groupBy(users.users, user => user.company.department || "Unknown");

    // return users.users.reduce((acc, user) => {
    //     const department = user.company.department || "Unknown";
    //     if (!acc[department]) {
    //         acc[department] = [];
    //     }
    //     acc[department].push(user);
    //     return acc;
    // }, {} as Record<string, UserResponse["users"]>);
}

export async function loader() {
    const users = await getUsers()
    return data(usersByDepartment(users));
}