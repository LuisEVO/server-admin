/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { makeValidateBody } from 'express-class-validator';
import { PermissionController } from './permission.controller';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';
import { PermissionValidator } from './permission.validator';

const repository = new PermissionRepository();
const service = new PermissionService(repository);
const controller = new PermissionController(service);
const validator = makeValidateBody(PermissionValidator);

export const PermissionRouter = Router();
PermissionRouter.get('/', controller.getAll.bind(controller));
PermissionRouter.get(
  '/paginated',
  controller.getAllPaginated.bind(controller)
);
PermissionRouter.get('/:id(\\d+)', controller.getOne.bind(controller));
PermissionRouter.post('/', validator, controller.create.bind(controller));
PermissionRouter.put(
  '/:id(\\d+)',
  validator,
  controller.update.bind(controller)
);
PermissionRouter.delete('/:id(\\d+)', controller.delete.bind(controller));
