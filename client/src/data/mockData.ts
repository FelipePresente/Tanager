import type { EventItem, NewsItem } from '../types'

const day = (offset: number) => {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const access = ['Acessível para cadeira de rodas', 'Libras', 'Audiodescrição', 'Pet friendly', 'Espaço família'] as const

export const mockEvents: EventItem[] = [
  {
    id: 'roda-cultura', title: 'Café com histórias na praça', category: 'Cultura', date: day(0), time: '17:00', endTime: '19:00', venue: 'Praça Cândido Mota', address: 'Praça Cândido Mota, s/n', neighborhood: 'Centro',
    description: 'Um encontro leve para ouvir histórias da cidade, conhecer artistas locais e conversar ao fim da tarde. Traga sua cadeira e venha como estiver.', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85', price: 'Gratuito', tags: ['Acessível para cadeira de rodas', 'Libras', 'Espaço família'], organizer: 'Coletivo Memórias de Caraguá', status: 'approved', confirmations: 41, views: 320,
    ageRanges: [{ label: '18–24', value: 16 }, { label: '25–34', value: 28 }, { label: '35–44', value: 34 }, { label: '45+', value: 22 }], partners: [{ name: 'Café Caiçara', category: 'Café e lanches', distance: '120 m', detail: 'Café passado na hora' }],
  },
  {
    id: 'festival-mar', title: 'Festival de Música à Beira-Mar', category: 'Música', date: day(1), time: '16:00', endTime: '22:00', venue: 'Praça da Cultura', address: 'Av. da Praia, 100', neighborhood: 'Centro',
    description: 'Uma tarde para celebrar a música caiçara e os novos sons da cidade. Artistas locais, feira criativa e pôr do sol de frente para o mar.', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85', price: 'Gratuito', tags: [access[0], access[1], access[3], access[4]], organizer: 'Fundacc', status: 'approved', confirmations: 248, views: 1820,
    ageRanges: [{ label: '18–24', value: 22 }, { label: '25–34', value: 38 }, { label: '35–44', value: 24 }, { label: '45+', value: 16 }], partners: [{ name: 'Café Caiçara', category: 'Café e lanches', distance: '180 m', detail: '10% de desconto com ingresso' }, { name: 'Peixaria do Porto', category: 'Restaurante', distance: '350 m', detail: 'Culinária caiçara' }],
  },
  {
    id: 'feira-artesanato', title: 'Feira de Artesanato Caiçara', category: 'Cultura', date: day(1), time: '10:00', endTime: '18:00', venue: 'Praça Diógenes Ribeiro de Lima', address: 'Av. Dr. Arthur Costa Filho, 25', neighborhood: 'Centro',
    description: 'Encontre peças feitas à mão por artistas da região, conheça histórias caiçaras e aproveite a praça em família.', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=85', price: 'Gratuito', tags: [access[0], access[3], access[4]], organizer: 'Associação de Artesãos', status: 'approved', confirmations: 94, views: 760,
    ageRanges: [{ label: '18–24', value: 12 }, { label: '25–34', value: 30 }, { label: '35–44', value: 32 }, { label: '45+', value: 26 }], partners: [{ name: 'Gelato da Praça', category: 'Sorveteria', distance: '90 m', detail: 'Sabores da estação' }],
  },
  {
    id: 'trilha-cocanha', title: 'Trilha guiada da Praia da Cocanha', category: 'Natureza', date: day(3), time: '07:30', endTime: '11:30', venue: 'Praia da Cocanha', address: 'Av. Ubatuba, acesso norte', neighborhood: 'Cocanha',
    description: 'Caminhada leve com guia local, paradas para observar a paisagem e uma conversa sobre a preservação da costa.', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85', price: 'R$ 20', tags: [access[3]], organizer: 'Caminhos de Caraguá', status: 'approved', confirmations: 62, views: 540,
    ageRanges: [{ label: '18–24', value: 24 }, { label: '25–34', value: 42 }, { label: '35–44', value: 22 }, { label: '45+', value: 12 }], partners: [{ name: 'Quiosque Maré Mansa', category: 'Quiosque', distance: '240 m', detail: 'Café da manhã a partir das 7h' }],
  },
  {
    id: 'cinema-praca', title: 'Cinema ao ar livre: Central do Brasil', category: 'Cultura', date: day(5), time: '19:00', endTime: '21:30', venue: 'Mirante do Camaroeiro', address: 'Alameda dos Pescadores, 100', neighborhood: 'Camaroeiro',
    description: 'Sessão gratuita sob as estrelas, com tela grande, fones para audiodescrição e espaço reservado para cadeiras de rodas.', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=85', price: 'Gratuito', tags: [access[0], access[2], access[4]], organizer: 'Cine Club Caraguá', status: 'approved', confirmations: 176, views: 1420,
    ageRanges: [{ label: '18–24', value: 18 }, { label: '25–34', value: 27 }, { label: '35–44', value: 31 }, { label: '45+', value: 24 }], partners: [{ name: 'Pipoca da Serra', category: 'Alimentação', distance: 'Na praça', detail: 'Pipoca e bebidas' }],
  },
  {
    id: 'sabores-mar', title: 'Sabores do Mar — festival gastronômico', category: 'Gastronomia', date: day(7), time: '12:00', endTime: '20:00', venue: 'Entreposto de Pesca', address: 'Av. Dr. Arthur Costa Filho, 681', neighborhood: 'Centro',
    description: 'Receitas caiçaras, música e ingredientes frescos do litoral em um encontro feito para toda a família.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85', price: 'Entrada gratuita', tags: [access[0], access[1], access[3], access[4]], organizer: 'Coletivo Sabores Caiçaras', status: 'approved', confirmations: 315, views: 2400,
    ageRanges: [{ label: '18–24', value: 20 }, { label: '25–34', value: 36 }, { label: '35–44', value: 29 }, { label: '45+', value: 15 }], partners: [{ name: 'Empório Caiçara', category: 'Mercado local', distance: '220 m', detail: 'Produtos artesanais' }, { name: 'Café Caiçara', category: 'Café e lanches', distance: '450 m', detail: 'Aberto até 21h' }],
  },
  {
    id: 'corrida-orla', title: 'Corrida e caminhada pela orla', category: 'Esporte', date: day(9), time: '06:30', endTime: '09:00', venue: 'Praça de Eventos', address: 'Av. da Praia, 200', neighborhood: 'Centro',
    description: 'Percursos de 3 km e 6 km para correr ou caminhar no seu ritmo, com hidratação e vista para o mar.', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=85', price: 'R$ 15', tags: [access[0], access[3]], organizer: 'Corre Caraguá', status: 'approved', confirmations: 128, views: 980,
    ageRanges: [{ label: '18–24', value: 20 }, { label: '25–34', value: 42 }, { label: '35–44', value: 26 }, { label: '45+', value: 12 }], partners: [{ name: 'Açaí da Praia', category: 'Alimentação', distance: '130 m', detail: 'Desconto para participantes' }],
  },
  {
    id: 'som-na-praca', title: 'Som na Praça: novos talentos', category: 'Música', date: day(12), time: '18:00', endTime: '21:00', venue: 'Praça Cândido Mota', address: 'Praça Cândido Mota, s/n', neighborhood: 'Centro',
    description: 'Artistas independentes sobem ao palco em uma noite aberta, diversa e gratuita no coração da cidade.', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85', price: 'Gratuito', tags: [access[0], access[1], access[3]], organizer: 'Fundacc', status: 'approved', confirmations: 86, views: 630,
    ageRanges: [{ label: '18–24', value: 34 }, { label: '25–34', value: 38 }, { label: '35–44', value: 18 }, { label: '45+', value: 10 }], partners: [{ name: 'Lanche do Coreto', category: 'Alimentação', distance: '80 m', detail: 'Lanches e sucos naturais' }],
  },
  {
    id: 'festa-criancas', title: 'Manhã de brincadeiras na praia', category: 'Família', date: day(16), time: '09:00', endTime: '12:00', venue: 'Praia do Indaiá', address: 'Av. Geraldo Nogueira da Silva', neighborhood: 'Indaiá',
    description: 'Brincadeiras, oficina de pipa e atividades ao ar livre para crianças e suas famílias.', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85', price: 'Gratuito', tags: [access[0], access[3], access[4]], organizer: 'Brinca Caraguá', status: 'approved', confirmations: 53, views: 420,
    ageRanges: [{ label: '18–24', value: 8 }, { label: '25–34', value: 35 }, { label: '35–44', value: 41 }, { label: '45+', value: 16 }], partners: [{ name: 'Quiosque do Indaiá', category: 'Quiosque', distance: '120 m', detail: 'Banheiros e trocador' }],
  },
  {
    id: 'memoria-caiçara', title: 'Encontro de Memória Caiçara', category: 'Cultura', date: day(-18), time: '15:00', endTime: '18:00', venue: 'Museu de Arte e Cultura', address: 'Praça Dr. Cândido Mota, 72', neighborhood: 'Centro',
    description: 'Roda de conversa e exposição sobre histórias, ofícios e modos de vida caiçaras.', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85', price: 'Gratuito', tags: [access[0], access[1], access[4]], organizer: 'Museu de Arte e Cultura', status: 'approved', confirmations: 72, views: 580,
    ageRanges: [{ label: '18–24', value: 14 }, { label: '25–34', value: 26 }, { label: '35–44', value: 30 }, { label: '45+', value: 30 }], partners: [],
  },
  {
    id: 'show-pend', title: 'Ensaio aberto: Banda Horizonte', category: 'Música', date: day(20), time: '20:00', endTime: '23:00', venue: 'Espaço Cultural', address: 'Rua Santa Cruz, 396', neighborhood: 'Centro',
    description: 'Uma noite de música ao vivo com artistas locais.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85', price: 'R$ 10', tags: [access[3]], organizer: 'Banda Horizonte', status: 'pending', confirmations: 0, views: 0,
    ageRanges: [{ label: '18–24', value: 0 }, { label: '25–34', value: 0 }, { label: '35–44', value: 0 }, { label: '45+', value: 0 }], partners: [], createdBy: 'Banda Horizonte',
  },
]

export const mockNews: NewsItem[] = [
  { id: '1', category: 'Cultura', minutes: 3, title: 'Caraguá recebe fim de semana de música e arte na orla', excerpt: 'Programação gratuita reúne artistas locais, feira criativa e atividades para toda a família.', date: '16 out, 2026', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80' },
  { id: '2', category: 'Cidade', minutes: 4, title: 'Comércio local se prepara para a temporada de primavera', excerpt: 'Novas parcerias aproximam visitantes de cafés, restaurantes e experiências do bairro.', date: '14 out, 2026', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80' },
  { id: '3', category: 'Natureza', minutes: 5, title: 'Trilhas guiadas valorizam paisagens e cuidado com a costa', excerpt: 'Guias da região compartilham caminhos, histórias e boas práticas para explorar a cidade.', date: '12 out, 2026', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80' },
  { id: '4', category: 'Agenda', minutes: 2, title: 'Veja o que fazer em Caraguá nos próximos dias', excerpt: 'Nossa seleção reúne shows, cinema ao ar livre, gastronomia e passeios para todos os estilos.', date: '10 out, 2026', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80' },
]

export const categories = ['Música', 'Cultura', 'Gastronomia', 'Natureza', 'Esporte', 'Família'] as const
export const accessTags = [...access]
