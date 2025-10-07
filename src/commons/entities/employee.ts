import { ApiProperty } from '@nestjs/swagger'
import { Department } from './department'
import { Entity } from './entity'

export type EmployeeProps = {
  name: string
  email: string
  departmentId: number
  department: Department
  createdAt?: Date
  updatedAt?: Date
}

export class Employee extends Entity<EmployeeProps, number> {
  @ApiProperty()
  get name() {
    return this.props.name
  }

  @ApiProperty()
  get email() {
    return this.props.email
  }

  @ApiProperty()
  get departmentId() {
    return this.props.departmentId
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get createdAt() {
    return this.props?.createdAt
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get updatedAt() {
    return this.props?.updatedAt
  }

  @ApiProperty({
    type: Department,
  })
  get department() {
    return this.props.department
  }

  set name(name: string) {
    this.props.name = name
  }

  set email(email: string) {
    this.props.email = email
  }

  set department(department: Department) {
    this.props.department = department
  }

  set departmentId(departmentId: number) {
    this.props.departmentId = departmentId
  }

  static create(props: EmployeeProps, id?: number) {
    const employee = new Employee(props, id)

    return employee
  }
}
