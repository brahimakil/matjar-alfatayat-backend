import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }

  @Get('recent-products')
  getRecentProducts() {
    return this.dashboardService.getRecentProducts();
  }

  @Get('featured-products')
  getFeaturedProducts() {
    return this.dashboardService.getFeaturedProducts();
  }
}

