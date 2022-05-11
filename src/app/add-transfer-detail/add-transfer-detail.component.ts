import { ActivatedRoute, Data } from '@angular/router';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepicker } from '@angular/material';
// import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import * as moment from 'moment';
@Component({
  selector: 'app-add-transfer-detail',
  templateUrl: './add-transfer-detail.component.html',
  styleUrls: ['./add-transfer-detail.component.scss']
})
export class AddTransferDetailComponent implements OnInit {
  Redeemdetail: any = {};

  constructor(public db: DatabaseService, private route: ActivatedRoute, public dialog: DialogComponent, public dialogRef: MatDialogRef<AddTransferDetailComponent>, @Inject(MAT_DIALOG_DATA) public  data ) {
    console.log(data);
    
   }

  ngOnInit() {
// this.addTransDetail('');

  }


  
  // openDatePicker(picker : MatDatepicker<Date>)
  // {
  //   console.log(this.Redeemdetail.payment_date);
    
  //     picker.open();
  // }


  addTransDetail(){
  console.log(this.data);
  console.log(this.Redeemdetail);
  this.Redeemdetail.payment_date = moment(this.Redeemdetail.payment_date).format('YYYY-MM-DD');
  this.Redeemdetail.redeem_request_id = this.data.id;

    this.db.post_rqst( this.Redeemdetail, 'master/transferDetail')
    .subscribe( d => {
        // this.savingData = false;
        this.dialog.success( 'Status successfully Change');
        this.dialogRef.close(true);
        console.log( d );
    });
  }

}
