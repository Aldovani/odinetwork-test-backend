import { Injectable, NotFoundException } from '@nestjs/common'
import { Maintenance } from 'src/commons/entities/maintenance'
import { PrismaMaintenanceRepository } from 'src/shared/database/repositories/prisma/prisma-maintenance-repository'
import { AssetService } from '../asset/asset.service'
import { CreateMaintenanceDTO } from './dto/create-maintenance'
import { UpdateMaintenanceDTO } from './dto/update-maintenance'

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly maintenanceRepository: PrismaMaintenanceRepository,
    private readonly assetService: AssetService,
  ) {}

  async getById(id: number) {
    const maintenance = await this.maintenanceRepository.findById(id)
    if (!maintenance) throw new NotFoundException('maintenance not found')
    return maintenance
  }

  async getAll(): Promise<Maintenance[]> {
    const maintenances = await this.maintenanceRepository.findAll()

    return maintenances
  }

  async create(props: CreateMaintenanceDTO): Promise<Maintenance> {
    const { assetId, entryDate, problemDescription } = props

    const asset = await this.assetService.getById(assetId)

    const rawMaintenance = Maintenance.create({
      asset,
      assetId,
      entryDate,
      problemDescription,
    })

    const maintenance = await this.maintenanceRepository.create(rawMaintenance)

    return maintenance
  }

  async update(id: number, props: UpdateMaintenanceDTO): Promise<Maintenance> {
    const maintenanceExist = await this.getById(id)

    if (props.assetId !== maintenanceExist.assetId) {
      const assetExist = await this.assetService.getById(props.assetId)

      maintenanceExist.asset = assetExist
    }
    maintenanceExist.assetId = props.assetId
    maintenanceExist.completionDate = props.completionDate
    maintenanceExist.entryDate = props.entryDate
    maintenanceExist.problemDescription = props.problemDescription

    const asset = await this.maintenanceRepository.save(maintenanceExist)

    return asset
  }

  async delete(id: number): Promise<void> {
    await this.maintenanceRepository.delete(id)
  }
}
