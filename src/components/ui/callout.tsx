import React from "react"
import {
  IconAlertCircleFilled,
  IconAlertTriangle,
  IconCheck,
  TablerIconsProps,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

interface CalloutProps {
  variant: "warning" | "success" | "error"
  content: JSX.Element
}

export const Callout: React.FC<CalloutProps> = ({
  content,
  variant = "success",
}) => {
  const CalloutIcon = (props: TablerIconsProps) => {
    if (variant === "error") {
      return <IconAlertCircleFilled className="icon-sm" {...props} />
    }
    if (variant === "success") {
      return <IconCheck className="icon-sm" {...props} />
    }
    if (variant === "warning") {
      return <IconAlertTriangle className="icon-sm" {...props} />
    }
  }

  return (
    <div
      className={cn(
        "p-3 rounded-md text-sm w-full flex items-start gap-x-2",
        variant === "warning" && "bg-warning/15 text-warning",
        // TODO: Add success styles
        variant === "success" && "bg-success/15 text-success",
        variant === "error" && "bg-destructive/15 text-destructive"
      )}
    >
      <CalloutIcon />
      {content}
    </div>
  )
}
