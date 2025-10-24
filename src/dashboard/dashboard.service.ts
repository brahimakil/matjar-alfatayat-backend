import { Injectable } from '@nestjs/common';
import { getFirestore } from '../config/firebase.config';

@Injectable()
export class DashboardService {
  private db = getFirestore();

  async getStats() {
    try {
      const [productsSnapshot, categoriesSnapshot, adminsSnapshot, heroImagesSnapshot] = await Promise.all([
        this.db.collection('products').get(),
        this.db.collection('categories').get(),
        this.db.collection('admins').get(),
        this.db.collection('heroImages').get(),
      ]);

      // Count featured products
      let featuredCount = 0;
      let totalStock = 0;
      let lowStockCount = 0;
      const products: any[] = [];

      productsSnapshot.forEach(doc => {
        const data = doc.data();
        products.push(data);
        if (data.isFeatured) featuredCount++;
        if (data.stock) totalStock += data.stock;
        if (data.stock < 10) lowStockCount++;
      });

      // Count active hero images
      let activeHeroImages = 0;
      heroImagesSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.isActive !== false) activeHeroImages++;
      });

      return {
        totalProducts: productsSnapshot.size,
        totalCategories: categoriesSnapshot.size,
        totalAdmins: adminsSnapshot.size,
        featuredProducts: featuredCount,
        totalStock,
        lowStockProducts: lowStockCount,
        activeHeroImages,
        totalHeroImages: heroImagesSnapshot.size,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        totalProducts: 0,
        totalCategories: 0,
        totalAdmins: 0,
        featuredProducts: 0,
        totalStock: 0,
        lowStockProducts: 0,
        activeHeroImages: 0,
        totalHeroImages: 0,
      };
    }
  }

  async getRecentProducts() {
    try {
      const snapshot = await this.db
        .collection('products')
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get();

      const products: any[] = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return products;
    } catch (error) {
      console.error('Error fetching recent products:', error);
      return [];
    }
  }

  async getFeaturedProducts() {
    try {
      const snapshot = await this.db
        .collection('products')
        .where('isFeatured', '==', true)
        .limit(5)
        .get();

      const products: any[] = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return products;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }
}

