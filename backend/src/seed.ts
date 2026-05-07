import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  const c1 = await prisma.college.create({
    data: {
      name: 'Indian Institute of Technology (IIT), Delhi',
      location: 'New Delhi, Delhi',
      fees: 250000,
      rating: 4.8,
      placement: 98.5,
      courses: {
        create: [
          { name: 'B.Tech Computer Science' },
          { name: 'B.Tech Electrical Engineering' },
        ]
      }
    }
  });

  const c2 = await prisma.college.create({
    data: {
      name: 'Birla Institute of Technology and Science (BITS), Pilani',
      location: 'Pilani, Rajasthan',
      fees: 400000,
      rating: 4.7,
      placement: 97.0,
      courses: {
        create: [
          { name: 'B.E. Computer Science' },
          { name: 'B.E. Electronics' },
        ]
      }
    }
  });

  const c3 = await prisma.college.create({
    data: {
      name: 'National Institute of Technology (NIT), Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      fees: 150000,
      rating: 4.6,
      placement: 95.0,
      courses: {
        create: [
          { name: 'B.Tech Mechanical Engineering' },
          { name: 'B.Tech Computer Science' },
        ]
      }
    }
  });

  const c4 = await prisma.college.create({
    data: {
      name: 'Delhi Technological University (DTU)',
      location: 'New Delhi, Delhi',
      fees: 200000,
      rating: 4.5,
      placement: 92.0,
      courses: {
        create: [
          { name: 'B.Tech Software Engineering' },
          { name: 'B.Tech Information Technology' },
        ]
      }
    }
  });

  const c5 = await prisma.college.create({
    data: {
      name: 'Vellore Institute of Technology (VIT)',
      location: 'Vellore, Tamil Nadu',
      fees: 198000,
      rating: 4.2,
      placement: 90.0,
      courses: {
        create: [
          { name: 'B.Tech IT' },
          { name: 'B.Tech CS' },
        ]
      }
    }
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
