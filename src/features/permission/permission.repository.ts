import { Permission } from '@prisma/client';
import { DB } from '../../db';

export class PermissionRepository {
  async getAll() {
    return await DB.permission.findMany();
  }

  async getAllPaginated(params: { pageSize?: number; page?: number }) {
    const { pageSize, page = 0 } = params;
    const conditions: any = pageSize
      ? {
          take: pageSize,
          skip: pageSize * page,
        }
      : {};
    return await DB.$transaction([
      DB.permission.count(),
      DB.permission.findMany(conditions),
    ]);
  }

  async getById(id: number) {
    return await DB.permission.findUnique({
      where: { id },
    });
  }

  async getByIdWithDependencies(id: number) {
    return await DB.permission.findUnique({
      where: { id },
      include: {
        rolPermission: true,
        userPermission: true,
      },
    });
  }

  async create(body: Omit<Permission, 'id'>) {
    return await DB.permission.create({
      data: body,
    });
  }

  async update(id: number, body: Omit<Permission, 'id'>) {
    return await DB.permission.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async delete(id: number) {
    return await DB.permission.delete({
      where: {
        id,
      },
    });
  }
}
