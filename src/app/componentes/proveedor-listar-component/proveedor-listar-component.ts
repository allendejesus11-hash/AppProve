import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {ProveedorService} from '../../services/proveedor-service';
import {Proveedor} from '../../model/proveedor';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogo} from './confirm-dialogo/confirm-dialogo';

@Component({
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatSortHeader,
    DatePipe,
    MatButton,
    RouterLink,
    MatIcon
  ],
  selector: 'app-proveedor-listar-component',
  styleUrl: './proveedor-listar-component.css',
  templateUrl: './proveedor-listar-component.html',
})
export class ProveedorListarComponent {
  displayedColumns: string[] = ['idProveedor',
                                'nombre',
                                'fechaInscripcion',
                                'direccion',
                                'telefono',
                                'email',
                                'accion01',
                                'accion02'] ;
  dataSource: MatTableDataSource<Proveedor> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  proveedorService: ProveedorService = inject(ProveedorService);
  dialog = inject(MatDialog);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    console.log("Se Ejecuta cada vez que se ingresa a la pagina");
    this.cargarLista();
  }
  private cargarLista() {
    this.proveedorService.list().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
    })
  }

  eliminar(idProveedor: number) {
     this.proveedorService.delete(idProveedor).subscribe({
       next: data => {
         console.log("Eliminado.");
         this.cargarLista();
       }
     })
  }

  abrirDialogo(idProveedor: number) {
    const dialogRef = this.dialog.open(ConfirmDialogo);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(idProveedor)
      }else{
         console.log("Elijio No");
      }
    })
  }
}
