import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProveedorService} from '../../services/proveedor-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Proveedor} from '../../model/proveedor';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDatepickerInput,
    MatHint,
    MatDatepickerToggle,
    MatDatepicker,
    MatButton,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  selector: 'app-proveedor-nuevo-edit-component',
  styleUrl: './proveedor-nuevo-edit-component.css',
  templateUrl: './proveedor-nuevo-edit-component.html',
})
export class ProveedorNuevoEditComponent {
  proveedorForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  proveedorService: ProveedorService = inject(ProveedorService);
  route: ActivatedRoute = inject(ActivatedRoute);//capturar un parametro
  edicion: boolean = false; // false: Editar, true: Insertar
  router : Router = inject(Router);//navegar
  id: number;

  constructor() {
    this.proveedorForm = this.fb.group({
      idProveedor: [''],
      nombre: ['', Validators.required],
      fechaInscripcion : ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("^\\d{9}$")]],
      email: ['', [Validators.required, Validators.email]],
    })
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("Parametro recibido:", params['id']);
      this.edicion = params['id'] !=null;
      this.cargaForm();
    })
  }
  cargaForm() {
    if(this.edicion){
      this.proveedorService.listId(this.id).subscribe({
        next: data => {
          console.log("Data traida:", data);
          this.proveedorForm.setValue(data); //llena el form con los datos traidos
        }
      })
    }
  }
  enviar(){
    if(this.proveedorForm.valid){
      let proveedor  = new Proveedor();
      proveedor = this.proveedorForm.value; //copia todos los datos validos del form a proveedor
      console.log("Datos leidos del formulario:", proveedor);
      if(!this.edicion){ //inserte
        this.proveedorService.insert(proveedor).subscribe({
          next: data => {
             console.log("Datos registrados en bd:", data);
             this.router.navigate(['/proveedores']);
          }
        })
      }else{ //update
        this.proveedorService.update(proveedor).subscribe({
          next: data => {
            console.log("Datos actualizados en bd:", data);
            this.router.navigate(['/proveedores']);
          }
        })
      }
    }
  }

}
