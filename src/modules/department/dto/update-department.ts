import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateDepartmentDTO {
  @IsString()
  @IsNotEmpty()
  name: string
}
