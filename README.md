# Real-Time Network Performance Dashboard

A modern, real-time network performance monitoring and observability dashboard built with Next.js 16, React 19, and TypeScript. This dashboard provides comprehensive insights into distributed service health, performance metrics, anomaly detection, and distributed tracing visualization.

![Network Performance Dashboard](public/placeholder.svg)

## 🚀 Features

### Core Functionality
- **Real-Time Monitoring**: Live updates every 5 seconds for service metrics and performance data
- **Service Overview**: Monitor multiple distributed services with health status indicators
- **Performance Charts**: Visualize latency (P95/P99), throughput, and error rates
- **Network Topology**: Interactive D3.js network graph showing service dependencies
- **Heat Maps**: D3.js-powered heat map visualization for performance patterns
- **Anomaly Detection**: Automatic detection of latency spikes, error bursts, and throughput drops
- **Distributed Tracing**: View recent traces with status, duration, and span information
- **Role-Based Access Control**: Built-in authentication with viewer, engineer, and admin roles

### Visualization Components
- Interactive charts using Recharts library
- Custom D3.js network topology graphs
- Heat map visualizations for performance analysis
- Real-time data updates with smooth animations

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Component Overview](#-component-overview)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19.2](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Charts**: [Recharts](https://recharts.org/) and [D3.js](https://d3js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) for dark mode support

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Form Handling**: React Hook Form with Zod validation
- **Animation**: tailwindcss-animate
- **Analytics**: Vercel Analytics

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18 or higher
- **pnpm**: Version 8 or higher (recommended) or npm/yarn

```bash
# Install pnpm globally if you haven't already
npm install -g pnpm
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/johaankjis/Real-Time-Network-Performance-Dashboard.git
cd Real-Time-Network-Performance-Dashboard
```

2. **Install dependencies**
```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

### Linting

Run the linter to check code quality:

```bash
pnpm lint
```

## 📁 Project Structure

```
Real-Time-Network-Performance-Dashboard/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   └── graphql/             # GraphQL endpoint
│   │       └── route.ts         # GraphQL resolver
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main dashboard page
│
├── components/                   # React components
│   ├── charts/                  # Chart components
│   │   ├── error-rate-chart.tsx
│   │   ├── latency-chart.tsx
│   │   └── throughput-chart.tsx
│   ├── ui/                      # Reusable UI components (Radix UI)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...                  # Other UI primitives
│   ├── anomaly-detection.tsx    # Anomaly detection component
│   ├── d3-heatmap.tsx          # D3.js heat map visualization
│   ├── d3-network-graph.tsx    # D3.js network topology graph
│   ├── header.tsx              # Dashboard header
│   ├── metric-card.tsx         # Metric display card
│   ├── performance-charts.tsx  # Performance metrics charts
│   ├── recent-traces.tsx       # Recent traces display
│   ├── service-overview.tsx    # Service health overview
│   ├── service-status-badge.tsx # Service status indicator
│   └── theme-provider.tsx      # Theme context provider
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-toast.ts            # Toast notification hook
│
├── lib/                         # Utility libraries
│   ├── auth.ts                 # Authentication & authorization
│   ├── graphql-client.ts       # GraphQL client utilities
│   ├── mock-data.ts            # Mock data generators
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions
│
├── public/                      # Static assets
│   └── ...
│
├── styles/                      # Additional styles
│
├── components.json              # UI components configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🏗️ Architecture

### Component Architecture

The dashboard follows a modular component architecture:

```
┌─────────────────────────────────────────┐
│          Main Dashboard Page            │
│              (page.tsx)                 │
└─────────────────────────────────────────┘
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
┌─────────┐  ┌────────────┐  ┌──────────┐
│ Header  │  │  Service   │  │Performance│
│         │  │  Overview  │  │  Charts   │
└─────────┘  └────────────┘  └──────────┘
      │             │             │
      ▼             ▼             ▼
┌──────────────────────────────────────────┐
│        D3 Visualizations                 │
│  • Network Graph                         │
│  • Heat Map                              │
└──────────────────────────────────────────┘
      │             │
      ▼             ▼
┌─────────┐  ┌────────────┐
│Anomaly  │  │  Recent    │
│Detection│  │  Traces    │
└─────────┘  └────────────┘
```

### Data Flow

1. **Mock Data Generation**: The `lib/mock-data.ts` file generates realistic performance metrics
2. **GraphQL API**: The `/api/graphql` endpoint serves data with role-based access control
3. **Client Components**: Components fetch and update data in real-time (5-second intervals)
4. **Visualization**: Data is rendered using Recharts and D3.js libraries

### Authentication & Authorization

The system implements role-based access control (RBAC) with three user roles:

- **Viewer**: Read-only access to metrics and dashboards
- **Engineer**: Read access plus diagnostic capabilities
- **Admin**: Full access including configuration management

Permissions are checked at the API level in `lib/auth.ts`.

## 📡 API Documentation

### GraphQL Endpoint

**Endpoint**: `/api/graphql`

**Method**: POST

### Supported Queries

#### 1. Get All Services

```graphql
query {
  allServices {
    serviceName
    status
    latencyP95
    latencyP99
    throughput
    errorRate
    uptime
  }
}
```

#### 2. Get Service Health

```graphql
query GetServiceHealth($serviceName: String!) {
  serviceHealth(serviceName: $serviceName) {
    serviceName
    status
    latencyP95
    latencyP99
    throughput
    errorRate
    uptime
  }
}
```

#### 3. Get Time Series Data

```graphql
query GetTimeSeries($serviceName: String!, $metric: String!) {
  serviceTimeSeries(serviceName: $serviceName, metric: $metric) {
    serviceName
    metric
    data {
      timestamp
      value
    }
  }
}
```

Available metrics: `latency`, `throughput`, `errorRate`

#### 4. Get Traces

```graphql
query {
  traces {
    traceId
    serviceName
    operation
    duration
    timestamp
    status
  }
}
```

#### 5. Get Anomalies

```graphql
query {
  anomalies {
    id
    serviceName
    type
    severity
    timestamp
    description
  }
}
```

### Response Format

```json
{
  "data": {
    "allServices": [...]
  }
}
```

### Error Handling

Errors return appropriate HTTP status codes:
- `401`: Unauthorized (missing or invalid permissions)
- `500`: Internal server error

## 🧩 Component Overview

### Core Components

#### ServiceOverview
Displays real-time health status for all monitored services with key metrics:
- Service status (Healthy/Degraded/Down)
- Latency measurements
- Request counts
- Uptime percentage
- Error rates

#### PerformanceCharts
Renders multiple performance metric charts:
- **LatencyChart**: P95 and P99 latency over time
- **ThroughputChart**: Requests per second
- **ErrorRateChart**: Error percentage trends

#### D3NetworkGraph
Interactive network topology visualization showing:
- Service dependencies and relationships
- Real-time data flow
- Service health indicators
- Clickable nodes for detailed information

#### D3Heatmap
Heat map visualization displaying:
- Performance patterns over time
- Service comparison across multiple dimensions
- Color-coded intensity for quick identification

#### AnomalyDetection
Displays detected anomalies with:
- Anomaly type classification
- Severity levels (Low/Medium/High)
- Timestamp and affected service
- Detailed descriptions

#### RecentTraces
Shows distributed tracing information:
- Trace IDs and operations
- Duration and status
- Span counts
- Timestamp information

### UI Components

The `components/ui/` directory contains reusable UI primitives built on Radix UI:
- `badge`: Status indicators
- `button`: Interactive buttons
- `card`: Content containers
- `tabs`: Tab navigation
- `tooltip`: Hover information
- And many more...

## ⚙️ Configuration

### Next.js Configuration

The `next.config.mjs` file contains:
- TypeScript build error handling
- Image optimization settings

### TypeScript Configuration

`tsconfig.json` includes:
- Strict type checking
- Path aliases (`@/*` points to root directory)
- ESNext module support

### Tailwind CSS

Custom theme configuration with:
- Dark mode support (default)
- Custom color schemes
- Animation utilities
- Component-specific styling

## 🎨 Customization

### Adding New Services

To add a new service to monitor:

1. Update `SERVICES` array in `lib/mock-data.ts`
2. The dashboard will automatically include it in visualizations

### Customizing Metrics

To add new metrics:

1. Define new types in `lib/types.ts`
2. Add generators in `lib/mock-data.ts`
3. Create corresponding chart components
4. Add GraphQL resolvers in `app/api/graphql/route.ts`

### Theming

The dashboard uses CSS variables for theming. Customize colors in `app/globals.css`:

```css
:root {
  --primary: ...;
  --secondary: ...;
  /* Add your custom colors */
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   pnpm lint
   pnpm build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style

- Follow the existing code style
- Use TypeScript for all new files
- Add proper type definitions
- Write descriptive commit messages
- Comment complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Network visualizations with [D3.js](https://d3js.org/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Support

For questions or issues, please:
- Open an issue on GitHub
- Check existing documentation
- Review the codebase examples

## 🗺️ Roadmap

Future enhancements planned:
- [ ] Real backend integration (replace mock data)
- [ ] Historical data storage and analysis
- [ ] Alert notifications and webhooks
- [ ] Custom dashboard layouts
- [ ] Advanced filtering and search
- [ ] Multi-tenant support
- [ ] Mobile responsive improvements
- [ ] Export capabilities (PDF, CSV)
- [ ] Custom metric definitions
- [ ] Integration with popular monitoring tools (Prometheus, Grafana, etc.)

---

**Made with ❤️ for network performance monitoring**
