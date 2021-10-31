import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-du',
  templateUrl: './du.component.html',
  styleUrls: ['./du.component.scss'],
})
export class DuComponent implements OnInit {
  plans: any[] = [
    {
      popular: false,
      price: '125',
      data: '4 GB',
      flexMin: '100',
      list: ['No activation fee. Save AED 125', '4 GB free data on WiFi UAE'],
      limitedOffer: false,
    },
    {
      popular: true,
      price: '200',
      prevData: '13',
      data: '26 GB',
      flexMin: '400',
      list: ['No activation fee. Save AED 125', '15 GB free data on WiFi UAE', 'Carry over data to next month'],
      limitedOffer: true,
    },
    {
      popular: false,
      price: '300',
      prevData: '25',
      data: '50 GB',
      flexMin: '1020',
      list: [
        'No activation fee. Save AED 125',
        '25 GB free data on WiFi UAE',
        'Carry over data to next month',
        'Amazon Prime on us',
        'Free Internet Calling Pack',
      ],
      limitedOffer: true,
    },
    {
      popular: false,
      price: '500',
      prevData: '50',
      data: '100 GB',
      flexMin: '1500',
      list: [
        'No activation fee. Save AED 125',
        '100 GB free data on WiFi UAE',
        'Carry over data to next month',
        'Amazon Prime on us',
        'Free Internet Calling Pack',
        'Roaming 2 GB',
      ],
      limitedOffer: true,
    },
    {
      popular: false,
      price: '1000',
      prevData: '120',
      data: 'Unlimited',
      prevFlexMin: '2500',
      flexMin: 'Unlimited',
      list: [
        'No activation fee. Save AED 125',
        '120 GB free data on WiFi UAE',
        'Carry over data to next month',
        'Amazon Prime on us',
        'Free Internet Calling Pack',
        'Roaming 5 GB',
      ],
      limitedOffer: true,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
