import { Injectable } from '@nestjs/common'
import { Asset } from 'src/commons/entities/asset'
import { PrismaService } from '../../prisma.service'
import { PrismaAssertMapper } from './mappers/prisma-asset-mapper'

@Injectable()
export class PrismaAssetRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<Asset | null> {
    const asset = await this.prismaService.asset.findUnique({
      where: {
        id,
      },
      include: {
        department: true,
        employee: {
          include: {
            department: true,
          },
        },
      },
    })

    if (!asset) return null

    return PrismaAssertMapper.toDomain(asset)
  }

  async create(data: Asset): Promise<Asset> {
    const asset = await this.prismaService.asset.create({
      ...PrismaAssertMapper.toPrisma(data),
      include: {
        department: !!data.departmentId,
        employee: {
          include: {
            department: !!data.employeeId,
          },
        },
      },
    })

    return PrismaAssertMapper.toDomain(asset)
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.asset.delete({
      where: {
        id,
      },
    })
  }

  async findAll(): Promise<Asset[]> {
    const assets = await this.prismaService.asset.findMany({
      include: {
        department: true,
        employee: { include: { department: true } },
      },
    })

    return assets.map(PrismaAssertMapper.toDomain)
  }

  async save(asset: Asset): Promise<Asset> {
    const data = await this.prismaService.asset.update({
      ...PrismaAssertMapper.toPrisma(asset),
      where: {
        id: asset.id,
      },
      include: {
        department: true,
        employee: {
          include: {
            department: true,
          },
        },
      },
    })

    return PrismaAssertMapper.toDomain(data)
  }
}
