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
import { AssetPresenter } from 'src/shared/presenters/asset-presenter'
import { CreateAssetDTO } from './dto/create-asset'
import { UpdateAssetDTO } from './dto/update-asset'
import { IAssetService } from './interface/asset-service.interface'

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: IAssetService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) assetId: number) {
    const asset = await this.assetService.getById(assetId)

    return AssetPresenter.toHTTP(asset)
  }

  @Get()
  async getAll() {
    const employees = await this.assetService.getAll()
    return AssetPresenter.manyToHttp(employees)
  }

  @Post()
  async create(
    @Body()
    {
      name,
      departmentId,
      IMEI,
      employeeId,
      prefix,
      serialNumber,
    }: CreateAssetDTO,
  ) {
    const asset = await this.assetService.create({
      name,
      departmentId,
      IMEI,
      employeeId,
      prefix,
      serialNumber,
    })

    return AssetPresenter.toHTTP(asset)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.assetService.delete(departmentId)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) assetId: number,
    @Body() body: UpdateAssetDTO,
  ) {
    const { IMEI, departmentId, employeeId, name, prefix, serialNumber } = body

    const asset = await this.assetService.update(assetId, {
      name,
      departmentId,
      IMEI,
      employeeId,
      prefix,
      serialNumber,
    })
    return AssetPresenter.toHTTP(asset)
  }
}
