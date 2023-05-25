# Vue-JS-2
การแนะนำ
**
Vue.js คืออะไร
**
Vue (อ่านว่า /vjuː/ เหมือน view) เป็นเฟรมเวิร์กขั้นสูงสำหรับการสร้างส่วนติดต่อผู้ใช้ Vue ได้รับการออกแบบมาตั้งแต่ต้นเพื่อให้ปรับใช้ได้มากขึ้น ซึ่งแตกต่างจากเฟรมเวิร์กแบบเสาหินอื่นๆ ไลบรารีหลักมุ่งเน้นไปที่เลเยอร์มุมมองเท่านั้น และง่ายต่อการรับและรวมเข้ากับไลบรารีอื่นหรือโปรเจ็กต์ที่มีอยู่ ในทางกลับกัน Vue ยังสามารถขับเคลื่อนแอพพลิเคชั่น Single-Page ที่ซับซ้อนได้อย่างสมบูรณ์แบบเมื่อใช้ร่วมกับเครื่องมือที่ทันสมัยและไลบรารีที่รองรับ

หากคุณต้องการเรียนรู้เพิ่มเติมเกี่ยวกับ Vue ก่อนลงมือ เราได้สร้างวิดีโอที่อธิบายถึงหลักการสำคัญและโครงการตัวอย่าง

หากคุณเป็นนักพัฒนาส่วนหน้าที่มีประสบการณ์และต้องการทราบว่า Vue เปรียบเทียบกับไลบรารี/เฟรมเวิร์กอื่นๆ อย่างไร โปรดดูการเปรียบเทียบกับเฟรมเวิร์กอื่นๆ
**
เริ่มต้นใช้งาน
**
คู่มืออย่างเป็นทางการถือว่ามีความรู้ระดับกลางเกี่ยวกับ HTML, CSS และ JavaScript หากคุณยังใหม่กับการพัฒนาส่วนหน้าโดยสิ้นเชิง อาจไม่ใช่ความคิดที่ดีที่สุดที่จะกระโดดเข้าสู่เฟรมเวิร์กเป็นขั้นตอนแรกของคุณ - เข้าใจพื้นฐานแล้วกลับมาใหม่! ประสบการณ์ก่อนหน้านี้เกี่ยวกับเฟรมเวิร์กอื่นช่วยได้ แต่ไม่จำเป็น

วิธีที่ง่ายที่สุดในการทดลองใช้ Vue.js คือการใช้ตัวอย่าง Hello World อย่าลังเลที่จะเปิดในแท็บอื่นและทำตามเมื่อเราดูตัวอย่างพื้นฐาน หรือคุณสามารถสร้างไฟล์ index.html และรวม Vue ด้วย:

หน้าการติดตั้งมีตัวเลือกเพิ่มเติมในการติดตั้ง Vue หมายเหตุ: เราไม่แนะนำให้ผู้เริ่มต้นเริ่มต้นด้วย vue-cli โดยเฉพาะอย่างยิ่งหากคุณยังไม่คุ้นเคยกับเครื่องมือสร้างที่ใช้ Node.js

หากคุณต้องการบางสิ่งที่โต้ตอบมากขึ้น คุณสามารถดูซีรีส์บทช่วยสอนนี้บน Scrimba ซึ่งให้การผสมผสานของ screencast และ code Playground ที่คุณสามารถหยุดชั่วคราวและเล่นได้ทุกเมื่อ
**
การแสดงผลที่เปิดเผย
**
หัวใจหลักของ Vue.js คือระบบที่ช่วยให้เราสามารถแสดงข้อมูลไปยัง DOM อย่างชัดเจนโดยใช้ไวยากรณ์เทมเพลตที่ไม่ซับซ้อน:

เราได้สร้างแอป Vue ตัวแรกของเราแล้ว! สิ่งนี้ดูค่อนข้างคล้ายกับการแสดงเทมเพลตสตริง แต่ Vue ได้ทำงานหลายอย่างภายใต้ประทุน ขณะนี้ข้อมูลและ DOM เชื่อมโยงกัน และทุกอย่างก็ตอบสนอง เราจะรู้ได้อย่างไร? เปิดคอนโซล JavaScript ของเบราว์เซอร์ (ตอนนี้ ในหน้านี้) และตั้งค่า app.message เป็นค่าอื่น คุณควรเห็นตัวอย่างที่แสดงผลด้านบนอัปเดตตามนั้น

โปรดทราบว่าเราไม่ต้องโต้ตอบกับ HTML โดยตรงอีกต่อไป แอป Vue แนบตัวเองกับองค์ประกอบ DOM เดียว (#app ในกรณีของเรา) จากนั้นควบคุมอย่างเต็มที่ HTML เป็นจุดเริ่มต้นของเรา แต่ทุกอย่างจะเกิดขึ้นภายในอินสแตนซ์ Vue ที่สร้างขึ้นใหม่

นอกจากการแก้ไขข้อความแล้ว เรายังสามารถผูกแอตทริบิวต์ขององค์ประกอบได้ดังนี้:

ที่นี่เรากำลังพบกับสิ่งใหม่ แอตทริบิวต์ v-bind ที่คุณเห็นเรียกว่าไดเร็กทีฟ คำสั่งจะนำหน้าด้วย v- เพื่อระบุว่าเป็นแอตทริบิวต์พิเศษที่ Vue ให้มา และตามที่คุณอาจเดาได้ คำสั่งจะใช้ลักษณะพิเศษที่ตอบสนองกับ DOM ที่แสดงผล โดยพื้นฐานแล้วนี่คือการพูดว่า "รักษาแอตทริบิวต์ชื่อองค์ประกอบให้ทันสมัยอยู่เสมอด้วยคุณสมบัติข้อความในอินสแตนซ์ Vue"

หากคุณเปิดคอนโซล JavaScript อีกครั้งและป้อน app2.message = 'some new message' คุณจะเห็นอีกครั้งว่า HTML ที่ผูกไว้ - ในกรณีนี้คือแอตทริบิวต์ชื่อ - ได้รับการอัปเดตแล้ว
**
เงื่อนไขและลูป
**
ไปข้างหน้าและป้อน app3.seen = false ในคอนโซล คุณควรเห็นข้อความหายไป

ตัวอย่างนี้แสดงให้เห็นว่าเราสามารถผูกข้อมูลเข้ากับข้อความและแอตทริบิวต์ได้ ไม่เพียงเท่านั้น แต่ยังรวมถึงโครงสร้างของ DOM ด้วย ยิ่งไปกว่านั้น Vue ยังมีระบบเอฟเฟ็กต์การเปลี่ยนภาพที่ทรงพลังซึ่งสามารถใช้เอฟเฟกต์การเปลี่ยนภาพได้โดยอัตโนมัติเมื่อองค์ประกอบต่างๆ ถูกแทรก/อัปเดต/ลบโดย Vue

มีคำสั่งอื่นๆ อีกสองสามคำสั่ง ซึ่งแต่ละคำสั่งมีฟังก์ชันพิเศษของตัวเอง ตัวอย่างเช่น คำสั่ง v-for สามารถใช้แสดงรายการโดยใช้ข้อมูลจาก Array:
**
การจัดการอินพุตของผู้ใช้
**
เพื่อให้ผู้ใช้โต้ตอบกับแอปของคุณ เราสามารถใช้คำสั่ง v-on เพื่อแนบตัวฟังเหตุการณ์ที่เรียกใช้เมธอดในอินสแตนซ์ Vue ของเรา:
**
โปรดทราบว่าในวิธีนี้ เราอัปเดตสถานะของแอปโดยไม่ต้องแตะ DOM - การจัดการ DOM ทั้งหมดได้รับการจัดการโดย Vue และโค้ดที่คุณเขียนจะเน้นที่ตรรกะพื้นฐาน

Vue ยังมีคำสั่ง v-model ที่ทำให้การรวมสองทางระหว่างอินพุตฟอร์มและสถานะแอปเป็นเรื่องง่าย: