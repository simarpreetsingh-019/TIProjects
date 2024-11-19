<p align="center"><img align="center" width="180" src="./frontend/src/assets/logo/DARK-logo.webp#gh-dark-mode-only"/></p>
<p align="center"><img align="center" width="180" src="./frontend/src/assets/logo/LIGHT-logo.webp#gh-light-mode-only"/></p>
<h3 align="center">A Comprehensive Blockchain Forensic Tool - HackwithMAIT 5.0 Project</h3>
<hr>

A powerful blockchain forensic tool that combines Neo4j's graph visualization capabilities with machine learning-based anomaly detection to track and analyze suspicious transactions on the Tezos blockchain. Built for enhanced transparency and security in the crypto ecosystem.

<details>
<summary><h2>Table of Contents</h2></summary>

- [View Demo](#view-demo)
  - [Working Prototype Demo](#working-prototype-demo)
  - [Idea Presentation](#idea-presentation)
- [🛠️ Technology Used](#️-technology-used)
  - [Backend Technologies](#backend-technologies)
  - [Frontend Technologies](#frontend-technologies)
  - [Machine Learning Stack](#machine-learning-stack)
- [🚀 Key Features](#-key-features)
- [🎮 Usage](#-usage)
- [📦 Installation](#-installation)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Access Points](#access-points)
- [👥 ASPIRE - Team Details](#-aspire---team-details)
- [📄 License](#-license)

</details>

## View Demo

### Working Prototype Demo

[prototype-demo.webm](https://github.com/user-attachments/assets/99b34122-e750-4751-a971-acec1869d99b)

### Idea Presentation

[idea-presentation.webm](https://github.com/user-attachments/assets/88b7d6da-657e-4e50-8916-bc3541fbae53)

## 🛠️ Technology Used

### Backend Technologies

| Technology | Name | Purpose |
|:---:|:---|:---|
| <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/> | MongoDB | Storage and management of transaction metadata |
| <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/> | Express.js | RESTful API development framework |
| <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/> | Node.js | Server-side runtime environment |
| <img src="https://img.shields.io/badge/Neo4j-008CC1?style=for-the-badge&logo=neo4j&logoColor=white" alt="Neo4j"/> | Neo4j | Graph database for relationship mapping and analysis |
| <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/> | Python | Backend logic for machine learning and data processing |

### Frontend Technologies

| Technology | Name | Purpose |
|:---:|:---|:---|
| <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/> | React.js | User interface development |
| <img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white" alt="D3.js"/> | D3.js | Interactive graph visualizations |
| <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material-UI"/> | Material-UI | Component library for modern UI design |

### Machine Learning Stack

| Technology | Name | Purpose |
|:---:|:---|:---|
| <img height=60 src="https://github.com/user-attachments/assets/8ab6ce5f-79d2-4507-aad8-5f1d45aea360" alt="Scikit-learn"/> | Scikit-learn | Pattern analysis and machine learning operations |

## 🚀 Key Features

- **Advanced Graph Visualization**
  - Interactive wallet relationship mapping
  - Real-time transaction flow tracking
  - Cluster analysis for identifying related wallets
  - Custom graph querying capabilities

- **Machine Learning-Powered Detection**
  - Real-time anomaly detection using Isolation Forest
  - Pattern recognition for mixing services
  - Behavioral analysis of wallet activities
  - Automated risk scoring system

- **Comprehensive Forensics Suite**
  - Detailed transaction path analysis
  - Historical pattern recognition
  - Export capabilities for investigation reports
  - Custom alert configuration

## 🎮 Usage

Once the application is up and running, you can:

1. **Visualize Wallet Networks**
   - Import wallet addresses
   - View transaction relationships
   - Analyze connection patterns

2. **Monitor Transactions**
   - Track real-time blockchain activity
   - Receive alerts for suspicious patterns
   - Generate investigation reports

3. **Analyze Patterns**
   - Identify mixing services
   - Detect unusual transaction flows
   - Track fund movements

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Neo4j Database
- Git

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/deep0304/cryptoTracker
   cd cryptoTracker
   ```

2. **Environment Configuration**

   Before running the project, you need to configure environment variables for JWT, MongoDB, and API keys. Follow these steps:

   - Rename the `.env.example` file to `.env`.
   - Update the necessary fields with your own values:

3. **Backend Setup**

   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Start the backend server
   npm run start
   ```

4. **Frontend Setup**

   ```bash
   # Open a new terminal and navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Start the development server
   npm run dev
   ```

5. **ML Model Setup**

   ```bash
   # Install required Python packages
   pip install -r requirements.txt

   # Run the model script
   python3 app.py
   ```

### Access Points

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- python-model: `http://localhost:5000`

<details>
<summary><h2>Project Structure</h2></summary>

```bash
cryptoTracker/
├── backend/                      # Express server and API routes
│   ├── src/
│   │   ├── middlewares/          # Middleware functions
│   │   │   └── user.js
│   │   ├── models/               # Database models
│   │   │   ├── searchHistory.model.js
│   │   │   ├── transaction.model.js
│   │   │   ├── user.js
│   │   │   └── wallet.model.js
│   │   ├── neo4j/                # Neo4j database configuration
│   │   │   └── neo4j.js
│   │   ├── router/               # API routes
│   │   │   ├── adminRouter.js
│   │   │   ├── bitcoin.js
│   │   │   ├── ethereum.js
│   │   │   ├── tezosRouter.js
│   │   │   └── userRouter.js
│   │   ├── utils/                # Utility functions
│   │   └── db.js                 # Database configuration
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment variables example
│   ├── .gitignore
│   ├── index.js                  # Server entry point
│   └── package-lock.json
│
├── frontend/                     # React application
│   ├── public/
│   │   ├── assets/
│   │   │   └── logo/
│   │   └── react.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/               # UI Components
│   │   │   │   ├── AnomalyDashboard.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── SearchHistory.jsx
│   │   │   │   ├── SearchPane.jsx
│   │   │   │   ├── SignIn.jsx
│   │   │   │   ├── StatCards.jsx
│   │   │   │   ├── SuspiciousTransaction.jsx
│   │   │   │   ├── TransactionGraph.jsx
│   │   │   │   ├── TransactionTable.jsx
│   │   │   │   └── UserProfile.jsx
│   │   │   └── utils.js
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .eslintrc.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── python_model/                    # Machine Learning Models
│   ├── model/
│   │   └── anomaly_model.py
│   ├── data_preprocessing.py
│   ├── .env.example
│   ├── .gitignore
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

</details>

## 👥 ASPIRE - Team Details

<table>
  <tr>
    <th>GitHub</th>
    <th>Name</th>
    <th>Role & Expertise</th>
  </tr>
  <tr>
    <td colspan="3" align="center"><strong>Team Leader</strong></td>
  </tr>
  <tr>
    <td><a href="https://github.com/deep0304"><img src="https://avatars.githubusercontent.com/u/151189705?v=4&s=100" width="50"/></a></td>
    <td>Om Lakshya Deep</td>
    <td>• Backend API Routes<br>• Machine Learning Model Development</td>
  </tr>
  <tr>
    <td colspan="3" align="center"><strong>Team Members</strong></td>
  </tr>
  <tr>
    <td><a href="https://github.com/amit712singhal"><img src="https://avatars.githubusercontent.com/u/123376849?v=4&s=100" width="50"/></a></td>
    <td>Amit Singhal</td>
    <td>• MongoDB Integration<br>• Backend-Frontend Integration<br>• GitHub Repo Management</td>
  </tr>
  <tr>
    <td><a href="https://github.com/uttkarsh123-shiv"><img src="https://avatars.githubusercontent.com/u/151392924?v=4&s=100" width="50"/></a></td>
    <td>Uttkarsh Singh</td>
    <td>• Frontend Development<br>• UI Implementation</td>
  </tr>
  <tr>
    <td><a href="https://github.com/kunalsharma3012"><img src="https://avatars.githubusercontent.com/u/140625490?v=4&s=100" width="50"/></a></td>
    <td>Kunal</td>
    <td>• User Authentication</td>
  </tr>
</table>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<p align="center">Made with ❤️ for a more transparent blockchain ecosystem</p>
