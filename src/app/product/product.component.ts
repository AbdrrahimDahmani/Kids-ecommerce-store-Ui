import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  initialValue = 0;
  reactiveForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  inputForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    adress: new FormControl(null, [Validators.required]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  submitRecord() {
    this.inputForm.controls.phone.addValidators(
      Validators.pattern('[6-9]\\d{9}')
    );
    console.log(this.inputForm.value);
  }

  ngOnInit(): void {}
}
