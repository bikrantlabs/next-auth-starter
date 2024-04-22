export type AuthMessageCalloutType = "warning" | "error" | "success"
export interface AuthMessage {
  message: string
  type: AuthMessageCalloutType
}
