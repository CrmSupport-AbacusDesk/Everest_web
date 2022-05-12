import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/_services/DatabaseService';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-coupon-point',
  templateUrl: './add-coupon-point.component.html',
  styleUrls: ['./add-coupon-point.component.scss']
})
export class AddCouponPointComponent implements OnInit {

  Couponform:any ={};
  userId:any;
  target:any ={};
  couponData:any ={}
  loading = false;
  couponsList: any = [];
  id:any;

  constructor( public db: DatabaseService, private route: ActivatedRoute, public dialog: DialogComponent, public dialogRef: MatDialogRef<AddCouponPointComponent>, @Inject(MAT_DIALOG_DATA) public  data ) {
    this.id = data["id"];
        console.log('Karigar Id Is ->', this.id);
    console.log(data);
    
   }

  ngOnInit() {
  }

  saveCoupon = ()  => {
    this.Couponform;
    console.log(this.Couponform.coupon_points);
    if(this.Couponform.coupon_points == undefined){
        this.dialog.warning('Coupon points are required');
        return;
    }
    if(this.Couponform.remarks == undefined){
      this.dialog.warning('Remarks are required');
      return;
      }
    const coupon_points = this.Couponform.coupon_points;
    const remarks = this.Couponform.remarks;

    this.db.insert_rqst({"id":this.id, "points":coupon_points, "remark": remarks}, 'karigar/manual_point_add')
    .subscribe(response => {
        console.log(response);
        this.dialogRef.close();
        this.loading = false;
    });
  }

}
