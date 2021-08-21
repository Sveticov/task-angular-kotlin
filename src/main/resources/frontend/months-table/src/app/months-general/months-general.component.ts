import {Component, Directive, HostListener, OnInit} from '@angular/core';
import {MonthService} from "../month.service";
import {FormBuilder, NgForm} from "@angular/forms";
import {MonthData} from "./model/MonthData";

@Component({
  selector: 'app-months-general',
  templateUrl: './months-general.component.html',
  styleUrls: ['./months-general.component.css']
})
export class MonthsGeneralComponent implements OnInit {


  world_l = ""
  display = "none"
  displayDelete = "none"
  displayEdit = "none"
  monthData: MonthData = new MonthData(0, "", 0)
  monthDatas: MonthData[] = [];

  countNumber = 15
  widthNumber = "width:15%"
  triggerNumber = false

  countName = 35
  widthName = "width:35%"
  triggerName = false

  countButton = 35
  widthButton = "width:35%"
  triggerButton = false


  constructor(private monthService: MonthService) {
  }

  ngOnInit(): void {

  }


  findAllMonthsByWorldList(f: NgForm) {
    if (f.value.world.isEmpty)
      this.world_l = "null"
    if (!f.value.world.isEmpty)
      this.world_l = f.value.world
    this.monthService.findAllMonthsByWorld(this.world_l).subscribe(
      data => {
        console.log(data);
        this.monthDatas = data;
        console.log(this.monthDatas);
      }, error => console.log(error))

    this.world_l = ""
    f.value.world = ""

  }

  openModal() {
    this.monthData = new MonthData(0, "", 0)
    this.display = "block"
  }

  onCloseHandled() {
    this.display = "none"
  }

  createNewMonth(formCreateNew: NgForm) {
    this.monthData = new MonthData(0, formCreateNew.value.name, formCreateNew.value.number)
    this.monthService.createNewMonth(this.monthData).subscribe(error => console.log(error))
    this.monthService.findAllMonthsByWorld(this.world_l).subscribe(data =>
      this.monthDatas = data, error => console.log(error))
    this.monthData = new MonthData(0, "", 0)
    formCreateNew.onReset()
    this.display = "none"
  }


//todo delete method
  openModalDelete(id: number) {
    this.displayDelete = "block"
    console.log(id)
    this.monthService.findMonthByID(id).subscribe(data => {
      console.log(data);
      this.monthData = data
    })
  }

  onCloseDelete() {
    this.displayDelete = "none"
  }

  deleteMonth(id: number) {
    this.monthService.deleteMonthByID(id).subscribe()
    this.monthService.findAllMonthsByWorld(this.world_l).subscribe(
      data => {
        this.monthDatas = data;
      },
      error => console.log(error))
    this.displayDelete = "none"
  }

//todo edit method

  openModalEdit(id: number) {
    this.displayEdit = "block"
    console.log(id)
    this.monthService.findMonthByID(id).subscribe(data => {
      console.log(data);
      this.monthData = data
    })
  }

  onCloseEdit() {
    this.displayEdit = "none"
  }

  createEditMonth(formEdit: NgForm) {

    this.monthData = new MonthData(this.monthData.id, formEdit.value.name, formEdit.value.number)

    if (this.monthData.id != 0 && this.monthData.name != "" && this.monthData.number != 0) {// && this.monthData.number==null && this.monthData.name==null
      this.monthService.editMonth(this.monthData).subscribe(data => console.log(data))
      this.monthService.findAllMonthsByWorld(this.world_l).subscribe(
        data => {
          this.monthDatas = data;
        },
        error => console.log(error))
      this.displayEdit = "none"

    } else {
      console.log(this.monthData)
      console.log("error")
    }
  }

  moveLeftNumber() {
    if (this.countNumber < 50) {
      this.countNumber += 0.2
      this.widthNumber = "width:" + this.countNumber + "%"
    }
  }

  moveRightNumber() {
    if (this.countNumber > 15) {
      this.countNumber -= 0.2
      this.widthNumber = "width:" + this.countNumber + "%"
    }
  }

  mouseDownNumber() {
    this.triggerNumber = true
  }

  mouseUpNumber() {
    this.triggerNumber = false
  }

  mouseMoveNumber($event: MouseEvent) {
    console.log(this.triggerName)
    if ($event.movementX > 0 && this.triggerNumber) {
      this.moveLeftNumber()
    }
    if ($event.movementX < 0 && this.triggerNumber) {
      this.moveRightNumber()
    }
  }

  moveRightName() {
    if (this.countName < 70)
      this.countName += 0.2
    this.widthName = "width:" + this.countName + "%"

  }

  moveLeftName() {

    if (this.countName > 10)
      this.countName -= 0.2
    this.widthName = "width:" + this.countName + "%"
  }

  mouseDownName() {
    this.triggerName = true
  }

  mouseUpName() {
    this.triggerName = false
  }

  mouseMoveName($event: MouseEvent) {
    if ($event.movementX > 0 && this.triggerName) {
      this.moveLeftName()
    }
    if ($event.movementX < 0 && this.triggerName) {
      this.moveRightName()
    }
  }

  moveRightButton() {
    this.countButton += 0.2
    this.widthButton = "width:" + this.countButton + "%"
  }

  moveLeftButton() {
    if (this.countButton > 10)
      this.countButton -= 0.2
    this.widthButton = "width:" + this.countButton + "%"
  }

  mouseDownButton() {
    this.triggerButton = true
  }

  mouseUpButton() {
    this.triggerButton = false
  }

  mouseMoveButton($event: MouseEvent) {
    if ($event.movementX > 0 && this.triggerButton) {
      this.moveLeftButton()
    }
    if ($event.movementX < 0 && this.triggerButton) {
      this.moveRightButton()

    }
  }


}
