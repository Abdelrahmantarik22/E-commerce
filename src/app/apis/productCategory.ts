
export default async function productCategory(id:string) {
const res =await fetch (`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
    {cache:'no-store'})
const {data}=await res.json()
return data
}
