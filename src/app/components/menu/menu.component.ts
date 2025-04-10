import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';
import { TaskSharedService } from '../../services/task-shared.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

const NO_GROUP: Group = { id: -1, title: 'Sem grupo' };

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
  selectedGroup: Group | null = NO_GROUP;

  isExpanded = false;
  showGroupManager = false;

  @Output() groupSelected = new EventEmitter<number>();

  constructor(
    private router: Router,
    private groupService: GroupService,
    private taskSharedService: TaskSharedService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.loadGroups();
    this.filterTasksWithoutGroup(); // REGRA: SELECIONA O "SEM GRUPO" AUTOMATICAMENTE
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }

  filterTasksByGroup(groupId: number) {
    this.groupService.getGroupById(groupId).subscribe(group => {
      this.selectedGroup = group;
      this.groupSelected.emit(groupId);
      this.taskSharedService.setTasks(group.tasks || [], group.title);
      this.router.navigate(['/']);
    });
  }

  // ALTERNATIVA SEM GRUPO
  filterTasksWithoutGroup(): void {
    this.selectedGroup = null;
    this.taskService.getTasks().subscribe(tasks => {
      const tasksWithoutGroup = tasks.filter(task => task.groupId == null);
      this.taskSharedService.setTasks(tasksWithoutGroup, 'Sem grupo');
      this.router.navigate(['/']);
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

  // POPUP E MENU DE GERENCIAR GRUPOS
  resetEdit() {
    this.editedGroupIndex = null;
    this.editedGroupTitle = '';
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  openGroupManager() {
    this.showGroupManager = true;
  }

  closeGroupManager() {
    this.showGroupManager = false;
    this.newGroup = '';
    this.loadGroups();
  }
}