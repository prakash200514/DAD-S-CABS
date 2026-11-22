/**
 * Database Seeder for Dad's Auto & Cab - Tamil Nadu
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Dad's Auto & Cab database with Tamil Nadu initial data...");

  // 1. Seed Default Fare Rules
  await prisma.fareRule.upsert({
    where: { vehicleType: 'AUTO' },
    update: {},
    create: {
      vehicleType: 'AUTO',
      baseFare: 40.0,
      baseKm: 1.5,
      perKmRate: 16.0,
      waitingChargePerMin: 1.5,
      minFare: 50.0,
      active: true,
    },
  });

  await prisma.fareRule.upsert({
    where: { vehicleType: 'CAB' },
    update: {},
    create: {
      vehicleType: 'CAB',
      baseFare: 90.0,
      baseKm: 2.0,
      perKmRate: 22.0,
      waitingChargePerMin: 2.5,
      minFare: 120.0,
      active: true,
    },
  });

  // 2. Seed Admin User (Dad / Business Owner)
  const adminUser = await prisma.user.upsert({
    where: { phone: '+91 94422 11000' },
    update: {},
    create: {
      name: 'Sundar Rajan',
      phone: '+91 94422 11000',
      email: 'owner@dadsautocab.com',
      role: 'ADMIN',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
  });

  // 3. Seed Demo Passenger (Customer)
  const customerUser = await prisma.user.upsert({
    where: { phone: '+91 98401 23456' },
    update: {},
    create: {
      name: 'Karthik Raja',
      phone: '+91 98401 23456',
      email: 'karthik.tn@gmail.com',
      role: 'CUSTOMER',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    },
  });

  // 4. Seed Primary Driver Ravi Kumar (TN 72 AB 4587)
  const driverUser = await prisma.user.upsert({
    where: { phone: '+91 94431 87654' },
    update: {},
    create: {
      name: 'Ravi Kumar',
      phone: '+91 94431 87654',
      email: 'ravi.tn72@dadsautocab.com',
      role: 'DRIVER',
      profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    },
  });

  const autoVehicle = await prisma.vehicle.upsert({
    where: { registrationNumber: 'TN 72 AB 4587' },
    update: {},
    create: {
      type: 'AUTO',
      model: 'Bajaj Compact RE 4S',
      registrationNumber: 'TN 72 AB 4587',
      status: 'ACTIVE',
    },
  });

  await prisma.driver.upsert({
    where: { userId: driverUser.id },
    update: {},
    create: {
      userId: driverUser.id,
      vehicleId: autoVehicle.id,
      licenseNumber: 'TN72 2018 0008452',
      rating: 4.8,
      onlineStatus: 'ONLINE',
    },
  });

  console.log("Seeding complete: Dad's Auto & Cab Tamil Nadu platform ready.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
