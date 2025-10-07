import { Asset } from 'src/commons/entities/asset'

export class AssetPresenter {
  static toHTTP(data: Asset) {
    const asset = {
      id: data.id,
      name: data.name,
      IMEI: data.IMEI,
      prefix: data.prefix,
      serialNumber: data.serialNumber,
      department: {
        id: data.department?.id,
        name: data.department?.name,
      },
      employee: {
        name: data.employee?.name,
        email: data.employee?.email,
      },
      createdAt: data.createdAt,
    }

    return asset
  }

  static manyToHttp(data: Asset[]) {
    return data.map((asset) => AssetPresenter.toHTTP(asset))
  }
}
