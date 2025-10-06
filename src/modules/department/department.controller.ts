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
import { DepartmentPresenter } from 'src/shared/presenters/departmant-presenter'
import { DepartmentService } from './department.service'
import { CreateDepartmentDTO } from './dto/create-department'
import { UpdateDepartmentDTO } from './dto/update-department'

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) departmentId: number) {
    const department =
      await this.departmentService.getDepartmentById(departmentId)

    return DepartmentPresenter.toHTTP(department)
  }

  @Get()
  async getAll() {
    const departments = await this.departmentService.getDepartments()
    return DepartmentPresenter.manyToHttp(departments)
  }

  @Post()
  async create(@Body() { name }: CreateDepartmentDTO) {
    const department = await this.departmentService.create({ name })

    return DepartmentPresenter.toHTTP(department)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.departmentService.delete(departmentId)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) departmentId: number,
    @Body() { name }: UpdateDepartmentDTO,
  ) {
    const department = await this.departmentService.update(name, departmentId)
    return DepartmentPresenter.toHTTP(department)
  }
}
