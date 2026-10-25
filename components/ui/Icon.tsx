import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  Accessibility, AlarmClock, AppWindow, ArrowLeft, ArrowLeftRight, ArrowRight, ArrowUpDown,
  ArrowUpRight, Atom, Award, BadgePlus, Ban, Banknote, Bell, Blocks, Bomb, BookOpen, Bot, Brain,
  Briefcase, Brush, Building2, Calculator, Calendar, CalendarDays, Camera, Candy, CaseUpper,
  ChartColumn, ChartNoAxesColumnIncreasing, Check, ChevronsUp, CircleCheck, CircleHelp,
  Clapperboard, ClipboardList, Clock, Cloud, CloudLightning, Code, Coins, Compass, Construction,
  Copy, CreditCard, Crosshair, Crown, Database, Dices, Dna, DoorOpen, Drama, Earth, EyeOff,
  Factory, FileText, Files, Flag, Flame, FlaskConical, FolderOpen, Footprints, Frown, Gamepad2,
  Gauge, Ghost, Gift, Globe, GraduationCap, Hammer, Hand, Handshake, Hash, Heart, History, House,
  IdCard, Image, Inbox, Key, KeyRound, Keyboard, Lamp, Landmark, Laptop, LayoutDashboard,
  LayoutGrid, Library, Lightbulb, Link, Lock, LockKeyhole, Mail, MapPin, Medal, Megaphone,
  MessageCircle, Mic, Microscope, Moon, Mountain, Music, Newspaper, NotebookPen, Orbit, Package,
  Paintbrush, Palette, PartyPopper, Pin, Plane, Play, Plug, Pointer, Presentation, Puzzle,
  RadioTower, Rainbow, Receipt, Repeat, Rocket, Ruler, Satellite, Scale, School, Scissors,
  ScrollText, Search, Send, Server, Settings, Shield, ShieldAlert, Shuffle, Skull,
  SlidersHorizontal, Smartphone, Spade, Sparkle, Sparkles, Sprout, Squirrel, Star, SunMoon,
  Sunrise, Swords, Tag, Target, Tent, Ticket, Timer, Toolbox, TrafficCone, TreeDeciduous, TreePalm,
  TrendingDown, TrendingUp, Truck, Tv, Type, User, Users, Video, Volume2, Wallet, WandSparkles,
  Waves, Wind, Wrench, X, Zap,
} from 'lucide-react';

/*
 * Line icons from Lucide (lucide.dev, ISC licence), named by their Lucide
 * component. Data files refer to an icon by that name, so the set only
 * bundles the icons the site actually shows.
 */
const ICONS = {
  Accessibility, AlarmClock, AppWindow, ArrowLeft, ArrowLeftRight, ArrowRight, ArrowUpDown,
  ArrowUpRight, Atom, Award, BadgePlus, Ban, Banknote, Bell, Blocks, Bomb, BookOpen, Bot, Brain,
  Briefcase, Brush, Building2, Calculator, Calendar, CalendarDays, Camera, Candy, CaseUpper,
  ChartColumn, ChartNoAxesColumnIncreasing, Check, ChevronsUp, CircleCheck, CircleHelp,
  Clapperboard, ClipboardList, Clock, Cloud, CloudLightning, Code, Coins, Compass, Construction,
  Copy, CreditCard, Crosshair, Crown, Database, Dices, Dna, DoorOpen, Drama, Earth, EyeOff,
  Factory, FileText, Files, Flag, Flame, FlaskConical, FolderOpen, Footprints, Frown, Gamepad2,
  Gauge, Ghost, Gift, Globe, GraduationCap, Hammer, Hand, Handshake, Hash, Heart, History, House,
  IdCard, Image, Inbox, Key, KeyRound, Keyboard, Lamp, Landmark, Laptop, LayoutDashboard,
  LayoutGrid, Library, Lightbulb, Link, Lock, LockKeyhole, Mail, MapPin, Medal, Megaphone,
  MessageCircle, Mic, Microscope, Moon, Mountain, Music, Newspaper, NotebookPen, Orbit, Package,
  Paintbrush, Palette, PartyPopper, Pin, Plane, Play, Plug, Pointer, Presentation, Puzzle,
  RadioTower, Rainbow, Receipt, Repeat, Rocket, Ruler, Satellite, Scale, School, Scissors,
  ScrollText, Search, Send, Server, Settings, Shield, ShieldAlert, Shuffle, Skull,
  SlidersHorizontal, Smartphone, Spade, Sparkle, Sparkles, Sprout, Squirrel, Star, SunMoon,
  Sunrise, Swords, Tag, Target, Tent, Ticket, Timer, Toolbox, TrafficCone, TreeDeciduous, TreePalm,
  TrendingDown, TrendingUp, Truck, Tv, Type, User, Users, Video, Volume2, Wallet, WandSparkles,
  Waves, Wind, Wrench, X, Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

/** A decorative icon sized to the surrounding text (1em) unless told otherwise. */
export function Icon({ name, size = '1em', strokeWidth = 1.75, ...rest }: { name: IconName } & LucideProps) {
  const C = ICONS[name];
  return <C aria-hidden="true" size={size} strokeWidth={strokeWidth} {...rest} />;
}
