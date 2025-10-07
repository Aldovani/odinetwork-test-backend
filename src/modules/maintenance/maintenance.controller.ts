import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger'
import {
  Maintenance,
  MAINTENANCE_STATUS,
  type MaintenanceStatus,
} from 'src/commons/entities/maintenance'
import { OptionalParseIntPipe } from 'src/shared/pipes/optional-parse-int-pipe'
import { MaintenancePresenter } from 'src/shared/presenters/maintenance-presenter'
import { CreateMaintenanceDTO } from './dto/create-maintenance'
import { GetAllMaintenanceDTO } from './dto/get-all-maintenance'
import { UpdateMaintenanceDTO } from './dto/update-maintenance'
import { MaintenanceService } from './maintenance.service'

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @ApiOkResponse({
    type: Maintenance,
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) assetId: number) {
    const asset = await this.maintenanceService.getById(assetId)

    return MaintenancePresenter.toHTTP(asset)
  }

  @ApiQuery({
    name: 'page',
    example: 1,
    default: 1,
    nullable: true,
    required: false,
  })
  @ApiQuery({
    name: 'perPage',
    example: 1,
    default: 1,
    nullable: true,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    example: MAINTENANCE_STATUS.IN_PROGRESS,
    default: undefined,
    nullable: true,
    required: false,
    enum: MAINTENANCE_STATUS,
    enumName: 'MAINTENANCE_STATUS',
  })
  @ApiOkResponse({
    type: GetAllMaintenanceDTO,
  })
  @Get()
  async getAll(
    @Query('page', OptionalParseIntPipe) page: number = 1,
    @Query('perPage', OptionalParseIntPipe) perPage: number = 1,
    @Query(
      'status',
      new DefaultValuePipe(undefined),
      new ParseEnumPipe(MAINTENANCE_STATUS, { optional: true }),
    )
    status: MaintenanceStatus,
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

  @ApiOkResponse({
    type: Maintenance,
  })
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

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.maintenanceService.delete(departmentId)
  }
}
