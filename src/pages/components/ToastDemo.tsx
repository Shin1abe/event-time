import React from "react"
import { useToast } from "@/ui/use-toast"

export const ToastDemo = () => {
    const { toast } = useToast()

    return (<>
        <button
            onClick={() => {
                toast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                })
            }}
        >
            Show Toast
        </button>
    </>
    )
}
export default ToastDemo
