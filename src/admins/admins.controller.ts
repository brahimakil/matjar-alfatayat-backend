import { Controller, Get, Delete, Param } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}

