"use client"

import {Toaster} from "react-hot-toast"
import type React from "react"

type ToasterProps = Partial<React.ComponentProps<typeof Toaster>>

const ToasterComponent = ({...props}: ToasterProps) => {

    return (
        <Toaster
            position="top-center"
            gutter={8}
            toastOptions={{
                duration: 3000,
                className: "!bg-background font-bold",
            }}
            {...props}
        />
    )
}

export default ToasterComponent