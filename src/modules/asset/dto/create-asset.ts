import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAssetDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  IMEI: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prefix: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  serialNumber: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  employeeId: number
}
