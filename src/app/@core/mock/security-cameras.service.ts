import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Camera, SecurityCamerasData } from '../data/security-cameras';

@Injectable()
export class SecurityCamerasService extends SecurityCamerasData {

  private cameras: Camera[] = [
    {
      title: 'Camera #1',
      source: 'assets/images/camera1.jpg',
    },
    {
      title: 'Camera #2',
      source: 'assets/images/camera2.jpg',
    },
    {
      title: 'Camera #3',
      source: 'assets/images/camera3.jpg',
    },
    {
      title: 'Camera #4',
      source: 'assets/images/camera4.jpg',
    },
    {
      title: 'Fibonacci',
      source: 'assets/poker-planning-grp2-assets/poker20.PNG',
    },
    {
      title: 'Modified Fibonacci',
      source: 'assets/poker-planning-grp2-assets/poker23.PNG',
    },
    {
      title: 'Power Of 2',
      source: 'assets/poker-planning-grp2-assets/poker24.PNG',
    },
    {
      title: 'T-Shirt',
      source: 'assets/poker-planning-grp2-assets/poker211.PNG',
    },
  ];

  getCamerasData(): Observable<Camera[]> {
    return observableOf(this.cameras);
  }
}
