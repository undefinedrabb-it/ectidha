import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

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
  club: string;
};



export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const t = async (term: number) => await fetch(`http://api.sejm.gov.pl/sejm/term${term}/MP`)
      return {
        greeting: await (await t(9)).json() as MPT[],
      };
    }),
});
