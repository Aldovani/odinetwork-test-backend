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
import { ApiNoContentResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger'
import { Employee } from 'src/commons/entities/employee'
import { OptionalParseIntPipe } from 'src/shared/pipes/optional-parse-int-pipe'
import { EmployeePresenter } from 'src/shared/presenters/employee-presenter'
import { CreateEmployeeDTO } from './dto/create-employee'
import { GetAllEmployeeDTO } from './dto/get-all-employee'
import { UpdateEmployeeDTO } from './dto/update-employee'
import { EmployeeService } from './employee.service'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOkResponse({
    type: Employee,
  })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) employeeId: number) {
    const employee = await this.employeeService.getById(employeeId)

    return EmployeePresenter.toHTTP(employee)
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
    name: 'search',
    example: 'John',
    default: '',
    description: 'Search by employee name',
    nullable: true,
    required: false,
  })
  @ApiOkResponse({
    type: GetAllEmployeeDTO,
  })
  @Get()
  async getAll(
    @Query('page', OptionalParseIntPipe) page: number = 1,
    @Query('perPage', OptionalParseIntPipe) perPage: number = 1,
    @Query('search') search: string = '',
  ) {
    const { employees, metadata } = await this.employeeService.getAll({
      page,
      perPage,
      search,
    })
    return {
      metadata,
      data: EmployeePresenter.manyToHttp(employees),
    }
  }

  @Post()
  async create(@Body() { name, departmentId, email }: CreateEmployeeDTO) {
    const employee = await this.employeeService.create({
      name,
      departmentId,
      email,
    })

    return EmployeePresenter.toHTTP(employee)
  }

  @ApiOkResponse({
    type: Employee,
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) employeeId: number,
    @Body() { name, departmentId, email }: UpdateEmployeeDTO,
  ) {
    const employee = await this.employeeService.update(employeeId, {
      departmentId,
      email,
      name,
    })
    return EmployeePresenter.toHTTP(employee)
  }

  @ApiNoContentResponse()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.employeeService.delete(departmentId)
  }
}
