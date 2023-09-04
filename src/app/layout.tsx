"use client"
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet, polygon } from "wagmi/chains"

import "./globals.css"
import { SessionProvider } from "next-auth/react"

const chains = [mainnet, polygon]
const projectId: any = process.env.WALLET_CONNECT_PROJECT_ID

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <SessionProvider>
          <body><WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /></body>
        </SessionProvider>
    </html>
  )
}
