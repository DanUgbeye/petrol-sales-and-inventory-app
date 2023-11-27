import type _mongoose from "mongoose";
import type { Model } from "mongoose";
import { Pump, PumpDocument } from "./pump.types";
import {
  BadRequestException,
  NotFoundException,
  ServerException,
} from "@/server/exceptions";
import { PasswordUtil } from "@/server/utils/password";

export default class PumpRepository {
  public repo: Model<PumpDocument>;

  constructor(conn: typeof _mongoose) {
    this.repo = conn.models.Pump as Model<PumpDocument>;
  }

  /**
   * gets a pump using id
   * @param id pump id to fetch
   */
  async getPumpById(id: string) {
    let pump: PumpDocument | null = null;

    try {
      pump = await this.repo.findById(id);
    } catch (err: any) {
      throw new ServerException(err.message);
    }

    if (!pump) {
      throw new NotFoundException("pump not found");
    }

    return pump;
  }

  /**
   * gets all pumps
   * @param credentials pump credentials
   * @param role the pump role to login
   */
  async getAllPumps() {
    let pump: PumpDocument[];

    try {
      pump = await this.repo.find();
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return pump;
  }

  /**
   * adds a new pump
   * @param newPump pump data
   */
  async addPump(newPump: Partial<Pump>) {
    let pump: PumpDocument;

    try {
      pump = await this.repo.create(newPump);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    return pump;
  }

  /**
   * deletes a pump
   * @param id the pump to delete
   */
  async deletePump(id: string) {
    let pump: PumpDocument | null;

    try {
      pump = await this.repo.findByIdAndDelete(id);
    } catch (error: any) {
      throw new ServerException(error.message);
    }

    if (!pump) {
      throw new NotFoundException("Pump not found");
    }

    return pump;
  }
}
