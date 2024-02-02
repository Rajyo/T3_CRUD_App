import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() })

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
})

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})


export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.user.findUnique({
      // where: {id: input.id}
      where: idSchema.parse(input)
    })
  }),

  createUser: publicProcedure.input(userSchema).mutation(({ input, ctx }) => {
    return ctx.db.user.create({
      data: userSchema.parse(input)
    })
  }),

  updateUser: publicProcedure.input(userUpdateSchema).mutation(({ input, ctx }) => {
    return ctx.db.user.update({
      where: {
        id: input.id.toString(),
      },
      data: userUpdateSchema.parse(input)
    })
  }),

  deleteUser: publicProcedure.input(idSchema).mutation(({input, ctx})=>{
    return ctx.db.user.delete({
      where: idSchema.parse(input),
    })
  })

});
