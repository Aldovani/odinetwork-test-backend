import { ApiProperty } from '@nestjs/swagger'
import { Asset } from 'src/commons/entities/asset'
import { MetadataDocs } from 'src/shared/docs/entities/metadata'

export class GetAllAssetDTO {
  @ApiProperty({
    type: MetadataDocs,
  })
  metadata: MetadataDocs

  @ApiProperty({
    type: Asset,
    isArray: true,
  })
  data: Asset[]
}
