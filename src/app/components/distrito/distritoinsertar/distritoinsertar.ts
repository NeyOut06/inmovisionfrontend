import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Distrito } from '../../../models/Distrito';
import { Distritoservice } from '../../../services/distritoservice';

@Component({
  selector: 'app-distritoinsertar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule],
  templateUrl: './distritoinsertar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './distritoinsertar.css',
})
export class Distritoinsertar implements OnInit{

  form: FormGroup = new FormGroup({});
  dis: Distrito = new Distrito();
  edicion: boolean = false;
  id: number = 0;



   departamentoDistrito: { value: string; viewValue: string }[] = [
      { value: 'Amazonas', viewValue: 'Amazonas' },
      { value: 'Áncash', viewValue: 'Áncash' },
      { value: 'Apurímac', viewValue: 'Apurímac' },
      { value: 'Arequipa', viewValue: 'Arequipa' },
      { value: 'Ayacucho', viewValue: 'Ayacucho' },
      { value: 'Cajamarca', viewValue: 'Cajamarca' },
      { value: 'Cusco', viewValue: 'Cusco' },
      { value: 'Huancavelica', viewValue: 'Huancavelica' },
      { value: 'Huánuco', viewValue: 'Huánuco' },
      { value: 'Ica', viewValue: 'Ica' },
      { value: 'Junín', viewValue: 'Junín' },
      { value: 'La Libertad', viewValue: 'La Libertad' },
      { value: 'Lambayeque', viewValue: 'Lambayeque' },
      { value: 'Lima', viewValue: 'Lima' },
      { value: 'Loreto', viewValue: 'Loreto' },
      { value: 'Madre de Dios', viewValue: 'Madre de Dios' },
      { value: 'Moquegua', viewValue: 'Moquegua' },
      { value: 'Pasco', viewValue: 'Pasco' },
      { value: 'Piura', viewValue: 'Piura' },
      { value: 'Puno', viewValue: 'Puno' },
      { value: 'San Martín', viewValue: 'San Martín' },
      { value: 'Tacna', viewValue: 'Tacna' },
      { value: 'Tumbes', viewValue: 'Tumbes' },
      { value: 'Ucayali', viewValue: 'Ucayali' },
      { value: 'Callao', viewValue: 'Callao' },
      { value: 'Provincia de Lima', viewValue: 'Provincia de Lima' }
   ];

  constructor(
    private dS: Distritoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
   
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();

    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreDistrito: ['', [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)
        ]
      ],
      provinciaDistrito: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)
        ]
      ],
      departamentoDistrito: ['', Validators.required],
    });
  }
  aceptar(): void {
    if(this.form.valid){  
      this.dis.idDistrito = this.id ? this.id : this.form.value.codigo;
      this.dis.nombreDistrito=this.form.value.nombreDistrito
      this.dis.provinciaDistrito=this.form.value.provinciaDistrito
      this.dis.departamentoDistrito=this.form.value.departamentoDistrito
      if (this.edicion) {
        this.dS.update(this.dis).subscribe((data) => {
          this.dS.list().subscribe((data) => {
            this.dS.setList(data);
          });
        });
      }
      else{
        this.dS.insert(this.dis).subscribe(data=>{
          this.dS.list().subscribe(data=>{
            this.dS.setList(data)
        })
      })}
      this.router.navigate(['distritos'])
    }

  }


  cancelar(): void {
  this.router.navigate(['distritos']);
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idDistrito),
          nombreDistrito: new FormControl(data.nombreDistrito),
          provinciaDistrito: new FormControl(data.provinciaDistrito),
          departamentoDistrito: new FormControl(data.departamentoDistrito),
          
        });
      });
    }
  }

}
