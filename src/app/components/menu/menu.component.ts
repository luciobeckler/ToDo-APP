import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { GroupService, Group } from '../../services/group.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  groups: Group[] = [];
  editedGroupIndex: number | null = null;
  editedGroupTitle: string = '';
  newGroup: string = '';
  selectedGroup: Group | null = null;

  isExpanded = false;
  showGroupManager = false;

  @Output() groupSelected = new EventEmitter<string>();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }

  addGroup() {
    const trimmedtitle = this.newGroup.trim();
    if (trimmedtitle) {
      this.groupService.addGroup(trimmedtitle).subscribe(newGroup => {
        this.groups.push(newGroup);
        this.newGroup = '';
      });
    }
  }

  editGroup(index: number) {
    this.editedGroupIndex = index;
    this.editedGroupTitle = this.groups[index].title;
  }

  confirmEdit(index: number) {
    const updatedTitle = this.editedGroupTitle.trim();
    const groupToEdit = this.groups[index];

    if (updatedTitle && updatedTitle !== groupToEdit.title) {
      const updatedGroup: Group = {
        ...groupToEdit,
        title: updatedTitle
      };

      this.groupService.updateGroup(updatedGroup).subscribe(() => {
        this.groups[index].title = updatedTitle;
        this.resetEdit();
      }, error => {
        console.error('Erro ao atualizar grupo:', error);
      });
    } else {
      this.resetEdit();
    }
  }

  removeGroup(index: number) {
    const groupId = this.groups[index].id;

    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.groups.splice(index, 1);
      if (this.editedGroupIndex === index) {
        this.resetEdit();
      }
    });
  }

  resetEdit() {
    this.editedGroupIndex = null;
    this.editedGroupTitle = '';
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  onSelectGroup(group: Group) {
    this.selectedGroup = group;
    this.groupSelected.emit(group.title);
  }

  openGroupManager() {
    this.showGroupManager = true;
  }

  closeGroupManager() {
    this.showGroupManager = false;
    this.newGroup = '';
  }
}