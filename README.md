# 🚰 Sui Faucet VN

A modern, responsive Sui faucet application with comprehensive admin dashboard built with React, TypeScript, and Vite.

![Sui Faucet VN](./src/assets/sui-vn.png)

## ✨ Features

### 🌊 User Features
- **Wallet Integration**: Connect with popular Sui wallets (Slush, Nightly, etc.)
- **Token Request**: Get 1.0 SUI tokens for testnet/devnet
- **Network Selection**: Support for testnet and devnet
- **Rate Limiting**: Built-in protection with countdown timer
- **Responsive Design**: Mobile-friendly interface
- **Real-time Feedback**: Toast notifications for success/error states
- **Login System**: Secure authentication for admin access

### 📊 Admin Dashboard
- **Analytics**: Real-time request statistics, success rates, and trends
- **Interactive Charts**: Beautiful visualizations with Recharts
- **System Monitoring**: Health status and performance metrics
- **Settings Management**: Configure faucet parameters (read-only)
- **Transaction History**: View recent faucet transactions with details
- **Wallet Activity Search**: Search and analyze specific wallet activity
- **Geographic Analytics**: Top countries and request sources
- **Authentication**: Secure admin access with JWT tokens

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Shadcn/ui Components
- **Charts**: Recharts with custom theming
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Native Fetch API with error handling
- **Package Manager**: PNPM/NPM
- **Deployment**: Vercel with automatic rewrites

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
   # Create .env file with your configuration
   VITE_API_BASE_URL=https://sui-faucet.weminal.xyz
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
# API Configuration (required for production)
VITE_API_BASE_URL=https://sui-faucet.weminal.xyz

# App Configuration (optional)
VITE_APP_NAME="Sui Faucet VN"
VITE_APP_VERSION="1.0.1"
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
│   │   ├── services.ts    # Main API integration
│   │   ├── faucet/        # Faucet API routes
│   │   └── stats/         # Analytics API routes
│   ├── components/        # React components
│   │   ├── admin/         # Admin dashboard components
│   │   │   ├── analytics-tab.tsx
│   │   │   ├── transaction-tab.tsx
│   │   │   ├── settings-tab.tsx
│   │   │   ├── wallet-activity.tsx
│   │   │   └── charts/    # Chart components
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
2. **Environment variables**:
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

The application integrates with the Sui Faucet API v0.0.1:

### Base URL
- **Development**: Proxied through Vite dev server
- **Production**: Proxied through Vercel rewrites
- **API Server**: `https://sui-faucet.weminal.xyz`

### Key Endpoints

**Faucet Operations:**
- `POST /api/v1/sui/faucet` - Request SUI tokens
- `GET /api/v1/sui/address` - Get faucet source address (raw string)
- `GET /api/v1/sui/balance` - Get faucet balance (raw number)

**Analytics:**
- `GET /api/v1/analytics/stats` - Get transaction statistics
- `GET /api/v1/analytics/top-countries` - Get top countries for charts
- `GET /api/v1/analytics/top-country` - Get the most active country
- `GET /api/v1/analytics/top-sources` - Get top request sources (IPs)
- `GET /api/v1/analytics/history` - Get transaction history
- `GET /api/v1/analytics/geographic` - Get geographic distribution
- `GET /api/v1/analytics/performance` - Get performance metrics
- `GET /api/v1/analytics/wallet/{address}` - Get wallet activity

**System Management:**
- `GET /api/health` - System health check
- `GET /api/v1/system-setting` - Get system settings (read-only)
- `POST /api/v1/system-setting` - Update system settings (not supported)

**Authentication:**
- `POST /api/v1/auth/login` - User login (JWT)
- `GET /api/v1/auth/profile` - Get user profile

### API Response Formats

**Real API Data Examples:**
```json
{
  "countries": [
    {
      "count": 24,
      "successCount": 18,
      "failureCount": 6,
      "country": "SG",
      "percentage": 9.09
    }
  ],
  "totalTransactions": 264
}
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#4DA2FF`
- **Dark Blue**: `#011829`
- **Light Blue**: `#C0E6FF`
- **Success Green**: `#10B981`
- **Error Red**: `#EF4444`

### Components
- Built with Shadcn/ui for consistency
- Tailwind CSS for custom styling
- Responsive design patterns
- Dark mode support

## 🔐 Admin Access

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin`

Access the admin dashboard at `/admin` to monitor:
- **Analytics**: Request trends, success rates, geographic data
- **Transactions**: Recent faucet transactions with details
- **Settings**: System configuration (read-only)
- **Wallet Search**: Analyze specific wallet activity

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

## 📝 Changelog

### v1.0.2 (Latest)
- ✅ Enhanced admin dashboard with real API data
- ✅ Added wallet activity search functionality
- ✅ Improved charts with real geographic data
- ✅ Fixed TypeScript warnings and unused variables
- ✅ Updated login form positioning
- ✅ Enhanced error handling and user feedback
- ✅ Optimized build process for Vercel deployment

### v1.0.1
- ✅ Updated API integration to match new Sui Faucet API v0.0.1
- ✅ Added new analytics endpoints (top sources, geographic data, wallet activity)
- ✅ Updated health check endpoint path
- ✅ Enhanced authentication system
- ✅ Improved system settings management

### v1.0.0
- ✅ Initial release with wallet integration
- ✅ Admin dashboard with analytics
- ✅ Real-time charts and monitoring
- ✅ Responsive design and animations

## 🔮 Roadmap

- [ ] Multi-language support (English/Vietnamese)
- [ ] Advanced analytics and reporting
- [ ] Mobile app version
- [ ] Integration with more Sui wallets
- [ ] Custom token amounts
- [ ] Automated testing suite
- [ ] Real-time notifications
- [ ] Enhanced security features
- [ ] Export analytics data
- [ ] Advanced filtering options

---

**Made with ❤️ for the Sui ecosystem**
