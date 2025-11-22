import useCart from "@/hooks/use-cart"
import { CartTicket } from "@/schema/cart-schema"
import { Button } from "../ui/button"
import { TicketIcon, Trash } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useDevice } from "@/hooks/use-device"

export default function CartTicketItem({ item }: { item: CartTicket }) {
    const { removeTicket } = useCart()
    const { isMobile } = useDevice()
    const totalPrice = Number(item.price) * item.quantity

    return (
        <div className={`flex overflow-clip border-[#2c2d2c] w-full justify-between items-center ${isMobile ? 'gap-4 p-3 border' : 'gap-10 p-4'}`}>

            <div className={`flex ${isMobile ? 'gap-3' : 'gap-5'} self-start flex-1 min-w-0`}>

                {
                    !isMobile && (
                        <TicketIcon size={24} className="mt-[2px] flex-shrink-0" />
                    )
                }

                <div className={`flex flex-col ${isMobile ? 'gap-2' : 'gap-5'} min-w-0 flex-1`}>
                    <div className={`flex ${isMobile ? 'gap-2' : 'gap-5'} items-center`}>

                        <div className="flex flex-col gap-1 min-w-0">

                            <h4 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}> {isMobile && `${item.quantity}x `}{item.name}</h4>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/50`}>
                                PHP {Number(totalPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / per ticket
                            </p>

                        </div>
                    </div>


                    {
                        !isMobile && (
                            <div className="flex flex-col">
                                <p className="text-sm">Quantity</p>
                                <p>{item.quantity}</p>
                            </div>
                        )
                    }


                </div>
            </div>

            <div className={`flex flex-col items-end ${isMobile ? 'justify-center' : 'h-full justify-between'} flex-shrink-0`}>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant='ghost' size={isMobile ? 'icon' : 'default'}><Trash className={isMobile ? 'size-4' : ''} /></Button>
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
                                <Button variant='destructive' onClick={() => removeTicket(item.event_ticket_type_id)}>
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
                            <p>PHP {totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    )
                }



            </div>
        </div>
    )
}

export const MiniCartTicketItem = ({ item }: { item: CartTicket }) => {
    const subtotal = Number(item.price) * item.quantity
    return (

        <div className="flex items-start gap-18 w-full justify-between">
            <div className="flex flex-col">

                <div className="flex gap-2 items-start">
                    <TicketIcon size={14} className="mt-[2px]" />
                    <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                            <h4 className='text-base leading-tight'>{item.name}</h4>
                            <p className="text-xs text-white/50">x{item.quantity}</p>
                        </div>

                        <p className="text-xs text-white/50">{item.event_name}</p>
                    </div>

                </div>
                {/* <p className='font-bold text-sm'>
                    PHP {Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p> */}
            </div>

            <div className="flex flex-col items-end text-end">
                <p className="font-bold text-sm">PHP {Number(subtotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                {/* <p className="text-xs text-white/50">Subtotal</p> */}
            </div>
        </div>
    )
}
