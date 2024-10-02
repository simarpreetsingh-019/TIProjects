# TruthLens

**TruthLens** is a decentralized platform for media authenticity certification using blockchain. Users can analyze media files and mint NFTs as certificates on the blockchain.

## Block Explorer:

1. **Smart Contract Address**: [0xE20ea5f5a93C42E9d357aE0b6A70E0cCA0e6f88E](https://testnet.explorer.etherlink.com/address/0xE20ea5f5a93C42E9d357aE0b6A70E0cCA0e6f88E)

2. **Smart Contract Address**: [0x48280dCF02F926FEB34917eA070F1Fb509ae7491](https://testnet.explorer.etherlink.com/address/0x48280dCF02F926FEB34917eA070F1Fb509ae7491)

## Few Transactions:

1. [Transaction 1](https://testnet.explorer.etherlink.com/tx/0xbf4999bcbc96019a38bc1ff01550320f3261025477831cdda035650e0454223a)

2. [Transaction 2](https://testnet.explorer.etherlink.com/tx/0xb2f97e9b7926a52185fda4f1109342a21e37e062eb25e3f304982ac5abf9054f)

3. [Transaction 3](https://testnet.explorer.etherlink.com/tx/0xb249886cf362887598555de297b787c6ea80eba08990f31c919ecbca48d003b2)

4. [Transaction 4](https://testnet.explorer.etherlink.com/tx/0xb0ea7ee460d26a5712227e8229d5bcd6e9d61329a7fbe743d93e78fb9e6ab201)

## Architecture Diagram

![Architecture Diagram](./images/arch_t.png)

## Tech Stack

### Frontend
- **Framework:** ReactJS

### Backend
- **Language:** Python

### Machine Learning
- **Models:**
  - VGG16
  - ResNet

### Blockchain
- **Network:** Etherlink
- **Contract Compilation & Deployment:** Brownie

## Screenshots

### Home Page
![Home Page](/images/home_t.png)

### File Extraction
![File Extraction](./images/extract_t.png)

### Data Analysis
![Data Analysis](./images/analysis_t.png)

### Certification
![Certification](./images/cert_t.png)

### List of Certifications
![List of Certifications](./images/certs_t.png)

## Video Demo:

https://youtu.be/FxrX2hmo0dc?feature=shared

## Team Details:

### Team Name: Team U_One
- **Team Members:**
  - Roshan George
  - Mohammed Faheem
  - Karthickeien E

### Hackathon Name: Crypto Sheild Hackathon
### Conducted by: Amrita Cyber Nation
### Submission: https://devfolio.co/projects/truthlens-b285


## Live Demo:

**Note**: The Backend has been deployed on Docker Hub, so feel free to take a pull!

**Frontend:** https://truth-lens-seven.vercel.app/

**Backend**: Unable to deploy due resource unavailability for AI task.

**Test deepfake video**: https://www.youtube.com/shorts/vsZZ_LiHGfo

## Local Setup:

1. Clone the repo:<br>
   `git clone https://github.com/roshangeorge97/TruthLens`<br>

2. `cd frontend`<br>
   `npm i`<br>
   `npm run dev`<br>

3. `cd backend`<br>
   `pip install -r requirements.txt`<br>

4. Go to backend/blockchain/brown <br>
   - Rename .env.sample to .env <br>
   - Add your private key variable in .env<br>

5. In certificate.py
   - ![image](https://github.com/user-attachments/assets/f6955cef-130d-4516-939e-f148cd8200de)
   - Change it to <i>your local path<i>


7. Run the python code <br>
   `python main.py`<br>


