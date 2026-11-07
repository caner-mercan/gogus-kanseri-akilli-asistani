const M={n:["Yarıçap (ort.)","Doku (ort.)","Pürüzsüzlük (ort.)","İçbükeylik (ort.)","İçbükey nokta (ort.)","Simetri (ort.)"],
mu:[14.1661,19.4177,0.096,0.0892,0.049,0.1815],sd:[3.5751,4.2859,0.0143,0.0816,0.0396,0.0276],
w:[2.7947,1.4264,0.7867,0.3763,1.8776,0.3452],b:-0.6514,
min:[6.981,9.71,0.053,0,0,0.106],max:[28.11,39.28,0.163,0.427,0.201,0.304],med:[13.37,18.84,0.096,0.062,0.034,0.179]};
const sl=document.getElementById("sl"),vals=[...M.med];
M.n.forEach((n,i)=>{const st=M.max[i]>1?0.1:0.001,d=document.createElement("div");d.className="f";
d.innerHTML=`<label>${n}<b id="v${i}">${vals[i]}</b></label><input type="range" min="${M.min[i]}" max="${M.max[i]}" step="${st}" value="${vals[i]}">`;
d.querySelector("input").oninput=e=>{vals[i]=+e.target.value;document.getElementById("v"+i).textContent=vals[i]};sl.appendChild(d)});
function predict(){let z=M.b;const c=vals.map((v,i)=>{const k=M.w[i]*(v-M.mu[i])/M.sd[i];z+=k;return k});
const p=1/(1+Math.exp(-z));const idx=c.map((k,i)=>[k,i]).sort((a,b)=>Math.abs(b[0])-Math.abs(a[0])).slice(0,2);
return{p,top:idx.map(([k,i])=>`${M.n[i]} (${k>0?"riski artırıyor":"riski azaltıyor"})`)}}
document.getElementById("pr").onclick=()=>{const r=predict(),pc=(r.p*100).toFixed(1),el=document.getElementById("res");
el.style.display="block";
el.innerHTML=`<b>Model çıktısı: ${r.p>=0.5?"Kötü huylu (M) olasılığı yüksek":"İyi huylu (B) olasılığı yüksek"}</b><div class="bar"><i style="width:${pc}%"></i></div>Kötü huylu olasılığı: %${pc}<br><small>En etkili ölçümler: ${r.top.join(", ")}</small>`;
say("bot",`Tahmin sonucu: kötü huylu olasılığı %${pc}. En etkili ölçümler: ${r.top.join(", ")}.\n\nBu yalnızca bir makine öğrenmesi çıktısıdır, tanı değildir. Gerçek değerlendirme için patolog ve doktor gerekir.`)};
const norm=s=>s.toLocaleLowerCase("tr").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ç/g,"c").replace(/ğ/g,"g");
const KB=[
[["merhaba","selam","hey"],"Merhaba! Ben PembeBot 🎗️ Göğüs kanseri hakkında sorularını yanıtlayabilirim. Aşağıdaki önerilere dokunabilir ya da sağdaki panelden hücre ölçümleriyle model tahmini alabilirsin."],
[["nedir","kanser ne","tanim"],"Göğüs kanseri, göğüs dokusundaki hücrelerin kontrolsüz çoğalmasıyla oluşur. Çoğunlukla süt kanallarında (duktal) ya da süt bezciklerinde (lobüler) başlar. Erken evrede yakalandığında tedavi başarısı yüksektir."],
[["belirti","bulgu","isaret","semptom"],"Dikkat edilmesi gereken belirtiler:\n• Memede ya da koltuk altında yeni bir ele gelen kitle\n• Meme boyutu veya şeklinde değişiklik\n• Cilt çöküntüsü, portakal kabuğu görünümü\n• Meme başında içe çekilme, kızarıklık veya kanlı akıntı\n\nBu belirtilerin çoğu iyi huylu nedenlerle de olabilir; yine de bir doktora görünmek gerekir."],
[["risk","neden","sebep","genetik","brca"],"Başlıca risk faktörleri: ileri yaş, ailede göğüs/yumurtalık kanseri öyküsü, BRCA1/BRCA2 gen mutasyonları, erken adet görme / geç menopoz, hiç doğum yapmama veya geç yaşta ilk doğum, obezite, alkol ve hareketsizlik. Risk faktörü olmayan kişilerde de görülebilir."],
[["muayene","kendi kendine","self"],"Kendi kendine meme muayenesi için ayda bir, adet bitiminden sonraki günlerde:\n1) Aynada iki memeyi karşılaştırarak bak.\n2) Parmak uçlarınla dairesel hareketlerle tüm memeyi ve koltuk altını yokla.\n3) Meme başını hafifçe sıkıp akıntı olup olmadığına bak.\nBir değişiklik fark edersen beklemeden doktora git."],
[["mamografi","tarama","goruntuleme","ultrason"],"Mamografi, meme kanserini ele gelmeden yakalayabilen en önemli tarama yöntemidir. Türkiye’de Sağlık Bakanlığı KETEM merkezleri 40–69 yaş arası kadınlara 2 yılda bir ücretsiz mamografi sunar. Genç kadınlarda ve yoğun meme dokusunda ultrason ek olarak kullanılır."],
[["iyi huylu","kotu huylu","benign","malign","fark"],"İyi huylu (benign) tümörler çevre dokuya yayılmaz ve genellikle yaşamı tehdit etmez. Kötü huylu (malign) tümörler çevre dokuya sızabilir ve vücudun başka bölgelerine yayılabilir. Ayrımı biyopsi ve patolojik inceleme ile kesin olarak yapılır."],
[["evre","evreleme"],"Göğüs kanseri 0–4 arasında evrelenir. Evre 0 yerinde (in situ) hastalık, Evre 1–2 küçük ve sınırlı tümör, Evre 3 lokal ileri hastalık, Evre 4 diğer organlara yayılmış hastalıktır. Evre ne kadar erkense sağkalım oranları o kadar yüksektir."],
[["tedavi","ameliyat","kemoterapi","radyoterapi","ilac"],"Tedavi kişiye ve evreye göre planlanır: cerrahi (kitle çıkarma veya mastektomi), radyoterapi, kemoterapi, hormon tedavisi ve hedefe yönelik / immünoterapi ilaçlar. Plan, onkoloji ekibi tarafından birlikte belirlenir."],
[["onle","korun","onlem","beslenme","spor"],"Riski azaltmaya yardımcı olanlar: düzenli egzersiz, sağlıklı kiloyu korumak, alkolü azaltmak, sigaradan uzak durmak, mümkünse emzirmek ve düzenli taramalara katılmak. Hiçbir yöntem riski tamamen sıfırlamaz."],
[["erkek"],"Erkeklerde de göğüs kanseri görülebilir; tüm vakaların yaklaşık %1’ini oluşturur. Memede ele gelen kitle varsa cinsiyetten bağımsız olarak doktora başvurulmalıdır."],
[["veri","dataset","wisconsin","ozellik"],"Model, Wisconsin Breast Cancer veri setiyle eğitildi: 569 hastadan alınan ince iğne aspirasyonu görüntülerinden hesaplanan hücre çekirdeği ölçümleri (yarıçap, doku, içbükeylik, simetri vb.). Etiketler: M (kötü huylu) ve B (iyi huylu)."],
[["model","algoritma","lojistik","random forest","orman","dogruluk","accuracy"],"Çalışmada Logistic Regression ve Random Forest karşılaştırıldı. Veri eğitim/test (%80/%20) olarak bölünüp StandardScaler ile ölçeklendi. Bu sitedeki canlı tahmin, hızlı çalışması için 6 özellikli bir Lojistik Regresyon kullanır (test doğruluğu ≈ %94)."],
[["recall","duyarlilik","precision","kesinlik","f1","metrik"],"Tıbbi problemlerde en kritik metrik genellikle Recall’dur: gerçek hastaların kaçını yakaladık? Hasta birini kaçırmak (yanlış negatif), sağlıklı birine yanlış alarm vermekten çok daha tehlikelidir. Precision ise “hasta” dediklerimizin kaçının gerçekten hasta olduğunu gösterir; F1 ikisinin dengesidir."],
[["tahmin","hesapla","olcum"],"Sağ taraftaki panelde 6 hücre ölçümünü kaydırıcılarla ayarlayıp “Tahmin et” düğmesine bas. Sonucu burada sana açıklayacağım. 👉"],
[["tesekkur","sag ol","sagol"],"Rica ederim! Kendine iyi bak, düzenli kontrollerini ihmal etme 💗"]
];
const log=document.getElementById("log");
function say(w,t){const d=document.createElement("div");d.className="m "+w;d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight}
function reply(t){const n=norm(t);let best=null,sc=0;KB.forEach(([k,a])=>{const s=k.filter(x=>n.includes(x)).length;if(s>sc){sc=s;best=a}});
return best||"Bunu tam anlayamadım. Belirtiler, risk faktörleri, tarama, tedavi, evreler, model ya da veri seti hakkında sorabilirsin."}
function ask(t){if(!t.trim())return;say("usr",t);setTimeout(()=>say("bot",reply(t)),350)}
document.getElementById("fm").onsubmit=e=>{e.preventDefault();const q=document.getElementById("q");ask(q.value);q.value=""};
["Belirtiler nelerdir?","Risk faktörleri","Kendi kendine muayene","Mamografi","İyi huylu ve kötü huylu farkı","Tedavi yöntemleri","Model nasıl çalışıyor?","Recall neden önemli?"].forEach(t=>{
const b=document.createElement("button");b.className="chip";b.type="button";b.textContent=t;b.onclick=()=>ask(t);document.getElementById("chips").appendChild(b)});
say("bot",reply("merhaba"));
