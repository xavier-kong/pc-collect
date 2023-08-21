import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface Card {
  era: string; 
  type: 'inclusion' | 'pob';
  shop: string;
  name: string; 
  imgUrl: string;
  status: CardStatus;
}

type CardStatus = 'collected' | 'otw' | 'looking' | 'uncollected';

export const cardRouter = createTRPCRouter({
  hello: publicProcedure
  .input(z.object({ text: z.string() }))
  .query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  fetch: publicProcedure.query(() => {
    const fakeData = Array.from({ length: 50}, () => [
      {
        era: 'black',
        type: 'inclusion' as Card["type"],
        shop: 'bicycle',
        name: 'ace',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ace_of_spades.svg/530px-Ace_of_spades.svg.png',
        status: 'looking' as CardStatus
      },
      {
        era: 'red',
        type: 'pob' as Card["type"],
        shop: 'bee',
        name: 'king',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/King_of_hearts_fr.svg/185px-King_of_hearts_fr.svg.png',
        status: 'otw' as CardStatus
      },
    ]).flat();

    return fakeData;
  })
});
