const TERM = 10;

const [resMPs, resClubs] = await Promise.all([
  fetch(`http://api.sejm.gov.pl/sejm/term${TERM}/MP`),
  fetch(`http://api.sejm.gov.pl/sejm/term${TERM}/clubs`),
]);

const clubsC = {
  Lewica: 'bg-[#851a64]',
  KO: 'bg-[#ff6e28]',
  'PSL-TD': 'bg-[#d77a4e]',
  'Polska2050-TD': 'bg-[#d77a4e]',
  Kukiz15: 'bg-[#000330]',
  PiS: 'bg-[#000dc0]',
  Konfederacja: 'bg-[#633e1c]',
};
const clubS = Object.keys(clubsC);

const [mps, clubs] = await Promise.all([resMPs.json(), resClubs.json()]);

mps.sort((a, b) => clubS.indexOf(a.club) - clubS.indexOf(b.club));
clubs.sort((a, b) => clubS.indexOf(a.id) - clubS.indexOf(b.id));

const [mpsE, clubsE] = [
  mps
    .filter(m => m.active)
    .map(mp => ({
      ...mp,
      color: clubsC[mp.club],
    })),
  clubs.map(club => ({
    ...club,
    color: clubsC[club.id],
  })),
];

console.log(JSON.stringify(mpsE));
