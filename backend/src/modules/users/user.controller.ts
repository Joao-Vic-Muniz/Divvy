import type { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  };
}
