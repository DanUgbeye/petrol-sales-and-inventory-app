import { NextResponse } from "next/server";
import { BaseException } from "../exceptions";

export default class ServerResponse {
  static success(message: string): any;
  static success(message: string, code: number): any;
  static success(message: string, data: any): any;
  static success(message: string, data: any, code: number): any;
  static success(...args: any[]) {
    let code: number = 200;
    let data: any = undefined;
    let message: string = "";

    switch (args.length) {
      case 1:
        message = args[0];
        code = 200;
        break;

      case 2:
        message = args[0];
        if (typeof args[1] === "number") {
          code = args[1];
        } else {
          data = args[1];
        }
        break;

      default:
        message = args[0];
        data = args[1];
        code = args[2];
    }

    return NextResponse.json(
      {
        success: true,
        code,
        message,
        data,
      },
      {
        status: code,
      }
    );
  }

  static error(error: BaseException): any;
  static error(error: Error): any;
  static error(message: string, code: number): any;
  static error(...args: any[]): any {
    let errorObject: BaseException;

    switch (args.length) {
      case 1: {
        if (args[0] instanceof BaseException) {
          errorObject = args[0];
        } else {
          let err: Error = args[0];
          errorObject = new BaseException(err.message);
        }
        break;
      }

      default: {
        errorObject = new BaseException(args[0], args[1]);
      }
    }

    return NextResponse.json(
      {
        success: false,
        ...errorObject.getObject(),
      },
      {
        status: errorObject.getCode(),
      }
    );
  }
}
