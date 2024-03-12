export type ClubK =
  | 'KO'
  | 'Konfederacja'
  | 'Wolnościowcy'
  | 'KP'
  | 'Kukiz15'
  | 'Lewica'
  | 'niez.'
  | 'PiS'
  | 'Polska2050'
  | 'Porozumienie'
  | 'LD'
  | 'PS';

export type ClubT = {
  email: string;
  fax: string;
  id: ClubK;
  membersCount: number;
  name: string;
  phone: string;
};

export type ClubsEnhanedT = Pick<ClubT, 'id' | 'name'> & { color: string };

export const clubsE = [
  {
    email: 'kp-lewica@kluby.sejm.pl',
    fax: '(22) 694-28-16, (22) 694-28-17',
    id: 'Lewica',
    membersCount: 26,
    name: 'Koalicyjny Klub Parlamentarny Lewicy (Nowa Lewica, PPS, Razem, Unia Pracy)',
    phone: '',
    color: 'bg-[#851a64]',
  },
  {
    email: 'kp-ko@kluby.sejm.pl',
    fax: '(22) 694-25-92',
    id: 'KO',
    membersCount: 157,
    name: 'Klub Parlamentarny Koalicja Obywatelska - Platforma Obywatelska, Nowoczesna, Inicjatywa Polska, Zieloni',
    phone: '',
    color: 'bg-[#ff6e28]',
  },
  {
    email: 'kp-psl@kluby.sejm.pl',
    fax: '(22) 694 23 21 ',
    id: 'PSL-TD',
    membersCount: 32,
    name: 'Klub Parlamentarny Polskie Stronnictwo Ludowe - Trzecia Droga',
    phone: '',
    color: 'bg-[#d77a4e]',
  },
  {
    email: 'kp-polska2050@kluby.sejm.pl',
    fax: '(22) 694-29-12',
    id: 'Polska2050-TD',
    membersCount: 33,
    name: 'Klub Parlamentarny Polska 2050 - Trzecia Droga',
    phone: '',
    color: 'bg-[#d77a4e]',
  },
  {
    email: '',
    fax: '(22) 694-28-20',
    id: 'Kukiz15',
    membersCount: 3,
    name: "Koło Poselskie Kukiz'15",
    phone: '',
    color: 'bg-[#000330]',
  },
  {
    email: 'kp-pis@kluby.sejm.pl',
    fax: '(22) 694-26-11',
    id: 'PiS',
    membersCount: 191,
    name: 'Klub Parlamentarny Prawo i Sprawiedliwość',
    phone: '',
    color: 'bg-[#000dc0]',
  },
  {
    email: '',
    fax: '(22) 694-29-31',
    id: 'Konfederacja',
    membersCount: 18,
    name: 'Klub Poselski Konfederacja',
    phone: '',
    color: 'bg-[#633e1c]',
  },
] as unknown as Readonly<ClubsEnhanedT>[];
export const clubKs = clubsE.map(c => c.id) as Readonly<ClubK[]>;
