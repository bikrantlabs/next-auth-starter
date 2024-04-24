import {
  Activity,
  AlignLeft,
  Command,
  Copy,
  CreditCard,
  Github,
  HelpCircle,
  Layout,
  Loader2,
  Menu,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCcw,
  Settings,
  SunMedium,
  Trash,
  User2,
  X,
  XCircle,
} from "lucide-react"

export type IconKeys = keyof typeof icons

// This ensures auto-completion for props.
type IconProps<T extends React.ElementType> = React.ComponentProps<T>
type IconsType = {
  [key in IconKeys]: React.ComponentType<IconProps<(typeof icons)[key]>>
}

const icons = {
  activity: Activity,
  alignLeft: AlignLeft,
  copy: Copy,
  creditCard: CreditCard,
  helpCircle: HelpCircle,
  layout: Layout,
  loader: Loader2,
  logo: Command,
  menu: Menu,
  moon: Moon,
  moreHorizontal: MoreHorizontal,
  pencil: Pencil,
  plus: Plus,
  refreshCcw: RefreshCcw,
  settings: Settings,
  sun: SunMedium,
  trash: Trash,
  user: User2,
  x: X,
  xCircle: XCircle,
  github: Github,
}

export const Icons: IconsType = icons
