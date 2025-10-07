import { ApiProperty } from '@nestjs/swagger'
import { Department } from './department'
import { Employee } from './employee'
import { Entity } from './entity'

export type AssetProps = {
  name: string
  prefix: string
  serialNumber: number
  IMEI: string
  department?: Department
  departmentId?: number
  employee?: Employee
  employeeId?: number
  createdAt?: Date
  updatedAt?: Date
}

export class Asset extends Entity<AssetProps, number> {
  @ApiProperty()
  get name() {
    return this.props.name
  }

  @ApiProperty()
  get prefix() {
    return this.props.prefix
  }

  @ApiProperty()
  get serialNumber() {
    return this.props.serialNumber
  }

  @ApiProperty()
  get IMEI() {
    return this.props.IMEI
  }

  @ApiProperty({
    type: Department,
    nullable: true,
  })
  get department() {
    return this.props.department
  }

  @ApiProperty({
    type: 'number',
    nullable: true,
  })
  get departmentId() {
    return this.props.departmentId
  }

  @ApiProperty({
    type: Employee,
    nullable: true,
  })
  get employee() {
    return this.props.employee
  }

  @ApiProperty({
    type: 'number',
    nullable: true,
  })
  get employeeId() {
    return this.props.employeeId
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get createdAt() {
    return this.props.createdAt
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get updatedAt() {
    return this.props.updatedAt
  }

  set name(name: string) {
    this.props.name = name
  }

  set prefix(prefix: string) {
    this.props.prefix = prefix
  }

  set serialNumber(serialNumber: number) {
    this.props.serialNumber = serialNumber
  }

  set IMEI(IMEI: string) {
    this.props.IMEI = IMEI
  }

  set department(department: Department | undefined) {
    this.props.department = department
  }

  set departmentId(departmentId: number | undefined) {
    this.props.departmentId = departmentId
  }

  set employee(employee: Employee | undefined) {
    this.props.employee = employee
  }

  set employeeId(employeeId: number | undefined) {
    this.props.employeeId = employeeId
  }

  set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt
  }

  set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt
  }

  static create(props: AssetProps, id?: number) {
    const answer = new Asset(props, id)

    return answer
  }
}
