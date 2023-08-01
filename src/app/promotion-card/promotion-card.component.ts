import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.css'],
})
export class PromotionCardComponent implements OnInit {
  public currentDate: string = moment(new Date())
    .locale('fr')
    .format('dddd D MMMM  YYYY ');
  convertFirstLetterToUpperCase(str: string) {
    let splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
  }
  ngOnInit(): void {
    this.currentDate = this.convertFirstLetterToUpperCase(this.currentDate);
  }
}
