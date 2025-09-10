import z from "zod";
export  const loginSchema =z.object({
    email:z.string().nonempty("this field is required").email("not valid email"),
    password:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'InValid Password'),
})
