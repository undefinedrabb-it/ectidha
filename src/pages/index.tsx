import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';

import { Circle, CircleWithLogo } from '../component/Circle';
import { clubsE, type ClubK, clubKs } from '../data/clubs';
import { mpsE } from '../data/mps';

const TERM = 9;

const withFaceImg = false;

const Home = () => {
  const [focused, setFocused] = useState<Readonly<ClubK[]>>(clubKs);

  const [mps, setMps] = useState(mpsE.map(mp => ({ ...mp, isHidden: false })));
  const [clubs, setClubs] = useState(
    clubsE.map(c => ({ ...c, isHidden: false })),
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setMps(pmps =>
        pmps.map(pmp => ({ ...pmp, isHidden: !focused.includes(pmp.club) })),
      );
      setClubs(pcs =>
        pcs.map(pc => ({ ...pc, isHidden: !focused.includes(pc.id) })),
      );
    }, 50);
    return () => clearTimeout(t);
  }, [focused, setMps]);

  const setOrToggleIfSame = (clubId: ClubK) => () =>
    setFocused(prevF =>
      focused?.includes(clubId)
        ? prevF.filter(ff => ff !== clubId)
        : [...prevF, clubId],
    );

  return (
    <>
      <Head>
        <title>Ectidha</title>
        <meta name="description" content="polish sejm deputies infographic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen">
        <main className="grow bg-gray-800 flex-rows flex justify-around p-4">
          <div className="flex flex-col items-center gap-64">
            {focused.length === 0 ? (
              <button
                className="bg-gray-700 text-white p-2 rounded-md"
                onClick={() => setFocused(clubKs)}
              >
                Select all
              </button>
            ) : (
              <button
                className="bg-gray-700 text-white p-2 rounded-md"
                onClick={() => setFocused([])}
              >
                Unselect all
              </button>
            )}
            <NewFunction focused={focused} mps={mps} />
          </div>
          <div className="w-3/4 flex flex-wrap justify-center ">
            {mps.map(({ id, color, club, isHidden }, i) => (
              <button
                style={{ flexBasis: `${100 / 23}%` }}
                key={`${id}-${i}`}
                onClick={setOrToggleIfSame(club)}
              >
                {withFaceImg ? (
                  <>
                    {focused?.includes(club) ? (
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
          <div className="flex flex-col gap-2 place-items-end">
            {clubs.map(({ id, color, isHidden }, i) => (
              <button
                key={`${id}-${i}`}
                className="flex-rows flex items-center p-1 gap-3"
                onClick={setOrToggleIfSame(id)}
              >
                <div className="ml-2 text-lg text-white">{id}</div>
                {focused?.includes(id) ? (
                  <CircleWithLogo
                    color={color}
                    isHidden={isHidden}
                    imgUrl={`http://api.sejm.gov.pl/sejm/term${TERM}/clubs/${id}/logo`}
                  />
                ) : (
                  <Circle color={color} isHidden={isHidden} />
                )}
              </button>
            ))}
          </div>
        </main>
        <footer className="text-xs text-center text-gray-400 p-2 bg-gray-700">
          <p>2023, powered by next.js, vercel, t3-app</p>
        </footer>
      </div>
    </>
  );
};
export default Home;

function NewFunction({
  focused,
  mps,
}: {
  focused: readonly ClubK[];
  mps: { isHidden: boolean; id: number; club: ClubK; color: string }[];
}) {
  const filterd = useMemo(
    () => mps.filter(mp => focused.includes(mp.club)).length,
    [focused, mps],
  );
  const allMps = useMemo(() => mps.length, [mps]);

  return (
    <div className="text-5xl text-white grow">
      {filterd === allMps
        ? 'All'
        : `${((filterd * 100) / allMps).toPrecision(2)}%`}
    </div>
  );
}
