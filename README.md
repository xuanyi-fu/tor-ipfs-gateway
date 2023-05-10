# IPFS Tor Downloader

This is a command-line utility for downloading files from the IPFS Gateway through the Tor Network. It ensures your privacy by routing all traffic through the Tor Network.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [node.js and npm](https://nodejs.org/en/download/)
- You have a macOS, Ubuntu machine.
- You have installed the Tor CLI. You can install it on macOS using Homebrew with the following command:

```bash
brew install tor
```

For Ubuntu:

```bash
sudo apt update 
sudo apt install tor
```

## Installing IPFS Tor Downloader

To install IPFS Tor Downloader, follow these steps:

1. Clone this repository:
```bash
git clone https://github.com/xuanyi-fu/tor-ipfs-gateway.git
```

2. Navigate to the project directory:
```bash
cd tor-ipfs-gateway
```

3. Install the dependencies:
```bash
npm install
```

## Using IPFS Tor Downloader

Before using this utility, ensure that the Tor daemon is running. You can start it with the following command:

```bash
tor
```

To download a file, use the following command:

```bash
npx ts-node index.ts --cid <CID> --file <path-to-the-download-file>
```

Replace `<CID>` with the CID of the file you want to download from the IPFS Gateway, and `<path-to-the-download-file>` with the path where you want to save the downloaded file.
