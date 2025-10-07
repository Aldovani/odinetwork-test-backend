import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class UpdateMaintenanceDTO {
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
  completionDate: Date
}
