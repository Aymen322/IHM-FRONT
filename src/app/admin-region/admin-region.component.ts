import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { RegionService } from '../../app/services/RegionService';
import { Region } from '../../app/models/Region';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../admin-client1/confirm-dialog/confirm-dialog.component';
import { RegionFormComponent } from './region-form/region-form.component';
@Component({
  selector: 'admin-region',
  templateUrl:'./admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent  implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'image', 'description', 'score', 'hotels', 'action'];
  dataSource = new MatTableDataSource<Region>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public CS: RegionService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getRegions(); 
  }

  onEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.CS.getRegionById(id).subscribe((region) => {
      dialogConfig.data = region;
      const dialogRef = this.dialog.open(RegionFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(() => {
        this.getRegions();
      })
    });
  }

  getRegions(): void {
    this.CS.getRegions().subscribe((r) => {
      this.dataSource = new MatTableDataSource<Region>(r);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.CS.deleteRegion(id).subscribe(() => {
          this.getRegions();
        });
      }
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';  // Adjust width as needed
    dialogConfig.panelClass = 'custom-dialog-container';  // Add this line
    const dialogRef = this.dialog.open(RegionFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {   
        this.getRegions();
      });
 
  }
}
