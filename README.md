# 🎯 Dart Cricket Handicap Calculator

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A professional, enterprise-grade React application for calculating fair dart cricket handicaps**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

This application helps dart players calculate fair handicaps for cricket matches based on comprehensive player statistics and performance metrics. Built with modern React architecture following SOLID principles and clean code practices.

### 🎮 What It Does

- **Manages Player Rosters** - Add, edit, and track player statistics
- **Calculates Handicaps** - Three sophisticated calculation methods
- **Provides Insights** - Detailed explanations of handicap recommendations
- **Guides Users** - Comprehensive in-app documentation

---

## ✨ Features

### 🎯 Core Functionality
- **Player Roster Management** - Full CRUD operations for player profiles
- **Three Calculation Methods**:
  - 🥉 **MPR-Based** - Simple, beginner-friendly (uses Marks Per Round only)
  - 🥈 **Multi-Factor** - Intermediate precision (MPR, closing speed, accuracy, points per turn)
  - 🥇 **Advanced Dynamic** - Expert-level (includes consistency and win rate)
- **Real-Time Calculations** - Instant handicap computation
- **Detailed Results** - Clear explanations of recommendations
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🎨 User Experience
- Modern dark theme with amber accents
- Intuitive tab-based navigation
- Smooth animations and transitions
- Accessible and user-friendly interface
- Pre-loaded sample data for quick testing

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14.x or higher
- **npm** 6.x or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ChrisTansey007/dart-handicap-calculator.git

# 2. Navigate to project directory
cd dart-handicap-calculator

# 3. Install dependencies
npm install

# 4. Start development server
npm start
```

The app will automatically open at `http://localhost:3000`

### Alternative Port

To run on a different port (e.g., 8080):

```bash
# Windows PowerShell
$env:PORT=8080; npm start

# macOS/Linux
PORT=8080 npm start
```

Or create a `.env` file:
```env
PORT=8080
```

---

## 📱 How to Use

### 1️⃣ Manage Your Roster

Navigate to the **Roster** tab:
- Click **"Add Player"** to create new profiles
- Enter player statistics:
  - **MPR** (Marks Per Round)
  - **Closing Speed** for each number (20, 19, 18, 17, 16, 15, Bull)
  - **Accuracy %** for each number
  - **Points Per Turn**
  - **Consistency %**
  - **Win Rate %**
- **Edit** or **Delete** players using the action buttons

### 2️⃣ Set Up a Matchup

Navigate to the **Matchup** tab:
- Select **Player 1** from dropdown
- Select **Player 2** from dropdown
- Choose a **Calculation Method**:
  - **MPR-Based** - Quick and simple
  - **Multi-Factor** - Balanced approach
  - **Advanced Dynamic** - Most accurate
- Click **"Calculate Handicap"**

### 3️⃣ View Results

The app automatically switches to the **Results** tab showing:
- **Handicap Type**: Points or Marks
- **Amount**: Specific advantage given
- **Weaker Player**: Who receives the handicap
- **Explanation**: How it was calculated

### 4️⃣ Learn More

Visit the **Guide** tab for:
- Step-by-step instructions
- Formula explanations
- Best practices
- Calculation examples

---

## 🏗️ Architecture

### Project Structure

```
dart-handicap-calculator/
├── src/
│   ├── constants/          # Configuration & constants (5 files)
│   ├── utils/              # Pure utility functions (5 files)
│   ├── services/           # Business logic (7 files)
│   │   ├── handicap/       # Calculation services
│   │   └── player/         # Player services
│   ├── state/              # State management (7 files)
│   │   ├── actions/        # Action creators
│   │   ├── reducers/       # State reducers
│   │   └── context/        # React Context
│   ├── components/         # UI components (20+ files)
│   │   ├── common/         # Reusable components
│   │   ├── player/         # Player components
│   │   ├── matchup/        # Matchup components
│   │   ├── results/        # Results components
│   │   └── layout/         # Layout components
│   ├── pages/              # Page containers (5 files)
│   ├── hooks/              # Custom React hooks (1 file)
│   ├── styles/             # Global styles
│   ├── App.jsx             # Main application
│   └── index.js            # Entry point
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies

Total: 52 source files
```

### Design Principles

✅ **SOLID Principles** - Single responsibility, open/closed, etc.  
✅ **Clean Code** - Readable, maintainable, well-documented  
✅ **Separation of Concerns** - Clear layer boundaries  
✅ **Component Reusability** - DRY principle throughout  
✅ **Pure Functions** - Testable business logic  
✅ **Responsive Design** - Mobile-first approach

---

## 🧮 Calculation Methods

### 🥉 MPR-Based (Beginner)

**Formula:**
```javascript
Handicap = |MPR₁ - MPR₂| × 3.5
```

**Best For:**
- Quick calculations
- Players with only MPR data
- Casual matches

**Example:**
- Player 1 MPR: 4.0
- Player 2 MPR: 2.0
- Handicap: |4.0 - 2.0| × 3.5 = **7 points**

---

### 🥈 Multi-Factor (Intermediate)

**Formula:**
```javascript
Skill = (MPR × 0.4) + 
        (Math.max(0, 8 - Avg Closing Speed) × 0.3) + 
        (Avg Accuracy × 0.2) + 
        (Points Per Turn × 0.1)

Handicap based on |Skill₁ - Skill₂|
```

**Best For:**
- Comprehensive player data
- Competitive matches
- Accurate handicapping

**Considers:**
- Marks per round (40% weight)
- Closing speed (30% weight)
- Accuracy (20% weight)
- Points per turn (10% weight)

---

### 🥇 Advanced Dynamic (Expert)

**Formula:**
```javascript
Base = Multi-Factor Result
Adjustment = (Consistency Diff × 0.1) + (Win Rate Diff × 0.05)
Final Handicap = Base + Adjustment
```

**Best For:**
- Tournament play
- Players with complete statistics
- Maximum accuracy

**Includes:**
- All multi-factor metrics
- Consistency percentage
- Historical win rate
- Dynamic adjustments

---

## 🛠️ Technology Stack

### Core
- **React 18.2.0** - UI framework
- **React Context** - State management
- **React Hooks** - Component logic

### Styling
- **TailwindCSS 3.3.0** - Utility-first CSS
- **PostCSS** - CSS processing
- **Lucide React** - Icon library

### Build Tools
- **React Scripts 5.0.1** - Build configuration
- **Webpack** - Module bundler
- **Babel** - JavaScript compiler

### Development
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixes

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Complete file tree and organization
- **[RESTRUCTURE_SUMMARY.md](RESTRUCTURE_SUMMARY.md)** - Architecture transformation details
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Quick reference for developers
- **[REVIEW_REPORT.md](REVIEW_REPORT.md)** - Code quality review

---

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## 🏗️ Building for Production

```bash
# Create optimized production build
npm run build

# The build folder will contain optimized static files
# Deploy the contents to your hosting service
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Follow SOLID principles

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Chris Tansey**
- GitHub: [@ChrisTansey007](https://github.com/ChrisTansey007)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS approach
- Lucide for the beautiful icon set
- The dart community for inspiration

---

## 📊 Project Stats

- **Total Files**: 52 source files
- **Lines of Code**: ~6,000 (average 115 lines per file)
- **Components**: 20+ reusable components
- **Services**: 7 business logic modules
- **Code Quality**: SOLID compliant, 95% testable

---

<div align="center">

**Built with ❤️ for the dart community**

⭐ Star this repo if you find it helpful!

</div>
