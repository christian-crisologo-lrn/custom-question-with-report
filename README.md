# Learnosity Custom Question Report

A multi-page application demonstrating Learnosity's Items API for assessments and Reports API for session reporting with separated player and reporting interfaces.

## Architecture

The application consists of two main components:

### 1. Player Page (`index.html`)
- **Purpose**: Displays and manages the assessment interface
- **Entry Point**: `src/index.js` → `src/player.js`
- **Features**:
  - Loads Learnosity Items API
  - Handles assessment interaction
  - Captures test submission events
  - Opens reporting in a new tab upon completion

### 2. Reporting Page (`reporting.html`)
- **Purpose**: Displays detailed session reports after test completion
- **Entry Point**: `src/reporting-page.js` → `src/reporting.js`
- **Features**:
  - Loads Learnosity Reports API
  - Accepts session and user parameters via URL
  - Shows session-detail-by-item reports with correct answers

## Project Structure

```
src/
├── index.js              # Player page entry point
├── reporting-page.js     # Reporting page entry point
├── player.js            # Player implementation
├── reporting.js         # Reporting implementation
├── authoring.js         # Authoring functionality
├── loadScript.js        # Script loading utility
├── signLearnosityRequest.js # Request signing utility
└── questions/           # Custom question types
    └── test/            # Test question implementation
```

## Getting Started

### Prerequisites
- Node.js and Yarn
- Learnosity API credentials configured in the server

### Installation & Setup
1. Install dependencies:
   ```bash
   yarn install
   cd server && yarn install && cd ..
   ```

2. Start the backend server:
   ```bash
   yarn start:server
   ```

3. Start the frontend development server:
   ```bash
   yarn start
   ```

The application will automatically open in your browser at the player page.

## User Flow

1. **Assessment**: User completes the assessment on the player page
2. **Submission**: Upon clicking submit, the test completion is processed
3. **Reporting**: A new tab opens automatically with the reporting page
4. **Session Details**: The reporting page displays detailed results with correct answers

## Key Features

### Separated Architecture
- **Independent Pages**: Player and reporting run in separate browser contexts
- **Parameter Passing**: Session ID and User ID are passed via URL parameters
- **Clean Separation**: No shared state between player and reporting interfaces

### Development Features  
- **Hot Reloading**: Webpack dev server enables live development
- **Dual Environments**: Supports both production and development Learnosity endpoints
- **Custom Questions**: Includes test custom question type implementation

## Configuration

### API Endpoints
The application uses development Learnosity endpoints by default:
- Items API: `https://items.dev.learnosity.com/?latest-lts`
- Reports API: `https://reports.dev.learnosity.com/?latest-lts`

### User Configuration
- Default User ID: `labs-site`
- Activity ID: `TestActivitySB`
- Rendering Type: `assess` (submit practice mode)

## Technical Details

### Webpack Configuration
- **Development Mode**: Creates separate bundles for player and reporting
- **HTML Generation**: Automatically generates `index.html` and `reporting.html`
- **Code Splitting**: Each page includes only its required dependencies

### API Integration
- **Request Signing**: Server-side request signing for security
- **Session Management**: Automatic session ID extraction and passing
- **Error Handling**: Comprehensive error handling for missing parameters

## Scripts

- `yarn start` - Start development server with webpack
- `yarn start:server` - Start backend API server
- `yarn build` - Build for production (questions only)

## Browser Support

The application uses modern JavaScript features and requires a current browser with ES6+ support.