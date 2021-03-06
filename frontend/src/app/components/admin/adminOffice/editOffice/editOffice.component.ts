import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Office} from '../../../../model/office.model';
import {OfficeService} from '../../../../service/office.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GoogleMapsComponent} from '../../../utils/google-maps/google-maps.component';
import {MapsAPILoader} from '@agm/core';
import {FLAT_PATTERN, FLOOR_PATTERN} from '../../../../model/utils';
import {CustomToastService} from "../../../../service/customToast.service";

@Component({
  selector: 'editOffice',
  templateUrl: 'editOffice.component.html',
  styleUrls: ['editOffice.component.css']
})
export class EditOfficeComponent implements OnInit {
  office: Office;
  cudOfficeForm: FormGroup;
  addressOfficeRegisterByAdmin: FormGroup;
  map: GoogleMapsComponent;

  @ViewChild('searchAddress')
  public searchAddressRef: ElementRef;

  constructor(private officeService: OfficeService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private formBuilder: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private customToastService: CustomToastService) {
    this.map = new GoogleMapsComponent(mapsAPILoader, ngZone);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.map.setSearchElement(this.searchAddressRef);
    }, 700);
    this.map.ngOnInit();
    this.getOffice();
    this.cudOfficeForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        address: this.initAddress(),
        description: [''],
      }
    );
  }

  initAddress() {
    return this.addressOfficeRegisterByAdmin = this.formBuilder.group({
      street: ['', [Validators.required, Validators.minLength(5)]],
      house: ['', [Validators.required, Validators.maxLength(5)]],
      floor: [Validators.required, Validators.pattern(FLOOR_PATTERN)],
      flat: [Validators.required, Validators.pattern(FLAT_PATTERN)]
    });
  }

  getOffice() {
    const id = +this.activatedRouter.snapshot.paramMap.get('id');
    console.log('getOffice() id: ' + id);
    this.officeService.getOfficeById(id).subscribe((office: Office) => this.office = office);
  }

  save(): void {
    console.log('save() office: ' + this.office.name);
    this.officeService.update(this.office)
      .subscribe((office: Office) => {
        this.customToastService.setMessage('Office ' + this.office.name + ', updated');
        this.router.navigate(['admin/adminOffice']);
      });
  }

  validateField(field: string): boolean {
    return this.cudOfficeForm.get(field).valid || !this.cudOfficeForm.get(field).dirty;
  }

  validateFieldAddress(field: string): boolean {
    return this.addressOfficeRegisterByAdmin.get(field).valid || !this.addressOfficeRegisterByAdmin.get(field).dirty;
  }

  mapReady($event, yourLocation) {
    this.map.mapReady($event, yourLocation);
    this.map.geocodeAddress(this.office.address.street, this.office.address.house);
  }

  updateStreet() {
    this.office.address.street = this.map.street;
  }

  updateHouse() {
    this.office.address.house = this.map.house;
  }

  updateStreetHouse() {
    setTimeout(() => {
      this.office.address.house = this.map.house;
      this.office.address.street = this.map.street;
    }, 500);
  }

  deactivateOffice(): void {
    console.log('office id: ' + this.office.id);
    // let id = office.id;
    // this.offices = this.offices.filter(h => h !== office);
    this.officeService.deactivateOffice(this.office).subscribe(() => {
      this.customToastService.setMessage('Office: ' + this.office.name + ', deactivate!');
      this.router.navigate(['/admin/adminOffice'])
    });
  }

  activateOffice(): void {
    console.log('office id: ' + this.office.id);
    // let id = office.id;
    // this.offices = this.offices.filter(h => h !== office);
    this.officeService.activateOffice(this.office).subscribe(() => {
      this.customToastService.setMessage('Office: ' + this.office.name + ', activated!');
      this.router.navigate(['/admin/adminOffice'])
    });
  }
}
