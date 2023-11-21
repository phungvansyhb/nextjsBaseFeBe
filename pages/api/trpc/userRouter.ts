import {registerSchema, userSchema} from "@/shared/types/form";
import prisma from "@/shared/lib/prisma";
import {TRPCError} from "@trpc/server";
import bcrypt from "bcrypt";
import {z} from "zod";
import {NextResponse} from "next/server";
import {RpcPublicProcedure, RpcRouter} from "./_initRpc";

export const userRouter = RpcRouter({
    register: RpcPublicProcedure.input(registerSchema).mutation(async ({ctx, input}) => {
        try {
            // Check if the email is already registered
            const emailExist = await prisma.user.findUnique({
                where: {
                    email: input.email,
                },
            });

            if (emailExist) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: "Email already exists!"
                })
            }
            // Generate a hashed password
            const hashedPassword = await bcrypt.hash(input.password, 12);
            const {password, ...rest} = input
            // Save the user to the database
            const newUser = await prisma.user.create({
                data: {
                    ...rest,
                    hashedPassword,
                    role: 'USER',

                },
            });
            return {
                user: newUser,
                message: "User created successfully!",
                code: 'SUCCESS'
            }

        } catch (error) {
            console.log(error)
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: "Server error"
            })
        }
    }),
    getDetail: RpcPublicProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
        const user = await prisma.user.findUnique({
            where: {
                id: input.id,
            },
            include : {Socials:  true}
        });
        if (!user) {
            throw new TRPCError({message : 'User not found' , code : "BAD_REQUEST"})
        }
        return user
    }),
    delete: RpcPublicProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
        try {
            const id = input.id;
            await prisma.user.delete({
                where: {id},
            });
            /* TODO: check co san pham thuoc cate nay ko ?*/
            return new NextResponse(null, {status: 204});
        } catch (error: any) {
            if (error.code === "P2025") {
                let error_response = {
                    status: "fail",
                    message: "No ID Found",
                };
                throw new NextResponse(JSON.stringify(error_response), {
                    status: 404,
                    headers: {"Content-Type": "application/json"},
                });
            }

            let error_response = {
                status: "error",
                message: error.message,
            };
            throw new NextResponse(JSON.stringify(error_response), {
                status: 500,
                headers: {"Content-Type": "application/json"},
            });
        }
    }),
    update: RpcPublicProcedure.input(userSchema).mutation(async ({ctx, input}) => {
        try {
            let {id, Socials, ...json} = input

            const user = await prisma.user.findUnique({
                where: { id: id },
                include: { Socials: true },
            });
            if(!user) throw new TRPCError({code: "BAD_REQUEST", message: 'Người dùng không tồn tại'});

            const isExistEmail = await prisma.user.findFirst({
                where: {
                    AND: [
                        {
                            email: json.email,
                        },
                        {
                            id: {not: id},
                        },
                    ],
                },
            });
            if (isExistEmail) {
                throw new TRPCError({code: "BAD_REQUEST", message: 'Email đã tồn tại'});
            }
            const isExistName = await prisma.user.findFirst({
                where: {
                    AND: [
                        {
                            name: json.name,
                        },
                        {
                            id: {not: id},
                        },
                    ],
                },
            });

            if (isExistName) {
                throw new TRPCError({code: "BAD_REQUEST", message: 'Tên tài khoản đã tồn tại'});

            }
            await prisma.social.deleteMany({where : {userId:  id}})
            for (const socialData of Socials) {
                    await prisma.social.create({
                        data: {
                            type: socialData.type,
                            link: socialData.link,
                            userId: id,
                        },
                    });
            }
            const updated_user = await prisma.user.update({
                where: {id},
                data: {
                    ...json,
                },
            });

            let json_response = {
                status: "success",
                data: updated_user,
            };
            return NextResponse.json(json_response);
        } catch (error: any) {
            console.log(error)
            if (error.code) {
                throw new TRPCError(error);
            }
            throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message: 'Server xảy ra lỗi xin vui lòng thử lại sau'});
        }
    }),
    search: RpcPublicProcedure.query(async () => {

    })
})