import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, TemplateRef, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '../../_forms/date-picker/date-picker.component';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-roles-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, TextInputComponent,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,DatePickerComponent],
  templateUrl: './roles-modal.component.html',
  styleUrl: './roles-modal.component.scss'
})
export class RolesModalComponent {
	activeModal = inject(NgbActiveModal);

	@Input() username: string | undefined;
	@Input() availableRoles: any[] = []
	@Input() selectedRoles: any[] = [];



	updateCheck(checkedValue: string) {
		const index = this.selectedRoles.indexOf(checkedValue);
		index !== -1 ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue)
	}
}


