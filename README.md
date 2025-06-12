# 🏠 AirBnB Clone - Role-Based Booking Platform  

*A full-stack Next.js application mimicking AirBnB's core functionality with 3-tier role access (Guest/Host/Admin).*  


## ▶ **Video Demo**  
🎥 **[Watch Walkthrough](https://youtu.be/XWJ-2g1s3Sk?feature=shared)** *(Show booking flow, host dashboard, and admin controls)*  

---

## ✨ **Key Features**  
- **Role-Based Access (RBA)**:  
  - **Guests**: Browse and book hotels.  
  - **Hosts**: List properties + book other hotels.  
  - **Admins**: Book hotels + delete suspicious listings.  
- **Moderation**:  
  - Hosts can delete their own listings.  
  - Admins can remove any property.  
- **Dynamic UI**:  
  - Booked hotels are hidden from the main page.  
- **Auth**: Google/GitHub login via NextAuth.js.  

---

## 🛠️ **Tech Stack**  
- **Frontend**: Next.js, TailwindCSS  
- **Backend**: Next.js API Routes  
- **Database**: MongoDB (Prisma Orm)  
- **Auth**: NextAuth.js (JWT + OAuth)  
- **State Management**: Zustand  

---

## 🚀 **Local Setup**  

### **1. Clone & Install**  
```bash
git clone https://github.com/hamxaShaukat/airbnb-clone.git
cd airbnb-clone
npm install
```

### **2. Environment Variables**  
Create a `.env` file in the root and add:  

```env
NEXTAUTH_JWT_SECRET="your_jwt_secret"
NEXTAUTH_SECRET="your_nextauth_secret"
DATABASE_URL="mongodb_connection_uri"
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_secret"
AUTH_GITHUB_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_secret"
```

#### 🔑 **How to Get These Keys**  
- **NextAuth Secrets**:  
  - Generate via terminal:  
    ```bash
    openssl rand -base64 32  # For NEXTAUTH_JWT_SECRET and NEXTAUTH_SECRET
    ```  
- **MongoDB URI**:  
  - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas/database).  
- **Google OAuth**:  
  - Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create OAuth 2.0 credentials, and add `http://localhost:3000/api/auth/callback/google` as a redirect URI.  
- **GitHub OAuth**:  
  - Under [GitHub Developer Settings](https://github.com/settings/developers), create a new OAuth App with callback URL `http://localhost:3000/api/auth/callback/github`.  

### **3. Run the App**  
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.  

---

## 🛑 **Planned Improvements**  
- [ ] **Hosts**: Allow deletion of their own listings.  
- [ ] **Admins**: Streamline suspicious content removal.  
- [ ] **UX**: Hide booked hotels from search results.  

---

## 💡 **Challenges & Solutions**  
- **Challenge**: Role-based route protection.  
  **Solution**: Implemented middleware to validate user roles before API access.  
- **Challenge**: Real-time booking updates.  
  **Solution**: Used MongoDB hooks to refresh UI on booking changes.  

---

## 📜 **License**  
MIT  

## 📩 **Contact**  
Email: **hamzashaukat714@gmail.com**
