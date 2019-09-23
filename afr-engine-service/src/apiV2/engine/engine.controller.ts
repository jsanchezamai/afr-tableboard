import * as bcrypt from 'bcrypt-nodejs';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import Engine from './engine.model';
import { Kernel } from '../kernel/kernel';

export default class EngineController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    console.log("Rise findAll");
    try {
      const engines = await Engine.find();
      if (!engines) {
        return res.status(404).send({
          success: false,
          message: 'Engines not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: engines
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    console.log("Rise findOne");
    try {
      const engine = await Engine.findById(req.params.id, { password: 0 });
      if (!engine) {
        return res.status(404).send({
          success: false,
          message: 'Engine not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: engine
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public insert = async (req: Request, res: Response): Promise<any> => {
    const { name, lastName, email, password } = req.body;
    try {
      const engine = new Engine({
        name,
        lastName,
        email,
        password
      });
      const engineInserted = await engine.save();
      if (!engineInserted) {
        return res.status(404).send({
          success: false,
          message: 'Engine not created',
          data: null
        });
      }
      res.status(200).send({
        success: engineInserted,
        data: engineInserted
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { name, lastName, email, password } = req.body;
    try {
      const engineUpdated = await Engine.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name,
            lastName,
            email,
            password
          }
        },
        { new: true }
      );
      if (!engineUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Engine not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: engineUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const engine = await Engine.findByIdAndRemove(req.params.id);

      if (!engine) {
        return res.status(404).send({
          success: false,
          message: 'Engine not found',
          data: null
        });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public status = async (req: Request, res: Response): Promise<any> => {
    console.log("Rise status");
    try {
      const engine = new Kernel();

      if (!engine) {
        return res.status(404).send({
          success: false,
          message: 'Engine not found',
          data: null
        });
      }
      res.status(200).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
