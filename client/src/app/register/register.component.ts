import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, TextInputComponent,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,DatePickerComponent]
})
export class RegisterComponent {

  @Output() cancelRegister = new EventEmitter();
    
    registerForm: FormGroup = new FormGroup({});
    maxDate: Date = new Date();
    validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router){ }

  ngOnInit(): void{
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

      initializeForm(){
        this.registerForm = this.fb.group({
          gender : ['male'],
          username : ['', Validators.required,],
          knownAs : ['', Validators.required,],
          dateOfBirth : ['', Validators.required],
          city : ['', Validators.required,],
          country : ['', Validators.required,],
          password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
          confirmPassword : ['', [Validators.required, this.matchValues('password')]],
        });
        //to also make sure confirm password is validation is updated when the field changes
        this.registerForm.controls['password'].valueChanges.subscribe({
          next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
        });
      }
      // for checking password match
      matchValues(matchTo: string) : ValidatorFn{
        return (control: AbstractControl) =>{
          return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
        }
      }
    register(){
      const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
      const values = {...this.registerForm.value, dateOfBirth: dob};
      this.accountService.register(values).subscribe({
        next: () => {
          this.router.navigateByUrl('/members')
        },
        error: error => {
          this.validationErrors = error
        }
      })
      

    }

    cancel(){
      this.cancelRegister.emit(false);
    }

    private getDateOnly(dob: string | undefined){
      if (!dob) return;
      let theDob = new Date(dob);
      return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset())).toISOString().slice(0,10); 
   }
}
