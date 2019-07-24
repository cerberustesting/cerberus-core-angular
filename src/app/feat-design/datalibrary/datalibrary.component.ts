import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { Filter } from 'src/app/shared/model/filter.model';

@Component({
  selector: 'app-datalibrary',
  templateUrl: './datalibrary.component.html',
  styleUrls: ['./datalibrary.component.scss']
})
export class DatalibraryComponent implements OnInit {

  columns: Array<Column> = [
    {
      displayName: "ID",
      contentName: '',
      active: true
    ,sSearch : []},
    {
      displayName: "Name",
      contentName: '',
      active: true
    ,sSearch : []},
    {
      displayName: "System",
      contentName: '',
      active: true
    ,sSearch : []},
    {
      displayName: "Environment",
      contentName: '',
      active: true
    ,sSearch : []},
    {
      displayName: "Country",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Group",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Description",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Type",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Value",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Database",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Script",
      contentName: '',
      active: false,
      width: 300
    ,sSearch : []},
    {
      displayName: "Database",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Service Path",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Operation",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Envelope",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "C SV URL",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Separator",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Creation Date",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Creator",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Modification Date",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Last Modifier",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Column",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Parsing Answer",
      contentName: '',
      active: false
    ,sSearch : []},
    {
      displayName: "Column Position",
      contentName: '',
      active: false
    ,sSearch : []}
  ];
  page = {
    size: 10, //maximum element per page
    number: 1, //number of current page
    sort: [{dir: "asc", prop : "id"}], //sort item
    totalCount: 0 //total count of element in database
  };
  rows = [];
  selectedRows = [];
  filterList: Array<Filter> = [];
  globalSearch = ''; // value in global search field
  filterTest: any; //
  servlet = '/ReadTestDataLib';

  constructor(private testService: TestService, private invariantsService: InvariantsService, private labelfilteringPipe: LabelfilteringPipe, private systemService: SystemService, private filterService: FilterService) { }

  ngOnInit() { }

}
