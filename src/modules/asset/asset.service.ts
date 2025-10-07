import { Injectable, NotFoundException } from '@nestjs/common'
import { Asset } from 'src/commons/entities/asset'
import { ServicePaginationResponse } from 'src/commons/types/pagination'
import { PrismaAssetRepository } from 'src/shared/database/repositories/prisma/prisma-asset-repository'
import { DepartmentService } from '../department/department.service'
import { EmployeeService } from '../employee/employee.service'
import { CreateAssetDTO } from './dto/create-asset'
import { UpdateAssetDTO } from './dto/update-asset'

type AssetServiceGetAllRequestProps = {
  page: number
  perPage: number
  serialNumber: number
  search: string
  imei: string
  prefix: string
}

@Injectable()
export class AssetService {
  constructor(
    private readonly assetRepository: PrismaAssetRepository,
    private readonly employeeService: EmployeeService,
    private readonly departmentService: DepartmentService,
  ) {}

  async getById(id: number) {
    const asset = await this.assetRepository.findById(id)
    if (!asset) throw new NotFoundException('Asset not found')
    return asset
  }

  async getAll(
    props: AssetServiceGetAllRequestProps,
  ): Promise<ServicePaginationResponse<Asset[]>> {
    const { imei, page, perPage, prefix, search, serialNumber } = props

    const [assets, totalOfAssets] = await this.assetRepository.findAll({
      imei,
      page,
      perPage,
      prefix,
      search,
      serialNumber,
    })

    const metadata = {
      currentPage: page,
      perPage,
      totalOfPages: Math.round(totalOfAssets / page),
      totalOfItems: totalOfAssets,
    }

    return { metadata, data: assets }
  }

  async create(props: CreateAssetDTO): Promise<Asset> {
    const { IMEI, departmentId, employeeId, name, prefix, serialNumber } = props

    const [department, employee] = await Promise.all([
      this.departmentService.getById(departmentId),
      this.employeeService.getById(employeeId),
    ])

    const rawAsset = Asset.create({
      IMEI,
      departmentId,
      employeeId,
      name,
      prefix,
      serialNumber,
      employee,
      department,
    })

    const asset = await this.assetRepository.create(rawAsset)

    return asset
  }

  async update(id: number, props: UpdateAssetDTO): Promise<Asset> {
    const assetExist = await this.getById(id)

    if (props.departmentId && assetExist.departmentId !== props.departmentId) {
      const department = await this.departmentService.getById(
        props.departmentId,
      )

      assetExist.department = department
    }

    if (props.employeeId && assetExist.employeeId !== props.employeeId) {
      const employee = await this.employeeService.getById(props.employeeId)

      assetExist.employee = employee
    }

    assetExist.departmentId = props?.departmentId
    assetExist.employeeId = props?.employeeId
    assetExist.name = props.name
    assetExist.IMEI = props.IMEI
    assetExist.prefix = props.prefix
    assetExist.serialNumber = props.serialNumber

    const asset = await this.assetRepository.save(assetExist)

    return asset
  }

  async delete(id: number): Promise<void> {
    await this.assetRepository.delete(id)
  }
}
