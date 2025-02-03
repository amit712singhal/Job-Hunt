<p align="center"><img align="center" width="280" src="./frontend/images/logo.png"/></p>
<h3 align="center">Job Hunt: Connecting Recruiters and Job Seekers Efficiently</h3>
<hr>

<div align="center">
<img src="https://custom-icon-badges.demolab.com/github/stars/amit712singhal/Job-Hunt?label=Stars&labelColor=302d41&color=add8e6&logoColor=white&logo=star&style=for-the-badge" />
<img src="https://custom-icon-badges.demolab.com/github/issues/amit712singhal/Job-Hunt?label=Issues&labelColor=302d41&color=90ee90&logoColor=white&logo=issue&style=for-the-badge" />
<img src="https://custom-icon-badges.demolab.com/github/issues-pr/amit712singhal/Job-Hunt?&label=Pull%20requests&labelColor=302d41&color=ffb6c1&logoColor=white&logo=git-pull-request&style=for-the-badge" />
<img src="https://custom-icon-badges.demolab.com/github/forks/amit712singhal/Job-Hunt?&label=forks&labelColor=302d41&color=ffa07a&logoColor=white&logo=fork&style=for-the-badge" />
<img src="https://custom-icon-badges.demolab.com/github/contributors/amit712singhal/Job-Hunt?label=Contributors&labelColor=302d41&color=e6e6fa&logoColor=white&logo=people&style=for-the-badge"/>
<img src="https://custom-icon-badges.demolab.com/github/license/amit712singhal/Job-Hunt?label=LICENSE&labelColor=302d41&color=f0e68c&logoColor=white&logo=people&style=for-the-badge"/>
<img src="https://custom-icon-badges.demolab.com/github/last-commit/amit712singhal/Job-Hunt?label=last%20commit&labelColor=302d41&color=ffefd5&logoColor=white&logo=people&style=for-the-badge"/>
</div>

Job Hunt is a web application designed for hirers and recruiters to connect and manage job postings and applications efficiently.

<details>
     <summary><h2>Table of Contents</h2></summary>

- [Preview](#preview)
  - [Desktop](#desktop)
- [Local Setup](#local-setup)
- [Hosting on Render](#hosting-on-render)
  - [Update Environment in Production](#update-environment-in-production)
  - [Final Deployment](#final-deployment)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Connect with Me](#connect-with-me)
- [License](#license)
</details>

## Local Setup

1. **Clone the Repository**

```bash
git clone https://github.com/amit712singhal/job-hunt.git
cd job-hunt
```

2. **Create .env File in Root**

Create a `.env` file in the root directory with the following content:

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db_name>
SECRET_KEY=randomsecretkey
CLOUD_NAME=<cloud_name>
API_KEY=<api_key>
API_SECRET=<api_secret>
```

For setting up `.env` credentials:
- Set up a MongoDB cluster.
- Go to [Cloudinary](https://cloudinary.com/), log in, and navigate to the dashboard.
- Under API keys, copy the following:
  - `CLOUD_NAME`
  - `API_KEY`
  - `API_SECRET`

3. **Backend Configuration**:

Go to the backend index file and configure CORS settings:

```js
// cd backend/index.js
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
```

4. **Frontend Configuration**:

Update the API endpoints in the frontend constants file:

```js
// cd frontend/src/utils/constant.js
export const USER_API_END_POINT = "http://localhost:8000/api/v1/user";
export const JOB_API_END_POINT = "http://localhost:8000/api/v1/job";
export const APPLICATION_API_END_POINT = "http://localhost:8000/api/v1/application";
export const COMPANY_API_END_POINT = "http://localhost:8000/api/v1/company";
```

5. **Build and Run**:

Run the following commands to build and start the application:

```bash
// cd root
npm run build
npm run start
```

The website will now be accessible at `http://localhost:8000`.

## Hosting on Render

To deploy the project on [Render](https://render.com/), follow these steps:

1. Sign in with your GitHub account.
2. Go to **New -> Web Service**.
3. Select the repository to deploy.
4. After connecting, update the build and start commands:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`
5. Choose a suitable plan.
6. Add your environment variables from the `.env` file in the settings.
7. Deploy the service.

### Update Environment in Production

After deploying, update the URLs in the project to match the provided Render URL.

1. Update the CORS origin:

```js
const corsOptions = {
  origin: 'http://<your-render-url>',
  credentials: true,
};
```

2. Update the API endpoints in the frontend constants file:

```js
export const USER_API_END_POINT = "http://<your-render-url>/api/v1/user";
export const JOB_API_END_POINT = "http://<your-render-url>/api/v1/job";
export const APPLICATION_API_END_POINT = "http://<your-render-url>/api/v1/application";
export const COMPANY_API_END_POINT = "http://<your-render-url>/api/v1/company";
```

### Final Deployment

Go to **Manual Deploy** and deploy the latest commit.

## Features

- Job posting management
- Application tracking
- Cloud-based storage for job postings
- Real-time job application updates

## Technologies Used

<div style="display: flex; flex-wrap: wrap; gap: 5px;">
     <img src="https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
     <img src="https://img.shields.io/badge/Express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
     <img src="https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React">
     <img src="https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node-dot-js&logoColor=white" alt="Node.js">
     <img src="https://img.shields.io/badge/Render-%2300b3ff.svg?style=for-the-badge&logo=render&logoColor=white" alt="Render">
     <img src="https://img.shields.io/badge/Cloudinary-%23F68121.svg?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary">
     <img src="https://img.shields.io/badge/JWT-%2300C58E.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
     <img src="https://img.shields.io/badge/bcrypt-%2300C58E.svg?style=for-the-badge&logo=security&logoColor=white" alt="Bcrypt">
</div>

## Contributing

Contributions to this project are welcome! If you find any bugs or have suggestions for improvements, please create an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## Connect with Me

I love connecting with new people and exploring new opportunities. Feel free to reach out to me through any of the platforms below:

<table>
    <tr>
        <td>
            <a href="https://github.com/amit712singhal">
                <img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg"
                    height="48" width="48" alt="GitHub" />
            </a>
        </td>
        <td>
            <a href="https://www.linkedin.com/in/singhal-amit/">
                <img src="https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/linkedin.svg"
                    height="48" width="48" alt="LinkedIn" />
            </a>
        </td>
        <td>
            <a href="https://www.instagram.com/_singhal_amit/" target="blank"><img align="center"
                    src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg"
                    alt="instagram" height="48" width="48" /></a>
        </td>
        <td>
            <a href="mailto:rakshit.singhal712@gmail.com">
                <img src="https://github.com/gayanvoice/github-active-users-monitor/blob/master/public/images/icons/gmail.svg"
                    height="48" width="48" alt="Email" />
            </a>
        </td>
    </tr>
</table>

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
