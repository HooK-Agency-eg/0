# تشغيل الموقع بـ Google Sheets + Apps Script (من غير سيرفر)

الموقع يفضل على GitHub Pages، والداتا في Google Sheet بتاعك.

1. اعمل Google Sheet جديد (sheets.new).
2. من القايمة: **Extensions > Apps Script**.
3. امسح أي كود موجود وانسخ كل محتوى ملف `apps-script/Code.gs` والصقه.
4. في أول الكود غيّر السطر ده واكتب باسوردك:
   `const ADMIN_PW = 'CHANGE_ME';`
5. اختار الدالة `setup` من القايمة اللي فوق واضغط **Run**. وافق على الصلاحيات (Advanced > Go to project). لما يخلص هتلاقي في الشيت صفحات جديدة فيها الداتا.
6. رجّع السطر لـ `'CHANGE_ME'` (عشان الباسورد ميفضلش مكتوب في الكود) واضغط Save.
7. **Deploy > New deployment > Web app**، وحدد:
   - Execute as: **Me**
   - Who has access: **Anyone**
   واضغط Deploy وانسخ الرابط (آخره `/exec`).
8. افتح ملف `config.js` في الموقع وحط الرابط:
   `window.HOOK_API='الرابط هنا';`
9. ارفع التعديل على GitHub (commit و push) وافتح الموقع.
10. ادخل من `login.html`: اليوزر `mido` والباسورد اللي كتبته في الخطوة 4. غيّره من الداشبورد بعد كده.

## لو عدّلت كود Code.gs بعد كده
اعمل **Deploy > Manage deployments > Edit > New version** عشان التعديل يظهر. الرابط بيفضل زي ما هو.

## لو نسيت الباسورد
اكتب باسورد جديد في `ADMIN_PW`، شغّل الدالة `resetAdmin`، وبعدين رجّع `CHANGE_ME`.

## ملاحظات
- أول طلب بعد فترة سكون ممكن ياخد ثواني (طبيعي في Google). الموقع بيعرض آخر محتوى محفوظ على طول وبيحدّثه بعدها.
- الصور اللي بترفعها من التعديل بتتحفظ في فولدر `Hook uploads` على Google Drive بتاعك.
- الزيارات بتتسجل صف صف في صفحة `events`. لو كبرت أوي امسح الصفوف القديمة.
