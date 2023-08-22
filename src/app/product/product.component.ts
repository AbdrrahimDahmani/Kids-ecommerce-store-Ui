import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @ViewChild('slickComponent') slickModal: SlickCarouselComponent;
  images: string[] = [
    '../../assets/images/product.jpeg',
    '../../assets/images/product.jpeg',
    '../../assets/images/product.jpeg',
  ];

  currentSlideIndex = 0;

  slickCarouselConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  initialValue = 1;
  reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  inputForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    adress: new FormControl(null, [Validators.required]),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  submitRecord() {
    this.inputForm.controls.phone.addValidators(
      Validators.pattern('[6-9]\\d{9}')
    );
    console.log(this.inputForm.value);
  }

  ngOnInit(): void {}

  showImage(index: number): void {
    console.log(index);
    this.slickModal.slickGoTo(index); // Go to the selected slide
  }
}
