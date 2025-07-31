# 🚰 Sui Faucet VN

A modern, responsive Sui faucet application with admin dashboard built with React, TypeScript, and Vite.

![Sui Faucet VN](./src/assets/sui-vn.png)

## ✨ Features

### 🌊 User Features
- **Wallet Integration**: Connect with popular Sui wallets (Slush, Nightly, etc.)
- **Token Request**: Get 1.0 SUI tokens for testnet/devnet
- **Network Selection**: Support for testnet and devnet
- **Rate Limiting**: Built-in protection with countdown timer
- **Responsive Design**: Mobile-friendly interface
- **Real-time Feedback**: Toast notifications for success/error states

### 📊 Admin Dashboard
- **Analytics**: Request statistics, success rates, and trends
- **Charts**: Interactive visualizations with Recharts
- **System Monitoring**: Health status and performance metrics
- **Settings Management**: Configure faucet parameters
- **Transaction History**: View recent faucet transactions
- **Authentication**: Secure admin access

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui Components
- **Charts**: Recharts
- **Animations**: Framer Motion
- **HTTP Client**: Native Fetch API
- **Package Manager**: PNPM
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PNPM (recommended) or NPM

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Huc06/Sui_Faucets_Vn.git
   cd sui-faucet-vn
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:5173`

## ⚙️ Environment Configuration

### Environment Variables

```bash
# API Configuration (optional - auto-detected)
VITE_API_BASE_URL=

# App Configuration
VITE_APP_NAME="Sui Faucet VN"
VITE_APP_VERSION="1.0.0"
```

### API Configuration
- **Development**: Uses Vite proxy to bypass CORS
- **Production**: Uses Vercel rewrites for seamless API access
- **Auto-detection**: Automatically selects the right configuration

## 🏗️ Project Structure

```
sui-vn/
├── src/
│   ├── api/               # API service functions
│   ├── components/        # React components
│   │   ├── admin/         # Admin dashboard components
│   │   ├── dialog/        # Modal dialogs
│   │   └── ui/            # Shadcn/ui components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── store/             # State management
│   └── lib/               # Utility functions
├── public/                # Static assets
├── .env.example           # Environment template
├── vercel.json            # Vercel deployment config
└── vite.config.ts         # Vite configuration
```

## 🔧 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

### Adding UI Components

This project uses Shadcn/ui. To add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc...
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Environment variables** (optional):
   ```
   VITE_API_BASE_URL=https://sui-faucet.weminal.xyz
   ```
3. **Deploy** - Vercel will automatically build and deploy

### Manual Build

```bash
pnpm build
# Deploy the 'dist' folder to your hosting provider
```

## 🔗 API Integration

The application integrates with the Sui Faucet API:

### Base URL
- **Development**: Proxied through Vite dev server
- **Production**: Proxied through Vercel rewrites
- **API Server**: `https://sui-faucet.weminal.xyz`

### Key Endpoints
- `POST /api/v1/sui/faucet` - Request tokens
- `GET /api/v1/analytics/stats` - Get analytics data
- `GET /api/v1/system/health` - System health check

## 🎨 Design System

### Colors
- **Primary Blue**: `#4DA2FF`
- **Dark Blue**: `#011829`
- **Light Blue**: `#C0E6FF`

### Components
- Built with Shadcn/ui for consistency
- Tailwind CSS for custom styling
- Responsive design patterns

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Use TypeScript for type safety
- Follow the existing code style
- Add proper error handling
- Write descriptive commit messages
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/Huc06/Sui_Faucets_Vn/issues)

## 🔮 Roadmap

- [ ] Multi-language support (English/Vietnamese)
- [ ] Advanced analytics and reporting
- [ ] Mobile app version
- [ ] Integration with more Sui wallets
- [ ] Custom token amounts
- [ ] Automated testing suite

---

**Made with ❤️ for the Sui ecosystem**
