import Head from 'next/head';
import React, { useEffect } from 'react';

type ClubK =
  | 'KO'
  | 'Konfederacja'
  | 'KP'
  | 'Kukiz15'
  | 'Lewica'
  | 'niez.'
  | 'PiS'
  | 'Polska2050'
  | 'Porozumienie'
  | 'PPS'
  | 'PS';

type ClubT = {
  email: string;
  fax: string;
  id: ClubK;
  membersCount: number;
  name: string;
  phone: string;
};

type MPT = {
  id: number;
  firstLastName: string;
  lastFirstName: string;
  firstName: string;
  secondName: string;
  lastName: string;
  email: string;
  active: boolean;
  inactiveCause: string;
  waiverDesc: string;
  discritNum: number;
  districtName: string;
  voivodeship: string;
  club: ClubT['id'];
};

const clubsC = {
  Lewica: 'bg-[#851a64]',
  KP: 'bg-[#1bb100]',
  PPS: 'bg-[#d62d32]',
  KO: 'bg-[#ff6e28]',
  'niez.': 'bg-[#bbbbbb]',
  Polska2050: 'bg-[#ffaf05]',
  Kukiz15: 'bg-[#000000]',
  Porozumienie: 'bg-[#733c4d]',
  PS: 'bg-[#8bc0ea]',
  PiS: 'bg-[#000dc0]',
  Konfederacja: 'bg-[#633e1c]',
} as const;
const clubS: readonly string[] = Object.keys(clubsC);

type MPEnhanedT = Pick<MPT, 'id' | 'club'> & { color: string };
type ClubsEnhanedT = Pick<ClubT, 'id' | 'name'> & { color: string };

export async function getStaticProps() {
  //TODO error handling

  const [resMPs, resClubs] = await Promise.all([
    fetch('http://api.sejm.gov.pl/sejm/term9/MP'),
    fetch('http://api.sejm.gov.pl/sejm/term9/clubs'),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- h
  const [mps, clubs]: [MPT[], ClubT[]] = await Promise.all([
    resMPs.json(),
    resClubs.json(),
  ]);

  mps.sort((a, b) => clubS.indexOf(a.club) - clubS.indexOf(b.club));
  clubs.sort((a, b) => clubS.indexOf(a.id) - clubS.indexOf(b.id));

  const [mpsE, clubsE]: [MPEnhanedT[], ClubsEnhanedT[]] = [
    mps
      .filter(m => m.active)
      .map(({ id, club }) => ({
        id,
        club,
        color: clubsC[club],
      })),
    clubs.map(({ id, name }) => ({
      id,
      name,
      color: clubsC[id],
    })),
  ];

  return {
    props: {
      mpsE,
      clubsE,
    },
  };
}
type Props = Awaited<ReturnType<typeof getStaticProps>>['props'];

const bg = (color?: string) => (color ? color : 'bg-white');
const op = (isHidden?: boolean) => (isHidden ? 'opacity-10' : '');

const Circle = ({
  color,
  isHidden: isHidden,
}: {
  color?: string;
  isHidden?: boolean;
}) => (
  <div
    className={`h-10 w-10 min-w-fit rounded-full border-2 border-solid 
    border-white ${bg(color)} ${op(isHidden)}`}
  >
    {' '}
  </div>
);

const flag = false;
const thoughts = [
  { id: 'lib', color: 'bg-[#ffe800]' },
  { id: 'liber', color: undefined },
  { id: 'soc', color: 'bg-[#d6d421]' },
  { id: 'fem', color: undefined },
  { id: 'queer', color: undefined },
  { id: 'anarch', color: undefined },
  { id: 'fash', color: undefined },
  { id: 'naz', color: undefined },
] as const;

const Home = ({ mpsE, clubsE }: Props) => {
  const [focused, setF] = React.useState<ClubK | null>(null);

  const [mps, setMps] = React.useState(
    mpsE.map(mp => ({ ...mp, isHidden: true })),
  );

  const clubs = clubsE;
  // const mps = mpsE;

  useEffect(() => {
    setMps(p =>
      p.map(mp =>
        !focused || mp.club === focused
          ? { ...mp, isHidden: false }
          : { ...mp, isHidden: true },
      ),
    );
  }, [focused]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="bg-gray-800"
        onFocus={() => setF(null)}
        onBlur={() => setF(null)}
      >
        <div className="flex-rows flex  flex-auto flex-wrap">
          <div className="flex w-1/4 flex-col ">
            {clubs.map(({ id, color }, i) => (
              <button
                key={`${id}-${i}`}
                onClick={() => setF(id === focused ? null : id)}
              >
                <div className="flex-rows m-2 flex items-center">
                  <Circle color={color} />
                  <div className="ml-2 text-lg text-white">{id}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="grid w-3/4 grid-cols-23 gap-1">
            {mps.map(({ id, color, isHidden }, i) => (
              <Circle key={`${id}-${i}`} color={color} isHidden={isHidden} />
            ))}
          </div>
          {flag && (
            <div className="flex flex-col">
          {thoughts.map(({ id, color }, i) => (
            <div
                  className="m-2 flex flex-row items-center "
              key={`${id}-${i}`}
            >
              <Circle color={color} />
              <div className="ml-2 text-lg text-white">{id}</div>
            </div>
          ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
