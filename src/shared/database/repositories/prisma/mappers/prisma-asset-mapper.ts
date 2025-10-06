import { Prisma, Asset as PrismaAsset } from '@prisma/client'
import { Asset } from 'src/commons/entities/asset'
import { PrismaDepartmentMapper } from './prisma-department-mapper'
import { PrismaEmployeeMapper } from './prisma-employee-mapper'

type AssetWithEmployeeAndDepartment = {
  department: {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
  } | null
  employee: {
    id: number
    name: string
    departmentId: number
    createdAt: Date
    updatedAt: Date
    email: string
    department: {
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }
  } | null
} & PrismaAsset

export class PrismaAssertMapper {
  static toPrisma(asset: Asset): Prisma.AssetCreateArgs {
    return {
      data: {
        name: asset.name,
        createdAt: asset?.createdAt,
        updatedAt: asset.updatedAt,
        departmentId: asset.departmentId,
        prefix: asset.prefix,
        serialNumber: asset.serialNumber,
        employeeId: asset.employeeId,
        IMEI: asset.IMEI,
      },
    }
  }

  static toDomain(asset: AssetWithEmployeeAndDepartment): Asset {
    return Asset.create(
      {
        createdAt: asset.createdAt,
        name: asset.name,
        updatedAt: asset.updatedAt,
        department: asset?.department
          ? PrismaDepartmentMapper.toDomain(asset.department)
          : undefined,
        employee: asset.employee
          ? PrismaEmployeeMapper.toDomain(asset.employee)
          : undefined,
        IMEI: asset.IMEI || '',
        prefix: asset.prefix,
        serialNumber: asset.serialNumber,
        departmentId: asset.departmentId || undefined,
        employeeId: asset.employeeId || undefined,
      },
      asset.id,
    )
  }
}
