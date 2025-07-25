import { useWallet } from "@suiet/wallet-kit";
import { useDialogStore } from "@/store";
import { DialogHeader } from "../ui";
import { Wallet, LogOut, Copy, Check } from "lucide-react";
import { useState } from "react";
import { truncateAddress } from "@/lib/utils";

export const ConnectWalletDialog = () => {
  const { close } = useDialogStore();
  const { select, configuredWallets, detectedWallets, connected, account, disconnect } = useWallet();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleWalletClick = (wallet: any) => {
    // check if user installed the wallet
    if (!wallet.installed) {
      // Guide users to install the wallet
      if (wallet.downloadUrl?.browserExtension) {
        window.open(wallet.downloadUrl.browserExtension, "_blank");
      }
      return;
    }
    select(wallet.name);
    close();
  };

  const handleDisconnect = () => {
    disconnect();
    close();
  };

  const handleCopyAddress = async () => {
    if (account?.address) {
      try {
        await navigator.clipboard.writeText(account.address);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } catch (error) {
        console.error("Failed to copy address:", error);
      }
    }
  };

  const allWallets = [...detectedWallets, ...configuredWallets];

  // If connected, show wallet info and disconnect option
  if (connected && account) {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <DialogHeader title="Wallet Connected" onClose={close} className="pb-4" />
        
        <div className="space-y-6 flex-1">
          {/* Connected Wallet Info */}
          <div className="bg-gradient-to-r from-[#4DA2FF]/10 to-[#011829]/10 rounded-xl p-6 border border-[#4DA2FF]/20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#4DA2FF] to-[#011829] rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#011829] dark:text-white text-gray-600">
                  {account.suinsName || "Sui Wallet"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connected successfully
                </p>
              </div>
            </div>

            {/* Address Display */}
            <div className="bg-white dark:bg-[#030F1C] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                Wallet Address
              </label>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-[#011829] dark:text-white">
                  {truncateAddress(account.address)}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="ml-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  title="Copy address"
                >
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center justify-center space-x-2 p-4 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Disconnect Wallet</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If not connected, show wallet selection

  return (
    <div className=" flex flex-col flex-1 min-h-0">
      <DialogHeader title="Connect Wallet" onClose={close} className="pb-4" />

      <div className="space-y-3 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent">
        {allWallets.map((wallet) => (
          <button
            key={wallet.name}
            onClick={() => handleWalletClick(wallet)}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 transition-all duration-200 hover:bg-foreground/60 bg-foreground cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              {/* Wallet Icon */}
              <div className="size-10 rounded-full overflow-hidden flex items-center justify-center">
                {wallet.iconUrl ? (
                  <img
                    src={wallet.iconUrl}
                    alt={wallet.label || wallet.name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {(wallet.label || wallet.name).charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Wallet Info */}
              <div className="text-left">
                <h3 className="font-semibold text-sm">
                  {wallet.label || wallet.name}
                </h3>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              {wallet.installed ? (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-600">
                    Installed
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-500">
                    Install
                  </span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
