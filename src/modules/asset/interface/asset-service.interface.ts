import { Asset } from 'src/commons/entities/asset'
import { CreateAssetDTO } from '../dto/create-asset'
import { UpdateAssetDTO } from '../dto/update-asset'

export abstract class IAssetService {
  abstract getById(id: number): Promise<Asset>
  abstract getAll(): Promise<Asset[]>
  abstract create(employee: CreateAssetDTO): Promise<Asset>
  abstract update(id: number, props: UpdateAssetDTO): Promise<Asset>
  abstract delete(id: number): Promise<void>
}
