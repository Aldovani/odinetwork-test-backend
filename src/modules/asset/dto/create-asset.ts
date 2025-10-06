import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAssetDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  IMEI: string

  @IsString()
  @IsNotEmpty()
  prefix: string

  @IsNumber()
  @IsNotEmpty()
  serialNumber: number

  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @IsNumber()
  @IsNotEmpty()
  employeeId: number
}
