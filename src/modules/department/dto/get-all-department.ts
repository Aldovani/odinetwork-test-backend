import { ApiProperty } from '@nestjs/swagger'
import { Department } from 'src/commons/entities/department'
import { MetadataDocs } from 'src/shared/docs/entities/metadata'

export class GetAllDepartmentDTO {
  @ApiProperty({
    type: MetadataDocs,
  })
  metadata: MetadataDocs

  @ApiProperty({
    type: Department,
    isArray: true,
  })
  data: Department[]
}
