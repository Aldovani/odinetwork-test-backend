import { Department } from 'src/commons/entities/department'

export class DepartmentPresenter {
  static toHTTP(data: Department) {
    const department = {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }

    return department
  }

  static manyToHttp(data: Department[]) {
    return data.map((department) => DepartmentPresenter.toHTTP(department))
  }
}
