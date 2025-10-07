import { ApiProperty } from '@nestjs/swagger'
import { Employee } from 'src/commons/entities/employee'
import { MetadataDocs } from 'src/shared/docs/entities/metadata'

export class GetAllEmployeeDTO {
  @ApiProperty({
    type: MetadataDocs,
  })
  metadata: MetadataDocs

  @ApiProperty({
    type: Employee,
    isArray: true,
  })
  data: Employee[]
}
