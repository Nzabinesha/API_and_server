Drug Interaction Info App
A web application that provides users with real-time information on drug interactions and safety alerts using external APIs.

✅ Deployed across a multi-container lab infrastructure (Web01, Web02, and Load Balancer Lb01) using Docker and HAProxy.
🔗 Live via http://localhost:8080 (or your host port).

📹 Demo Video
🎥 Watch the 2-minute demo video

🚀 Features
💊 Search drug information and safety alerts using the OpenFDA API.

🔁 Load-balanced deployment using HAProxy to serve traffic via two web servers.

🔎 Users can search, filter, and view details about specific drugs.

🛡️ Includes error handling for API failures and no-result queries.

🌐 Deployed using Docker and Docker Hub on a multi-container lab setup.

🔧 Technologies Used
Frontend: HTML, CSS, JavaScript

Backend/API: OpenFDA (REST API)

Containerization: Docker

Load Balancing: HAProxy

Deployment: Custom local lab infrastructure (web-01, web-02, lb-01)

🐳 Docker Image Details
Docker Hub Repo: docker.io/nzabineshamerci/drug-info-ap

Image Tags:

v1: Initial stable version

latest: Same as v1

🧪 Build & Run Locally
1. Clone and Build
bash
Copy
Edit
git clone https://github.com/your-username/drug-info-app.git
cd drug-info-app
docker build -t nzabineshamerci/drug-info-app:v1 .
2. Run Locally
bash
Copy
Edit
docker run -p 8080:8080 nzabineshamerci/drug-info-app:v1
3. Test
bash
Copy
Edit
curl http://localhost:8080
☁️ Deployment Steps (Web01, Web02, Lb01)
✅ On Web01 and Web02
bash
Copy
Edit
docker pull nzabineshamerci/drug-info-app:v1

docker run -d --name app --restart unless-stopped \
  -p 8080:8080 \
  nzabineshamerci/drug-info-app:v1
Verify:

http://web-01:8080 returns the app

http://web-02:8080 returns the app

⚙️ Load Balancer Setup (lb-01)
Edit haproxy.cfg:

haproxy
Copy
Edit
frontend http_front
    bind *:80
    default_backend webapps

backend webapps
    balance roundrobin
    server web01 172.20.0.11:8080 check
    server web02 172.20.0.12:8080 check
Reload HAProxy:

bash
Copy
Edit
docker exec -it lb-01 sh -c 'haproxy -sf $(pidof haproxy) -f /etc/haproxy/haproxy.cfg'
✅ Test End-to-End
bash
Copy
Edit
curl http://localhost:8080
Refresh multiple times to see alternating messages like:

Served by app-web-01

Served by app-web-02

🧪 Testing Round-Robin
Output alternates between containers.

Also tested with browser refreshes and confirmed switching responses.

Verified container logs on both web servers receiving requests.

🔒 Handling API Keys (Optional Hardening)
Although OpenFDA does not require an API key, in real-world apps:

Use Docker secrets or .env files passed via:

bash
Copy
Edit
docker run -e API_KEY=$API_KEY ...
Do not hardcode sensitive info into the Docker image or HTML.

📑 External API Credit
API Name: OpenFDA Drug Labeling API

Use: Fetches official drug label data and warnings.

Attribution: U.S. Food & Drug Administration (FDA)

💡 Future Enhancements
(Optional section — good for bonus points)

Add user authentication (e.g., via Firebase Auth)

Add database for favorites / history

Implement advanced filtering (by date, manufacturer, etc.)

Use Redis to cache popular queries

Setup CI/CD pipeline with GitHub Actions

📂 File Structure
pgsql
Copy
Edit
drug-info-app/
├── Dockerfile
├── index.html
├── main.js
├── style.css
├── haproxy.cfg
└── README.md
📬 Contact
For questions or support, feel free to reach me at: nzabineshamerci@example.com
