import Image from 'next/image';
import React, { useState } from 'react';

const bg = (color?: string) => (color ? color : 'bg-white');
const op = (isHidden?: boolean | null) => (isHidden ? 'opacity-10' : '');

export const Circle = ({
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
export const CircleWithLogo = ({
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
          className="h-7 w-7 rounded-full"
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
