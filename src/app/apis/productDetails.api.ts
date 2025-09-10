
export default async function productDetailsApi(id:string) {
const res =await fetch (`https://ecommerce.routemisr.com/api/v1/products/${id}`,
    {cache:'no-store'})
const {data}=await res.json()
return data
}
