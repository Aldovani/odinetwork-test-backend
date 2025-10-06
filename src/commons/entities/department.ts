import { Entity } from './entity'

export type DepartmentProps = {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export class Department extends Entity<DepartmentProps, number> {
  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

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
