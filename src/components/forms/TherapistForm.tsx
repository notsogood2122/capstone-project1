"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(1),
  address: z.string().min(1),
  sex: z.enum(["male", "female"]),
  img: z
    .any()
    .refine((file) => !file || file instanceof File || file instanceof Blob, {
      message: "Invalid file type",
    })
    .optional(),
});

type Inputs = z.infer<typeof schema>;

const TherapistForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: data?.username || "",
      email: data?.email || "",
      password: "",
      phone: data?.phone || "",
      address: data?.address || "",
      sex: data?.sex || "male",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    const body = new FormData();
    body.append("username", formData.username);
    body.append("email", formData.email);
    body.append("password", formData.password);
    body.append("phone", formData.phone);
    body.append("address", formData.address);
    body.append("sex", formData.sex);
    if (formData.img?.[0]) body.append("img", formData.img[0]);

    const res = await fetch("/api/therapists", {
      method: "POST",
      body,
    });

    if (res.ok) {
      alert("Therapist created successfully!");
    } else {
      alert("Error creating therapist.");
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new therapist" : "Update therapist"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Username" name="username" register={register} error={errors.username} />
        <InputField label="Email" name="email" register={register} error={errors.email} />
        <InputField label="Password" name="password" type="password" register={register} error={errors.password} />
      </div>

      <span className="text-xs text-gray-400 font-medium">Personal Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField label="Phone" name="phone" register={register} error={errors.phone} />
        <InputField label="Address" name="address" register={register} error={errors.address} />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && <p className="text-xs text-red-400">{errors.sex.message}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label htmlFor="img" className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer">
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && <p className="text-xs text-red-400">{errors.img.message.toString()}</p>}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TherapistForm;
