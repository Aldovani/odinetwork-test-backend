import { ApiProperty } from '@nestjs/swagger'

export class MetadataDocs {
  @ApiProperty()
  currentPage: number

  @ApiProperty()
  perPage: number

  @ApiProperty()
  totalOfItems: number

  @ApiProperty()
  totalOfPages: number
}
