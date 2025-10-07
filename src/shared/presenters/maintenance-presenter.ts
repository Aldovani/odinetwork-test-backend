import { Maintenance } from 'src/commons/entities/maintenance'
import { AssetPresenter } from './asset-presenter'

export class MaintenancePresenter {
  static toHTTP(data: Maintenance) {
    const maintenance = {
      id: data.id,
      completionDate: data.completionDate,
      entryDate: data.entryDate,
      problemDescription: data.problemDescription,
      asset: AssetPresenter.toHTTP(data.asset),
    }

    return maintenance
  }

  static manyToHttp(data: Maintenance[]) {
    return data.map((maintenance) => MaintenancePresenter.toHTTP(maintenance))
  }
}
