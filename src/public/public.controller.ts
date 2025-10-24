import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  // Get active hero images
  @Get('hero-images')
  getHeroImages() {
    return this.publicService.getActiveHeroImages();
  }

  // Get featured products
  @Get('featured-products')
  getFeaturedProducts(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 8;
    return this.publicService.getFeaturedProducts(limitNum);
  }

  // Get all categories
  @Get('categories')
  getCategories() {
    return this.publicService.getAllCategories();
  }

  // Get all products with filters
  @Get('products')
  getProducts(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit) : 20;
    return this.publicService.getProducts(categoryId, search, limitNum);
  }

  // Get single product by ID
  @Get('products/:id')
  getProductById(@Param('id') id: string) {
    return this.publicService.getProductById(id);
  }

  // Get WhatsApp settings
  @Get('whatsapp')
  getWhatsApp() {
    return this.publicService.getWhatsAppSettings();
  }
}

