import z from "zod";
export  const shoppingSchema =z.object({
   details:z.string().nonempty("this field is required"),
   phone:z.string().nonempty("this field is required").regex(/^01[0-9]{9}$/,'Invalid phone number'),
   city:z.string().nonempty("this field is required"),
})
