import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SortService } from '../../../shared/services/common/sort/sort.service';
import { SearchService } from '../../../shared/services/common/search/search.service';

const ELEMENT_DATA = [
  { companyID: 1, companyName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 2, companyName: 'abc', createdBy: '123', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 1, companyName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 2, companyName: 'abc', createdBy: '123', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 1, companyName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 2, companyName: 'abc', createdBy: '123', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 1, companyName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 2, companyName: 'abc', createdBy: '123', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 1, companyName: 'Hydrogen', createdBy: 'sai', updatedBy: 'sai', companyEmail: 'H' },
  { companyID: 2, companyName: 'abc', createdBy: '123', updatedBy: 'sai', companyEmail: 'H' }

];
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  displayedColumns: string[] = ['companyID', 'companyName', 'companyEmail', 'createdBy', 'updatedBy'];
  dataSource: MatTableDataSource<any>;
  changeEvent: MatSort;
  list = ELEMENT_DATA;
  searchValue = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
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
    const filteredArray = this.searchService.searchFilterArrayOfJson(this.list, this.searchValue, ['companyName', 'companyID']);
    this.dataSource = new MatTableDataSource(filteredArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
