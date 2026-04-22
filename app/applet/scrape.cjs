const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: '/app/applet/chrome/linux-147.0.7727.57/chrome-linux64/chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
            headless: 'new'
        });
        const page = await browser.newPage();
        
        // Setup realistic headers
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
        
        await page.goto('https://www.instagram.com/newsiddhimobile/', { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait a bit
        await new Promise(r => setTimeout(r, 5000));
        
        // Extract images
        const images = await page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            // get only large images
            return imgs.map(img => img.src).filter(src => src.startsWith('https://'));
        });
        
        console.log("Instagram Images:");
        console.log(JSON.stringify(images, null, 2));
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
