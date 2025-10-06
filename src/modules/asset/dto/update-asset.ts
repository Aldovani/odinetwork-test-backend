import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAssetDTO {
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
  @IsOptional()
  departmentId: number | undefined

  @IsNumber()
  @IsOptional()
  employeeId: number | undefined
}
