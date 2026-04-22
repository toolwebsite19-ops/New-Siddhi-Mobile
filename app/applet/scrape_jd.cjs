const puppeteer = require('puppeteer-core');

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: '/app/applet/chrome/linux-147.0.7727.57/chrome-linux64/chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: 'new'
        });
        const page = await browser.newPage();
        await page.goto('https://www.justdial.com/West-Champaran/Siddhi-Mobile-Near-By-Axis-Bank-Narkatiaganj/9999P6254-6254-180330221406-C3U8_BZDET/photos', { waitUntil: 'networkidle2', timeout: 30000 });
        
        await new Promise(r => setTimeout(r, 5000));
        
        const images = await page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs.map(img => img.src).filter(src => src.includes('https://content.jdmagicbox.com/'));
        });
        
        console.log(JSON.stringify(images, null, 2));
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
