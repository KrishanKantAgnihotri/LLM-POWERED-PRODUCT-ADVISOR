# 🤖 AI Product Advisor

An intelligent React Native mobile application that provides personalized product recommendations using Google Gemini AI. The app features natural language search, multi-currency support, and a beautiful modern UI.

## 📱 Features

- **🤖 AI-Powered Recommendations** - Uses Google Gemini AI for intelligent product matching
- **🌍 Multi-Currency Support** - 10+ currencies with real-time conversion (USD, INR, EUR, GBP, JPY, etc.)
- **📱 Cross-Platform** - Works on iOS, Android, and Web browsers
- **🎨 Modern UI** - Beautiful animations, smooth scrolling, and responsive design
- **🔍 Smart Search** - Natural language queries with fallback keyword matching
- **⚡ Optimized Performance** - FlatList implementation for smooth scrolling

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **npm** or **yarn** package manager
3. **Expo CLI** - Install globally: `npm install -g @expo/cli`
4. **Expo Go app** on your mobile device (iOS/Android)

### Installation Steps

1. **Extract the ZIP file** to your desired location
   ```bash
   # Navigate to the project directory
   cd "AI Product Advisor"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter any issues, try:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npx expo start
   
   ```

4. **Run on your device**
   - **Mobile**: Scan the QR code with Expo Go app
   - **Web**: Press `w` in the terminal or open the localhost URL
   - **iOS Simulator**: Press `i` in the terminal (macOS only)
   - **Android Emulator**: Press `a` in the terminal

## 🔧 Configuration

### Google Gemini AI API Key (Optional)

The app works with a smart fallback system, but for best results, add your Gemini API key:

1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Open `src/services/aiService.ts`
3. Replace the `GEMINI_API_KEY` value with your API key:
   ```typescript
   const GEMINI_API_KEY = 'your-api-key-here';
   ```

**Note**: The app works perfectly without an API key using the intelligent fallback system!

## 🛠️ System Requirements

### Windows
- **OS**: Windows 10 or later
- **Node.js**: 16.x or higher
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 2GB free space

### macOS
- **OS**: macOS 10.15 (Catalina) or later
- **Node.js**: 16.x or higher
- **Xcode**: Latest version (for iOS development)
- **Memory**: 4GB RAM minimum, 8GB recommended

### Linux (Ubuntu/Debian)
- **OS**: Ubuntu 18.04+ or Debian 10+
- **Node.js**: 16.x or higher
- **Memory**: 4GB RAM minimum, 8GB recommended

## 📱 Testing the App

### Example Searches to Try

1. **Basic Categories**:
   - `"smartphones"`
   - `"laptops"`
   - `"headphones"`
   - `"tablets"`

2. **With Currency (switch currency first)**:
   - `"laptop under ₹80000"` (Indian Rupees)
   - `"headphones under €100"` (Euros)
   - `"smartphone under £500"` (British Pounds)

3. **Advanced Queries**:
   - `"lightweight laptop for travel"`
   - `"gaming headphones with good sound"`
   - `"budget smartphone with good camera"`
   - `"premium tablet for professional work"`

### Currency Testing

1. Tap the currency selector (e.g., "$ USD") in the header
2. Choose a different currency (e.g., Indian Rupee ₹)
3. Notice prices update throughout the app
4. Search examples now show prices in your selected currency

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "expo command not found"
```bash
npm install -g @expo/cli
# or
npx expo --version
```

#### 2. "Metro bundler not starting"
```bash
npx expo start --clear
```

#### 3. "Can't connect to development server"
- Ensure your phone and computer are on the same WiFi network
- Try restarting the Expo server
- Check firewall settings

#### 4. "Module not found" errors
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

#### 5. App crashes on mobile
- Clear Expo Go cache in the app settings
- Restart the development server
- Try on web browser first to isolate the issue

#### 6. "Gemini API error"
- The app automatically falls back to the keyword system
- No action needed - this is expected behavior
- Add your API key for AI features (optional)

### Performance Issues

If the app feels slow:
1. **Close other apps** on your device
2. **Restart Expo server**: `Ctrl+C` then `npx expo start`
3. **Clear cache**: `npx expo start --clear`
4. **Try web version** for testing: Press `w` in terminal

## 📁 Project Structure

```
AI Product Advisor/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ProductCard.tsx
│   │   ├── SearchInput.tsx
│   │   ├── CurrencySelector.tsx
│   │   └── ...
│   ├── screens/             # App screens
│   │   ├── SearchScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── ProductDetailScreen.tsx
│   ├── services/            # Business logic
│   │   └── aiService.ts     # AI and search logic
│   ├── data/                # Static data
│   │   └── productCatalog.ts
│   ├── utils/               # Helper functions
│   │   └── helpers.ts       # Currency & formatting
│   ├── context/             # State management
│   │   └── AppContext.tsx
│   └── types/               # TypeScript definitions
│       └── index.ts
├── App.tsx                  # Main app component
├── package.json            # Dependencies
└── README.md              # This file
```

## 🌟 Key Features Explained

### 1. AI-Powered Search
- Uses Google Gemini AI for intelligent recommendations
- Falls back to smart keyword matching if AI is unavailable
- Understands natural language queries

### 2. Multi-Currency Support
- 10 major currencies supported
- Real-time price conversion
- Localized formatting for each currency
- Currency-aware search (understands "₹80000" vs "$1000")

### 3. Smart Fallback System
- Works perfectly without internet or AI API
- Intelligent keyword matching
- Category-aware search
- Price range understanding

### 4. Modern Mobile UI
- Smooth animations using React Native Animated API
- FlatList for optimized scrolling performance
- Responsive design for all screen sizes
- Beautiful card-based layout

## 🔄 Development Workflow

### For Developers

1. **Start development server**:
   ```bash
   npx expo start
   ```

2. **Run on different platforms**:
   ```bash
   # Web
   npx expo start --web
   
   # Clear cache
   npx expo start --clear
   
   # Tunnel (for remote testing)
   npx expo start --tunnel
   ```

3. **Build for production**:
   ```bash
   # Install EAS CLI
   npm install -g @expo/eas-cli
   
   # Build APK
   eas build --platform android
   
   # Build for iOS
   eas build --platform ios
   ```

## 📦 Dependencies

### Main Dependencies
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation system
- **TypeScript** - Type safety

### Key Features
- **Google Gemini AI** - AI recommendations
- **Intl.NumberFormat** - Currency formatting
- **React Native Animated** - Smooth animations
- **FlatList** - Performance optimization

## 🤝 Support

If you encounter any issues:

1. **Check this README** for common solutions
2. **Restart the development server**
3. **Clear cache**: `npx expo start --clear`
4. **Try on web browser** first for debugging
5. **Check Node.js version**: `node --version` (should be 16+)

## 📄 License

This project is for educational and demonstration purposes.

## 🎯 Next Steps

After getting the app running:

1. **Try different search queries** to see the AI in action
2. **Switch currencies** and notice the price updates
3. **Test on multiple devices** (iOS, Android, Web)
4. **Add your Gemini API key** for enhanced AI features
5. **Explore the code** to understand the architecture

---

**Happy coding! 🚀**

*Built with React Native, Expo, and Google Gemini AI*  
⚡ **Fast Performance**: Optimized for quick responses and smooth user experience  

## Technologies Used

- **React Native** with Expo
- **TypeScript** for type safety
- **Google Gemini AI** for natural language processing
- **React Navigation** for smooth navigation
- **Context API** for state management
- **React Native Elements** for UI components

## Product Catalog

The app includes a comprehensive catalog of products across multiple categories:
- 💻 **Laptops** (MacBook Air M3, Dell XPS 13, ASUS ROG Zephyrus, ThinkPad X1 Carbon)
- 📱 **Smartphones** (iPhone 15 Pro Max, Samsung Galaxy S24 Ultra)
- 🎧 **Headphones** (Sony WH-1000XM5, AirPods Pro)
- 📺 **TVs** (LG C3 OLED)
- 📱 **Tablets** (iPad Pro M2, Surface Pro 9)
- 📷 **Cameras** (Canon EOS R5)
- ⌚ **Smartwatches** (Apple Watch Series 9, Galaxy Watch6 Classic)
- 🎮 **Gaming** (Nintendo Switch OLED)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Google Gemini API key

### Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Gemini AI API**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Open `src/services/aiService.ts`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
     ```typescript
     const GEMINI_API_KEY = 'your_actual_api_key_here';
     ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - Install the Expo Go app on your phone
   - Scan the QR code shown in the terminal
   - Or press 'w' to open in web browser

## Usage Examples

The AI Product Advisor understands natural language queries. Here are some examples:

### Search Examples
- "I need a lightweight laptop for travel with long battery life"
- "Gaming headphones under $500 with noise cancellation"
- "Professional camera for photography with good image stabilization"
- "Budget smartphone with great camera for social media"
- "Smart TV for my living room with 4K and streaming apps"

### How It Works
1. Enter your search query in natural language
2. The AI analyzes your needs and matches them against the product catalog
3. Get ranked recommendations with explanations
4. View detailed product information
5. Understand why each product fits your requirements

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductCard.tsx
│   ├── SearchInput.tsx
│   ├── LoadingComponent.tsx
│   └── ErrorComponent.tsx
├── screens/            # Main application screens
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   └── ProductDetailScreen.tsx
├── services/           # API and business logic
│   └── aiService.ts
├── context/            # State management
│   └── AppContext.tsx
├── data/              # Product catalog and data
│   └── productCatalog.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Helper functions
    └── helpers.ts
```

## Key Components

### AI Service (`aiService.ts`)
- Integrates with Google Gemini AI
- Constructs intelligent prompts for product matching
- Provides fallback keyword matching if AI is unavailable
- Handles error cases gracefully

### Product Catalog (`productCatalog.ts`)
- Comprehensive product database with 15+ products
- Detailed specifications, features, and metadata
- Helper functions for searching and filtering

### App Context (`AppContext.tsx`)
- Centralized state management
- Handles search queries, recommendations, and loading states
- Provides action creators for easy state updates

## Customization

### Adding New Products
Edit `src/data/productCatalog.ts` and add new products following the `Product` interface:

```typescript
{
  id: 'unique_id',
  name: 'Product Name',
  category: 'Category',
  description: 'Product description',
  features: ['Feature 1', 'Feature 2'],
  specifications: { 'Spec': 'Value' },
  price: 999,
  brand: 'Brand Name',
  rating: 4.5,
  reviews: 100,
  tags: ['tag1', 'tag2']
}
```

### Styling
- Modify component styles in individual screen/component files
- Update theme colors in the StyleSheet objects
- All styles use React Native's StyleSheet API

### AI Prompts
- Customize AI behavior by modifying the prompt in `aiService.ts`
- Adjust scoring criteria and recommendation logic
- Add new product categories or features

## Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure you've set up your Gemini API key correctly
   - Check that the API key has proper permissions

2. **Network Issues**
   - The app includes fallback functionality if AI is unavailable
   - Check your internet connection

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Expo cache: `expo start -c`

## Future Enhancements

- [ ] User authentication and personalized recommendations
- [ ] Product comparison feature
- [ ] Price tracking and alerts
- [ ] User reviews and ratings
- [ ] Integration with e-commerce APIs
- [ ] Offline mode with cached recommendations
- [ ] Advanced filtering and sorting options
- [ ] Social sharing of products
- [ ] Wishlist functionality
- [ ] Voice search capability

## License

This project is created for educational purposes. Feel free to use and modify as needed.

## Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This is a demo application created for the AI Product Advisor assignment. The product catalog contains sample data, and the AI integration showcases the capability of natural language product search and recommendation.
