import { Injectable } from '@nestjs/common'
import { Asset } from 'src/commons/entities/asset'
import { PrismaService } from '../../prisma.service'
import { PrismaAssertMapper } from './mappers/prisma-asset-mapper'

type PrismaAssetRepositoryFindAllProps = {
  page: number
  perPage: number
  serialNumber: number
  search: string
  imei: string
  prefix: string
}

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

  async findAll(
    props: PrismaAssetRepositoryFindAllProps,
  ): Promise<[Asset[], number]> {
    const { imei, page, perPage, prefix, search, serialNumber } = props

    const [assets, totalOfAssets] = await Promise.all([
      this.prismaService.asset.findMany({
        skip: perPage * (page - 1),
        take: perPage,
        where: {
          IMEI: {
            contains: imei || undefined,
            mode: 'insensitive',
          },
          prefix: {
            contains: prefix || undefined,
            mode: 'insensitive',
          },
          name: {
            contains: search || undefined,
            mode: 'insensitive',
          },
          serialNumber: {
            equals: serialNumber,
          },
        },
        include: {
          department: true,
          employee: { include: { department: true } },
        },
      }),
      this.prismaService.asset.count({
        where: {
          IMEI: {
            contains: imei,
            mode: 'insensitive',
          },
          prefix,
          name: {
            contains: search,
            mode: 'insensitive',
          },
          serialNumber,
        },
      }),
    ])
    return [assets.map(PrismaAssertMapper.toDomain), totalOfAssets]
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

  async delete(id: number): Promise<void> {
    await this.prismaService.asset.delete({
      where: {
        id,
      },
    })
  }
}
