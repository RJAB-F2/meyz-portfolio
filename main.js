// main.js

// الحصول على عنصر canvas وتهيئته
const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");
let drops = []; 

// ضبط أبعاد الـcanvas لتملأ الشاشة بالكامل
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // التهيئة الأولية

// كلاس يمثل قطرة مطر
class Drop {
  constructor() {
    this.reset();
  }
  // إعادة تعيين موقع وسرعة القطر
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // ابدأ فوق الشاشة
    this.vy = 4 + Math.random() * 4;         // سرعة رأسية بين 4-8
    this.length = 10 + Math.random() * 10;   // طول عشوائي للقطرة
    this.width = 1;                          // سمك الخط
  }
  // تحديث موقع القطرة
  fall() {
    this.y += this.vy;
    if (this.y > canvas.height) {
      this.reset();  // إذا خرجت من الأسفل، أعدها للأعلى
    }
  }
  // رسم القطرة على الـcanvas
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"; // لون أبيض شفاف
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

// تهيئة مجموعة قطرات المطر
function initRain(numDrops) {
  drops = [];
  for (let i = 0; i < numDrops; i++) {
    drops.push(new Drop());
  }
}

// حلقة الرسم: تمسح الشاشة ثم ترسم كل القطيرات
function animateRain() {
  // لون أسود شفاف لرسم أثر بسيط (يمكن زيادة الألفا لـ"مسح تام")
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // رسم وتحديث كل قطرة
  for (let drop of drops) {
    drop.draw();
    drop.fall();
  }
  requestAnimationFrame(animateRain);
}

// ابدأ المطر بعد تحميل الصفحة
window.addEventListener('load', () => {
  initRain(150);       // عدد القطيرات
  animateRain();
});

// إضافة تأثير بصري عند النقر على الأزرار
const buttons = document.querySelectorAll('.button');
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();  // منع عمل الرابط (لأن href="#" حالياً)
    btn.classList.add('clicked');
    // إزالة التأثير بعد فترة قصيرة
    setTimeout(() => btn.classList.remove('clicked'), 150);
    // لاحقاً: يمكن إزالة preventDefault إذا كانت الروابط حقيقية
  });
});
