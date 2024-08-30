import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";

export let WishListContext = createContext(0);





export default function WishListContextProvider(props) {


    const [isLoading, setIsLoading] = useState(false);


    const [wishListProduct, setWishListProduct] = useState(null);



    async function addWishList(productId) {
        try {
            setIsLoading(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
                {
                    productId
                },
                {
                    headers: {
                        token: localStorage.getItem(userToken)
                    }
                })

            console.log(data);
            toast.success(data.message, { duration: 2000 });
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    async function getProductWishList() {
        try {
            setIsLoading(true)
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: {
                    token: localStorage.getItem(userToken)
                }
            })
            console.log(data.data);
            setWishListProduct(data.data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    async function deleteProduct(id) {
        try {
            setIsLoading(true)
            let { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/${id}',
                {
                    headers: {
                        token: localStorage.getItem(userToken)
                    }
                }
            )
            console.log(data);
            setIsLoading(false)
            window.location.reload(false);


        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    return <WishListContext.Provider value={{ addWishList, wishListProduct, getProductWishList, deleteProduct, isLoading }}>
        {props.children}
    </WishListContext.Provider>
}