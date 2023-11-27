"use client"

class UserModel {
  constructor(public data: string) {}

  async get() {
    return this.data;
  }

  async create() {}

  async update(data: string) {
    console.log("updating to ", data)
    this.data = data;
  }

  async delete() {}
}

const userModel = new UserModel("hello world");
console.log("running through")
export function currentState() {
  console.log(userModel.data, "current State");
  userModel.update("works")
}
export default userModel;
