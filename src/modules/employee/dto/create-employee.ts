import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateEmployeeDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  departmentId: number
}
