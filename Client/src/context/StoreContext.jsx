import { createContext, useState,useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems,setCartItems] = useState({});
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [foodList,setFoodList] = useState([]);
    const [isValidPromocode,setIsValidPromocode] = useState(false);

    const getCartData = async (token) => {
        try{
            const res = await axios.post("https://eat-street-backend-gg2j.onrender.com/api/cart/get",{},{
                headers : {
                    Authorization : token
                }
            })
            setCartItems(res.data.cartData);
        }catch(err){
            console.log(err);
        }

    }

    const fetchFoodList = async () => {
        try{
            const res = await axios.get("https://eat-street-backend-gg2j.onrender.com/api/food/list")
            if(res.data.success){
                setFoodList(res.data.food);
            }
            
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchFoodList();
        const token = localStorage.getItem("token");
        if(token){
            getCartData(token);
        }
    },[])

    const addToCart = async (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems({...cartItems,[itemId] : 1})
        }
        else{
            setCartItems({...cartItems,[itemId] : cartItems[itemId]+1})
        }
        const token = localStorage.getItem("token");
        if(token){
            const res = await axios.post("https://eat-street-backend-gg2j.onrender.com/api/cart/add",
                {itemId},
                {headers : {
                    Authorization : token
                }})
        }
    }

    const removeFromCart = async (itemId) => {
        if(cartItems[itemId]){
            setCartItems({...cartItems,[itemId] : cartItems[itemId]-1})
        }
        const token = localStorage.getItem("token");
        if(token){
            const res = await axios.post("https://eat-street-backend-gg2j.onrender.com/api/cart/remove",{itemId},{headers : {Authorization : token}})
        }
    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }

    const contextValue = {
        foodList,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalAmount,
        isLoggedIn,
        setIsLoggedIn,
        isValidPromocode,
        setIsValidPromocode
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;