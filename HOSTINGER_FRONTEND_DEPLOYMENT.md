# Hostinger Frontend Deployment Guide

## Prerequisites
- Hostinger account with hosting plan
- Domain name (or use Hostinger's free domain)
- Git repository pushed to GitHub

## Step 1: Build the Frontend
Before deployment, build the production version:

```bash
cd client
npm install
npm run build
```

This creates a `dist/` folder with optimized production files.

## Step 2: Access Hostinger Control Panel
1. Log in to your Hostinger account
2. Go to **Hosting** → Select your hosting plan
3. Click **Manage**

## Step 3: Connect GitHub Repository (Recommended)
### Option A: Using Git (Recommended for auto-updates)

1. In Hostinger, go to **Advanced** → **Git**
2. Click **Connect Repository**
3. Select **GitHub** and authorize
4. Choose your `car-loans-and-sales` repository
5. Set these settings:
   - **Branch**: `master` (or your main branch)
   - **Deployment Path**: `/public_html/`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Build Output**: `client/dist`
   - **Environment Variables**: (add below)

### Environment Variables to Add:
```
VITE_API_URL=https://car-loans-and-sales.onrender.com/api
NODE_ENV=production
```

6. Click **Deploy**
7. Wait for deployment to complete (check logs)

## Step 3 Alternative: Manual Upload
If Git is not available on your plan:

1. Build locally:
   ```bash
   cd client
   npm run build
   ```

2. Upload files from your computer:
   - Go to **Files** → **File Manager**
   - Delete everything in `/public_html/`
   - Upload contents of `client/dist/` folder to `/public_html/`

3. Set up `.htaccess` for routing (see below)

## Step 4: Configure .htaccess for React Router
Create/update `.htaccess` file in `/public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite existing files and directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Rewrite all requests to index.html
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Cache busting for static files
<FilesMatch "^.*\.(?:css|js|png|jpg|jpeg|gif|svg|woff|woff2)$">
  Header set Cache-Control "public, max-age=31536000"
</FilesMatch>

# Disable caching for HTML files
<FilesMatch "\.html$">
  Header set Cache-Control "public, max-age=0, must-revalidate"
</FilesMatch>
```

## Step 5: Update Backend API URL
Ensure your frontend is pointing to the correct backend:

### In `client/src/constants/config.js`:
```javascript
const API_BASE_URL = 'https://car-loans-and-sales.onrender.com/api';
```

Or use environment variable:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://car-loans-and-sales.onrender.com/api';
```

## Step 6: SSL/HTTPS Setup
1. Go to **Security** → **SSL**
2. Select **Free SSL Certificate** (Let's Encrypt)
3. Click **Activate**
4. Wait for activation (usually 5-15 minutes)

## Step 7: Redirect HTTP to HTTPS
In `.htaccess`, add at the top:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

## Step 8: Verify Deployment
1. Visit your domain: `https://yourdomain.com`
2. Check browser console for errors (F12)
3. Test API calls:
   - Open DevTools → Network tab
   - Try logging in
   - Verify API requests go to your Render backend

## Troubleshooting

### Blank Page / 404 Errors
- Ensure `.htaccess` is in `/public_html/`
- Check `dist/` folder contains `index.html`
- Verify rewrite module is enabled: Contact Hostinger support if needed

### API Calls Failing / CORS Errors
- Verify `VITE_API_BASE_URL` is correct
- Ensure backend `CLIENT_URL` includes your frontend domain
- Example: `CLIENT_URL=https://yourdomain.com`

### Slow Performance
- Enable gzip compression: **Performance** → **Optimization**
- Check CDN settings: **Advanced** → **CDN**
- Minify CSS/JS: Already done by Vite build

### Routes Not Working (404 on page refresh)
- Ensure `.htaccess` is correctly configured
- Contact Hostinger support to enable `mod_rewrite`

## Auto-Deployment Setup
If using Git deployment:
1. Any push to `master` branch automatically triggers deployment
2. View deployment logs in Hostinger: **Advanced** → **Git** → **Logs**

## Environment Variables (Hostinger)
Go to **Advanced** → **Environment Variables** and add:
```
VITE_API_URL=https://car-loans-and-sales.onrender.com/api
NODE_ENV=production
```

## Post-Deployment Checklist
- [ ] Frontend loads without errors
- [ ] CSS/styling looks correct
- [ ] All pages are accessible
- [ ] Login functionality works
- [ ] API calls reach backend successfully
- [ ] Admin panel accessible with credentials
- [ ] Email forms submit data
- [ ] Mobile responsive design works
- [ ] SSL certificate is active

## Next Steps
1. Test all features thoroughly
2. Monitor error logs for issues
3. Set up domain DNS if using custom domain
4. Configure email notifications from Hostinger

## Support
- Hostinger Help: https://support.hostinger.com
- Vite Build Issues: https://vitejs.dev/guide/ssr.html
- React Router: https://reactrouter.com/
