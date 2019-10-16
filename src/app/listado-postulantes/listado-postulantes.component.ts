import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../model/user.model';
import { Application } from '../model/application.model';
import { SolicitudService } from '../service/solicitud.service';

export interface DialogData {
  postulantes: User[];
  aceptado: Application;
}

@Component({
  selector: 'app-listado-postulantes',
  templateUrl: './listado-postulantes.component.html',
  styleUrls: ['./listado-postulantes.component.scss']
})

export class ListadoPostulantesComponent implements OnInit {

  displayedColumns: string[] = ['status', 'name', 'username', 'aceptar', 'rechazar'];
  ELEMENT_DATA: User[];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public solicitudSrv: SolicitudService,
    public dialogRef: MatDialogRef<ListadoPostulantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.ELEMENT_DATA = data.postulantes;
    this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  aceptar(user: Application) {
    this.data.aceptado = user;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  rechazar(user) {

  }

}





