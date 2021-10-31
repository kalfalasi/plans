/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DuComponent } from './du.component';

describe('DuComponent', () => {
  let component: DuComponent;
  let fixture: ComponentFixture<DuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
