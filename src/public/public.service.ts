import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from '../config/firebase.config';

@Injectable()
export class PublicService {
  private db = getFirestore();

  // Get active hero images sorted by order
  async getActiveHeroImages() {
    const snapshot = await this.db
      .collection('heroImages')
      .where('isActive', '==', true)
      .orderBy('order', 'asc')
      .get();

    const heroImages: any[] = [];
    snapshot.forEach((doc) => {
      heroImages.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return heroImages;
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 8) {
    const snapshot = await this.db
      .collection('products')
      .where('isFeatured', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const products: any[] = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  }

  // Get all categories
  async getAllCategories() {
    const snapshot = await this.db
      .collection('categories')
      .orderBy('createdAt', 'desc')
      .get();

    const categories: any[] = [];
    snapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return categories;
  }

  // Get products with filters
  async getProducts(categoryId?: string, search?: string, limit: number = 20) {
    let query: any = this.db.collection('products');

    // Filter by category if provided
    if (categoryId) {
      query = query.where('categoryId', '==', categoryId);
    }

    query = query.orderBy('createdAt', 'desc').limit(limit);

    const snapshot = await query.get();

    let products: any[] = [];
    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Client-side search filter if search term provided
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.category?.toLowerCase().includes(searchLower),
      );
    }

    return products;
  }

  // Get single product by ID
  async getProductById(id: string) {
    const doc = await this.db.collection('products').doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException('Product not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  // Get WhatsApp settings
  async getWhatsAppSettings() {
    const doc = await this.db.collection('settings').doc('whatsapp').get();

    if (!doc.exists) {
      return {
        countryCode: '+961',
        phoneNumber: '',
      };
    }

    return doc.data();
  }
}

