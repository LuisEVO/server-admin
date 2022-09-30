import { User } from '../interfaces/user.interface';
import { DataTypes, Model } from 'sequelize';
import Server from '../server/server';
import { EmployeeSequelize } from './employee.sequelize';
import { RolUserSequelize } from './rol-user.sequelize';
import { StudentSequelize } from './student.sequelize';

const sequelize = Server.sequelize;

export class UserSequelize extends Model implements User {
  id!: number;
  name!: string;
  password!: string;
  lastLogin!: Date;
  readonly updatedAt!: Date;
  readonly createdAt!: Date;
}

UserSequelize.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize
  }
)

UserSequelize.hasOne(EmployeeSequelize, {
  sourceKey: 'id',
  foreignKey: 'idUser',
  as: 'employee'
});

UserSequelize.hasMany(RolUserSequelize, {
  sourceKey: 'id',
  foreignKey: 'idUser',
  as: 'rol-users'
});

UserSequelize.hasMany(StudentSequelize, {
  sourceKey: 'id',
  foreignKey: 'idUser',
  as: 'students'
});
