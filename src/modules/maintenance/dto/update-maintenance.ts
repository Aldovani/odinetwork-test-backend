import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpdateMaintenanceDTO {
  @IsString()
  @IsNotEmpty()
  problemDescription: string

  @IsDateString()
  @IsNotEmpty()
  completionDate: Date

  @IsDateString()
  @IsNotEmpty()
  entryDate: Date

  @IsNumber()
  @IsNotEmpty()
  assetId: number
}
