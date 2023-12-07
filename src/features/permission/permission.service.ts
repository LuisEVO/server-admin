import { AppError } from '../../common/models/error';
import { PermissionRepository } from './permission.repository';
import { Permission } from '@prisma/client';

export class PermissionService {
  constructor(private permissionRepository: PermissionRepository) {}

  getAll() {
    return this.permissionRepository.getAll();
  }

  async getAllPaginated(params: { pageSize?: number; page?: number }) {
    const [total, data] = await this.permissionRepository.getAllPaginated(
      params
    );

    return {
      total,
      data,
    };
  }

  async getOne(id: number) {
    const record = await this.permissionRepository.getById(id);
    if (record) return record;
    throw new AppError(404, 'Permiso no existe');
  }

  private async validateDependencies(id: number) {
    const record = await this.permissionRepository.getByIdWithDependencies(id);
    if (!record) throw new AppError(404, 'Permiso no existe');

    if (record.rolPermission.length || record.userPermission.length)
      throw new AppError(409, 'El permisso esta siendo utilizado');
  }

  create(body: Omit<Permission, 'id'>) {
    return this.permissionRepository.create(body);
  }

  async update(id: number, body: Omit<Permission, 'id'>) {
    await this.validateDependencies(id);
    return this.permissionRepository.update(id, body);
  }

  async delete(id: number) {
    await this.validateDependencies(id);
    return this.permissionRepository.delete(id);
  }
}
