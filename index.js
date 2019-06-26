var fs = require("fs");

var wordcut = require("wordcut");
var difftext = require("diff-text");

var word1 = `ฉันจะออกไปทานอาหารกลางวัน
เขาจะกลับมาตอนบ่ายโมงครึ่ง
ฉันจะว่างหลังอาหารกลางวัน
เธอลาออกไปแล้ว
เขาได้รับการเลื่อนตำแหน่ง
เธอลาคลอด
วันนี้เขาลาป่วย
วันนี้เขาไม่อยู่
เธออยู่ในช่วงวันหยุด
วันนี้ฉันไม่สบาย และไม่สามารถไปทำงานได้ในวันนี้
ขณะนี้เขาอยู่กับลูกค้า
ฉันจะมาพบคุณอีกสักครู่
ขอโทษที่ให้คุณรอ
ฉันช่วยอะไรคุณได้บ้าง
คุณต้องการความช่วยเหลืออะไรไหม
ฉันจะทำอะไรให้คุณได้บ้าง
คอมพิวเตอร์ของฉันมีปัญหา
ระบบคอมพิวเตอร์ใช้ไม่ได้อยู่ขณะนี้
ระบบอินเทอร์เน็ตเสียอยู่ขณะนี้
ฉันไม่สามารถเข้าอีเมล์ได้
พรินเตอร์ไม่ทำงาน`

var word2 = `ฉันจะ ออกไป ทาน อาหารกลางวัน
เขาจะ กลับมา ตอน บ่าย โมง ครึ่ง
ฉันจะ ว่าง หลัง อาหารกลางวัน
เอ้า เธอ ลาออก ไปแล้ว
อ เขา ได้รับ การ เลื่อน ตำแหน่ง
เธอรัก คลอด
วันนี้ เขา ลาป่วย
วัน นี้ เค้า ไม่ อยู่
เธอ อยู่ ในช่วง วันหยุด
วันนี้ ฉัน ไม่ สบาย และไม่ สามารถ ไปทำงาน ได้ ในวัน นี้
ขณะนี้ เขา อยู่ กับ ลูกค้า
ฉัน จะ มาพบ คุณ อีก สักครู่
ขอโทษ ที่ ให้คุณ เหรอ
ฉัน ช่วยอะไร คุณได้ บ้าง
คุณ ต้องการความ ช่วยเหลือ อะไร ไม่
ฉันจะ ทำอะไร ให้คุณ ได้ บ้าง
คอมพิวเตอร์ ของฉัน มีปัญหา
ระบบคอมพิวเตอร์ ใช้ ไม่ได้ อยู่ ขนาดนี้
ระบบ อินเทอร์เน็ต เสีย อยู่ ขณะนี้
ฉันไม่ สามารถ เข้า อีเมล ได้
เพียงแต่ ไม่ทำงาน`.replace(/ */g,'')



wordcut.init();

word1 = wordcut.cut(word1,' ')
word2 = wordcut.cut(word2,' ')

// console.log(word1);
// console.log(word2);

fs.writeFile("./outputs/word1.txt", word1, (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./outputs/word2.txt", word2, (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

difftext_result = difftext(word1,word2)

// console.log(difftext_result)

let word_count = 0
let wrong_word_count = 0

let nearby=3
check_diff = (line1,line2)=>{
  let split1 = line1.split(' ')
  let split2 = line2.split(' ')
  
  split1.forEach((w,i)=>{
    word_count +=1;
    let min = Math.max(0,i-nearby)
    let max = Math.min(split2.length-1,i+nearby)
    
    let sliceArr = split2.slice(min,max+1)
    if (sliceArr.indexOf(w) === -1 ){
      wrong_word_count += 1;
    }
  })
}



let word1_split = word1.split("\n")
let word2_split = word2.split("\n")
word1_split.forEach((line,idx)=>{
  check_diff(line,word2_split[idx])
})

let accuracy = 100 - wrong_word_count/word_count*100
console.log(accuracy)

