import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateEmployeeDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNumber()
  @IsNotEmpty()
  departmentId: number
}
