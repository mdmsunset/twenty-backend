import { PrismaClient } from '@prisma/client';
export const seedCompanies = async (prisma: PrismaClient) => {
  await prisma.company.upsert({
    where: { id: 'twenty-fe256b39-3ec3-4fe3-8997-b76aa0bfa408' },
    update: {},
    create: {
      id: 'twenty-fe256b39-3ec3-4fe3-8997-b76aa0bfa408',
      name: 'Linkedin',
      domainName: 'linkedin.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-118995f3-5d81-46d6-bf83-f7fd33ea6102' },
    update: {},
    create: {
      id: 'twenty-118995f3-5d81-46d6-bf83-f7fd33ea6102',
      name: 'Facebook',
      domainName: 'facebook.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-04b2e9f5-0713-40a5-8216-82802401d33e' },
    update: {},
    create: {
      id: 'twenty-04b2e9f5-0713-40a5-8216-82802401d33e',
      name: 'Qonto',
      domainName: 'qonto.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-460b6fb1-ed89-413a-b31a-962986e67bb4' },
    update: {},
    create: {
      id: 'twenty-460b6fb1-ed89-413a-b31a-962986e67bb4',
      name: 'Microsoft',
      domainName: 'microsoft.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-89bb825c-171e-4bcc-9cf7-43448d6fb278' },
    update: {},
    create: {
      id: 'twenty-89bb825c-171e-4bcc-9cf7-43448d6fb278',
      name: 'Airbnb',
      domainName: 'airbnb.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-0d940997-c21e-4ec2-873b-de4264d89025' },
    update: {},
    create: {
      id: 'twenty-0d940997-c21e-4ec2-873b-de4264d89025',
      name: 'Google',
      domainName: 'google.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-1d3a1c6e-707e-44dc-a1d2-30030bf1a944' },
    update: {},
    create: {
      id: 'twenty-1d3a1c6e-707e-44dc-a1d2-30030bf1a944',
      name: 'Netflix',
      domainName: 'netflix.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-7a93d1e5-3f74-492d-a101-2a70f50a1645' },
    update: {},
    create: {
      id: 'twenty-7a93d1e5-3f74-492d-a101-2a70f50a1645',
      name: 'Libeo',
      domainName: 'libeo.io',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });

  await prisma.company.upsert({
    where: { id: 'twenty-9d162de6-cfbf-4156-a790-e39854dcd4eb' },
    update: {},
    create: {
      id: 'twenty-9d162de6-cfbf-4156-a790-e39854dcd4eb',
      name: 'Claap',
      domainName: 'claap.io',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });

  await prisma.company.upsert({
    where: { id: 'twenty-aaffcfbd-f86b-419f-b794-02319abe8637' },
    update: {},
    create: {
      id: 'twenty-aaffcfbd-f86b-419f-b794-02319abe8637',
      name: 'Hasura',
      domainName: 'hasura.io',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });

  await prisma.company.upsert({
    where: { id: 'twenty-f33dc242-5518-4553-9433-42d8eb82834b' },
    update: {},
    create: {
      id: 'twenty-f33dc242-5518-4553-9433-42d8eb82834b',
      name: 'Wework',
      domainName: 'wework.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });

  await prisma.company.upsert({
    where: { id: 'twenty-a7bc68d5-f79e-40dd-bd06-c36e6abb4678' },
    update: {},
    create: {
      id: 'twenty-a7bc68d5-f79e-40dd-bd06-c36e6abb4678',
      name: 'Samsung',
      domainName: 'samsung.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });
  await prisma.company.upsert({
    where: { id: 'twenty-a674fa6c-1455-4c57-afaf-dd5dc086361d' },
    update: {},
    create: {
      id: 'twenty-a674fa6c-1455-4c57-afaf-dd5dc086361d',
      name: 'Algolia',
      domainName: 'algolia.com',
      workspaceId: '20202020-1c25-4d02-bf25-6aeccf7ea419',
      address: '',
    },
  });

  await prisma.company.upsert({
    where: { id: 'twenty-dev-a674fa6c-1455-4c57-afaf-dd5dc086361e' },
    update: {},
    create: {
      id: 'twenty-dev-a674fa6c-1455-4c57-afaf-dd5dc086361e',
      name: 'Instagram',
      domainName: 'instagram.com',
      workspaceId: 'twenty-dev-7ed9d212-1c25-4d02-bf25-6aeccf7ea420',
      address: '',
    },
  });
};
