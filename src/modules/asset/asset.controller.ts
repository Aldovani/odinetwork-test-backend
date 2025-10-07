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
import { OptionalParseIntPipe } from 'src/shared/pipes/optional-parse-int-pipe'
import { AssetPresenter } from 'src/shared/presenters/asset-presenter'
import { AssetService } from './asset.service'
import { CreateAssetDTO } from './dto/create-asset'
import { UpdateAssetDTO } from './dto/update-asset'

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) assetId: number) {
    const asset = await this.assetService.getById(assetId)

    return AssetPresenter.toHTTP(asset)
  }

  @Get()
  async getAll(
    @Query('page', OptionalParseIntPipe) page: number = 1,
    @Query('page', OptionalParseIntPipe) perPage: number = 1,
    @Query('serialNumber', OptionalParseIntPipe) serialNumber: number,
    @Query('search') search: string = '',
    @Query('imei') imei: string = '',
    @Query('prefix') prefix: string = '',
  ) {
    const { data, metadata } = await this.assetService.getAll({
      page,
      perPage,
      serialNumber,
      search,
      imei,
      prefix,
    })
    return { metadata, data: AssetPresenter.manyToHttp(data) }
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
