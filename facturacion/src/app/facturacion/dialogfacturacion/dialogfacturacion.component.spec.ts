import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfacturacionComponent } from './dialogfacturacion.component';

describe('DialogfacturacionComponent', () => {
  let component: DialogfacturacionComponent;
  let fixture: ComponentFixture<DialogfacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfacturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
