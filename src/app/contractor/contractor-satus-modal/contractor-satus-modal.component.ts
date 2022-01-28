import { Inject } from '@angular/core';
import { Component, Injectable, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
  selector: 'app-contractor-satus-modal',
  templateUrl: './contractor-satus-modal.component.html',
  styleUrls: ['./contractor-satus-modal.component.scss']
})
export class ContractorSatusModalComponent implements OnInit {
  dataValue:any ={};
  karigarform:any={};
  conDetail:any={};
  id:any={};
  contractor_id:any={};
  couponTransfer:any ={};
  
  constructor( @Inject(MAT_DIALOG_DATA) public data, public db: DatabaseService, public dialog: DialogComponent, public dialogRef: MatDialog) { 
    console.log(data);
    this.dataValue = data['target'];
    this.id = data['id'];
    this.contractor_id = data['contractor_id'];
    console.log( this.id);
    
  }
  
  ngOnInit() {
    
    if(this.dataValue == 1 || this.dataValue == 3){
      this.contractorDetail();
    }

  }
  
  contractorDetail(){
    this.db.post_rqst( {'id':this.id}, 'app_karigar/get_contractor_request_detail').subscribe( r =>
      {
        console.log(r);
        this.conDetail = r.request_detail[0];
        this.karigarform.transfer_point = r.request_detail[0]['points'];
        this.karigarform.return_point = r.request_detail[0]['return_points'];
        console.log(this.karigarform.return_point);
        
      });
    }
    
    
    numeric_Number(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    
    changeStatus(form:any)
    {
      console.log(this.id);
      
      console.log(this.couponTransfer);
      
      this.couponTransfer.id= this.id;
      console.log(this.couponTransfer);
      
      // this.offer.created_by=this.db.datauser.id;
      // console.log(this.offer.image);
      // console.log(this.offer.gift_image);
      
      
      this.db.post_rqst( this.couponTransfer, 'app_master/update_contractor_request')
      .subscribe( r => {
        console.log(r);
        if(r['status'] == "UPDATED"){
          this.dialog.success('Status Change Successfully');
          this.dialogRef.closeAll();
        }
      });
    }

    pointSubmit(){
      if (this.karigarform.transfer_point < this.karigarform.return_point )  {
        this.dialog.warning('The retrived point should be less than transfer point!');
        return;
        
      } else {
        this.db.post_rqst({'request_id':this.id, 'contractor_id':this.contractor_id, 'return_points':this.karigarform.return_point}, 'app_master/return_contractor_points')
        .subscribe( r => {
          console.log(r);
          if(r['status'] == "UPDATED"){
            this.dialog.success('Status Change Successfully');
            this.dialogRef.closeAll();
          }
        });
      }
      
    }
    
  }
  