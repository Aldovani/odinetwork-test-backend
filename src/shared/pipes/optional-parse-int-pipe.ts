import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class OptionalParseIntPipe
  implements PipeTransform<string, number | undefined>
{
  transform(value: string) {
    if (typeof value === 'undefined') return undefined

    try {
      const parsedValue = Number(value)

      if (parsedValue % 1 !== 0) {
        throw new BadRequestException('Value must be a integer number')
      }

      return parsedValue
    } catch {
      throw new BadRequestException('Value must be a integer number')
    }
  }
}
