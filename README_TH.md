# FileLite Studio — GitHub + Cloudflare Workers (ฟรี)

เว็บบีบอัด PDF, Word, Excel, PowerPoint และรูปภาพจากเบราว์เซอร์ผู้ใช้ โดยไม่เก็บเอกสารบนเซิร์ฟเวอร์

**โปรเจกต์นี้ใช้ Source Code เวอร์ชัน:** 22 ตุลาคม 2026 — Auto Target V2

## โครงสร้างไฟล์

- `public/index.html` — หน้าเว็บและกลไกบีบอัด (รวม CSS/JS ในไฟล์เดียว)
- `public/favicon.svg` — ไอคอนหน้าเว็บ
- `public/_headers` — HTTP Security Headers ขั้นพื้นฐาน
- `wrangler.jsonc` — ค่า Worker เดิม `filelitestudio` และโฟลเดอร์ static assets
- `package.json` — ใช้ Wrangler สำหรับ Deploy
- `THIRD_PARTY_NOTICES.md` — ข้อมูลลิขสิทธิ์ JSZip และส่วนประกอบที่เกี่ยวข้อง

## ขั้นตอนเชื่อมต่อครั้งแรก (ทำครั้งเดียว)

### 1. สร้าง GitHub Repository

เข้า https://github.com/new แล้ว:
1. ตั้งชื่อ `filelite-studio` ภายใต้บัญชี GitHub ของคุณ
2. เลือก **Public** (ต้องการแชร์ซอร์สโค้ดแบบสาธารณะ) หรือ **Private** (หากไม่ต้องการเปิดเผยซอร์สโค้ด) โดยเลือกตามสิทธิ์แผนที่รองรับการเชื่อมต่อ
3. เลือกสร้าง **README** ถ้าต้องการให้ Repository มี branch `main` ทันที; ผู้พัฒนาจะเพิ่มไฟล์โครงการให้ภายหลัง
4. คลิก **Create repository**

**หากให้ ChatGPT ช่วยอัปโหลดต่อ:** สร้าง Repository แล้วกลับมาบอกว่า “สร้างแล้ว” พร้อม URL Repository; ไม่ต้องคัดลอกโค้ดเอง

**หากต้องการอัปโหลดเอง:** อัปโหลดไฟล์ทั้งหมดจาก ZIP (รวมโฟลเดอร์ `public`) ไปยังรากของ Repository ตรวจให้มี `public/index.html` และ `wrangler.jsonc` อยู่ตามตำแหน่ง

### 2. เชื่อม Worker เดิมกับ GitHub

1. เข้า https://dash.cloudflare.com/ → **Workers & Pages** → Worker **filelitestudio** เดิม
2. เลือก **Settings → Builds → Connect**
3. เลือก GitHub และอนุญาตให้ Cloudflare เข้าถึง Repository ที่ต้องการ
4. เลือก Repository `filelite-studio` และ Branch `main`
5. ตั้ง **Root directory** เป็น `/` (หรือเว้นว่างตามหน้าจอ), **Build command** เว้นว่าง, **Deploy command** เป็น `npx wrangler deploy`
6. บันทึกการเชื่อมต่อ และดูหน้า **Deployments/Builds** ว่า Deploy สำเร็จก่อนประกาศใช้งาน

**สำคัญ:** `name` ใน `wrangler.jsonc` ถูกกำหนดเป็น `filelitestudio` ซึ่งต้องตรงกับ Worker เดิม อย่าเปลี่ยนชื่อนี้ถ้าต้องการลิงก์เดิม

### 3. อัปเดตครั้งต่อไป

แก้ `public/index.html` ใน GitHub แล้ว Commit ไป Branch `main` → Cloudflare Builds จะ Deploy โดยอัตโนมัติเมื่อเชื่อมต่อสำเร็จ (ดูสถานะจริงทุกครั้ง)

## ที่อยู่เว็บไซต์เดิม

https://filelitestudio.muhammadeirchard-m.workers.dev/

## ข้อจำกัดที่ต้องทราบ

- ระบบประมวลผลในเบราว์เซอร์ ไม่ใช้ Python/Docker/Database และไม่ได้อัปโหลดเอกสารไปเก็บบนเซิร์ฟเวอร์
- PDF ต้องโหลดไลบรารีจาก CDN ภายนอก และรูปแบบบีบอัดแบบแปลงหน้าเป็นภาพอาจทำให้เลือกหรือค้นหาข้อความไม่ได้
- ไม่สามารถรับประกันว่าบีบอัดได้ตรงขนาดเป้าหมาย โดยเฉพาะไฟล์ Office ที่ไม่มีภาพหรือไฟล์ที่บีบอัดอยู่แล้ว
- ต้องตรวจการ Deploy บน Cloudflare และทดสอบไฟล์จริงก่อนประกาศว่าใช้งานได้เต็มรูปแบบ
- แผนฟรีของ Cloudflare และ GitHub มีโควตา/นโยบายการใช้งาน จึงหมายถึงไม่มีค่ารายเดือนสำหรับการใช้งานภายในข้อจำกัดของแผนฟรี

## การย้อนเวอร์ชัน

ใช้ประวัติ Commit ของ GitHub หรือ Rollback จาก Cloudflare Deployments โดยไม่ต้องลบโปรเจกต์