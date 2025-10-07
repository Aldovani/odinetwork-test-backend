import { Injectable } from '@nestjs/common'
import { Maintenance } from 'src/commons/entities/maintenance'
import { PrismaService } from '../../prisma.service'
import { PrismaMaintenanceMapper } from './mappers/prisma-maintenance-mapper'

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

  async create(maintenance: Maintenance): Promise<Maintenance> {
    const data = await this.prismaService.maintenance.create({
      ...PrismaMaintenanceMapper.toPrisma(maintenance),
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

  async findAll(): Promise<Maintenance[]> {
    const maintenance = await this.prismaService.maintenance.findMany({
      include: { asset: true },
    })

    return maintenance.map(PrismaMaintenanceMapper.toDomain)
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
}
