import { Request, Response } from 'express';
import { PermissionService } from './permission.service';

export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  async getAll(req: Request, res: Response) {
    const records = await this.permissionService.getAll();
    res.json(records);
  }

  async getAllPaginated(req: Request, res: Response) {
    const pageSize = req.query.pageSize ? +req.query.pageSize : undefined;
    const page = req.query.page ? +req.query.page : undefined;
    const records = await this.permissionService.getAllPaginated({
      pageSize,
      page,
    });
    res.json(records);
  }

  async getOne(req: Request, res: Response) {
    const record = await this.permissionService.getOne(+req.params.id);
    res.json(record);
  }

  async create(req: Request, res: Response) {
    const record = await this.permissionService.create(req.body);
    res.json(record);
  }

  async update(req: Request, res: Response) {
    const record = await this.permissionService.update(
      +req.params.id,
      req.body
    );
    res.json(record);
  }

  async delete(req: Request, res: Response) {
    const record = await this.permissionService.delete(+req.params.id);
    res.json(record);
  }
}
