"use client";

import useCart from "@/hooks/use-cart";
import { fullFormSchema } from "@/schema/cart-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CartFormContext = createContext<UseFormReturn<z.infer<typeof fullFormSchema>> | null>(null);

export function CartFormProvider({ children }: { children: React.ReactNode }) {
  const { cart } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof fullFormSchema>>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      tickets: cart.tickets,
      tables: cart.tables
    }
  })

  useEffect(() => {
    form.reset({
      tickets: cart.tickets,
      tables: cart.tables
    })
  }, [cart])
  return (
    <CartFormContext.Provider value={form}>
      <FormProvider {...form}>{children}</FormProvider>
    </CartFormContext.Provider>
  );
}

export const useCartFormContext = () => {
  const ctx = useContext(CartFormContext);
  if (!ctx) throw new Error("useCartFormContext must be used inside CartFormProviderWrapper");
  return ctx;
};
