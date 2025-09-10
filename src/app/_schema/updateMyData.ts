import z from "zod";
export  const updateData =z.object({
    name:z.string().nonempty("this field is required").min(2,"min length is 2 characters").max(25,"max length is 15 characters"),
    email:z.string().nonempty("this field is required").email("not valid email"),
    phone:z.string().nonempty("this field is required").regex(/^(010|011|012|015)[0-9]{8}$/,'This is invalid number'),
})
  