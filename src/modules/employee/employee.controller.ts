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
import { EmployeePresenter } from 'src/shared/presenters/employee-presenter'
import { CreateEmployeeDTO } from './dto/create-employee'
import { UpdateEmployeeDTO } from './dto/update-employee'
import { IEmployeeService } from './interface/employee-service.interface'

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: IEmployeeService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) employeeId: number) {
    const employee = await this.employeeService.getById(employeeId)

    return EmployeePresenter.toHTTP(employee)
  }

  @Get()
  async getAll() {
    const employees = await this.employeeService.getAll()
    return EmployeePresenter.manyToHttp(employees)
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

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) departmentId: number) {
    return this.employeeService.delete(departmentId)
  }

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
}
