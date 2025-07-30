import SuiVNLogo from "../assets/sui-vn.png";
import { useDialogStore } from "@/store";
import { Button, IconButton } from "./ui";
import { ConnectWalletDialog } from "./dialog/connect-wallet-dialog";
import { SignupDialog } from "./dialog/signup-dialog";
import { LoginDialog } from "./dialog/login-dialog";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWallet } from "@suiet/wallet-kit";
import { truncateAddress } from "@/lib/utils";

const navItems = [
  {
    label: "User",
    href: "/",
  },
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Docs",
    href: "https://sui-faucet.weminal.xyz/docs",
  },
];

export const Header = () => {
  const { open, close } = useDialogStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { account, connected } = useWallet();

  function renderAccountInfo(): string | null {
    if (!connected) return null;
    if (account?.suinsName) {
      return account.suinsName;
    } else {
      return account?.address || null;
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="container mx-auto max-w-full md:px-4 sm:px-[22px] bg-[#030f1c66] backdrop-blur-[80px] absolute top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="h-[72px] items-center flex justify-between px-4">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <img src={SuiVNLogo} alt="SuiVN Logo" className="h-8 sm:h-9" />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item, index) => (
            <div key={item.href + index}>
              <Link
                to={item.href}
                target={item.href.includes("https") ? "_blank" : "_self"}
                className="text-[15px] hover:text-primary transition-all duration-300 font-light whitespace-nowrap relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {connected ? (
              // Khi đã connect: chỉ hiển thị wallet info
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="small" onClick={() => open(<ConnectWalletDialog />)}>
                  {truncateAddress(renderAccountInfo())}
                </Button>
              </motion.div>
            ) : (
              // Khi chưa connect: hiển thị 3 buttons
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="small"
                    onClick={() => open(<ConnectWalletDialog />)}
                  >
                    Connect Wallet
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="small"
                    onClick={() => open(<LoginDialog 
                      onClose={close} 
                      onSwitchToSignup={() => {
                        close();
                        open(<SignupDialog 
                          onClose={close} 
                          onSwitchToLogin={() => {
                            close();
                            open(<LoginDialog 
                              onClose={close} 
                              onSwitchToSignup={() => {
                                close();
                                open(<SignupDialog onClose={close} />);
                              }}
                            />);
                          }}
                        />);
                      }}
                    />)}
                  >
                    Login
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="small"
                    onClick={() => open(<SignupDialog 
                      onClose={close} 
                      onSwitchToLogin={() => {
                        close();
                        open(<LoginDialog 
                          onClose={close} 
                          onSwitchToSignup={() => {
                            close();
                            open(<SignupDialog onClose={close} />);
                          }}
                        />);
                      }}
                    />)}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="sm:hidden"
          >
            {connected ? (
              <Button size="small" onClick={() => open(<ConnectWalletDialog />)}>
                {truncateAddress(renderAccountInfo())}
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => open(<ConnectWalletDialog />)}
                className="px-3 py-1 text-sm"
              >
                Connect
              </Button>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
          >
            <IconButton onClick={toggleMobileMenu} className="size-10">
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </motion.div>
            </IconButton>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[#030f1c] border-t border-white/10 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.nav
              className="flex flex-col py-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    onClick={closeMobileMenu}
                    className="text-[15px] hover:text-primary hover:bg-white/5 transition-all duration-300 font-light px-4 py-3 block relative group"
                  >
                    {item.label}
                    <span className="absolute left-0 top-0 w-1 h-0 bg-primary transition-all duration-300 group-hover:h-full"></span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
