import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDepartmentDTO {
  @IsString()
  @IsNotEmpty()
  name: string
}
