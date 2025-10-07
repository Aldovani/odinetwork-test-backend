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
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger'
import { Department } from 'src/commons/entities/department'
import { OptionalParseIntPipe } from 'src/shared/pipes/optional-parse-int-pipe'
import { DepartmentPresenter } from 'src/shared/presenters/department-presenter'
import { DepartmentService } from './department.service'
import { CreateDepartmentDTO } from './dto/create-department'
import { GetAllDepartmentDTO } from './dto/get-all-department'
import { UpdateDepartmentDTO } from './dto/update-department'

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOkResponse({ type: Department })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) departmentId: number) {
    const department = await this.departmentService.getById(departmentId)

    return DepartmentPresenter.toHTTP(department)
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
  @ApiOkResponse({ type: GetAllDepartmentDTO })
  @Get()
  async getAll(
    @Query('page', OptionalParseIntPipe) page: number = 1,
    @Query('perPage', OptionalParseIntPipe) perPage: number = 1,
  ) {
    const { departments, metadata } = await this.departmentService.getAll({
      page,
      perPage,
    })
    return {
      metadata,
      data: DepartmentPresenter.manyToHttp(departments),
    }
  }

  @ApiBody({ type: CreateDepartmentDTO })
  @ApiOkResponse({ type: Department })
  @Post()
  async create(@Body() { name }: CreateDepartmentDTO) {
    const department = await this.departmentService.create({ name })

    return DepartmentPresenter.toHTTP(department)
  }

  @ApiBody({ type: CreateDepartmentDTO })
  @ApiOkResponse({ type: Department })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) departmentId: number,
    @Body() { name }: UpdateDepartmentDTO,
  ) {
    const department = await this.departmentService.update(name, departmentId)
    return DepartmentPresenter.toHTTP(department)
  }

  @ApiNoContentResponse()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.departmentService.delete(departmentId)
  }
}
