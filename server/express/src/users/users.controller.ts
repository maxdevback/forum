import { Request, Response } from "express";
import { Validate } from "../utils/validate";
import "./users.service";
import { UsersService } from "./users.service";

class UsersControllerClass {
  async login(req: Request, res: Response) {
    try {
      Validate.validateLoginBody(req.body);
      const info = await UsersService.login(
        req.body.username,
        req.body.password
      );
      req.session.user = info;
      res.send(info);
    } catch (err: any) {
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async register(req: Request, res: Response) {
    try {
      Validate.validateRegisterBody(req.body);
      const info = await UsersService.register(
        req.body.username,
        req.body.email,
        req.body.password
      );
      req.session.user = info;
      res.send(info);
    } catch (err: any) {
      console.log(err);
      res.status(err.httpCode ?? 500).send(err.message);
    }
  }
  async getMyInfo(req: Request, res: Response) {
    res.send(req.session.user);
  }
  async logout(req: Request, res: Response) {
    req.session.user = null;
    res.send("susses");
  }
}

export const UsersController = new UsersControllerClass();
