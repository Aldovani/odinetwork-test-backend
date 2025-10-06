import { Injectable, NotFoundException } from '@nestjs/common'
import { Asset } from 'src/commons/entities/asset'
import { AssetRepository } from 'src/shared/database/repositories/asset-repository'
import { IDepartmentService } from '../department/interface/department'
import { IEmployeeService } from '../employee/interface/employee-service.interface'
import { CreateAssetDTO } from './dto/create-asset'
import { UpdateAssetDTO } from './dto/update-asset'
import { IAssetService } from './interface/asset-service.interface'

@Injectable()
export class AssetService implements IAssetService {
  constructor(
    private readonly assetRepository: AssetRepository,
    private readonly employeeService: IEmployeeService,
    private readonly departmentService: IDepartmentService,
  ) {}

  async getById(id: number) {
    const asset = await this.assetRepository.findById(id)
    if (!asset) throw new NotFoundException('Asset not found')
    return asset
  }

  async getAll(): Promise<Asset[]> {
    const assets = await this.assetRepository.findAll()

    return assets
  }

  async create(props: CreateAssetDTO): Promise<Asset> {
    const { IMEI, departmentId, employeeId, name, prefix, serialNumber } = props

    const [department, employee] = await Promise.all([
      this.departmentService.getDepartmentById(departmentId),
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
      const department = await this.departmentService.getDepartmentById(
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
