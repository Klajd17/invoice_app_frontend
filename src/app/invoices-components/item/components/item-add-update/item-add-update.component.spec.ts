import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddUpdateComponent } from './item-add-update.component';

describe('ItemAddUpdateComponent', () => {
  let component: ItemAddUpdateComponent;
  let fixture: ComponentFixture<ItemAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAddUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
