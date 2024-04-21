import { Component, OnInit} from '@angular/core';
import { RegionService } from '../../app/services/RegionService';
import { Region } from '../../app/models/Region';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'admin-region',
  templateUrl:'./admin-region.component.html',
  styleUrls: ['./admin-region.component.css']
})
export class AdminRegionComponent  {
  regions: Region[]=[];
  columns: string[] = ['image','name','description','score',"action"];

  constructor(public regionService: RegionService,private dialog: MatDialog) { }
  /*ngOnInit(): void {
  this.clientsService.getClients().subscribe(res=>{
    console.log(res)
    this.clients=res; 
    })
}*/
ngOnInit(): void {
  this.regionService.getRegions().subscribe(
    (data: any) => {
      // Assuming 'data' is the API response containing client data
      this.regions = data as Region[]; // Assigning response to clients array
    },
    (error) => {
      console.error('Error fetching clients:', error);
    }
  );
}

deleteClient(id: number): void {
    // Show confirmation dialog before deleting
    if (confirm('Are you sure you want to delete this region ?')) {
      // Call service method to delete beneficiary
      this.regionService.deleteRegion(id).subscribe(
        () => {
          console.log('formation deleted successfully');
          // Refresh beneficiary list after deletion
          this.regionService.getRegions();
        })
    };
  }
 /* openEditModal(clientId: object): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { clientId: clientId } // Pass the client ID to the EditComponent modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle modal close event if needed
    });
  }
*/

}


    
