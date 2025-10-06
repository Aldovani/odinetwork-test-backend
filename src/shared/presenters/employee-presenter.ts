import { Employee } from 'src/commons/entities/employee'

export class EmployeePresenter {
  static toHTTP(data: Employee) {
    const attempt = {
      id: data?.id,
      name: data.name,
      email: data.email,
      department: {
        id: data.department.id,
        name: data.department.name,
      },
      createdAt: data.createdAt,
    }

    return attempt
  }

  static manyToHttp(data: Employee[]) {
    return data.map((department) => EmployeePresenter.toHTTP(department))
  }
}
