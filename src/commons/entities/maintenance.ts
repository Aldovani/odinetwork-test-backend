import { ApiProperty } from '@nestjs/swagger'
import { Asset } from './asset'
import { Entity } from './entity'

export const MAINTENANCE_STATUS = {
  FINISHED: 'FINISHED',
  IN_PROGRESS: 'IN_PROGRESS',
} as const

export type MaintenanceStatus = keyof typeof MAINTENANCE_STATUS

export type MaintenanceProps = {
  problemDescription: string
  entryDate: Date
  completionDate?: Date
  assetId: number
  asset: Asset
  createdAt?: Date
  updatedAt?: Date
}

export class Maintenance extends Entity<MaintenanceProps, number> {
  @ApiProperty()
  get problemDescription() {
    return this.props.problemDescription
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get entryDate() {
    return this.props.entryDate
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get completionDate() {
    return this.props.completionDate
  }

  @ApiProperty()
  get assetId() {
    return this.props.assetId
  }

  @ApiProperty()
  get asset() {
    return this.props.asset
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get updatedAt() {
    return this.props.updatedAt
  }

  @ApiProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  get createdAt() {
    return this.props.createdAt
  }

  set problemDescription(problemDescription: string) {
    this.props.problemDescription = problemDescription
  }

  set entryDate(entryDate: Date) {
    this.props.entryDate = entryDate
  }

  set completionDate(completionDate: Date | undefined) {
    this.props.completionDate = completionDate
  }

  set assetId(assetId: number) {
    this.props.assetId = assetId
  }

  set asset(asset: Asset) {
    this.props.asset = asset
  }

  set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt
  }

  set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt
  }

  static create(props: MaintenanceProps, id?: number) {
    const maintenance = new Maintenance(props, id)

    return maintenance
  }
}
