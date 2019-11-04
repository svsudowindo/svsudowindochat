import { EncryptDectryptService } from './../../../shared/services/common/encrypt-decrypt/encrypt-dectrypt.service';
import { Router } from '@angular/router';
import { CommonRequestService } from './../../../shared/services/common-request.service';
import { BreadCrumbModel } from './../../../shared/components/bread-crumb/bread-crumb.model';
import { SearchService } from './../../../shared/services/common/search/search.service';
import { SortService } from './../../../shared/services/common/sort/sort.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit,ViewChild } from '@angular/core';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdBy', 'updatedBy', 'designation'];
  dataSource: MatTableDataSource<any>;
  changeEvent: MatSort;
  list = [];
  SearchValue = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  breadCrumbs: BreadCrumbModel[] = [
    {
      label: 'employees'
    }
  ];
  constructor(
    private sortService: SortService,
    private searchService: SearchService,
    private commonRequestService: CommonRequestService,
    private router: Router,
    private encryptDectryptService: EncryptDectryptService){
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.commonRequestService.request(RequestEnums.EMPLOYEE_LIST).subscribe(res =>{
    console.log(res);
      this.list = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  sortChange(eve) {
    this.changeEvent = eve;
    if (eve.direction === '') {
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
    } else {
      const listData = this.sortService.getSortedData(this.dataSource, this.list, this.displayedColumns, eve.active, eve.direction);
      this.dataSource = new MatTableDataSource(listData);
      this.dataSource.paginator = this.paginator;

    }
  }

  search() {
    const filteredArray = this.searchService.searchFilterArrayOfJson(this.list, this. SearchValue, ['employeecName', 'employeeID']);
    this.dataSource = new MatTableDataSource(filteredArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  navigateToEmployeeEdit(row) {
    this.router.navigate(['employees', 'details', this.encryptDectryptService.getCipherText(row.employeeID)]);
  }
}
