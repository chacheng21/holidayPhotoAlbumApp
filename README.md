<!-- ABOUT THE PROJECT -->
## Photo Album Web App

### Built With

* MongoDB
* ExpressJS
* ReactJS
* NodeJS
* Material UI
* AWS S3
* Google Maps API

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Setup

1. Set up AWS S3, enable public access and get AWS access keys
2. Set up Google Maps API, enable Google Places and Google Maps and get API Key
3. Create MongoDB cluster
4. Clone the repo
   ```sh
   git clone https://github.com/chacheng21/holidayPhotoAlbumApp.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API keys in `config.js`
   ```js
    const securityCredentials = {
      accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
      secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
      mapsAPIKey: 'YOUR_MAPS_API_KEY',
    }   
    ```
5. Enter MongoDB Cluster Link in line 14 of `backend/server.js`
6. Startup backend server and frontend
   ```sh
   npm run dev
   ```

<!-- USAGE EXAMPLES -->
## Screenshots
<img width="1379" alt="Screenshot 2022-05-17 at 12 16 24 AM" src="https://user-images.githubusercontent.com/70919900/168697585-7681616e-e800-4ac6-b65e-18211e639a79.png">
<img width="1405" alt="Screenshot 2022-05-17 at 12 08 55 AM" src="https://user-images.githubusercontent.com/70919900/168697619-2a211bc9-0d20-45a2-9127-d6de60b6af58.png">
<img width="1545" alt="Screenshot 2022-05-17 at 12 11 26 AM" src="https://user-images.githubusercontent.com/70919900/168697643-95131cb7-ddad-43ce-b7f6-e2ff99177b37.png">
<img width="1549" alt="Screenshot 2022-05-17 at 12 14 20 AM" src="https://user-images.githubusercontent.com/70919900/168697705-1a4abc4d-c436-47ca-8394-02d1074c4760.png">
<img width="1559" alt="Screenshot 2022-05-17 at 12 14 53 AM" src="https://user-images.githubusercontent.com/70919900/168697742-1e51ee4e-631d-42b6-8662-d7cdc75e9a05.png">
<img width="1619" alt="Screenshot 2022-05-17 at 12 14 34 AM" src="https://user-images.githubusercontent.com/70919900/168697726-712f3e39-4a7d-42e6-beaf-5d335b870cb1.png">
<img width="1537" alt="Screenshot 2022-05-17 at 12 15 11 AM" src="https://user-images.githubusercontent.com/70919900/168697758-ff8ac49a-a597-42e7-ab9b-960f8b5c1919.png">

## Video Demo Link
[Video Link](https://youtu.be/6Yzo_-CHhL4)
