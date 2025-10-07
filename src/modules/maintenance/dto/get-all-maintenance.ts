import { ApiProperty } from '@nestjs/swagger'
import { Maintenance } from 'src/commons/entities/maintenance'
import { MetadataDocs } from 'src/shared/docs/entities/metadata'

export class GetAllMaintenanceDTO {
  @ApiProperty({
    type: MetadataDocs,
  })
  metadata: MetadataDocs

  @ApiProperty({
    type: Maintenance,
    isArray: true,
  })
  data: Maintenance[]
}
