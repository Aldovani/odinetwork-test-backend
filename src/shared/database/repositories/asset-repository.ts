import { Asset } from 'src/commons/entities/asset'

export abstract class AssetRepository {
  abstract findById(id: number): Promise<Asset | null>
  abstract findAll(): Promise<Asset[]>
  abstract create(props: Asset): Promise<Asset>
  abstract save(department: Asset): Promise<Asset>
  abstract delete(id: number): Promise<void>
}
