import { ApiProperty } from '@nestjs/swagger'
import { Entity } from './entity'

export type DepartmentProps = {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class Department extends Entity<DepartmentProps, number> {
  @ApiProperty()
  get name() {
    return this.props.name
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

  static create(props: DepartmentProps, id?: number) {
    const answer = new Department(props, id)

    return answer
  }
}
