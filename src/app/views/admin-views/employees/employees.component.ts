import { BreadCrumbModel } from './../../../shared/components/bread-crumb/bread-crumb.model';
import { SearchService } from './../../../shared/services/common/search/search.service';
import { SortService } from './../../../shared/services/common/sort/sort.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit,ViewChild } from '@angular/core';

const ELEMENT_DATA = [
  { employeeID: 1, employeeName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 2, employeeName: 'abc', createdBy: '123', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 1, employeeName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', employeeEmail: 'H', role: 'N'},
  { employeeID: 2, employeeName: 'abc', createdBy: '123', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 1, employeeName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 2, employeeName: 'abc', createdBy: '123', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 1, employeeName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 2, employeeName: 'abc', createdBy: '123', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 1, employeeName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', employeeEmail: 'H', role: 'N' },
  { employeeID: 2, employeeName: 'abc', createdBy: '123', updatedBy: 'sai', employeeEmail: 'H', role: 'N' }

];
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['employeeID', 'employeeName', 'employeeEmail', 'createdBy', 'updatedBy', 'role'];
  dataSource: MatTableDataSource<any>;
  changeEvent: MatSort;
  list = ELEMENT_DATA;
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
    private searchService: SearchService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  sortChange(eve) {
    this.changeEvent = eve;
    if (eve.direction === '') {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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
}
