import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateMaintenanceDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  problemDescription: string

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  @IsDateString()
  @IsNotEmpty()
  entryDate: Date

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  assetId: number
}
