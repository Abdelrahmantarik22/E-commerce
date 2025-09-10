import z from "zod";
export  const rePass =z.object({
    currentPassword:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'InValid Password'),
    password:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'InValid Password'),
    rePassword:z.string().nonempty("this field is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'InValid Password'),
})

