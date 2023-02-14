import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { clubsE, type ClubK } from '../data/clubs';
import { mpsE } from '../data/mps';

const bg = (color?: string) => (color ? color : 'bg-white');
const op = (isHidden?: boolean | null) => (isHidden ? 'opacity-10' : '');

const TERM = 9;

const Circle = ({
  color,
  isHidden,
}: {
  color?: string;
  isHidden?: boolean | null;
}) => (
  <div
    className={`h-10 w-10 min-w-fit rounded-full border-2 border-solid 
    border-white ${bg(color)} ${op(
      isHidden,
    )} flex place-content-center items-center justify-center`}
  >
    {' '}
  </div>
);

const CircleWithLogo = ({
  color,
  isHidden,
  imgUrl,
}: {
  color?: string;
  isHidden?: boolean | null;
  imgUrl: string;
}) => {
  const [showImg, setShowImg] = useState(true);

  return (
    <div
      className={`h-10 w-10 min-w-fit rounded-full border-2 border-solid 
    border-white ${bg(color)} ${op(
        isHidden,
      )} flex place-content-center items-center justify-center`}
    >
      {showImg ? (
        <Image
          alt="logo"
          className="h-8 w-8 rounded-full"
          src={imgUrl}
          width={50}
          height={50}
          onError={() => {
            setShowImg(false);
          }}
        />
      ) : (
        ' '
      )}
    </div>
  );
};

const flag = false;
const flagf = false;

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

const Home = () => {
  const [focused, setF] = React.useState<ClubK | null>(null);

  const [mps, setMps] = React.useState(
    mpsE.map(mp => ({ ...mp, isHidden: false })),
  );
  const [clubs, setClubs] = React.useState(
    clubsE.map(c => ({ ...c, isHidden: false })),
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setMps(p =>
        p.map(pmp =>
          !focused || pmp.club === focused
            ? { ...pmp, isHidden: false }
            : { ...pmp, isHidden: true },
        ),
      );
      setClubs(p =>
        p.map(pc =>
          !focused || pc.id === focused
            ? { ...pc, isHidden: false }
            : { ...pc, isHidden: true },
        ),
      );
    }, 50);
    return () => clearTimeout(t);
  }, [focused, setMps]);

  const setOrToggleIfSame = (id: ClubK) => () =>
    setF(id === focused ? null : id);

  return (
    <>
      <Head>
        <title>Ectidha</title>
        <meta name="description" content="polish sejm deputies infographic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <main
          className="bg-gray-800"
          onFocus={() => setF(null)}
          onBlur={() => setF(null)}
        >
          <div className="flex-rows flex flex-wrap justify-around p-4">
            <div className="flex flex-col gap-2">
              {clubs.map(({ id, color, isHidden }, i) => (
                <button
                  key={`${id}-${i}`}
                  className="flex-rows flex items-center p-1"
                  onClick={setOrToggleIfSame(id)}
                >
                  {focused === id ? (
                    <CircleWithLogo
                      color={color}
                      isHidden={isHidden}
                      imgUrl={`http://api.sejm.gov.pl/sejm/term${TERM}/clubs/${id}/logo`}
                    />
                  ) : (
                    <Circle color={color} isHidden={isHidden} />
                  )}
                  <div className="ml-2 text-lg text-white">{id}</div>
                </button>
              ))}
            </div>
            <div className="grid w-3/4 grid-cols-23 gap-1">
              {mps.map(({ id, color, club, isHidden }, i) => (
                <button key={`${id}-${i}`} onClick={setOrToggleIfSame(club)}>
                  {flagf ? (
                    <>
                      {focused === club ? (
                        <CircleWithLogo
                          color={color}
                          isHidden={isHidden}
                          imgUrl={`http://api.sejm.gov.pl/sejm/term${TERM}/MP/${id}/photo-mini`}
                        />
                      ) : (
                        <Circle color={color} isHidden={isHidden} />
                      )}
                    </>
                  ) : (
                    <Circle color={color} isHidden={isHidden} />
                  )}
                </button>
              ))}
            </div>

            <div className="flex w-1/12 items-center text-5xl text-white">
              {focused !== null &&
                `${(
                  (mps.filter(mp => mp.club === focused).length / mps.length) *
                  100
                ).toPrecision(2)}%`}
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
        <footer className="text-xs text-center text-gray-400 p-2 bg-gray-700">
          <p>2023, powered by next, vercel, t3-app</p>
        </footer>
      </div>
    </>
  );
};
export default Home;
