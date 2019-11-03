import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SortService } from '../../../shared/services/common/sort/sort.service';
import { SearchService } from '../../../shared/services/common/search/search.service';
import { BreadCrumbModel } from '../../../shared/components/bread-crumb/bread-crumb.model';
import { CommonRequestService } from '../../../shared/services/common-request.service';
import { RequestEnums } from '../../../shared/constants/request-enums';

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
  displayedColumns: string[] = ['companyID', 'companyName', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<any>;
  changeEvent: MatSort;
  list = [];
  searchValue = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  breadCrumbs: BreadCrumbModel[] = [
    {
      label: 'Companies'
    }
  ];
  constructor(
    private sortService: SortService,
    private searchService: SearchService,
    private commonRequestService: CommonRequestService) {
  }

  ngOnInit() {
    this.commonRequestService.request(RequestEnums.COMPANY_LIST).subscribe(res => {
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
    const filteredArray = this.searchService.searchFilterArrayOfJson(this.list, this.searchValue, ['companyName', 'companyID']);
    this.dataSource = new MatTableDataSource(filteredArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
