# Dart Cricket Handicap Calculator

This application helps dart players calculate fair handicaps for cricket matches based on player statistics and performance metrics. It provides three calculation methods of varying complexity to accommodate different skill levels and preferences.

## Features

- Player roster management (add, edit, delete players)
- Three handicap calculation methods:
  - MPR-Based (beginner)
  - Multi-Factor (intermediate)
  - Advanced Dynamic (expert)
- Detailed results display with explanations
- Comprehensive usage guide and formula explanations

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/ChrisTansey007/dart-handicap-calculator.git
```

2. Install dependencies:
```bash
cd dart-handicap-calculator
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open the application in your browser at `http://localhost:3000`

## How to Use

### 1. Manage Your Roster
- Go to the "Roster" tab
- Click "Add Player" to create new player profiles
- Enter player statistics:
  - Marks Per Round (MPR)
  - Closing speed for each number (turns to close)
  - Accuracy percentages
  - Points per turn
  - Consistency percentage
  - Win rate percentage
- Edit or delete existing players as needed

### 2. Set Up a Matchup
- Navigate to the "Matchup" tab
- Select two players from your roster
- Choose a calculation method:
  - **MPR-Based**: Simple calculation using only MPR
  - **Multi-Factor**: Uses MPR, closing speed, accuracy, and points per turn
  - **Advanced Dynamic**: Includes consistency and win rate for adaptive results
- Click "Calculate Handicap"

### 3. View Results
- The application will automatically switch to the "Results" tab
- See the recommended handicap for the matchup:
  - Points advantage
  - Marks head start on specific numbers
- Review the calculation details and explanation

### 4. Learn More
- Visit the "Guide" tab for:
  - Step-by-step usage instructions
  - Detailed formula explanations
  - Understanding how handicaps are calculated

## Formulas Explained

### MPR-Based
```
Handicap = |MPR₁ - MPR₂| × 3.5
```
Simple method using only Marks Per Round difference.

### Multi-Factor
```
Skill = (MPR × 0.4) + 
        (Math.max(0, 8 - Avg Closing Speed) × 0.3) + 
        (Avg Accuracy × 0.2) + 
        (Points Per Turn × 0.1)
        
Handicap based on |Skill₁ - Skill₂|
```
Uses multiple metrics for more precise handicapping.

### Advanced Dynamic
```
Base = Multi-Factor Result
Adjustment = (Consistency Difference × 0.1) + (Win Rate Difference × 0.05)
Final Handicap = Base + Adjustment
```
Includes consistency and win rate for adaptive results.
