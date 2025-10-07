import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateMaintenanceDTO {
  @IsString()
  @IsNotEmpty()
  problemDescription: string

  @IsDateString()
  @IsNotEmpty()
  entryDate: Date

  @IsNumber()
  @IsNotEmpty()
  assetId: number
}
