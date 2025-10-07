import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { MaintenancePresenter } from 'src/shared/presenters/maintenance-presenter'
import { CreateMaintenanceDTO } from './dto/create-maintenance'
import { UpdateMaintenanceDTO } from './dto/update-maintenance'
import { MaintenanceService } from './maintenance.service'

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) assetId: number) {
    const asset = await this.maintenanceService.getById(assetId)

    return MaintenancePresenter.toHTTP(asset)
  }

  @Get()
  async getAll() {
    const employees = await this.maintenanceService.getAll()
    return MaintenancePresenter.manyToHttp(employees)
  }

  @Post()
  async create(
    @Body()
    { assetId, entryDate, problemDescription }: CreateMaintenanceDTO,
  ) {
    const maintenance = await this.maintenanceService.create({
      assetId,
      entryDate,
      problemDescription,
    })

    return MaintenancePresenter.toHTTP(maintenance)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.maintenanceService.delete(departmentId)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) maintenanceId: number,
    @Body() body: UpdateMaintenanceDTO,
  ) {
    const { completionDate, problemDescription } = body

    const asset = await this.maintenanceService.update(maintenanceId, {
      completionDate,
      problemDescription,
    })
    return MaintenancePresenter.toHTTP(asset)
  }
}
