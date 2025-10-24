import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { getFirestore } from '../config/firebase.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private db = getFirestore();

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if admin already exists
    const adminSnapshot = await this.db
      .collection('admins')
      .where('email', '==', email)
      .get();

    if (!adminSnapshot.empty) {
      throw new ConflictException('Admin with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin document
    const adminData = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const adminRef = await this.db.collection('admins').add(adminData);

    // Return admin data without password
    return {
      id: adminRef.id,
      email: adminData.email,
      name: adminData.name,
      createdAt: adminData.createdAt,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find admin by email
    const adminSnapshot = await this.db
      .collection('admins')
      .where('email', '==', email)
      .get();

    if (adminSnapshot.empty) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const adminDoc = adminSnapshot.docs[0];
    const adminData = adminDoc.data();

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, adminData.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.db.collection('admins').doc(adminDoc.id).update({
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Return admin data without password
    return {
      id: adminDoc.id,
      email: adminData.email,
      name: adminData.name,
      createdAt: adminData.createdAt,
    };
  }

  async getAdminById(id: string) {
    const adminDoc = await this.db.collection('admins').doc(id).get();

    if (!adminDoc.exists) {
      throw new UnauthorizedException('Admin not found');
    }

    const adminData = adminDoc.data();
    
    if (!adminData) {
      throw new UnauthorizedException('Admin data not found');
    }

    return {
      id: adminDoc.id,
      email: adminData.email,
      name: adminData.name,
      createdAt: adminData.createdAt,
    };
  }
}

