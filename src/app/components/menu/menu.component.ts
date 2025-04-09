import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isExpanded = false;
  groups = ['Grupo A', 'Grupo B', 'Grupo C'];
  selectedGroup: string = this.groups[0];
  showGroupManager = false;
  newGroup: string = '';
  editedGroupIndex: number | null = null;
  editedGroupName: string = '';

  @Output() groupSelected = new EventEmitter<string>();

  ngOnInit() {
    this.groupSelected.emit(this.selectedGroup);
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  selectGroup(group: string) {
    this.selectedGroup = group;
    this.groupSelected.emit(group);
  }


  openGroupManager() {
    this.showGroupManager = true;
  }

  closeGroupManager() {
    this.showGroupManager = false;
    this.newGroup = '';
  }

  addGroup() {
    const trimmed = this.newGroup.trim();
    if (trimmed && !this.groups.includes(trimmed)) {
      this.groups.push(trimmed);
      this.newGroup = '';
    }
  }

  removeGroup(index: number) {
    const wasSelected = this.groups[index] === this.selectedGroup;
    this.groups.splice(index, 1);

    if (wasSelected) {
      this.selectedGroup = this.groups[0] || '';
      this.groupSelected.emit(this.selectedGroup);
    }
  }
  
  editGroup(index: number) {
    this.editedGroupIndex = index;
    this.editedGroupName = this.groups[index];
  }

  confirmEdit(index: number) {
    if (this.editedGroupName.trim()) {
      this.groups[index] = this.editedGroupName.trim();
    }
    this.editedGroupIndex = null;
    this.editedGroupName = '';
  }
}