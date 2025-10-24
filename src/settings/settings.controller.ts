import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateHeroImageDto } from './dto/create-hero-image.dto';
import { UpdateHeroImageDto } from './dto/update-hero-image.dto';
import { UpdateWhatsAppDto } from './dto/update-whatsapp.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // Hero Images
  @Post('hero-images')
  createHeroImage(@Body() createHeroImageDto: CreateHeroImageDto) {
    return this.settingsService.createHeroImage(createHeroImageDto);
  }

  @Get('hero-images')
  findAllHeroImages() {
    return this.settingsService.findAllHeroImages();
  }

  @Get('hero-images/:id')
  findOneHeroImage(@Param('id') id: string) {
    return this.settingsService.findOneHeroImage(id);
  }

  @Patch('hero-images/:id')
  updateHeroImage(@Param('id') id: string, @Body() updateHeroImageDto: UpdateHeroImageDto) {
    return this.settingsService.updateHeroImage(id, updateHeroImageDto);
  }

  @Delete('hero-images/:id')
  removeHeroImage(@Param('id') id: string) {
    return this.settingsService.removeHeroImage(id);
  }

  // WhatsApp
  @Get('whatsapp')
  getWhatsApp() {
    return this.settingsService.getWhatsApp();
  }

  @Post('whatsapp')
  updateWhatsApp(@Body() updateWhatsAppDto: UpdateWhatsAppDto) {
    return this.settingsService.updateWhatsApp(updateWhatsAppDto);
  }
}

