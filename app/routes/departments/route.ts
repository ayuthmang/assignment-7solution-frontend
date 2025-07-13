import { data } from "@remix-run/node";
import { UserResponse, type User } from "./type";

async function getUsers(): Promise<UserResponse> {
  const response = await fetch("https://dummyjson.com/users");
  return await response.json();
}

export function usersByDepartment(users: User[]) {
  return users.reduce((acc, user) => {
    const department = user.company.department || "Unknown";
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(user);
    return acc;
  }, {} as Record<string, UserResponse["users"]>);
}

/**
 * {
        [Department]: {
            "male": 1,                      // ---> Male Count Summary
            "female": 1,                    // ---> Female Count Summary
            "ageRange": "XX-XX",            // ---> Range
            "hair": {                       // ---> "Color": Color Summary
                "Black": 1,
                "Blond": 1,
                "Chestnut": 1,
                "Brown": 1
            },
            "addressUser": {                // ---> "firstNamelastName": postalCode
                "TerryMedhurst": "XXXXX",
            }
        }
    },
 */
export function summarizeUsers(users: User[]) {
  const summaryByDepartment = users.reduce(
    (acc, curr) => {
      const maleCount = curr.gender === "male" ? 1 : 0;
      const femaleCount = curr.gender === "female" ? 1 : 0;

      acc["male"] += maleCount;
      acc["female"] += femaleCount;

      // Age Range
      const age = curr.age;
      acc["_ageRange"].push(age);

      // Hair Color
      const hairColor = curr.hair.color;
      if (hairColor) {
        acc["hair"][hairColor] = (acc["hair"][hairColor] || 0) + 1;
      }

      // Address User
      const addressKey = `${curr.firstName}${curr.lastName}`;
      acc["addressUser"][addressKey] = curr.address.postalCode;

      return acc;
    },
    {
      male: 0,
      female: 0,
      ageRange: "", // 'xx-xx'
      _ageRange: [], // to collect all age ranges
      hair: {
        // [color: string]: number;
      },
      addressUser: {
        // [key: string]: string; // firstName + lastName as key, postalCode as value
      },
    } as unknown as {
      male: number;
      female: number;
      ageRange: string; // 'xx-xx'
      _ageRange: number[]; // to collect all age ranges
      hair: {
        [color: string]: number;
      };
      addressUser: {
        [key: string]: string; // firstName + lastName as key, postalCode as value
      };
    }
  );

  const minAge = Math.min(...summaryByDepartment._ageRange);
  const maxAge = Math.max(...summaryByDepartment._ageRange);
  summaryByDepartment.ageRange = `${minAge}-${maxAge}`;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error // I cannot make typescript happy here
  delete summaryByDepartment._ageRange;

  return summaryByDepartment;
}

/**
 * @returns  {
        [Department]: {
            "male": 1,                      // ---> Male Count Summary
            "female": 1,                    // ---> Female Count Summary
            "ageRange": "XX-XX",            // ---> Range
            "hair": {                       // ---> "Color": Color Summary
                "Black": 1,
                "Blond": 1,
                "Chestnut": 1,
                "Brown": 1
            },
            "addressUser": {                // ---> "firstNamelastName": postalCode
                "TerryMedhurst": "XXXXX",
            }
        }
    },
 */
export async function loader() {
  const { users } = await getUsers();
  const _usersByDepartment = usersByDepartment(users);
  const summarizedData = Object.entries(_usersByDepartment).reduce(
    (acc, [department, users]) => {
      acc[department] = summarizeUsers(users);
      return acc;
    },
    {} as Record<string, ReturnType<typeof summarizeUsers>>
  );
  return data(summarizedData);
}
