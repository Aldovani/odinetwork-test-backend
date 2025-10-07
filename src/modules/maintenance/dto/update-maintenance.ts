import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class UpdateMaintenanceDTO {
  @IsString()
  @IsNotEmpty()
  problemDescription: string

  @IsDateString()
  @IsNotEmpty()
  completionDate: Date
}
