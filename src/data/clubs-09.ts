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
    membersCount: 44,
    name: 'Koalicyjny Klub Parlamentarny Lewicy (Nowa Lewica, PPS, Razem)',
    phone: '',
    color: 'bg-[#851a64]',
  },
  {
    email: 'kp-psl@kluby.sejm.pl',
    fax: '(22) 694-23-21',
    id: 'KP',
    membersCount: 24,
    name: 'Klub Parlamentarny Koalicja Polska - PSL, UED, Konserwatyści',
    phone: '',
    color: 'bg-[#1bb100]',
  },
  {
    email: 'kp-ko@kluby.sejm.pl',
    fax: '(22) 694-25-92',
    id: 'KO',
    membersCount: 126,
    name: 'Klub Parlamentarny Koalicja Obywatelska - Platforma Obywatelska, Nowoczesna, Inicjatywa Polska, Zieloni',
    phone: '',
    color: 'bg-[#ff6e28]',
  },
  {
    email: '',
    fax: '(22) 694-15-34',
    id: 'niez.',
    membersCount: 7,
    name: 'Posłowie niezrzeszeni',
    phone: '',
    color: 'bg-[#bbbbbb]',
  },
  {
    email: 'kpld@kluby.sejm.pl',
    fax: '(22) 694-10-29',
    id: 'LD',
    membersCount: 3,
    name: 'Koło Parlamentarne Lewicy Demokratycznej',
    phone: '',
    color: 'bg-[#d95136]',
  },
  {
    email: 'kp-polska2050@kluby.sejm.pl, media-pl2050@sejm.gov.pl',
    fax: '(22) 694-29-12',
    id: 'Polska2050',
    membersCount: 6,
    name: 'Koło Parlamentarne Polska 2050',
    phone: '',
    color: 'bg-[#d77a4e]',
  },
  {
    email: '',
    fax: '(22) 694-28-20',
    id: 'Kukiz15',
    membersCount: 3,
    name: "Koło Poselskie Kukiz'15 - Demokracja Bezpośrednia",
    phone: '',
    color: 'bg-[#000330]',
  },
  {
    email: 'kp-porozumienie@kluby.sejm.pl',
    fax: '(22) 694-14-49',
    id: 'Porozumienie',
    membersCount: 4,
    name: 'Koło Parlamentarne Porozumienie',
    phone: '',
    color: 'bg-[#733c4d]',
  },
  {
    email: 'kp-polskie_sprawy@kluby.sejm.pl',
    fax: '(22) 694-14-48',
    id: 'PS',
    membersCount: 3,
    name: 'Koło Poselskie Polskie Sprawy',
    phone: '',
    color: 'bg-[#8bc0ea]',
  },
  {
    email: 'kp-pis@kluby.sejm.pl',
    fax: '(22) 694-26-11',
    id: 'PiS',
    membersCount: 228,
    name: 'Klub Parlamentarny Prawo i Sprawiedliwość',
    phone: '',
    color: 'bg-[#000dc0]',
  },
  {
    email: 'konfederacja@kluby.sejm.pl, biuro.prasowe@konfederacja.net',
    fax: '(22) 694-29-31',
    id: 'Konfederacja',
    membersCount: 9,
    name: 'Koło Poselskie Konfederacja',
    phone: '',
    color: 'bg-[#633e1c]',
  },
  {
    email: 'kp-wolnosciowcy@kluby.sejm.pl',
    fax: '',
    id: 'Wolnościowcy',
    membersCount: 3,
    name: 'Koło Poselskie Wolnościowcy',
    phone: '',
    color: 'bg-[#b5761d]',
  },
] as unknown as Readonly<ClubsEnhanedT>[];
export const clubKs = clubsE.map(c => c.id) as Readonly<ClubK[]>;
