import { Asset } from './asset'
import { Entity } from './entity'

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
  get problemDescription() {
    return this.props.problemDescription
  }

  get entryDate() {
    return this.props.entryDate
  }

  get completionDate() {
    return this.props.completionDate
  }

  get assetId() {
    return this.props.assetId
  }

  get asset() {
    return this.props.asset
  }

  get updatedAt() {
    return this.props.updatedAt
  }

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
