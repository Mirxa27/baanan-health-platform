# Baanan Healthcare Solutions - Halol Medical Device Management Platform

A comprehensive medical device management platform built with Next.js 15, featuring device purchasing, rental, maintenance scheduling, and customer service. Baanan seamlessly blends innovative technology with holistic wellness, delivering comprehensive healthcare solutions through our revolutionary Halol platform.

## 🏥 Platform Overview

The Halol platform is designed to streamline medical device operations for healthcare facilities, providing a complete solution for device procurement, management, and maintenance. Built with modern web technologies and optimized for performance and scalability.

## ✨ Key Features

### 👥 For Healthcare Professionals & Customers
- **📱 Device Catalog**: Browse 10,000+ medical devices with advanced search and filtering
- **🛒 Secure Purchasing**: Buy medical devices with warranty and professional installation
- **🔄 Flexible Rentals**: Rent equipment with transparent pricing and easy booking
- **🔧 Maintenance Scheduling**: Professional maintenance with certified technicians
- **💬 24/7 Customer Support**: AI-powered chat with human agent escalation
- **📊 Order Tracking**: Real-time status updates and delivery tracking
- **📋 Purchase History**: Complete order and rental history management
- **🔐 Secure Authentication**: NextAuth.js integration with multiple providers

### 🔧 For Administrators
- **📈 Analytics Dashboard**: Comprehensive sales, inventory, and maintenance analytics
- **🏥 Device Management**: Complete CRUD operations for medical device inventory
- **👨‍💼 Agent Management**: Create and manage AI and human customer service agents
- **📦 Order Management**: Monitor all orders, rentals, and maintenance requests
- **💰 Revenue Tracking**: Real-time financial reporting and growth metrics
- **🔔 Notification System**: Automated alerts and status updates

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Remix Icons**: Comprehensive icon library

### Backend & Services
- **NextAuth.js**: Authentication and session management
- **next-translate**: Internationalization (i18n) support
- **Vercel**: Deployment and hosting platform

### Development Tools
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Git**: Version control

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/baanan-halol-platform.git
   cd baanan-halol-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
baanan-halol-platform/
├── app/                          # Next.js App Router
│   ├── components/              # Shared components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ...
│   ├── halol/                   # Halol platform pages
│   │   ├── dashboard/           # Dashboard functionality
│   │   ├── auth/               # Authentication pages
│   │   └── components/         # Halol-specific components
│   ├── contact/                # Contact page
│   ├── products/               # Products catalog
│   ├── about/                  # About page
│   ├── consultancy/            # Consultancy services
│   ├── resources/              # Resources and blog
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Home page
│   ├── loading.tsx            # Loading UI
│   ├── error.tsx              # Error boundary
│   ├── not-found.tsx          # 404 page
│   └── globals.css            # Global styles
├── components/                  # Shared components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── locales/                    # Internationalization
│   ├── en/                    # English translations
│   └── ar/                    # Arabic translations
├── public/                     # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── i18n.js                    # i18n configuration
└── package.json               # Dependencies and scripts
```

## 🌐 Internationalization

The platform supports multiple languages:
- **English (en)**: Default language
- **Arabic (ar)**: RTL support included

Translation files are located in the `locales/` directory. To add a new language:

1. Create a new directory in `locales/` (e.g., `locales/fr/`)
2. Add translation files for each namespace
3. Update `i18n.js` configuration
4. Update `next.config.ts` if needed

## 🔐 Authentication

The platform uses NextAuth.js for authentication with support for:
- **Email/Password**: Traditional credentials
- **OAuth Providers**: Google, Microsoft, etc.
- **Session Management**: Secure session handling
- **Role-based Access**: Different user roles and permissions

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience
- **Tablet**: Touch-optimized interface
- **Mobile**: Mobile-first design approach

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable UI components
- **Design System**: Consistent color palette and typography
- **Animations**: CSS-based animations for better performance

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 📊 Performance

The platform is optimized for performance with:
- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Static Site Generation (SSG)**: Pre-rendered pages where possible
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Optimized caching strategies

## 🔧 Configuration

### Environment Variables
```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database (if applicable)
DATABASE_URL=your-database-url

# External APIs
STRIPE_SECRET_KEY=your-stripe-key
SENDGRID_API_KEY=your-sendgrid-key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@baanan.com
- **Phone**: +966564406725
- **Website**: [https://baanan.com](https://baanan.com)

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Vercel**: For hosting and deployment platform
- **Open Source Community**: For the incredible tools and libraries

---

**Built with ❤️ by the Baanan Healthcare Solutions Team**

*Transforming healthcare through innovative technology solutions*