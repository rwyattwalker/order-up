import React, { createContext, useContext, ReactNode, useState} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
type Props = {
  children: ReactNode
}

type ShoppingCartContext = {
  getItemQuantity:(id:number)=>number
  increaseCartQuantity:(id:number, name:string, price:number, fee:number)=>void
  decreaseCartQuantity:(id:number)=>void
  removeFromCart:(id:number)=>void
  clearCart:() => void
  openCart:() => void
  closeCart:() => void
  cartItems:CartItem[]
  visible:boolean
}

type CartItem ={
  id:number
  quantity: number
  name:string
  price: number
  fee: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider({children}:Props){
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
  const [visible, setVisible] = useState(false)
  const openCart = () => setVisible(true)
  const closeCart = () => setVisible(false)
  function getItemQuantity(id:number){
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function clearCart(){
    setCartItems([])
  }
  function increaseCartQuantity(id:number, name:string, fee:number, price:number){
    setCartItems(currItems => {
      if(!localStorage.getItem('seenCart')){
        openCart()
        localStorage.setItem('seenCart', 'true')
      }
      if(currItems.find(item => item.id === id)==null){
        return [...currItems, {id, quantity:1, name, fee, price}]
      } else {
        return currItems.map(item => {
          if(item.id === id){
            return {...item, quantity:item.quantity + 1}
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id:number){
    setCartItems(currItems => {
      if(currItems.find(item => item.id === id)?.quantity === 1){
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if(item.id === id){
            return {...item, quantity:item.quantity - 1}
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id:number){
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return(
    <ShoppingCartContext.Provider value={{getItemQuantity,clearCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, visible, openCart, closeCart}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}