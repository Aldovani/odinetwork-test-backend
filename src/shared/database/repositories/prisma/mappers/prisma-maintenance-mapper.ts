import { Prisma, Maintenance as PrismaMaintenance } from '@prisma/client'
import { Maintenance } from 'src/commons/entities/maintenance'
import { PrismaAssertMapper } from './prisma-asset-mapper'

type MaintenanceWithAsset = {
  asset: {
    name: string
    id: number
    createdAt: Date
    updatedAt: Date
    prefix: string
    serialNumber: number
    IMEI: string | null
    departmentId: number | null
    employeeId: number | null
  }
} & PrismaMaintenance

export class PrismaMaintenanceMapper {
  static toPrisma(maintenance: Maintenance): Prisma.MaintenanceCreateArgs {
    return {
      data: {
        entryDate: maintenance.entryDate,
        problemDescription: maintenance.problemDescription,
        assetId: maintenance.assetId,
        completionDate: maintenance.completionDate,
      },
    }
  }

  static toDomain(maintenance: MaintenanceWithAsset): Maintenance {
    return Maintenance.create(
      {
        asset: PrismaAssertMapper.toDomain({
          ...maintenance.asset,
          department: null,
          employee: null,
        }),
        assetId: maintenance.assetId,
        completionDate: maintenance.completionDate ?? undefined,
        createdAt: maintenance.createdAt,
        entryDate: maintenance.entryDate,
        problemDescription: maintenance.problemDescription,
        updatedAt: maintenance.updatedAt,
      },
      maintenance.id,
    )
  }
}
