import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import type { MaintenanceStatus } from 'src/commons/entities/maintenance'
import { OptionalParseEnumPipe } from 'src/shared/pipes/optional-parse-enum-pipe'
import { OptionalParseIntPipe } from 'src/shared/pipes/optional-parse-int-pipe'
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
  async getAll(
    @Query('page', OptionalParseIntPipe) page: number = 1,
    @Query('perPage', OptionalParseIntPipe) perPage: number = 1,
    @Query('status', OptionalParseEnumPipe)
    status: MaintenanceStatus | undefined,
  ) {
    const { data, metadata } = await this.maintenanceService.getAll({
      page,
      perPage,
      status,
    })
    return { metadata, data: MaintenancePresenter.manyToHttp(data) }
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
