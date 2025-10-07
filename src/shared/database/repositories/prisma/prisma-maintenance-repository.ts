import { Injectable } from '@nestjs/common'
import {
  Maintenance,
  MaintenanceStatus,
} from 'src/commons/entities/maintenance'
import { PrismaService } from '../../prisma.service'
import { PrismaMaintenanceMapper } from './mappers/prisma-maintenance-mapper'

type PrismaMaintenanceRepositoryGetAllProps = {
  page: number
  perPage: number
  status?: MaintenanceStatus
}

@Injectable()
export class PrismaMaintenanceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<Maintenance | null> {
    const maintenance = await this.prismaService.maintenance.findUnique({
      where: {
        id,
      },
      include: { asset: true },
    })

    if (!maintenance) return null

    return PrismaMaintenanceMapper.toDomain(maintenance)
  }

  async findByAssetId(id: number): Promise<Maintenance | null> {
    const maintenance = await this.prismaService.maintenance.findFirst({
      where: {
        assetId: id,
        AND: {
          completionDate: {
            equals: null,
          },
        },
      },
      include: { asset: true },
    })

    if (!maintenance) return null

    return PrismaMaintenanceMapper.toDomain(maintenance)
  }

  async findAll({
    page,
    perPage,
    status,
  }: PrismaMaintenanceRepositoryGetAllProps): Promise<[Maintenance[], number]> {
    const [maintenance, totalOfMaintenances] = await Promise.all([
      this.prismaService.maintenance.findMany({
        include: { asset: true },
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          AND: {
            completionDate: {
              equals:
                status === 'IN_PROGRESS'
                  ? null
                  : status === 'FINISHED'
                    ? ''
                    : '',
            },
          },
        },
      }),
      this.prismaService.maintenance.count({
        where: {
          AND: {
            completionDate: {
              equals:
                status === 'IN_PROGRESS'
                  ? null
                  : status === 'FINISHED'
                    ? ''
                    : '',
            },
          },
        },
      }),
    ])

    return [
      maintenance.map(PrismaMaintenanceMapper.toDomain),
      totalOfMaintenances,
    ]
  }

  async create(maintenance: Maintenance): Promise<Maintenance> {
    const data = await this.prismaService.maintenance.create({
      ...PrismaMaintenanceMapper.toPrisma(maintenance),
      include: {
        asset: true,
      },
    })

    return PrismaMaintenanceMapper.toDomain(data)
  }

  async save(maintenance: Maintenance): Promise<Maintenance> {
    const data = await this.prismaService.maintenance.update({
      ...PrismaMaintenanceMapper.toPrisma(maintenance),
      where: {
        id: maintenance.id,
      },
      include: {
        asset: true,
      },
    })

    return PrismaMaintenanceMapper.toDomain(data)
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.maintenance.delete({
      where: {
        id,
      },
    })
  }
}
