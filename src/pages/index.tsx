import { Listbox, Transition } from '@headlessui/react';
import Head from 'next/head';
import React, { useEffect, useMemo, useReducer } from 'react';

import { Circle, CircleWithLogo } from '../component/Circle';
import {
  clubsE as clubsE09,
  type ClubK as ClubK09,
  type ClubsEnhanedT as ClubsEnhanedT09,
  clubKs as clubKs09,
} from '../data/clubs-09';
import {
  clubsE as clubsE10,
  type ClubK as ClubK10,
  type ClubsEnhanedT as ClubsEnhanedT10,
  clubKs as clubKs10,
} from '../data/clubs-10';
import {
  mpsE as mpsE09,
  type MPEnhanedT as MPEnhanedT09,
} from '../data/mps-09';
import {
  mpsE as mpsE10,
  type MPEnhanedT as MPEnhanedT10,
} from '../data/mps-10';

const withFaceImg = false;

type ClubK = ClubK09 | ClubK10;
type ClubsEnhanedT = ClubsEnhanedT09 | ClubsEnhanedT10;
type MPEnhanedT = MPEnhanedT09 | MPEnhanedT10;
const terms = [
  { label: 'Term 9', value: 9 },
  { label: 'Term 10', value: 10 },
] as const;

function addIsHidden<T>(arr: T[]): (T & { isHidden: boolean })[] {
  return arr.map(item => ({ ...item, isHidden: false }));
}

type StateT = {
  term: (typeof terms)[number];
  focused: readonly ClubK[];
  mps: (MPEnhanedT & { isHidden: boolean })[];
  clubs: (ClubsEnhanedT & { isHidden: boolean })[];
};
const initialState = {
  term: terms[0],
  focused: clubKs09,
  mps: addIsHidden(mpsE09),
  clubs: addIsHidden(clubsE09),
} satisfies StateT;

type ActionT =
  | { type: 'setFocused'; payload: StateT['focused'] }
  | { type: 'selectAllFocused' }
  | { type: 'unselectAllFocused' }
  | { type: 'setMps'; payload: StateT['mps'] }
  | { type: 'setClubs'; payload: StateT['clubs'] }
  | { type: 'setTerm'; payload: (typeof terms)[number]['value'] };

const setTerm = (term: (typeof terms)[number]['value']): StateT => {
  switch (term) {
    case 9:
      return initialState;
    case 10:
      return {
        term: terms[1],
        focused: clubKs10,
        mps: addIsHidden(mpsE10),
        clubs: addIsHidden(clubsE10),
      };
    default:
      return initialState;
  }
};

const chooseClubs = (term: StateT['term']['value']) =>
  term === 9 ? clubKs09 : clubKs10;

const reducer = (state: StateT, action: ActionT): StateT => {
  switch (action.type) {
    case 'selectAllFocused':
      return { ...state, focused: chooseClubs(state.term.value) };
    case 'unselectAllFocused':
      return { ...state, focused: [] };
    case 'setFocused':
      return { ...state, focused: action.payload };
    case 'setMps':
      return { ...state, mps: action.payload };
    case 'setClubs':
      return { ...state, clubs: action.payload };
    case 'setTerm': {
      return setTerm(action.payload);
    }
    default:
      return state;
  }
};

const Home = () => {
  const [{ focused, mps, clubs, term }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({
        type: 'setMps',
        payload: mps.map(pmp => ({
          ...pmp,
          isHidden: !focused.includes(pmp.club),
        })),
      });
      dispatch({
        type: 'setClubs',
        payload: clubs.map(pc => ({
          ...pc,
          isHidden: !focused.includes(pc.id),
        })),
      });
    }, 50);
    return () => clearTimeout(timeout);
  }, [clubs, focused, mps]);

  const setOrToggleIfSame = (clubId: ClubK) => () => {
    dispatch({
      type: 'setFocused',
      payload: focused?.includes(clubId)
        ? focused.filter(ff => ff !== clubId)
        : [...focused, clubId],
    });
  };
  return (
    <>
      <Head>
        <title>SejmViz</title>
        <meta name="description" content="polish sejm deputies infographic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen">
        <main className="grow bg-gray-800 flex-rows flex justify-around p-4">
          <div className="flex flex-col items-center gap-64">
            {focused.length === 0 ? (
              <button
                className="bg-gray-700 text-white p-2 rounded-md"
                onClick={() => dispatch({ type: 'selectAllFocused' })}
              >
                Select all
              </button>
            ) : (
              <button
                className="bg-gray-700 text-white p-2 rounded-md"
                onClick={() => dispatch({ type: 'unselectAllFocused' })}
              >
                Unselect all
              </button>
            )}
            <Percentage focused={focused} mps={mps} />
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
                        imgUrl={`http://api.sejm.gov.pl/sejm/term${term.value}/MP/${id}/photo-mini`}
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
            <Listbox
              value={term}
              onChange={v => dispatch({ type: 'setTerm', payload: v.value })}
            >
              <div className="relative mt-1 p-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{term.label}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {/* <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                  </span>
                </Listbox.Button>
                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 min-w-100 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {terms.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-6 ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.label}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                a
                                {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
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
                    imgUrl={`http://api.sejm.gov.pl/sejm/term${term.value}/clubs/${id}/logo`}
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

function Percentage({
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
