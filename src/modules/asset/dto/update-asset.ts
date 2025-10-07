import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAssetDTO {
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

  @ApiProperty({
    type: 'integer',
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  departmentId: number | undefined

  @ApiProperty({
    type: 'integer',
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  employeeId: number | undefined
}
