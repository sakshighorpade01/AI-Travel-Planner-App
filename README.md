# AI Travel Planner App

A comprehensive React Native travel planning application powered by AI that helps users create personalized travel itineraries with flight details, hotel recommendations, and daily activity plans.

## 🚀 Features

### Core Features
- **AI-Powered Trip Planning**: Generate personalized travel itineraries using Google Gemini AI
- **User Authentication**: Secure sign-in/sign-up with Firebase Authentication
- **Trip Management**: Create, view, and manage multiple trips
- **Real-time Data**: Integration with Google Places API for location data and images
- **Comprehensive Trip Details**: Flight information, hotel recommendations, and daily itineraries

### Pages & Functionality

#### 1. **Authentication**
- Sign In/Sign Up with email and password
- Firebase Authentication integration
- Secure user session management

#### 2. **My Trips** (`/mytrip`)
- View all user's planned trips
- Start new trip creation
- Trip cards with destination images and details
- Navigation to trip details

#### 3. **Discover** (`/discover`)
- Popular destinations showcase
- Travel categories (Beach, Mountain, City, Cultural, etc.)
- Travel tips and advice
- Search functionality for destinations
- Quick navigation to trip creation

#### 4. **Profile** (`/profile`)
- User profile information
- Travel statistics (trips planned, destinations, days traveled)
- Settings menu (Personal Info, Travel Preferences, Notifications, etc.)
- Logout functionality

#### 5. **Trip Creation Flow**
- **Search Place**: Google Places autocomplete
- **Select Dates**: Date range picker
- **Select Traveller**: Solo, Couple, Family, Friends
- **Select Budget**: Cheap, Moderate, Luxury
- **Generate Trip**: AI-powered itinerary generation
- **Review Trip**: Final review before saving

#### 6. **Trip Details** (`/trip-details`)
- Destination images and information
- Flight details with booking links
- Hotel recommendations with images and prices
- Daily itinerary with activities and timing
- Travel time between locations

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **AI Integration**: Google Gemini AI
- **Maps & Places**: Google Places API
- **UI Components**: Custom components with Ionicons
- **Styling**: React Native StyleSheet

## 📱 App Structure

```
ai-travel-planner-app/
├── app/
│   ├── (tabs)/
│   │   ├── discover.jsx          # Discover page
│   │   ├── mytrip.jsx           # My Trips page
│   │   └── profile.jsx          # Profile page
│   ├── auth/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── create-trip/             # Trip creation flow
│   ├── trip-details/            # Trip details view
│   └── index.tsx               # Landing page
├── components/
│   ├── MyTrips/               # Trip list components
│   ├── TripDetails/           # Trip detail components
│   └── Login.jsx             # Login component
├── configs/
│   ├── FirebaseConfig.js      # Firebase configuration
│   └── AiModel.js            # AI integration
├── constants/
│   └── Options.js            # App constants
└── services/
    └── GooglePlaceApi.js     # Google Places API
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- Firebase project
- Google Cloud project with Places API enabled
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-travel-planner-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   EXPO_PUBLIC_GOOGLE_MAP_KEY=your_google_maps_api_key
   EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Firebase Configuration**
   Update `configs/FirebaseConfig.js` with your Firebase project credentials.

5. **Run the application**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Add your Firebase config to `configs/FirebaseConfig.js`

### Google APIs Setup
1. Enable Google Places API
2. Enable Google Maps API
3. Create API keys and add to environment variables

### AI Integration
1. Get Google Gemini AI API key
2. Add to environment variables
3. Configure in `configs/AiModel.js`

## 📱 Usage

### Creating a Trip
1. Navigate to "My Trips" or "Discover"
2. Tap the "+" button or select a destination
3. Follow the trip creation flow:
   - Search and select destination
   - Choose travel dates
   - Select traveller type
   - Choose budget level
   - Generate AI-powered itinerary
   - Review and save trip

### Viewing Trip Details
1. Go to "My Trips"
2. Tap on any trip card
3. View comprehensive trip details including:
   - Flight information
   - Hotel recommendations
   - Daily activity plans
   - Travel times and tips

## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface
- **Responsive Layout**: Works on various screen sizes
- **Custom Fonts**: Outfit font family for consistency
- **Icons**: Ionicons for visual elements
- **Color Scheme**: Black and white with accent colors
- **Smooth Navigation**: Tab-based navigation with stack routing

## 🔒 Security Features

- Firebase Authentication for user management
- Secure API key management
- User data isolation in Firestore
- Input validation and error handling

## 📊 Data Flow

1. **User Authentication** → Firebase Auth
2. **Trip Creation** → Google Places API → AI Generation → Firestore
3. **Trip Retrieval** → Firestore → UI Components
4. **Trip Details** → Firestore → Detailed View

## 🚀 Future Enhancements

- [ ] Offline trip access
- [ ] Trip sharing functionality
- [ ] Real-time trip updates
- [ ] Push notifications
- [ ] Trip templates
- [ ] Social features
- [ ] Trip reviews and ratings
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using React Native, Expo, and AI-powered travel planning technology.**
