import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandMenuComponent } from './command-menu.component';

describe('CommandMenuComponent', () => {
  let component: CommandMenuComponent;
  let fixture: ComponentFixture<CommandMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
