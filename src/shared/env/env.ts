import { plainToInstance } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator'

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string

  @IsNumber()
  @IsOptional()
  PORT: number = 8080
}

export type Env = EnvironmentVariables

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
