import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule if not already imported
import { UserModel } from '../login/user-model.model';
import { AppService } from '../../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('myModel') model : ElementRef | undefined;
  studentObj: Student = new Student();
  currentUser:UserModel=new UserModel();
  guestForm: any = {};
  studentList: Student[] = [];
  audioRequired: boolean = false;
  venueRequired: boolean = false;
  constructor(private appService:AppService,private http:HttpClient) {} // Removed Router dependency to avoid unnecessary injection

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null) {
      this.studentList = JSON.parse(localData)

   }
   this.currentUser=this.appService.getUserDetail();
   console.log(this.currentUser);
  }

  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Student) {
    const isDelete = confirm("Are you sure want to Delete");
    if(isDelete) {
      const currentRecord =  this.studentList.findIndex(m=> m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }

  onEdit(item: Student) {
    this.studentObj =  item;
    this.openModel();
  }

  updateStud() {
      const currentRecord =  this.studentList.find(m=> m.id === this.studentObj.id);
      if(currentRecord != undefined) {
        currentRecord.eventName = this.studentObj.eventName;
        currentRecord.eventDate =  this.studentObj.eventDate;
        currentRecord.eventTime =  this.studentObj.eventTime;
      };
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
      this.closeModel()
  }

  saveStudent(isUpdate: boolean) {
    this.http.post("http://localhost:8080/api/faculty/creates", this.studentObj).subscribe((resultData:any)=>
         {
           if (isUpdate) {
             alert("Form updated Successfully.")
             } else {
               alert("Registered Successfully");
               }
           this.studentObj = new Student();
           });
    const isLocalPresent = localStorage.getItem("angular17crud");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel()
  }

}
export class Student {
  id: number;
  eventName: string;
  eventDate: Date;
  eventTime: string;
  organiserName: string;
  organiserDepartment: string;
  organiserMobile: string;
  participantsInternal:string;
  participantsExternal:string;
  guestName:string;
  guestDesignation:string;
  guestOrganization:string;
  arrivingtime:string;
  guidingfaculty:string;
  guestroomtype:string;

  venueRequired: boolean;
  audioRequired: boolean;
  accommodationRequired:boolean;
  accessoriesRequired:boolean;
  transportRequired: boolean = false;
  hostelRequired: boolean = false;
  internaltransportRequired:boolean;

  noofrooms?: number;
  noOfVenueRequired?: number;
  accommodationtype?: string;
  roomtype?: string;
  purposeOfVisit: string;

  transportDetails?: string;
  waterbottles:number;
  type:string;
  startingplace:string;
  pad:string;
  handmic:number;
  collarmic:number;
  endplace:string;
  dining:string;
    noofpersons:number;
  accompanyingPassengers?: number;




  constructor() {
    this.id = 0;
    this.eventName = '';
    this.eventDate = new Date();
    this.eventTime = '';
    this.guidingfaculty='';
    this.guestroomtype='';
    this.arrivingtime='';
    this.pad='';
    this.handmic=0;
    this.collarmic=0;
    this.waterbottles=0;
    this.type='';
    this.dining='';
    this.internaltransportRequired=false;
    this.accommodationRequired=false;
    this.accessoriesRequired=false;
    this.startingplace='';
    this.endplace='';
    this.noofpersons=0;
    this.organiserName='';
    this.organiserDepartment= '';
    this.organiserMobile= '';
   this.participantsInternal='';
   this.participantsExternal='';
   this.guestName='';
   this.guestDesignation='';
   this.guestOrganization='';
    this.venueRequired = false;
    this.audioRequired = false;
    this.purposeOfVisit='';

  }
}
