import { Module } from '@nestjs/common'
import { DepartmentService } from '../department/department.service'
import { IDepartmentService } from '../department/interface/department'
import { EmployeeModule } from '../employee/employee.module'
import { AssetController } from './asset.controller'
import { AssetService } from './asset.service'
import { IAssetService } from './interface/asset-service.interface'

@Module({
  controllers: [AssetController],
  providers: [
    { provide: IAssetService, useClass: AssetService },
    { provide: IDepartmentService, useClass: DepartmentService },
  ],
  exports: [{ provide: IAssetService, useClass: AssetService }],
  imports: [EmployeeModule],
})
export class AssetModule {}
