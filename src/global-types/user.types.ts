export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_ROLES = {
  MANAGER: "manager",
  EMPLOYEE: "employee",
} as const;

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  sex: string;
  phoneNumber: string;
  password: string;
}

export type UserLoginData = {
  email: string;
  password: string;
};

export type NewEmployeeData = {
  email: string;
  name: string;
  password: string;
  sex: string;
  phoneNumber: string;
};
