import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email  is required" })
    .refine((value) => /^\S+@\S+$/i.test(value), {
      message: "Invalid email format.",
    }),
  password: z.string({ required_error: "Password  is required" }).min(6, {
    message: "Password must be at least 6 characters.",
  }),
  name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .optional(),
  fullname: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .optional(),
  bio: z.string().optional(),
});
export type TRegisterSchema = z.infer<typeof registerSchema>;
export const userSchema = z.object({
  id: z.string(),
  email: z
    .string({ required_error: "Email  is required" })
    .refine((value) => /^\S+@\S+$/i.test(value), {
      message: "Invalid email format.",
    }),
  name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .optional()
    .nullable(),
  fullname: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .optional()
    .nullable(),

  bio: z.string().optional().nullable(),
  image: z.string().nullable(),
  Socials: z.array(
    z.object({
      id: z.string().nullable(),
      type: z.enum(["FACEBOOK", "ZALO", "INSTA", "X", "TIKTOK", "GOOGLE"]),
      link: z.string({ required_error: "link  is required" }),
    })
  ),
});
export type TUserSchema = z.infer<typeof userSchema>;

export const productSchema = z.object({
  title: z.string({ required_error: "Vui lòng điền tên sản phẩm" }),
  description: z.string({
    required_error: "Vui lòng điền mô tả ngắn cho sản phẩm",
  }),
  content: z.string({ required_error: "Vui lòng điền nội dung cho sản phẩm" }),
  slug: z.string({ required_error: "Vui lòng điền slug sản phẩm" }),
  categoryProductIds: z
    .string({
      required_error: "Vui lòng chọn danh mục sản phẩm ",
    })
    .array(),
  price: z.number({ required_error: "Vui lòng điền giá sản phẩm" }),
  images: z.array(z.string()).optional(),
  featureImg: z.string({
    required_error: "Vui lòng chọn đại diện cho sản phẩm",
  }),
  id: z.string().optional(),
  brand: z.string(),
});

export const postSchema = z.object({
  title: z.string({ required_error: "Vui lòng điền tên bài viết" }),
  desc: z.string({ required_error: "Vui lòng điền mô tả ngắn cho bài viết" }),
  // content: z.string({required_error: "Vui lòng điền nội dung cho bài viết"}),
  slug: z.string({ required_error: "Vui lòng điền slug bài viết" }),
  categoryPostIds: z
    .string({
      required_error: "Vui lòng chọn danh mục bài viết ",
    })
    .array(),
  img: z.string({ required_error: "Vui lòng chọn đại diện cho bài viết" }),
  id: z.string().optional(),
});

export const cateSchema = z.object({
  title: z.string({ required_error: "Vui lòng điền tên danh mục" }),
  img: z.any(),
  slug: z.string({ required_error: "Vui lòng điền slug danh mục " }),
});

export const commentSchema = z.object({
  body: z.string(),
  userEmail: z.string(),
  postSlug: z.string(),
  parentId: z.string().optional(),
});
export const commentFormSchema = z.object({
  body: z.string(),

});
export const orderFeeSchema = z.object({
  from_district_id: z.number(),
  from_ward_code: z.string(),
  service_id: z.number().optional(),
  service_type_id: z.number().optional(),
  to_district_id: z.number(),
  to_ward_code: z.string(),
  height: z.number().optional(),
  length: z.number().optional(),
  weight: z.number().optional(),
  width: z.number().optional(),
  insurance_value: z.number().optional(),
  cod_failed_amount: z.number().optional(),
  coupon: z.string().optional(),
});
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const orderSchema = z.object({
  to_name: z.string(),
  to_phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ!'),
  to_address: z.string(),
  to_ward_code: z.string(),
  to_district_id: z.number(),
  service_id: z.number(),
  cod_amount: z.number(),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    weight: z.number()
  }))
})
export const extraInfo = z.object({
  userId: z.string().optional(),
  toWardName: z.string(),
  toDistrictName: z.string(),
  toProvinceId: z.number(),
  toProvinceName: z.string(),
  serviceName: z.string(),
})
export const userOrderFormSchema = z.object({
  to_name: z.string(),
  to_province_id: z.number(),
  to_district_id: z.number(),
  to_ward_code: z.string(),
  to_address: z.string(),
  to_phone: z.string().regex(phoneRegex, 'Số điện thoại không hợp lệ!'),
  note: z.string().optional(),
  service_id: z.number()
})