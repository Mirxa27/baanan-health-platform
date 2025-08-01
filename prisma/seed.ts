import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@halol.com' },
    update: {},
    create: {
      email: 'admin@halol.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '+1234567890',
      address: '123 Admin Street, Admin City, AC 12345',
    },
  });

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'John Doe',
      password: customerPassword,
      role: 'CUSTOMER',
      phone: '+1987654321',
      address: '456 Customer Ave, Customer City, CC 54321',
    },
  });

  // Create sample devices
  const devices = [
    {
      name: 'Digital Blood Pressure Monitor',
      description: 'Accurate digital blood pressure monitor with large display and memory function.',
      category: 'Cardiovascular',
      brand: 'MedTech',
      model: 'BP-2000',
      price: 89.99,
      rentPrice: 5.99,
      stock: 25,
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    },
    {
      name: 'Pulse Oximeter',
      description: 'Fingertip pulse oximeter for measuring oxygen saturation and pulse rate.',
      category: 'Respiratory',
      brand: 'OxyMed',
      model: 'OX-100',
      price: 45.99,
      rentPrice: 3.99,
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400',
    },
    {
      name: 'Digital Thermometer',
      description: 'Fast and accurate digital thermometer with fever alarm.',
      category: 'General',
      brand: 'TempPro',
      model: 'TP-300',
      price: 19.99,
      rentPrice: 1.99,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    },
    {
      name: 'Nebulizer Machine',
      description: 'Compact nebulizer for respiratory treatments and medication delivery.',
      category: 'Respiratory',
      brand: 'BreathEasy',
      model: 'NEB-500',
      price: 129.99,
      rentPrice: 8.99,
      stock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
    },
    {
      name: 'Wheelchair - Standard',
      description: 'Standard manual wheelchair with comfortable seating and easy maneuverability.',
      category: 'Mobility',
      brand: 'MobilityPlus',
      model: 'WC-Standard',
      price: 299.99,
      rentPrice: 15.99,
      stock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400',
    },
    {
      name: 'Hospital Bed - Electric',
      description: 'Electric hospital bed with adjustable height and positioning.',
      category: 'Furniture',
      brand: 'ComfortCare',
      model: 'HB-Electric',
      price: 1299.99,
      rentPrice: 45.99,
      stock: 5,
      imageUrl: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400',
    },
    {
      name: 'Glucose Meter Kit',
      description: 'Complete glucose monitoring kit with test strips and lancets.',
      category: 'Diabetes',
      brand: 'GlucoCheck',
      model: 'GC-Pro',
      price: 79.99,
      rentPrice: 4.99,
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    },
    {
      name: 'CPAP Machine',
      description: 'Continuous positive airway pressure machine for sleep apnea treatment.',
      category: 'Respiratory',
      brand: 'SleepWell',
      model: 'CPAP-200',
      price: 899.99,
      rentPrice: 29.99,
      stock: 12,
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
    },
  ];

  for (const device of devices) {
    const existingDevice = await prisma.device.findFirst({
      where: {
        name: device.name,
        brand: device.brand,
        model: device.model,
      },
    });

    if (!existingDevice) {
      await prisma.device.create({
        data: {
          ...device,
          isAvailable: device.stock > 0,
        },
      });
    }
  }

  // Create AI customer service agent
  await prisma.customerServiceAgent.upsert({
    where: { email: 'ai@halol.com' },
    update: {},
    create: {
      name: 'Halol AI Assistant',
      email: 'ai@halol.com',
      type: 'AI',
      isActive: true,
    },
  });

  // Create human customer service agent
  await prisma.customerServiceAgent.upsert({
    where: { email: 'support@halol.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'support@halol.com',
      type: 'HUMAN',
      isActive: true,
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin login: admin@halol.com / admin123');
  console.log('Customer login: customer@example.com / customer123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });