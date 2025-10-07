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
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger'
import { Asset } from 'src/commons/entities/asset'
import { OptionalParseIntPipe } from 'src/shared/pipes/optional-parse-int-pipe'
import { AssetPresenter } from 'src/shared/presenters/asset-presenter'
import { AssetService } from './asset.service'
import { CreateAssetDTO } from './dto/create-asset'
import { GetAllAssetDTO } from './dto/get-all-asset'
import { UpdateAssetDTO } from './dto/update-asset'

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiOkResponse({
    type: Asset,
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) assetId: number) {
    const asset = await this.assetService.getById(assetId)

    return AssetPresenter.toHTTP(asset)
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
    name: 'serialNumber',
    example: 142,
    default: undefined,
    nullable: true,
    required: false,
  })
  @ApiQuery({
    name: 'imei',
    example: 145812342,
    default: undefined,
    nullable: true,
    required: false,
  })
  @ApiQuery({
    name: 'prefix',
    example: 'DK',
    default: undefined,
    nullable: true,
    required: false,
  })
  @ApiOkResponse({
    type: GetAllAssetDTO,
  })
  @Get()
  async getAll(
    @Query('page', OptionalParseIntPipe) page: number = 1,
    @Query('perPage', OptionalParseIntPipe) perPage: number = 1,
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

  @ApiOkResponse({
    type: Asset,
  })
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

  @ApiOkResponse({
    type: Asset,
  })
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

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.assetService.delete(departmentId)
  }
}
