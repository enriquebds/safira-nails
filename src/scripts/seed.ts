import { getPayload } from '../utils/payload';

const initialServices = [
  {
    title: 'Alongamento (Molde F1)',
    icon: '💅',
    description: 'Curvatura e resistência natural com acabamento impecável.',
    items: [
      { name: 'Simples', price: 'R$ 90' },
      { name: 'Decoração simples', price: '+ R$ 15' },
      { name: 'Decoração elaborada', price: '+ R$ 30' },
    ],
    active: true,
    order: 1,
  },
  {
    title: 'Banho de Gel',
    icon: '💎',
    description: 'Brilho duradouro e proteção sobre a sua unha natural.',
    items: [{ name: 'Sobre unha natural', price: 'R$ 70' }],
    active: true,
    order: 2,
  },
  {
    title: 'Esmaltação em Gel',
    icon: '✨',
    description: 'Cor intensa que dura semanas sem lascar.',
    items: [
      { name: 'Cor única', price: 'R$ 50' },
      { name: 'Francesinha', price: '+ R$ 10' },
    ],
    active: true,
    order: 3,
  },
  {
    title: 'Blindagem',
    icon: '🛡️',
    description: 'Fortalecimento para unhas que quebram com facilidade.',
    items: [{ name: 'Sessão', price: 'R$ 45' }],
    active: true,
    order: 4,
  },
  {
    title: 'Manutenção',
    icon: '🔄',
    description: 'Renovação do alongamento a cada 3 semanas.',
    items: [{ name: 'Retorno', price: 'R$ 60' }],
    active: true,
    order: 5,
  },
  {
    title: 'Spa dos Pés',
    icon: '🦶',
    description: 'Hidratação, esfoliação e esmaltação completa.',
    items: [{ name: 'Completo', price: 'R$ 55' }],
    active: true,
    order: 6,
  },
];

const initialProducts = [
  { name: 'Esmalte em Gel · Rosé Quartzo', price: 4590, stock: 8, category: 'esmalte', featured: true, slug: 'esmalte-gel-rose', description: 'Esmalte em gel de longa duração, cobertura perfeita em duas camadas. Tom rosé quartzo, ideal para o dia a dia.', active: true },
  { name: 'Top Coat Diamante', price: 3990, stock: 12, category: 'cuidados', featured: true, slug: 'top-coat-diamante', description: 'Finalizador de brilho intenso e efeito espelhado que sela a esmaltação e prolonga a durabilidade.', active: true },
  { name: 'Óleo de Cutícula Hidratante', price: 2400, stock: 20, category: 'cuidados', featured: true, slug: 'oleo-cuticula', description: 'Blend de óleos vegetais que nutre cutículas e fortalece o crescimento saudável das unhas.', active: true },
  { name: 'Kit Lixas Profissionais', price: 2850, stock: 15, category: 'kit', featured: true, slug: 'kit-lixas-pro', description: 'Conjunto com 5 lixas de diferentes granulações para preparo e acabamento profissional.', active: true },
  { name: 'Base Fortalecedora', price: 3200, stock: 10, category: 'cuidados', featured: false, slug: 'base-fortalecedora', description: 'Base tratante que protege a unha natural e garante maior aderência do esmalte.', active: true },
  { name: 'Gel Construtor Clear', price: 7900, stock: 6, category: 'gel', featured: false, slug: 'gel-construtor-clear', description: 'Gel construtor transparente, autonivelante, para alongamentos resistentes e naturais.', active: true },
  { name: 'Adesivos Decorativos (cartela)', price: 1800, stock: 25, category: 'decoracao', featured: false, slug: 'adesivos-decorativos', description: 'Cartela com adesivos delicados para nail art: flores, corações e detalhes metalizados.', active: true },
  { name: 'Pó Acrílico Nude', price: 6500, stock: 0, category: 'acrilico', featured: false, slug: 'po-acrilico-nude', description: 'Pó acrílico tom nude para alongamentos com acabamento aveludado e cor uniforme.', active: true },
  { name: 'Kit Manicure Completo', price: 12900, stock: 4, category: 'kit', featured: false, slug: 'kit-manicure-completo', description: 'Estojo completo com alicate, espátula, palitos, lixas e óleo de cutícula. O presente perfeito.', active: true },
];

async function seed() {
  const payload = await getPayload();

  console.log('🌱 Seeding services...');
  for (const service of initialServices) {
    await payload.create({ collection: 'services', data: service });
  }

  console.log('🌱 Seeding products...');
  for (const product of initialProducts) {
    await payload.create({ collection: 'products', data: product as never });
  }

  console.log('✅ Seed concluído!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
