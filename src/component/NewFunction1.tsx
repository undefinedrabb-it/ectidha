import React from 'react';

import { Circle } from './Circle';

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

export function NewFunction1() {
  return (
    <div className="flex flex-col">
      {thoughts.map(({ id, color }, i) => (
        <div className="m-2 flex flex-row items-center " key={`${id}-${i}`}>
          <Circle color={color} />
          <div className="ml-2 text-lg text-white">{id}</div>
        </div>
      ))}
    </div>
  );
}
