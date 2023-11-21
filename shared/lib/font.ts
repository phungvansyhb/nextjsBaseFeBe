import {Inter, Pacifico, Roboto, Tilt_Neon,Orbitron ,Dancing_Script, Playfair, Playfair_Display, Lobster, Bungee_Shade} from "next/font/google";
import localFont from 'next/font/local'

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight:"500",display: "swap",
  adjustFontFallback: false
});

export const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight:"500",display: "swap",
  adjustFontFallback: false
});

export const dancing_Script = Dancing_Script({
  variable: "--font-dancing_Script",
  subsets: ["latin"],
  weight: ["400","500","600", "700"],
  display: "swap",
  adjustFontFallback: false
});


export const playfairdisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight:["500","800","700"],
  display: "swap",
});
export const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
  display: "swap",  
});



export const tilt = Tilt_Neon({
  variable: "--font-tilt",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false
});

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["vietnamese"],
  weight: "400",
  display: "swap",
});



export const bungee = Bungee_Shade({
  variable: "--font-bungee",
  subsets: ["latin","vietnamese"],
  weight: ["400"],
  display: "swap",
});


export const gilroy = localFont({
  variable: "--font-gilroy",
  src: [
    {
      path: '../../public/fonts/SVN-Gilroy.woff2',
      weight: "normal",
      style: 'normal',
    },
    {
      path: '../../public/fonts/SVN-GilroyMedium.woff2',
      weight: '400',
      style: 'medium',
    },
    {
      path: '../../public/fonts/SVN-GilroyBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})
