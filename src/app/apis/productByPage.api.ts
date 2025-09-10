


export default async function productByPage(page:number) {
 const res =await fetch (`https://ecommerce.routemisr.com/api/v1/products?page=${page}`,
    {cache:'no-store'})
const Pagedata=await res.json()
return Pagedata
}
