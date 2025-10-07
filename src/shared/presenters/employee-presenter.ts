import { Employee } from 'src/commons/entities/employee'

export class EmployeePresenter {
  static toHTTP(data: Employee) {
    const employee = {
      id: data?.id,
      name: data.name,
      email: data.email,
      department: {
        id: data.department.id,
        name: data.department.name,
      },
      createdAt: data.createdAt,
    }

    return employee
  }

  static manyToHttp(data: Employee[]) {
    return data.map((employee) => EmployeePresenter.toHTTP(employee))
  }
}
