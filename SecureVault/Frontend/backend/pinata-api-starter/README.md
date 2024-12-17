# Pinata API Starter
This is a quick repo that allows users to quick start testing the most popular Pinata API calls! 

## Installation and Setup
You will need to have node.js installed. Next clone the repo and install the dependencies.

```git clone https://github.com/PinataCloud/pinata-api-starter && cd pinata-api-starter && npm install```

After that, cd into the directory and create a .env file in the root of the folder:

```touch .env```

Open the .env.example file and add in your [Pinata API JWT](https://knowledge.pinata.cloud/en/articles/6191471-how-to-create-an-pinata-api-key) with the format below:

```PINATA_JWT=REPLACE_THIS_WITH_YOUR_PINATA_JWT```

After you have done that save the file as just `.env`

## Test it! 

From there you can try the first call in the terminal using ```node testAuthentication.js```. After that you can open any of the API calls, make adjustments and use ```node name_of_file.js``` to run the API command!

If you have any questions please send an email to [team@pinata.cloud](mailto:team@pinata.cloud)!
