# AI Creator SaaS - Content Repurposing Platform

Transform your long-form content into viral clips with the power of AI. Built for creators, by creators.

## 🌟 Features

- **AI-Powered Clipping**: Automatically identify and extract the most engaging moments
- **Smart Transcription**: OpenAI Whisper integration for accurate speech-to-text
- **Content Repurposing**: Generate captions, hashtags, and descriptions with GPT-4
- **Multi-Platform Export**: Optimized clips for TikTok, Instagram Reels, YouTube Shorts
- **Creator Dashboard**: Professional studio interface inspired by YouTube Studio
- **Credit System**: Flexible usage-based pricing model

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: SQLite 3
- **AI Services**: OpenAI Whisper, OpenRouter GPT-4
- **File Storage**: AWS S3
- **Authentication**: JWT with bcrypt
- **Payments**: Stripe integration
- **Deployment**: PM2, NGINX, Sevalla VPS

## 📋 Prerequisites

- Node.js 18+ and npm
- SQLite 3 database (no setup required)
- AWS S3 bucket
- OpenAI API key
- OpenRouter API key
- Stripe account (for payments)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-creator-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database (SQLite - file-based, no setup required)
   DATABASE_PATH=./database.sqlite
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   
   # OpenAI
   OPENAI_API_KEY=sk-your-openai-api-key
   
   # OpenRouter
   OPENROUTER_API_KEY=sk-your-openrouter-key
   
   # AWS S3
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=your-s3-bucket-name
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   
   # App
   NEXTAUTH_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Configure AI settings**
   
   Edit `config.json`:
   ```json
   {
     "whisper": {
       "provider": "openai",
       "apiKey": "ENV.OPENAI_API_KEY"
     },
     "text": {
       "provider": "openrouter",
       "model": "gpt-4-turbo",
       "temperature": 0.7,
       "apiKey": "ENV.OPENROUTER_API_KEY",
       "baseUrl": "https://openrouter.ai/api"
     },
     "clipSettings": {
       "minDuration": 15,
       "maxDuration": 90
     },
     "stripe": {
       "secretKey": "ENV.STRIPE_SECRET_KEY"
     }
   }
   ```

5. **Initialize the database**
   ```bash
   npm run db:init
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### AI Models Configuration

The app uses a config-first approach for AI models. Modify `config.json` to:

- Switch between different AI providers
- Adjust model parameters (temperature, max tokens)
- Configure clip generation settings
- Set up pricing tiers

### Database Schema

The application includes these main tables:
- `users` - User accounts and authentication
- `files` - Uploaded content files
- `transcriptions` - AI-generated transcripts
- `clips` - Generated video clips
- `ai_content` - AI-generated captions and descriptions
- `credit_usage` - Usage tracking for billing
- `projects` - Content organization

## 🚀 Deployment

### Local Development

```bash
npm run dev
```

### Production Deployment

1. **Prepare your server** (Ubuntu/Debian):
   ```bash
   sudo apt update
   sudo apt install nodejs npm ffmpeg nginx certbot postgresql-client
   ```

2. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd ai-creator-saas
   npm ci
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Run deployment script**:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

4. **Configure NGINX** (create `/etc/nginx/sites-available/ai-creator-saas`):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable site and SSL**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ai-creator-saas /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 📱 Usage

### For Creators

1. **Sign Up**: Choose your creator type (Podcaster, YouTuber, Educator, etc.)
2. **Upload Content**: Drag & drop videos or audio files (MP4, MP3, WAV)
3. **AI Processing**: Automatic transcription and clip generation
4. **Review & Edit**: Fine-tune clips and AI-generated content
5. **Export**: Download optimized clips for different platforms

### Content Types Supported

- **Podcasts**: Long-form conversations and interviews
- **YouTube Videos**: Educational and entertainment content
- **Webinars**: Business and educational presentations
- **Livestreams**: Gaming and talk show recordings

## 💳 Pricing Tiers

| Tier | Price/mo | Features |
|------|----------|----------|
| Free | $0 | 60 min/month, watermark, 720p |
| Basic | $15 | 150 min, HD export, no watermark |
| Pro | $30 | 500 min, batch export, priority |
| Agency | $99 | Multi-seat, API access, branding |

## 🛡️ Security

- JWT-based authentication with secure token rotation
- bcrypt password hashing with salt rounds
- SQL injection protection with parameterized queries
- File upload validation and virus scanning
- Rate limiting on API endpoints

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification

### Content Processing
- `POST /api/upload` - File upload to S3
- `POST /api/transcribe` - Start transcription
- `POST /api/clip` - Generate clips
- `POST /api/repurpose` - Create social content

### User Management
- `GET /api/credits/balance` - Check credit balance
- `POST /api/credits/buy` - Purchase credits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Discord**: Join our creator community
- **Email**: support@clipmagic.ai

## 🎯 Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced AI voice cloning
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Advanced analytics dashboard

---

**Built with ❤️ for the creator community**
