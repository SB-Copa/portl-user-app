import useCart from "@/hooks/use-cart";
import { CartVenueTable } from "@/schema/cart-schema";
import { Martini, Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useDevice } from "@/hooks/use-device";

type CartTableItemProps = {
    item: CartVenueTable
}

export default function CartTableItem({ item }: CartTableItemProps) {

    const { removeTable } = useCart()
    const { isMobile } = useDevice()

    return (
        <div className={`flex item overflow-clip border-[#2c2d2c] w-full justify-between items-center gap-10 p-4 ${isMobile && 'border'}`}>

            <div className="flex gap-5">
                {
                    !isMobile && (
                        <Martini size={24} className="mt-[2px]" />
                    )
                }

                <div className="flex flex-col gap-5">
                    <div className="flex gap-5 items-center">

                        <div className="flex flex-col gap-1">

                            <h4 className='text-lg font-medium'>{item.table_name} - {item.legend}</h4>
                            <p className='text-sm text-white/50'>   
                                PHP {Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / per table
                            </p>

                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col items-end h-full justify-between">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant='ghost'><Trash /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black/80 backdrop-blur-sm border-[#2c2d2c] text-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Remove Ticket</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will remove the ticket from your cart.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-10">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button variant='destructive' onClick={() => removeTable(item.venue_table_id)}>
                                    <Trash />
                                    <span>Remove</span>
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


                {
                    !isMobile && (
                        <div className="flex flex-col items-end">
                            <p>Total price</p>
                            <p>PHP {Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export const MiniCartTableItem = ({ item }: { item: CartVenueTable }) => {

    return (
        <div className="flex items-start gap-18 w-full justify-between">
            <div className="flex flex-col">

                <div className="flex gap-2 items-center">
                    <Martini size={14} className="mt-[2px]" />

                    <div className="flex flex-col">
                        <h4 className='text-base leading-tight'>{item.table_name} - {item.legend}</h4>
                        <p className="text-xs text-white/50">{item.event_name}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end text-end">
                <p className="font-bold text-sm">PHP {Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                {/* <p className="text-xs text-white/50">Subtotal</p> */}
            </div>
        </div>
    )
}