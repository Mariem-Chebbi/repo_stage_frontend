import { Component, Input, ViewChild } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbSortDirection, NbSortRequest, NbThemeService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowService } from '@nebular/theme';
import { CreateProjectComponent } from '../create-project/create-project.component';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Type: string;
  Adaptation: string;
}
@Component({
  selector: 'ngx-fdd',
  templateUrl: './fdd.component.html',
  styleUrls: ['./fdd.component.scss']
})
export class FddComponent {
  @ViewChild('item', { static: true }) accordion; 
  toggle() {
    this.accordion.toggle();
  }


  /* The line `customColumn = 'Type of Project';` in the code is defining a property `customColumn`
  within the `FddComponent` class and assigning the value `'Type of Project'` to it. This property
  is being used to specify a custom column header for the tree grid component in the Angular
  application. The value `'Type of Project'` will be displayed as the header for the custom column
  in the tree grid alongside the default columns like size, kind, and items. */
  customColumn = 'Type';
  defaultColumns = [ 'Adaptation' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,private windowService: NbWindowService) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { Type: 'Large Complex Projects', Adaptation: 'Ideal for complex systems with many distinct functionalities.' },      
    },
    {
      data: { Type: 'Projects with a Distributed Team', Adaptation: 'Effective for dispersed teams due to clear task allocation.' },      
    },
    {
      data: { Type: ' Projects Requiring Rapid and Continuous Delivery', Adaptation: 'Benefits from frequent deliveries and short iterations.'},      
    },
    {
      data: { Type: 'Projects Requiring Strong Team Collaboration', Adaptation: 'Encourages close and structured collaboration.' },      
    },
    {
      data: { Type: 'Projects with Evolving Requirements', Adaptation: 'Allows for iterative and incremental integration of changes.' },      
    },
    {
      data: { Type: 'Projects Requiring High Quality and Maintainability', Adaptation: 'Benefits from regular code reviews and continuous testing.'},      
    },
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }


  openWindowForm() {
    this.windowService.open(CreateProjectComponent, { title: `Create New Project` });
  }
}

