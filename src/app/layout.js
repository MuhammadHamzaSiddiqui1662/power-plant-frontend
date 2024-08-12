import "./globals.css";
import "./assets/css/tailwind.css";
import "./assets/css/materialdesignicons.min.css";
import { League_Spartan } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AntdStyledComponentsRegistry from "./componants/AntdStyledComponentsRegistry";
import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";
import { MyToastContainer } from "./componants/Toast";

const league_Spartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-league_Spartan",
});

export const metadata = {
  title: "Power Plant",
  description:
    "Power Plant - a transparent and organized market place for Intellectual Properties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="LTR">
      <body className={`${league_Spartan.className}`}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <StoreProvider>
              <AntdStyledComponentsRegistry>
                {children}
                <MyToastContainer />
              </AntdStyledComponentsRegistry>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
