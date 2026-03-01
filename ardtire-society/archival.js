const {
  Document, Packer, Paragraph, TextRun,
  AlignmentType, BorderStyle, Header, Footer, PageBreak,
  WidthType, Table, TableRow, TableCell, ShadingType
} = require('docx');
const fs = require('fs');

// ── palette ──────────────────────────────────────────────────────────────────
const NAVY  ="1A2B4A", ROYAL="2E5FA3", GOLD="C8A951", FOREST="1D5C3A",
      CLARET="7A1F2E", TEXT ="1A1A1A", MUTED="555555", LGREY="F0F3F7",
      MGREY ="CCCCCC", GRNBG="F0FFF4", REDBG="FFF5F5", CREAM="FFFDF0",
      BLUEBG="F0F4FF", SLATE ="4A5568",
      // classification tier colours
      C_UN  ="FFFFFF", C_OF  ="F0F4FF", C_OS  ="E8F0FF", C_CO  ="FFF8E1",
      C_SE  ="FFF0E0", C_TS  ="FFF0F0",
      TC_UN ="555555", TC_OF ="2E5FA3", TC_OS ="1A2B4A", TC_CO ="A06000",
      TC_SE ="C85000", TC_TS ="7A1F2E";

// ── text ──────────────────────────────────────────────────────────────────────
const t  =(s,o={})=>new TextRun({text:s,font:"Georgia",size:22,color:TEXT,...o});
const tb =(s,o={})=>t(s,{bold:true,...o});
const ti =(s,o={})=>t(s,{italics:true,color:MUTED,...o});

// ── structure ─────────────────────────────────────────────────────────────────
const rule=(c=GOLD,sz=4)=>new Paragraph({children:[],spacing:{before:160,after:160},
  border:{bottom:{style:BorderStyle.SINGLE,size:sz,color:c,space:2}}});
const thin=()=>new Paragraph({children:[],spacing:{before:80,after:80},
  border:{bottom:{style:BorderStyle.SINGLE,size:1,color:MGREY,space:1}}});
const sp=(b=120,a=120)=>new Paragraph({children:[t("")],spacing:{before:b,after:a}});
const pb=()=>new Paragraph({children:[new PageBreak()],pageBreakBefore:true});

function pH(num,title){return[sp(400,80),
  new Paragraph({children:[new TextRun({text:`PART ${num}`,font:"Arial",size:18,bold:true,color:GOLD,allCaps:true})],
    alignment:AlignmentType.CENTER,spacing:{before:0,after:40}}),
  new Paragraph({children:[new TextRun({text:title,font:"Arial",size:28,bold:true,color:NAVY})],
    alignment:AlignmentType.CENTER,spacing:{before:0,after:40},
    border:{bottom:{style:BorderStyle.SINGLE,size:8,color:GOLD,space:6}}}),
  sp(80,160)];}

function art(num,title){return new Paragraph({children:[
  new TextRun({text:`Article ${num}. `,font:"Arial",size:24,bold:true,color:ROYAL}),
  new TextRun({text:title,font:"Arial",size:24,bold:true,color:NAVY})],
  spacing:{before:320,after:120},border:{bottom:{style:BorderStyle.SINGLE,size:2,color:ROYAL,space:3}}});}

function sec(num,title){return new Paragraph({children:[
  new TextRun({text:`§${num}  `,font:"Arial",size:22,bold:true,color:ROYAL}),
  new TextRun({text:title,font:"Arial",size:22,bold:true,color:NAVY})],
  spacing:{before:240,after:80}});}

function body(runs,indent=0){const ch=Array.isArray(runs)?runs:[t(runs)];
  return new Paragraph({children:ch,spacing:{before:60,after:80},
    indent:indent?{left:indent}:undefined,alignment:AlignmentType.JUSTIFIED});}

function cl(l,text,ind=480){const r=Array.isArray(text)?text:[t(text)];
  return new Paragraph({children:[tb(`(${l})  `),...r],
    spacing:{before:60,after:60},indent:{left:ind},alignment:AlignmentType.JUSTIFIED});}

function def(term,definition){return new Paragraph({children:[
  new TextRun({text:`"${term}"`,font:"Georgia",size:22,bold:true,color:NAVY}),
  t(`  means ${definition}`)],
  spacing:{before:80,after:80},indent:{left:480,hanging:480},alignment:AlignmentType.JUSTIFIED});}

function note(text){return new Paragraph({children:[
  new TextRun({text:"Note — ",font:"Arial",size:18,bold:true,italics:true,color:GOLD}),
  new TextRun({text,font:"Arial",size:18,italics:true,color:MUTED})],
  spacing:{before:60,after:80},indent:{left:480},shading:{fill:CREAM,type:ShadingType.CLEAR}});}

function ruleBox(text,color=FOREST,bg=GRNBG){return new Paragraph({children:[
  new TextRun({text:"Rule — ",font:"Arial",size:18,bold:true,italics:true,color}),
  new TextRun({text,font:"Arial",size:18,italics:true,color:MUTED})],
  spacing:{before:60,after:80},indent:{left:480},shading:{fill:bg,type:ShadingType.CLEAR}});}

function warn(text){return new Paragraph({children:[
  new TextRun({text:"Important — ",font:"Arial",size:18,bold:true,italics:true,color:CLARET}),
  new TextRun({text,font:"Arial",size:18,italics:true,color:MUTED})],
  spacing:{before:60,after:80},indent:{left:480},shading:{fill:REDBG,type:ShadingType.CLEAR}});}

function principle(text){return new Paragraph({children:[
  new TextRun({text:"Principle — ",font:"Arial",size:18,bold:true,italics:true,color:ROYAL}),
  new TextRun({text,font:"Arial",size:18,italics:true,color:MUTED})],
  spacing:{before:60,after:80},indent:{left:480},shading:{fill:BLUEBG,type:ShadingType.CLEAR}});}

function stdTable(rows,colWidths,opts={}){
  const bdr={style:BorderStyle.SINGLE,size:1,color:MGREY};
  const borders={top:bdr,bottom:bdr,left:bdr,right:bdr};
  return new Table({
    width:{size:colWidths.reduce((a,b)=>a+b,0),type:WidthType.DXA},
    columnWidths:colWidths,
    rows:rows.map((row,ri)=>new TableRow({children:row.map((cell,ci)=>{
      const isH=ri===0, isE=!isH&&ri%2===0;
      const fill=isH?NAVY:isE?LGREY:"FFFFFF";
      return new TableCell({borders,width:{size:colWidths[ci],type:WidthType.DXA},
        shading:{fill,type:ShadingType.CLEAR},
        margins:{top:80,bottom:80,left:120,right:120},
        children:[new Paragraph({children:[new TextRun({
          text:String(cell),font:isH?"Arial":"Georgia",size:18,
          bold:isH||(ci===0&&opts.b1),color:isH?"FFFFFF":TEXT})],
          spacing:{before:0,after:0}})]});
    })}))
  });
}

// ── classification tier table row ─────────────────────────────────────────────
function tierRow(code,label,fillBg,tc,harm,access,handling){
  const bdr={style:BorderStyle.SINGLE,size:1,color:MGREY};
  const borders={top:bdr,bottom:bdr,left:bdr,right:bdr};
  const cols=[1400,1800,2200,2200,1800,1600];
  const vals=[code,label,harm,access,handling,""];
  return new TableRow({children:vals.map((v,ci)=>new TableCell({borders,
    width:{size:cols[ci],type:WidthType.DXA},
    shading:{fill:ci===0||ci===1?fillBg:"FFFFFF",type:ShadingType.CLEAR},
    margins:{top:60,bottom:60,left:100,right:100},
    children:[new Paragraph({children:[new TextRun({
      text:v,font:"Georgia",size:17,bold:ci<=1,color:ci<=1?tc:TEXT})],
      spacing:{before:0,after:0}})]
  }))});
}

function classificationTable(){
  const bdr={style:BorderStyle.SINGLE,size:1,color:MGREY};
  const borders={top:bdr,bottom:bdr,left:bdr,right:bdr};
  const cols=[1400,1800,2200,2200,1800,1600];
  const hdrs=["Code","Tier Name","Harm if Disclosed","Authorised Access","Handling Requirement","Marking Colour"];
  const hRow=new TableRow({children:hdrs.map((h,ci)=>new TableCell({borders,
    width:{size:cols[ci],type:WidthType.DXA},
    shading:{fill:NAVY,type:ShadingType.CLEAR},
    margins:{top:60,bottom:60,left:100,right:100},
    children:[new Paragraph({children:[new TextRun({text:h,font:"Arial",size:17,bold:true,color:"FFFFFF"})],
      spacing:{before:0,after:0}})]
  }))});
  return new Table({width:{size:cols.reduce((a,b)=>a+b,0),type:WidthType.DXA},columnWidths:cols,rows:[hRow,
    tierRow("U","UNCLASSIFIED",C_UN,TC_UN,"None — information is not sensitive","Any person","No special requirements. May be published freely.","Black on white"),
    tierRow("O","OFFICIAL",C_OF,TC_OF,"Low to moderate — embarrassment or minor operational harm if disclosed","Kingdom officers and other persons with legitimate need","Handle as normal official business. Secure storage when not in active use. Do not share externally without authority.","Blue header"),
    tierRow("OS","OFFICIAL-SENSITIVE",C_OS,TC_OS,"Significant — operational harm, breach of duty, damage to individuals if disclosed","Officers with a specific need-to-know; access list required","Locked storage. Do not transmit by ordinary email. Log access. Review classification annually.","Dark blue header"),
    tierRow("C","CONFIDENTIAL",C_CO,TC_CO,"Serious — significant damage to individuals, operations, or international relations","Named individuals only; Originator must approve each new recipient","Encrypted transmission only. Physical: locked cabinet. Log every access. Annual classification review mandatory.","Amber header"),
    tierRow("S","SECRET",C_SE,TC_SE,"Grave — would raise international tensions, substantially damage intelligence operations, endanger individuals","Very restricted; named recipients cleared to Secret level; Originator Control","Encrypted storage and transmission at standards specified in 00-04-01. No copies without Originator approval. Physical: safe. Biannual review.","Orange header"),
    tierRow("TS","TOP SECRET",C_TS,TC_TS,"Exceptionally grave — would directly threaten national security, cause widespread loss of life, or compromise vital intelligence sources","Extremely restricted; named individuals cleared to Top Secret; Originator Control; Need-to-Know","Most stringent handling. Compartmented access. Physical: Grade V security container. All copies numbered. No electronic transmission except over approved systems. Quarterly review.","Red header"),
  ]});
}

const hdr=new Header({children:[new Paragraph({children:[
  new TextRun({text:"KINGDOM OF ARDTIRE",font:"Arial",size:16,bold:true,color:NAVY}),
  new TextRun({text:"   ·   ",font:"Arial",size:16,color:GOLD}),
  new TextRun({text:"00-03-02  Archival Policy & Classification Framework",font:"Arial",size:16,color:MUTED})],
  border:{bottom:{style:BorderStyle.SINGLE,size:4,color:GOLD,space:4}},
  spacing:{before:0,after:120}})]});
const ftr=new Footer({children:[new Paragraph({children:[
  new TextRun({text:"OFFICIAL DOCUMENT  ·  UNCLASSIFIED  ·  Page",font:"Arial",size:16,color:"AAAAAA"})],
  border:{top:{style:BorderStyle.SINGLE,size:2,color:"DDDDDD",space:4}},
  alignment:AlignmentType.CENTER,spacing:{before:80}})]});

const C=[

  // ── TITLE PAGE ──────────────────────────────────────────────────────────────
  sp(1200,160),
  new Paragraph({children:[new TextRun({text:"KINGDOM OF ARDTIRE",font:"Arial",size:22,bold:true,
    color:GOLD,allCaps:true,characterSpacing:80})],
    alignment:AlignmentType.CENTER,spacing:{before:0,after:160}}),
  new Paragraph({children:[new TextRun({text:"ARCHIVAL POLICY &\nCLASSIFICATION FRAMEWORK",
    font:"Arial",size:36,bold:true,color:NAVY})],
    alignment:AlignmentType.CENTER,spacing:{before:0,after:200}}),
  new Paragraph({children:[new TextRun({text:"Document Reference: 00-03-02",font:"Arial",size:20,color:MUTED})],
    alignment:AlignmentType.CENTER,spacing:{before:0,after:60}}),
  rule(),sp(120,60),
  new Paragraph({children:[ti("A Cross-Cutting Instrument of Governance — Category 03: Records Management",{font:"Arial",size:24})],
    alignment:AlignmentType.CENTER,spacing:{before:0,after:120}}),
  new Paragraph({children:[ti("Establishing the National Archive of the Kingdom; prescribing the standards for physical and digital archival preservation; governing the information classification system across all tiers from Unclassified to Top Secret; setting the criteria and procedure for archival appraisal and selection; governing public and researcher access to archives; and providing for declassification, reclassification, deaccessioning, and international archival co-operation",{font:"Arial",size:20})],
    alignment:AlignmentType.CENTER,spacing:{before:0,after:240}}),
  sp(200,60),
  ...[
    ["Document Category","00 — Cross-Cutting  ·  03 — Records Management"],
    ["Document Number","00-03-02"],
    ["Version","1.0"],
    ["Status","Draft — For Adoption by the Founding Privy Council"],
    ["Companion Documents","00-01-04  Document Lifecycle & Version Control Procedures"],
    ["","00-02-03  Freedom of Information Framework"],
    ["","00-03-01  Records Retention Schedules"],
    ["","00-04-01  Information Classification and Security Policy (forthcoming)"],
    ["Prepared by","Royal Chancery — Records Management Division / National Archivist's Office"],
  ].map(([l,v])=>new Paragraph({children:[
    new TextRun({text:l?`${l}: `:"    ",font:"Arial",size:18,bold:!!l,color:MUTED}),
    new TextRun({text:v,font:"Arial",size:18,color:MUTED})],
    alignment:AlignmentType.CENTER,spacing:{before:40,after:40}})),
  sp(200,60),rule(),sp(100,60),
  new Paragraph({children:[ti("To hold a nation's archives is to hold its memory. The National Archive is not a warehouse for inconvenient paperwork; it is the repository of the Kingdom's identity — the evidence of what was decided, who decided it, what was promised, what was done, and what was left undone. The classification system is what protects the most sensitive of those records during their active lives, and what determines when protection gives way to the public's equal right to know the history of the state that governs it.",{font:"Arial",size:18})],
    alignment:AlignmentType.CENTER}),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("I","PRELIMINARY"),

  art("1","Citation and Commencement"),
  sec("1.1","Citation"),
  body("This Framework may be cited as the Archival Policy and Classification Framework of the Kingdom of Ardtire, Document Reference 00-03-02."),
  sec("1.2","Commencement"),
  body("This Framework comes into force upon adoption by the Founding Privy Council. The National Archive is hereby established with effect from that date. The classification system prescribed in Part IV applies to all records of the Kingdom from that date; existing records shall be classified in accordance with Part IV within ninety days."),
  sec("1.3","Relationship to Other Instruments"),
  cl("a",[tb("Document 00-01-04 (Document Lifecycle): "),t("establishes the lifecycle through which records pass from creation to disposition. This Framework governs the archival end of that lifecycle — the National Archive to which records are transferred, the standards under which they are preserved there, and the conditions under which they can be accessed.")]),
  cl("b",[tb("Document 00-03-01 (Records Retention Schedules): "),t("specifies when records must be transferred to the National Archive and which must be preserved permanently. This Framework governs what happens to those records once transferred. The two instruments are sequential: 00-03-01 determines whether a record reaches the Archive; 00-03-02 governs everything that happens thereafter.")]),
  cl("c",[tb("Document 00-02-03 (Freedom of Information Framework): "),t("governs access to records held by public authorities during their active life. Access to records once transferred to the National Archive is governed primarily by this Framework, with the FOI Framework applying subsidiarily to records that have not yet reached their archival opening date.")]),
  cl("d",[tb("Document 00-04-01 (Information Classification and Security Policy, forthcoming): "),t("will prescribe the technical and physical security standards for handling classified records. This Framework establishes the classification tiers and the policy framework; Document 00-04-01 will specify implementation. Where that document has not yet been issued, the handling requirements in Part IV of this Framework govern.")]),
  principle("Archives are, in the long run, the most important accountability mechanism the Kingdom possesses. Parliamentary debates, FOI disclosures, and public inquiries operate in the present; archives operate across time. The decisions made today about what is preserved, how it is classified, and when it becomes accessible will determine what future generations can know about the governance of the Kingdom. Those decisions must therefore be made with the future in mind, not merely with the convenience of the present."),

  sp(),art("2","Definitions"),
  sec("2.1","Defined Terms"),sp(60,40),
  def("Accession","the formal acceptance of a transfer of records into the custody of the National Archive, recorded in the Accession Register."),
  def("Appraisal","the process by which the National Archivist evaluates a body of records to determine which should be permanently preserved in the National Archive, which should be retained by the originating body for a further period, and which may be destroyed."),
  def("Born-Digital Record","a record that was created in digital form and has never existed as a physical document; distinct from a digitised record which began as a physical document and was subsequently converted to digital form."),
  def("Classification Authority","an officer who holds the authority to assign, upgrade, downgrade, or remove a classification marking, as prescribed in Part V."),
  def("Classification Tier","one of the six levels in the Kingdom's information classification system, from Unclassified to Top Secret, prescribed in Part IV."),
  def("Closed Period","the period during which a record transferred to the National Archive remains closed to public access, pending expiry of the applicable access restriction."),
  def("Declassification","the formal removal of a classification marking from a record, with the effect that the record becomes accessible at the next lower tier or at Unclassified, as appropriate."),
  def("Digital Preservation","the sustained management of digital records over time to ensure they remain accessible, authentic, and intelligible despite changes in technology, including through migration to new formats and verification of file integrity."),
  def("Format Migration","the transfer of the content of a digital record from one file format to another, necessitated by the obsolescence or unsupported status of the original format, conducted so as to preserve the content and its meaning faithfully."),
  def("Finding Aid","a descriptive tool — catalogue, index, guide, or inventory — that describes the content, arrangement, and provenance of archival holdings and enables researchers and the public to identify and locate records."),
  def("National Archive","the permanent repository of the Kingdom of Ardtire established under Article 3, comprising both physical and digital holdings."),
  def("National Archivist","the officer appointed by the Lord Chancellor under Article 4, responsible for the management and preservation of the National Archive."),
  def("Need-to-Know","the principle that access to classified information is permitted only to persons who require it for the performance of their official duties, regardless of the level of clearance they hold."),
  def("Originator","the officer or body that created a record and who, by reason of that creation, holds the primary classification authority for it."),
  def("Originator Control (ORCON)","a restriction, applied by the Originator, prohibiting the further dissemination of a classified record without the Originator's express approval."),
  def("Provenance","the origin and custody history of archival records — which body created them, in connection with which functions, and through what chain of custody they arrived in the Archive."),
  def("Reading Room","the secure, supervised space in the National Archive in which accredited researchers and members of the public may access archival records."),
  def("Reclassification","the formal change of a record's classification from one tier to another, either upward or downward."),
  def("Security Clearance","a formal determination by the competent security authority that an individual may be trusted with access to classified information at a specified tier."),
  def("Transfer List","the schedule of individual records transferred from a public authority to the National Archive in connection with a specific Accession, prepared by the transferring authority and verified by the National Archivist."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("II","THE NATIONAL ARCHIVE"),

  art("3","Establishment of the National Archive"),
  sec("3.1","The Archive"),
  body("The National Archive of the Kingdom of Ardtire is hereby established as a permanent institution of the Kingdom, housed within the Royal Chancery until such time as dedicated premises are established. The National Archive is not a branch of any Ministry; it is an institution of the Crown, administered by the National Archivist under the oversight of the Lord Chancellor. Its collections are the inalienable heritage of the Kingdom and may not be broken up, destroyed, or removed from the Kingdom's jurisdiction except in the circumstances prescribed in Article 34."),
  sec("3.2","Functions"),
  body("The National Archive's functions are:"),
  cl("a","to receive and accession records transferred from public authorities in accordance with Document 00-03-01 and this Framework;"),
  cl("b","to preserve those records permanently, in physical and digital form, to archival standards;"),
  cl("c","to appraise records to determine their archival value, in accordance with Part VI;"),
  cl("d","to provide public and researcher access to archival holdings on the terms prescribed in Parts VIII and IX;"),
  cl("e","to maintain Finding Aids — catalogues, indexes, and guides — enabling effective navigation of the holdings;"),
  cl("f","to digitise physical holdings progressively, in order of significance and fragility;"),
  cl("g","to advise public authorities on records management, classification, and transfer practices;"),
  cl("h","to carry out or commission appraisal visits to public authorities before records are transferred;"),
  cl("i","to publish an Annual Report on the state of the holdings, access statistics, and preservation activity; and"),
  cl("j","to engage in international archival co-operation in accordance with Part XII."),
  sec("3.3","Inalienability of Holdings"),
  body("Records accessioned into the National Archive are held in trust for the people of the Kingdom of Ardtire, past, present, and future. They are not the property of the originating body, the current government, or any officer. No government may direct the National Archivist to destroy, conceal, alter, or reclassify archival holdings for political convenience. A direction to do so is void; the National Archivist shall report such a direction to the Lord Chancellor and to Parliament immediately."),

  sp(),art("4","The National Archivist"),
  sec("4.1","Appointment"),
  body("The National Archivist is appointed by the Lord Chancellor after open competition for candidates with demonstrated expertise in archival science, records management, or a closely related field. The appointment shall be for a term of seven years, renewable once. The National Archivist is an independent professional officer; they are not a political appointee and may not be removed for exercising their professional judgment."),
  sec("4.2","Independence"),
  body("The National Archivist makes all appraisal, access, and preservation decisions independently, in accordance with professional archival standards and this Framework. No Minister, officer, or body of the Kingdom may direct the National Archivist on the outcome of any appraisal decision, the timing of any archival opening, or the provision or refusal of access to any specific record. The National Archivist may receive guidance on policy and resources from the Lord Chancellor; they may not receive directions on the substance of individual archival decisions."),
  sec("4.3","Removal"),
  body("The National Archivist may be removed only by the Lord Chancellor, with the approval of Parliament, on the grounds of: incapacity to perform the functions of the office; serious professional misconduct; or conviction of a criminal offence. Removal for reasons other than these, or removal without Parliamentary approval, is unlawful and has no effect."),
  sec("4.4","Responsibilities"),
  body("The National Archivist is responsible for:"),
  cl("a","the physical security, environmental control, and preservation of all holdings;"),
  cl("b","the intellectual control of the holdings — the arrangement, description, and cataloguing of records;"),
  cl("c","the management of access, including the Reading Room, researcher accreditation, and online access;"),
  cl("d","decisions on Appraisal, transfer acceptance, and deaccessioning;"),
  cl("e","the management of the Archive's staff and resources;"),
  cl("f","the Kingdom's participation in international archival bodies; and"),
  cl("g","the publication of the Annual Report."),
  sec("4.5","Phase One — Interim Arrangements"),
  body("Until the National Archivist is appointed, the Registrar of the Royal Chancery performs the functions of the National Archivist under this Framework. The Registrar shall recommend the appointment of the National Archivist to the Lord Chancellor within six months of the commencement of Phase Two."),

  sp(),art("5","Physical Infrastructure of the Archive"),
  sec("5.1","Repository Standards"),
  body("The physical repository of the National Archive — the strongroom or strongrooms in which physical records are stored — shall meet or exceed the following environmental and physical standards:"),
  cl("a",[tb("Temperature: "),t("maintained at 14–18°C (57–64°F) for paper records; 10–15°C (50–59°F) for photographic, film, and magnetic media. Fluctuation not to exceed ±2°C per day.")]),
  cl("b",[tb("Relative humidity: "),t("maintained at 45–55% for paper records; 30–40% for magnetic and optical media. Fluctuation not to exceed ±5% per day. Persistent high humidity promotes mould; persistent low humidity causes brittleness and cracking.")]),
  cl("c",[tb("Light: "),t("ultraviolet-filtered lighting only. No direct sunlight. Shelving oriented so that records are not exposed to light sources when not in active use.")]),
  cl("d",[tb("Air quality: "),t("filtered to remove particulates, sulphur dioxide, and nitrogen dioxide, which accelerate paper degradation. Active air filtration required.")]),
  cl("e",[tb("Fire: "),t("fire detection and suppression system using a gaseous suppressant that does not damage records. Sprinkler systems are not appropriate for archival repositories where water damage would be catastrophic.")]),
  cl("f",[tb("Flood: "),t("records stored above floor level on shelving designed to be raised in the event of flooding. No water pipes running through storage areas unless unavoidable, in which case protection measures required.")]),
  cl("g",[tb("Pest: "),t("pest management programme to prevent infestation by insects and rodents. Incoming records to be quarantined and inspected before accessioning.")]),
  cl("h",[tb("Security: "),t("access to storage areas restricted to authorised Archive staff and supervised visitors. CCTV monitoring. Intruder alarm. Access log maintained for each entry.")]),
  sec("5.2","Shelving and Packaging"),
  body("Records shall be stored in archival-quality enclosures — acid-free boxes, folders, and sleeves — that protect them from light, dust, and physical damage. Metal shelving shall be used in preference to wood, which can off-gas acids. Shelving shall be designed to prevent records from slumping, bending, or being crushed. Oversized records (maps, plans, architectural drawings) shall be stored flat in map cases or rolled on archival-quality tubes. Fragile or damaged records shall be individually assessed and given appropriate protective housing before shelving."),
  sec("5.3","Disaster Recovery"),
  body("The National Archivist shall maintain a Disaster Recovery Plan, reviewed and tested not less than once per year, specifying: priority items for rescue in the event of fire, flood, or other catastrophe; the salvage procedures for wet or smoke-damaged records; contact details for specialist conservators; and the communication chain for activating the recovery plan. The highest priority records for salvage are Vital Records as defined in Document 00-03-01, Article 4. The Disaster Recovery Plan shall be shared with the Kingdom's emergency services."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("III","DIGITAL ARCHIVAL STANDARDS"),

  art("6","The Digital Archive"),
  sec("6.1","Scope"),
  body("The National Archive maintains a Digital Archive alongside the physical archive. The Digital Archive holds: Born-Digital Records transferred from public authorities; digitised copies of physical records; and metadata describing all holdings — physical and digital — in the Archive Catalogue. The Digital Archive is as permanent an institution as the physical archive; the National Archivist is equally responsible for both."),
  sec("6.2","Formats for Long-Term Preservation"),
  body("Born-Digital Records transferred to the National Archive shall be normalised — converted, where necessary and without loss of content — to formats designated by the National Archivist as supported for long-term preservation. The supported format list shall be published and maintained by the National Archivist, reviewed annually. The following categories of format are generally preferred:"),
  cl("a",[tb("Text documents: "),t("PDF/A (ISO 19005) — the archival variant of PDF, designed for long-term preservation with embedded fonts and without external dependencies. Plain text (UTF-8 encoded) for unformatted text records.")]),
  cl("b",[tb("Structured data: "),t("CSV (comma-separated values) or XML for datasets; JSON for structured data with schema documentation. Database exports shall be accompanied by full schema documentation.")]),
  cl("c",[tb("Images: "),t("TIFF (uncompressed, high resolution) as the archival master; JPEG 2000 for derivative access copies. Minimum scanning resolution for text documents: 400 DPI; for photographs: 600 DPI.")]),
  cl("d",[tb("Audio: "),t("Broadcast WAV (BWF) at 48 kHz / 24-bit as the archival master. MP3 or AAC for access copies only.")]),
  cl("e",[tb("Video: "),t("FFV1 (lossless) in Matroska container as the archival master. H.264 for access copies. Preservation of original codecs alongside normalised copies where the original format carries significant technical information.")]),
  cl("f",[tb("Email: "),t("MBOX or EML format for individual messages; metadata must include sender, recipients, date, and any threading information.")]),
  body("Where a Born-Digital Record is in a format not on the supported list, the National Archivist shall determine whether to normalise before transfer, retain in original format with documentation of the original software environment (emulation strategy), or both."),
  sec("6.3","File Integrity and Fixity"),
  body("Every digital file in the National Archive shall have a cryptographic hash value (SHA-256 or stronger) calculated at the time of ingest and stored in the Archive Catalogue. The National Archivist shall conduct fixity checks — re-calculating hash values and comparing with stored values — not less than:"),
  cl("a","annually for all digital holdings;"),
  cl("b","immediately after any system migration or format migration; and"),
  cl("c","immediately after any incident that may have affected the integrity of stored files."),
  body("A mismatch between a stored and recalculated hash value indicates that the file has been altered — either through corruption, system error, or deliberate interference. Every such mismatch shall be investigated immediately and reported to the Lord Chancellor. The affected file shall be quarantined and restored from backup if a clean backup exists."),
  sec("6.4","Redundant Storage"),
  body("Every file in the Digital Archive shall be stored in a minimum of three copies: a primary copy in the Archive's main digital storage system; a secondary copy in an offsite storage facility geographically separated from the primary; and a tertiary copy in a format and system that is independent of the primary and secondary (for example, on a different storage media technology). The three-copy strategy — implemented under the '3-2-1 rule' (three copies, on at least two different media types, with at least one off-site) — protects against hardware failure, site catastrophe, and media degradation."),
  sec("6.5","Format Migration"),
  body("When a file format in the Digital Archive becomes obsolete or unsupported — meaning that no current software can reliably open and render the file — the National Archivist shall conduct a Format Migration programme, converting affected files to a current supported format. Format Migration shall be conducted:"),
  cl("a","without loss of content — every element of the original record shall be present in the migrated version;"),
  cl("b","with preservation of the original file alongside the migrated copy for a period of not less than ten years, to enable verification that migration was accurate;"),
  cl("c","with documentation of the migration — the original format, the target format, the migration tool used, the date, and the officer responsible; and"),
  cl("d","with a fixity check on the migrated file immediately after migration."),
  note("Format obsolescence is the greatest single threat to Born-Digital Records. A physical record from 1800 can still be read by any literate person; a digital record from 1990 in a proprietary format may be completely inaccessible today. The National Archivist's obligation to monitor and respond to format obsolescence is ongoing and perpetual — there is no point at which a digital record can be considered safely preserved and left unattended."),
  sec("6.6","Emulation"),
  body("For digital records where the format itself carries significant meaning — software, interactive documents, records whose content depends on the rendering environment — the National Archivist may pursue an emulation strategy in addition to or instead of Format Migration. Emulation recreates the original software environment, enabling the record to be experienced as it was originally created. The National Archivist shall maintain documentation of original software environments sufficient to support future emulation, even where emulation tools do not yet exist."),
  sec("6.7","Digitisation of Physical Records"),
  body("The National Archivist shall maintain a rolling Digitisation Programme for physical holdings, prioritising:"),
  cl("a","records at risk — fragile, damaged, or deteriorating records where digitisation will reduce physical handling and preserve the content even if the physical object further deteriorates;"),
  cl("b","high-demand records — frequently requested records where digitisation will improve access without repeated handling of the original;"),
  cl("c","Vital Records — to create a digital backup of the most important physical holdings; and"),
  cl("d","records of widespread public interest — records whose digital availability would benefit the largest number of researchers and members of the public."),
  body("Digitisation creates an access copy and a preservation copy; it does not authorise destruction of the physical original. Physical originals shall be retained after digitisation unless the National Archivist certifies, in writing, that the digitisation meets or exceeds the informational value of the physical record and the physical record has no intrinsic value (condition, material, seal, or other physical attribute) beyond its informational content."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("IV","THE INFORMATION CLASSIFICATION SYSTEM"),

  art("7","Purpose and Scope of Classification"),
  sec("7.1","Purpose"),
  body("The information classification system protects the Kingdom's sensitive information from unauthorised disclosure during its active life. Classification is not a tool for limiting accountability, concealing official wrongdoing, or preventing the exercise of legal rights. Its purpose is to protect information whose disclosure would cause specific, identified harm — to national security, to individuals, to the Kingdom's international relations, or to the effective functioning of government. Every classification decision shall be grounded in an assessment of genuine harm, not in institutional preference for secrecy."),
  sec("7.2","Scope"),
  body("The classification system applies to all information created or held by public authorities of the Kingdom in any form — paper, electronic, oral briefings committed to written record, and any other medium. Information that has not been given a classification marking is treated as Unclassified. Officers handling information are responsible for identifying whether it requires classification and for applying the appropriate marking."),
  principle("Classification is the exception, not the rule. The default classification of all new official information is Unclassified. An officer who believes information requires a classification above Unclassified must be able to articulate the specific harm that disclosure would cause. 'This might be embarrassing' is not harm. 'This information identifies an intelligence source whose safety would be threatened by disclosure' is harm. The burden of justifying classification lies on the officer who applies it, not on the person who challenges it."),

  sp(),art("8","The Classification Tiers"),
  sec("8.1","Overview of the Six Tiers"),
  body("The Kingdom's information classification system comprises six tiers, from Unclassified to Top Secret. The tiers are ordered by the severity of harm that unauthorised disclosure would cause. The table below summarises the six tiers."),
  sp(80,80),classificationTable(),sp(80,80),
  sec("8.2","Tier 1 — Unclassified"),
  body("Information is Unclassified where its disclosure would not harm any of the interests protected by the classification system. Unclassified information may be published, shared with members of the public, and used freely. The overwhelming majority of official information is Unclassified and should be treated as such. Officers should resist the temptation to apply a classification marking to Unclassified information for reasons of tidiness or institutional habit — unnecessary classification impedes the effective conduct of government and undermines public trust."),
  sec("8.3","Tier 2 — Official"),
  body("Information is Official where its routine handling requires basic access controls — it is not intended for public distribution and its disclosure could cause limited harm, including embarrassment, minor operational difficulties, or breach of a duty of confidence. The majority of government's day-to-day working information is Official: internal guidance documents, policy working papers, personnel management communications, procurement correspondence, and similar material that officers handle as routine but which is not intended for publication. Official information does not require security clearance to handle, but it does require that officers exercise professional discretion."),
  sec("8.4","Tier 3 — Official-Sensitive"),
  body("Official-Sensitive is a sub-tier of Official that applies when information within the Official category carries a specific sensitivity that warrants additional controls. Categories of Official-Sensitive include:"),
  cl("a",[tb("OFFICIAL-SENSITIVE: COMMERCIAL — "),t("commercially sensitive information, the disclosure of which could prejudice procurement, damage the Kingdom's commercial interests, or breach a duty of confidence to a business.")]),
  cl("b",[tb("OFFICIAL-SENSITIVE: PERSONAL — "),t("personal data the disclosure of which could harm the individual concerned or constitute a significant breach of data protection obligations.")]),
  cl("c",[tb("OFFICIAL-SENSITIVE: POLICY — "),t("policy advice and deliberations whose premature disclosure could prejudice the policy formulation process or damage ministerial decision-making.")]),
  cl("d",[tb("OFFICIAL-SENSITIVE: LEGAL — "),t("information subject to legal professional privilege, or whose disclosure could prejudice legal proceedings.")]),
  body("The specific category of Official-Sensitive sensitivity shall be indicated as part of the marking, for example: 'OFFICIAL-SENSITIVE: PERSONAL'. This enables recipients to understand the nature of the sensitivity and apply appropriate handling."),
  sec("8.5","Tier 4 — Confidential"),
  body("Information is Confidential where its disclosure without authority would be likely to cause serious harm to: the interests of individuals, including physical danger, significant financial loss, or severe reputational damage; the operational effectiveness of a public authority; or the Kingdom's international relations in a way that causes significant damage. Confidential information requires a named access list and encrypted transmission; it may not be shared without the Originator's approval."),
  sec("8.6","Tier 5 — Secret"),
  body("Information is Secret where its disclosure without authority would be likely to cause grave harm to: the safety of individuals whose identity it reveals; the capability of the Kingdom's intelligence and security services; or the Kingdom's ability to prevent or detect serious crime or terrorism. Secret information requires holders to have a Security Clearance at Secret level and to have an established Need-to-Know. The number of holders of any Secret document should be kept to the absolute minimum necessary for operational purposes."),
  sec("8.7","Tier 6 — Top Secret"),
  body("Information is Top Secret where its disclosure without authority could reasonably be expected to cause exceptionally grave damage to national security, threaten directly the safety of many individuals, or compromise vital intelligence sources or methods. Top Secret information is the most sensitive category and is subject to the most stringent handling requirements. Access is restricted to specifically named individuals who hold a Top Secret Security Clearance and an established Need-to-Know for the specific information. All copies are numbered; none may be made without Originator approval."),

  sp(),art("9","Classification Markings"),
  sec("9.1","Application of Markings"),
  body("Every classified document shall bear the classification marking clearly and prominently. The requirements for each tier are:"),
  cl("a",[tb("Physical documents: "),t("the classification marking appears in the header and footer of every page, in bold, in the colour specified in Article 8 for the tier. For multi-page documents, every page shall be marked. The highest-classification page determines the marking for the cover or title page.")]),
  cl("b",[tb("Electronic documents: "),t("the classification marking appears in the document metadata and visibly in the header and footer. Where the document is printed, the marking appears as specified for physical documents.")]),
  cl("c",[tb("Emails: "),t("the classification marking appears at the beginning and end of the email body, and in the email subject line, preceded by [CLASSIFICATION TIER]. For example: '[CONFIDENTIAL] Budget proposals — Q3'.")]),
  cl("d",[tb("File and folder labels: "),t("physical files and folders shall bear the classification of the highest-classified document they contain, on the outside cover.")]),
  cl("e",[tb("Digital files and folders: "),t("digital files shall have the classification embedded in their metadata and, where the file format permits, visible in the document itself. Folder names should indicate classification to assist users.")]),
  sec("9.2","Protective Markings — Additional Restrictions"),
  body("In addition to the tier marking, documents may carry protective markings indicating specific handling restrictions:"),
  cl("a",[tb("ORIGINATOR CONTROL (ORCON): "),t("the document may not be further disseminated without the Originator's written approval. Appears alongside the tier marking.")]),
  cl("b",[tb("UK EYES ONLY / [COUNTRY] EYES ONLY: "),t("the document may not be shared with nationals or representatives of specified foreign states, regardless of their classification clearance. Used particularly for intelligence material and diplomatic communications.")]),
  cl("c",[tb("ADVISORY: NOT FOR RELEASE UNDER FOI: "),t("an advisory marking indicating that the document is likely to be exempt under the FOI Framework. This is an advisory, not a legal determination; the FOI Officer assessing a request must conduct the exemption analysis regardless of this marking.")]),
  cl("d",[tb("PERSONAL DATA: "),t("the document contains personal data subject to data protection obligations.")]),
  warn("A protective marking is not a classification tier. A document marked 'NOT FOR RELEASE UNDER FOI' is not necessarily classified; it is an administrative flag that the Originator believes it may be exempt. The FOI Officer must conduct the exemption analysis independently. Officers who systematically apply 'NOT FOR RELEASE UNDER FOI' markings as a substitute for classification analysis, or as a device to avoid FOI disclosure, are acting improperly."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("V","CLASSIFICATION AUTHORITY AND MANAGEMENT"),

  art("10","Who May Classify"),
  sec("10.1","Classification Authority"),
  body("The following officers hold Classification Authority for the tiers indicated:"),
  sp(80,80),
  stdTable([
    ["Classification Tier","Classification Authority","Can Upgrade to This Tier","Can Downgrade from This Tier"],
    ["Unclassified","Any officer creating or handling a record","Any officer — removing an unnecessary classification","Any Classification Authority"],
    ["Official","Any officer — the default handling tier","Any officer","The Originator or any officer senior to the Originator"],
    ["Official-Sensitive","Senior officer of Grade 3 or equivalent and above","Senior officer Grade 3+ or equivalent","Originator or officer senior to Originator"],
    ["Confidential","Head of Division or equivalent (Grade 5+); Lord Chancellor approval for bulk","Head of Division or equivalent; approved by Head of Division","Originator, or Head of Division on Originator's recommendation"],
    ["Secret","Permanent Secretary or equivalent (Grade 7+); Head of security service","Permanent Secretary or equivalent; Head of security service","Originator or Permanent Secretary; notify Lord Chancellor"],
    ["Top Secret","Lord Chancellor, Sovereign on advice, or Head of relevant intelligence service","Lord Chancellor, Sovereign on advice, or designated intelligence chief","Lord Chancellor only; notify Sovereign"],
  ],[2200,2800,2200,1800],{b1:true}),
  sp(80,80),
  sec("10.2","Default Classification"),
  body("The default classification of all new official information is Unclassified. An officer who believes newly created information requires a classification shall apply the lowest tier that adequately protects the identified harm. Over-classification — applying a higher tier than the harm justifies — is as problematic as under-classification: it wastes resources, impedes information sharing, and erodes trust in the classification system."),
  sec("10.3","Classification on Creation"),
  body("Classification shall be determined and applied at the time of creation of a document, not retrospectively. An officer who creates a document without applying a classification marking must treat it as Unclassified. An officer who believes a document created by another person requires classification shall raise the matter with the Originator, who retains Classification Authority. Classification may not be applied to a document by a person who is not the Originator without the Originator's knowledge, except in an emergency where the Originator is unavailable and delay would cause harm, in which case the officer applying the marking shall notify the Originator at the earliest opportunity."),
  sec("10.4","Aggregation"),
  body("A collection or aggregation of Unclassified or Official information may, in combination, warrant a higher classification than any individual element. Where the combination of information reveals something that should be protected at a higher tier — for example, a combination of individually unremarkable facts that together identify an intelligence source — the combined document or dataset shall be classified at the appropriate tier. The responsibility for identifying aggregation risks rests with the officer who is compiling the aggregated information."),

  sp(),art("11","Classification Review and Declassification"),
  sec("11.1","Mandatory Periodic Review"),
  body("Every classified document shall be reviewed for reclassification or declassification at the intervals specified in Article 8 for each tier. The review is the Originator's responsibility. Where the Originator has left the service or is otherwise unavailable, the review obligation passes to the head of the originating body. A document for which no review has been conducted for more than twice the prescribed review interval shall be automatically downgraded by one tier, pending a proper review."),
  sec("11.2","Criteria for Declassification"),
  body("A classified document shall be declassified — reduced to a lower tier or to Unclassified — when:"),
  cl("a","the information is already publicly available through other means — a document cannot remain classified on information that has been disclosed through FOI, press reporting, or official publication;"),
  cl("b","the specific harm that justified the original classification no longer exists — for example, an intelligence operation has concluded; a source whose identity was protected has been publicly identified or has consented to identification; a sensitive negotiation has been concluded and published;"),
  cl("c","the passage of time has extinguished the sensitivity — most classifications become less sensitive as time passes; and"),
  cl("d","the document is approaching its archival transfer date and no continuing sensitivity can be identified."),
  sec("11.3","Classification at Archival Transfer"),
  body("When a record is transferred to the National Archive under the schedules in Document 00-03-01, its classification shall be reviewed by the Originator as part of the transfer process. Records transferred to the National Archive shall, as a default, be:"),
  cl("a","completely declassified to Unclassified on transfer, if their retention period has expired and no exemption from the 30-year opening rule applies;"),
  cl("b","retained at their current classification for the Closed Period (Article 24), if an exemption from the 30-year opening rule applies; or"),
  cl("c","referred to the Lord Chancellor for a classification determination where the Originator's continued sensitivity assessment conflicts with the default declassification."),
  body("A document that arrives at the National Archive with a classification but no documented basis for that classification — because the original classification decision was never recorded — shall be reviewed by the National Archivist in consultation with the originating body. If no basis for continued classification can be established, the document shall be declassified."),
  sec("11.4","Emergency Reclassification"),
  body("In exceptional circumstances — where new information reveals that a document previously assessed as safe to open contains information whose disclosure would cause specific, identified harm — the Lord Chancellor may, on the National Archivist's recommendation, impose or restore a classification on a document in the National Archive. Emergency reclassification is an exceptional measure. It shall be:"),
  cl("a","recorded in the Archive Catalogue, with the date, the authority for the reclassification, and the reason — stated in terms of the specific harm identified;"),
  cl("b","reviewed within two years; and"),
  cl("c","reported to Parliament in the National Archivist's Annual Report."),
  ruleBox("Emergency reclassification must not be used to re-close documents that have been opened and whose contents have become inconvenient for the current government. Once a document has been publicly accessible, the information it contains is in the public domain; reclassification cannot undo that. Emergency reclassification is only meaningful — and only lawful — where the document has not yet been copied and the harm from future access is concrete and identified."),

  sp(),art("12","Security Clearances"),
  sec("12.1","Requirement for Clearance"),
  body("Access to information classified at Confidential or above requires the holder to have a Security Clearance at the appropriate level. A Security Clearance at a given level permits access to information at that level and all lower levels; it does not confer access to all information at that level — the Need-to-Know principle applies regardless of clearance."),
  sec("12.2","Clearance Process"),
  body("Security Clearances are granted by the security vetting authority designated by the Lord Chancellor. The process includes: verification of identity and nationality; background checks covering criminal record, financial history, and connections to individuals or organisations of security concern; assessment of character by referees; and, at higher levels, a security interview. The specific requirements for each clearance level shall be prescribed in Document 00-04-01."),
  sec("12.3","Clearance and Archives"),
  body("Records in the National Archive that remain classified at the time of access by a researcher or member of the public require the researcher to hold an appropriate Security Clearance, in addition to meeting the access requirements in Part VIII. The National Archivist shall not grant access to classified archival records to persons who do not hold an appropriate clearance, even if the record is technically within the public access period. The procedure for applying for clearance in connection with archival research shall be published by the National Archivist."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("VI","ARCHIVAL APPRAISAL"),

  art("13","Purpose and Principles of Appraisal"),
  sec("13.1","What Appraisal Resolves"),
  body("Appraisal is the process by which the National Archivist determines which records among those scheduled for transfer have enduring archival value — the value that justifies permanent preservation in the National Archive — and which may be destroyed. Not every record that reaches the end of its retention period has archival value; a government that attempted to preserve everything would be overwhelmed by records of no lasting significance. But a government that preserved too little would destroy evidence that future generations need. Appraisal is the exercise of professional judgment in navigating between these two failures."),
  principle("Archival appraisal is an irreversible act: a record selected for destruction will never be recovered. The National Archivist must therefore err on the side of preservation when uncertain. It is better to preserve records of marginal value than to destroy records of unanticipated importance. The test for destruction is not 'do we have a reason to keep this?' but 'are we certain we have no reason to keep this?'"),
  sec("13.2","Appraisal Criteria"),
  body("In assessing the archival value of a record or series, the National Archivist shall have regard to the following criteria:"),
  cl("a",[tb("Constitutional and legal significance: "),t("does the record document a constitutional event, a legal obligation, or the exercise of a statutory or prerogative power? Such records are presumptively of archival value.")]),
  cl("b",[tb("Evidential value: "),t("does the record provide unique evidence of how the Kingdom was organised and how it functioned? Records that document the internal structure and operations of public authorities in ways not captured elsewhere have high evidential value.")]),
  cl("c",[tb("Informational value: "),t("does the record contain information about events, conditions, or people that is not duplicated elsewhere and is likely to be of value to future researchers, historians, or the public?")]),
  cl("d",[tb("Administrative uniqueness: "),t("is this the only surviving record of the decision, transaction, or event it documents? A record that duplicates information available elsewhere has lower archival value than one that provides unique evidence.")]),
  cl("e",[tb("Significance of the creating body: "),t("records of central constitutional bodies — the Sovereign's household, the Privy Council, the Supreme Court — have higher presumptive archival value than records of lower-level administrative units.")]),
  cl("f",[tb("Research potential: "),t("are the records likely to be of interest to future researchers in history, law, social science, or other disciplines? The National Archivist shall consider not only current research interests but also the possibility that future research agendas may differ from present ones.")]),
  cl("g",[tb("Volume and representativeness: "),t("where a large body of similar records exists, it may be sufficient to select a representative sample for permanent preservation, rather than retaining the entire series. The sample should be selected to represent the range of the series, not merely the most significant items.")]),
  cl("h",[tb("Condition: "),t("a record in such poor condition that it cannot be preserved or read has reduced archival value, though its contents may still warrant preservation through transcription or digitisation before the physical object deteriorates further.")]),

  sp(),art("14","The Appraisal Process"),
  sec("14.1","Pre-Transfer Appraisal Visit"),
  body("Before the transfer of any significant body of records, the National Archivist shall conduct a Pre-Transfer Appraisal Visit to the originating body. The purpose of this visit is to: understand the records' creation context — the functions they document, the filing system used, and any gaps or losses; assess the physical condition of physical records and the format and integrity of digital records; and make preliminary appraisal decisions before transfer, to avoid the National Archive receiving large volumes of material that will subsequently be identified for destruction."),
  sec("14.2","Appraisal Decisions"),
  body("Following appraisal, the National Archivist shall make one of three decisions for each record or series:"),
  cl("a",[tb("Select for permanent preservation: "),t("the record is accessioned into the National Archive and placed on the Permanent Preservation List.")]),
  cl("b",[tb("Extend retention: "),t("the record has potential archival value but is not yet ready for transfer — either because the matter it relates to is not fully concluded, because access restrictions will persist for a significant period, or because the record's condition requires treatment before archiving. The National Archivist specifies the period of extension and the basis for review at the end of that period.")]),
  cl("c",[tb("Authorise destruction: "),t("the record has no archival value and may be destroyed by the originating body, in accordance with the destruction procedures in Document 00-03-01, Article 6. The National Archivist shall issue a written Destruction Authorisation, which the originating body must retain as evidence that destruction was lawfully approved.")]),
  sec("14.3","Appraisal of Electronic Records"),
  body("Appraisal of Born-Digital and digitised records follows the same criteria as physical records, but the process must account for additional complexity: digital records may be more voluminous (email systems contain millions of messages); they may be in formats that require specialist software to open; and the boundary between a 'record' and 'data' may be less clear for structured datasets than for individual documents. The National Archivist shall publish guidance on the appraisal of electronic records, adapted to the specific systems used by the Kingdom's public authorities."),
  sec("14.4","Appeals against Appraisal Decisions"),
  body("An originating body that disputes an appraisal decision — for example, because it believes records the National Archivist has proposed for destruction should be preserved, or vice versa — may appeal to the Lord Chancellor within 28 days of the appraisal decision. The Lord Chancellor shall determine the appeal within 60 days, after consulting the National Archivist and the originating body. The Lord Chancellor's determination is final."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("VII","TRANSFER TO THE NATIONAL ARCHIVE"),

  art("15","Transfer Obligations"),
  sec("15.1","Mandatory Transfer"),
  body("Every record designated for transfer to the National Archive in Document 00-03-01, or selected for permanent preservation following appraisal under Article 14, shall be transferred by the originating body within the period specified in the relevant retention schedule, or within ninety days of the National Archivist's appraisal decision, whichever is the earlier. A public authority that fails to transfer records on time shall report the reason to the Registrar and the National Archivist, who shall together determine a revised transfer date."),
  sec("15.2","Transfer Preparation"),
  body("Before transfer, the originating body shall:"),
  cl("a","prepare a Transfer List enumerating every record to be transferred, with sufficient description to identify each record in the Archive Catalogue;"),
  cl("b","for physical records: check the condition of the records, replace damaged enclosures, remove metal fastenings (staples, clips, pins) that will corrode and damage records over time, and note any records requiring conservation treatment;"),
  cl("c","for digital records: verify the integrity of files (hash values), confirm that files are in a format supported by the Digital Archive or provide format documentation, and transfer all associated metadata;"),
  cl("d","review and confirm the classification status of every record being transferred, applying the default declassification rules in Article 11.3; and"),
  cl("e","obtain the Registrar's written authority for the transfer."),
  sec("15.3","Accession"),
  body("On receipt of transferred records, the National Archivist shall:"),
  cl("a","verify the Transfer List against the records received — noting any discrepancies;"),
  cl("b","assign an Accession number and record the Accession in the Accession Register;"),
  cl("c","for physical records: quarantine for pest inspection, assess condition, assign to appropriate storage;"),
  cl("d","for digital records: verify fixity (recalculate hash values), register in the Digital Archive catalogue, and confirm supported format;"),
  cl("e","issue a Transfer Receipt to the originating body confirming receipt and accession; and"),
  cl("f","add the records to the Archive Catalogue."),

  sp(),art("16","The Archive Catalogue"),
  sec("16.1","Establishment and Maintenance"),
  body("The National Archivist shall maintain the Archive Catalogue as the comprehensive finding aid for all holdings of the National Archive — both physical and digital. The Archive Catalogue is the public face of the Archive: it is how researchers and members of the public identify what the Archive holds, whether it is open or closed, and how to request access. The Catalogue shall be publicly accessible online, searchable, and updated within sixty days of each Accession."),
  sec("16.2","Catalogue Elements"),
  body("For every archival holding, the Catalogue shall record:"),
  cl("a","the Accession number and date;"),
  cl("b","the originating body — the public authority that created and transferred the records;"),
  cl("c","the function — the government function in connection with which the records were created;"),
  cl("d","the date range of the records;"),
  cl("e","a description of the records — their content, arrangement, and any finding aids (box lists, file lists, indexes) available;"),
  cl("f","the physical format (paper, photographs, audio, video) and/or the digital format;"),
  cl("g","the volume (number of boxes, linear metres, gigabytes);"),
  cl("h","the current classification or access status — Open (Unclassified and within public access period), Closed (within Closed Period), Restricted (specific access conditions apply), or Redacted Open (available in redacted form); and"),
  cl("i","for digital holdings: the file integrity hash values and the format documentation."),
  sec("16.3","Descriptive Standards"),
  body("The Archive Catalogue shall be compiled in accordance with internationally recognised archival description standards — the International Standard Archival Description (ISAD(G)) or its successor — to ensure that the Kingdom's archival descriptions are consistent with international archival practice and interoperable with catalogues of archives in other jurisdictions."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("VIII","ACCESS TO THE NATIONAL ARCHIVE"),

  art("17","The 30-Year Opening Rule"),
  sec("17.1","General Rule"),
  body("Records transferred to the National Archive are open to public access after a period of thirty years from the date of the most recent document in the relevant file or series. After thirty years, any person may apply to access the records in the Reading Room, subject only to the exemptions in Articles 18 and 19 and the FOI Framework's national security exemption for records that remain genuinely sensitive."),
  sec("17.2","Rationale"),
  body("The thirty-year rule balances two competing public interests: the interest in preserving a protected space for the candid internal deliberations of government — so that officials can give frank advice without the immediate prospect of public disclosure — against the interest in historical accountability and public knowledge of the governance of the Kingdom. Thirty years is sufficient to protect most legitimate sensitivity; it is not so long as to deprive a generation of citizens of knowledge of events that shaped their lives."),
  sec("17.3","Records Open Before 30 Years"),
  body("The National Archivist may open records to public access before the 30-year threshold where:"),
  cl("a","the originating body consents to early opening;"),
  cl("b","the Lord Chancellor authorises early opening on the grounds that the public interest in access outweighs any remaining sensitivity; or"),
  cl("c","the records contain no information that was classified above Unclassified or Official at the time of creation, and no exemption from the FOI Framework applies."),

  sp(),art("18","Closed Periods — Exceptions to the 30-Year Rule"),
  sec("18.1","Absolute Closed Periods"),
  body("The following categories of record remain closed beyond the standard 30-year period, for the periods specified, which run from the date of the most recent document in the relevant file or series:"),
  sp(80,80),
  stdTable([
    ["Category of Record","Closed Period","Authority for Closure","Review"],
    ["Records relating to living individuals whose disclosure would constitute a serious invasion of personal privacy","Until death of the individual + 10 years, or 75 years, whichever is later","Personal privacy — Art. 13 FOI exemption; personal data protection","National Archivist reviews at 75 years"],
    ["Intelligence and security records designated as permanently closed","No automatic opening; subject to case-by-case review","National security — Art. 12 FOI exemption; Lord Chancellor and intelligence chief approval","National Archivist reviews at 75 years in consultation with intelligence services"],
    ["Cabinet minutes and deliberative papers of the Sovereign's Privy Council / Royal Council","40 years (extended from 30 by Lord Chancellor's direction in individual cases where ongoing sensitivity demonstrated)","Art. 18 FOI — Policy Formulation; collective responsibility","Lord Chancellor reviews extensions case by case"],
    ["Records of honours deliberations identifying named individuals","50 years","Personal privacy; reputation","National Archivist reviews at 50 years"],
    ["Records of ongoing international negotiations and obligations","Until conclusion of the negotiation or treaty + 5 years","Art. 19 FOI — International Relations","Originator confirms conclusion; National Archivist opens"],
    ["Records containing information that would endanger any living person if disclosed","Until threat is assessed as ended; minimum 30 years","Art. 24 FOI — Health and Safety; Art. 12 — National Security","Annual review by National Archivist in consultation with security services"],
    ["Adoption records — identifying information about birth parents and adoptees","Until both parties are deceased, or 100 years, whichever is later","Personal privacy — family law; identity rights","National Archivist reviews at 100 years"],
    ["Records of child welfare proceedings — individual case files","Until subject reaches age 75, or 75 years from date of proceedings, whichever is later","Personal privacy; welfare of child","National Archivist reviews at applicable threshold"],
  ],[2400,2000,2200,2400]),
  sp(80,80),
  sec("18.2","Partial Opening — Redaction"),
  body("Where a record contains both open and closed material, the National Archivist shall produce a redacted copy for public access, withholding only the closed portions. The redacted copy shall indicate clearly where redactions have been made, by the notation '[WITHHELD — [basis, e.g., National Security / Personal Privacy / Living Individual]]'. Redacted portions shall not be identified by content; only by the legal basis for closure. The original unredacted record shall be preserved in full in the Archive."),

  sp(),art("19","Access to Open Records"),
  sec("19.1","The Right of Access to Open Archives"),
  body("Any person — of any nationality, residency, or background — may apply to access records in the National Archive that are Open under the 30-year rule and not subject to any closure period under Article 18. There is no requirement to demonstrate a research purpose, professional affiliation, or personal interest. The right of access to open archives is a public right."),
  sec("19.2","Application for Access"),
  body("Applications to access records shall be made to the National Archivist, who shall acknowledge the application within five Working Days and confirm whether the requested records are: Open and available for access; Partially open (redacted copy available); or Closed, with the applicable closure period."),
  sec("19.3","The Reading Room"),
  body("The National Archivist shall maintain a Reading Room — a secure, supervised space — for the physical access to archival records. The Reading Room shall be:"),
  cl("a","open on publicly advertised days and hours, sufficient to give reasonable access to residents and visitors;"),
  cl("b","equipped with appropriate equipment for consulting records, including a magnifying glass for small text, document weights, and lighting;"),
  cl("c","staffed by an Archive officer during all open hours, who shall provide assistance to researchers and enforce Reading Room Rules;"),
  cl("d","subject to Reading Room Rules — prescribed by the National Archivist — governing the conduct of researchers, handling of records, reproduction of records, and prohibited items (food, drink, pens, unauthorised cameras); and"),
  cl("e","accessible in advance booking for records that must be retrieved from storage, with a minimum advance notice period of five Working Days for physical records and two Working Days for digital records."),
  sec("19.4","Online Access"),
  body("The National Archivist shall progressively make Open records available online, prioritising records of widespread public interest and those for which digital access will significantly reduce physical handling of fragile originals. Online access is available without registration for searching and reading the Archive Catalogue. Access to digitised records shall require registration, to enable the National Archivist to monitor access patterns and detect misuse. Registration is free and open to any person."),

  sp(),art("20","Access to Closed Records — Restricted Access"),
  sec("20.1","Research Access to Closed Records"),
  body("Access to records within a Closed Period may be granted by the National Archivist in restricted circumstances — for research purposes — where the researcher demonstrates a compelling and specific research need that cannot be met by open records, and undertakes not to publish information from the records in a form that would cause the harm the closure was designed to prevent. The National Archivist shall consult the originating body before granting access to closed records."),
  sec("20.2","Government Access to Own Records"),
  body("Officers of the originating public authority may access closed records held in the National Archive for the purposes of their official functions, subject to holding the appropriate Security Clearance and demonstrating a Need-to-Know. Access shall be supervised and logged. Officers accessing closed records may not reproduce them without the National Archivist's written authority."),
  sec("20.3","Access Log"),
  body("The National Archivist shall maintain an Access Log recording every instance of access to every record in the National Archive — open or closed. The Log shall record: the date; the identity of the person accessing; the records accessed; the basis for access (open access / researcher accreditation / official access / other); and whether any reproduction was made. The Access Log is itself an official record, subject to the retention schedule, and may be inspected by the Lord Chancellor."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("IX","RESEARCHER ACCREDITATION"),

  art("21","The Researcher Accreditation Scheme"),
  sec("21.1","Purpose"),
  body("The Researcher Accreditation Scheme enables the National Archivist to grant individual researchers enhanced access privileges — in particular, access to partially closed records for genuine research purposes — beyond the general public access right. Accreditation is not required for access to Open records; any person may access open records without accreditation. Accreditation is a privilege extended to researchers who undertake specific commitments in respect of their research."),
  sec("21.2","Eligibility"),
  body("Any person engaged in bona fide research — academic, journalistic, historical, legal, or other — may apply for Researcher Accreditation. Applicants shall demonstrate:"),
  cl("a","a clear and specific research project requiring access to the Archive's holdings;"),
  cl("b","appropriate professional standing or affiliations (academic position, press card, legal qualification, or other evidence of bona fide research activity); and"),
  cl("c","an undertaking to comply with the Reading Room Rules and with any conditions imposed on access to restricted records."),
  sec("21.3","Conditions of Accreditation"),
  body("Accredited researchers:"),
  cl("a","may access records beyond the standard public access right, as specifically authorised by the National Archivist for their project;"),
  cl("b","must not publish, reproduce, or communicate information from restricted records in a form that would cause the harm the closure was designed to prevent;"),
  cl("c","must acknowledge the National Archive in any publication using material from the Archive;"),
  cl("d","must return to the National Archivist a copy of any publication that draws on material accessed under accreditation; and"),
  cl("e","may have their accreditation withdrawn if they breach these conditions."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("X","DEACCESSIONING"),

  art("22","What Deaccessioning Is"),
  body("Deaccessioning is the removal of a record from the National Archive's permanent holdings. It is an exceptional and irreversible act. Once a record has been accessioned into the National Archive and placed on the Permanent Preservation List, deaccessioning requires compelling grounds and the personal approval of the National Archivist, with notification to the Lord Chancellor. The presumption is always against deaccessioning."),

  sp(),art("23","Grounds for Deaccessioning"),
  body("Deaccessioning is permissible only on the following grounds:"),
  cl("a",[tb("Duplicate: "),t("the record is a complete and exact duplicate of another record held in the Archive, and the duplicate was received in error or inadvertently. The original is retained; the duplicate may be offered to another institution or destroyed.")]),
  cl("b",[tb("Transferred in error: "),t("the record was transferred to the National Archive in error — for example, a record that did not fall within the retention schedule requirements. Erroneously transferred records shall be returned to the originating body or, if the originating body no longer exists, to the Registrar.")]),
  cl("c",[tb("Return to original custodian — international): "),t("where the record belongs to the archives of a foreign state or international organisation and was deposited with the National Archive for safekeeping during an emergency, and the original custodian has requested its return and is in a position to preserve it properly.")]),
  cl("d",[tb("Transfer to a more appropriate institution: "),t("where a record would be better preserved and more appropriately held by a specialised institution — a military archive, a university archive, a cultural institution — the National Archivist may, with the Lord Chancellor's approval, transfer custody while retaining a digitised copy in the National Archive.")]),
  warn("Deaccessioning is not authorised for: records that have become politically inconvenient; records that are duplicated in substance (but not exactly) by other sources; records whose destruction is sought by a government or official whose conduct they document; or records in poor physical condition that could be conserved. Poor condition is a reason for conservation, not deaccessioning."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("XI","CONSERVATION"),

  art("24","The Conservation Programme"),
  sec("24.1","Scope"),
  body("Conservation is the treatment of damaged, deteriorating, or fragile records to arrest deterioration, stabilise their condition, and restore their accessibility. The National Archivist shall maintain a Conservation Programme, operated by qualified conservators, covering all physical holdings."),
  sec("24.2","Priority"),
  body("Conservation resources shall be allocated in the following priority order:"),
  cl("a","Vital Records at risk of further deterioration — including any record whose content is not yet captured in a digital copy;"),
  cl("b","records that are deteriorating rapidly and whose content will be lost if treatment is not carried out promptly;"),
  cl("c","records of high historical significance, wide public interest, or unique evidential value; and"),
  cl("d","records in poor condition that are frequently consulted — where conservation will reduce further damage from handling."),
  sec("24.3","Conservation Standards"),
  body("Conservation treatment shall be carried out to the standards of the Institute for Conservation (ICON) or its equivalent successor body. All conservation work shall be documented: the condition of the record before treatment, the treatment applied, the materials used, and the condition after treatment. Conservation documentation is itself archival and shall be filed with the record."),
  sec("24.4","Preventive Conservation"),
  body("The most effective conservation is preventive: maintaining the environmental conditions prescribed in Article 5.1, using archival-quality storage materials, and minimising unnecessary handling. The National Archivist shall give priority to preventive conservation over remedial treatment — it is more effective and less expensive to prevent deterioration than to treat it after it has occurred."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("XII","INTERNATIONAL ARCHIVAL CO-OPERATION"),

  art("25","Engagement with the International Archival Community"),
  sec("25.1","International Council on Archives"),
  body("The National Archive of the Kingdom of Ardtire shall seek membership of the International Council on Archives (ICA) — the international professional body for the archival community — at the earliest practicable opportunity following its establishment. Membership of the ICA provides access to international archival standards, professional networks, training resources, and co-operation frameworks that will benefit the Kingdom's archival practice."),
  sec("25.2","Archival Exchange and Co-operation"),
  body("The National Archivist may enter into agreements with foreign national archives and international archival bodies for:"),
  cl("a","exchange of Finding Aids and catalogue data — to enable researchers to identify relevant holdings across multiple archives;"),
  cl("b","joint digitisation programmes — where records relevant to shared history are held by both archives and can be digitised jointly with cost-sharing;"),
  cl("c","loans of records — where records held by the Kingdom are requested for display or research in another jurisdiction, subject to the conditions in Article 25.3; and"),
  cl("d","training and professional development — sharing expertise and best practice in preservation, description, and access."),
  sec("25.3","Loans of Records"),
  body("A record from the National Archive may be lent to a foreign institution for display or research purposes only where:"),
  cl("a","the record is not a Vital Record — Vital Records may not leave the Kingdom;"),
  cl("b","the physical or digital condition of the record is sufficient to withstand the loan — fragile records may not be loaned;"),
  cl("c","the receiving institution meets the environmental, security, and handling standards prescribed by the National Archivist;"),
  cl("d","the loan is for a specified period not exceeding twelve months, with a right of recall at any time; and"),
  cl("e","a certified copy of the record is retained in the National Archive during the loan period."),
  sec("25.4","Repatriation of Records"),
  body("Where records of direct relevance to the Kingdom's history are held in foreign archives — whether because they were removed during a period of conflict or occupation, transferred as part of diplomatic arrangements, or deposited for safekeeping — the National Archivist may, with the Lord Chancellor's approval, seek their return or the provision of certified copies. The Kingdom commits to applying the same principles in respect of any records it holds that may be of primary archival significance to another state."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("XIII","THE OFFICIAL GAZETTE AND ARCHIVAL TRANSPARENCY"),

  art("26","Archival Notices in the Official Gazette"),
  body("The National Archivist shall publish in the Official Gazette:"),
  cl("a","an annual notice identifying the classes of records that have been opened to public access during the preceding year — records that have passed the 30-year threshold or been opened early;"),
  cl("b","a notice of any emergency reclassification imposed under Article 11.4, within 30 days of imposition, identifying the records affected (by reference, not by content) and the basis for reclassification;"),
  cl("c","a notice of any deaccessioning, within 30 days, identifying the records deaccessioned and the ground;"),
  cl("d","a notice of significant Accessions — large or historically significant transfers — within 60 days; and"),
  cl("e","the National Archivist's Annual Report, once laid before Parliament."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("XIV","REVIEW AND AMENDMENT"),

  art("27","Periodic Review"),
  body("This Framework shall be reviewed by the National Archivist in consultation with the Lord Chancellor, the Registrar, and the Commissioner (under Document 00-02-03) not less than once every five years, and following: any significant change in the Kingdom's archival holdings or infrastructure; any development in digital preservation standards or technology that requires a policy response; any change in the information classification tiers or security policy; and any legislative change affecting access to public records. The review report shall be published in the Official Gazette and laid before Parliament."),

  sp(),art("28","Amendment"),
  sec("28.1","Phase One"),
  body("During Phase One, this Framework may be amended by the Founding Privy Council by Absolute Majority, provided the proposed amendment has been circulated to all members not less than fourteen days before the meeting and the Lord Chancellor has provided a written opinion."),
  sec("28.2","Phase Two Onwards"),
  body("From Phase Two, amendments to the substantive classification tiers (Part IV), the 30-year rule and Closed Periods (Articles 17 and 18), the National Archivist's independence provisions (Article 4.2 and 4.3), and the inalienability of archival holdings (Article 3.3) require an Act of Parliament. Amendments to the format lists, storage standards, catalogue standards, and administrative procedures may be made by the National Archivist by notice, with Lord Chancellor approval."),
  sec("28.3","Protected Provisions"),
  body("The following provisions are protected and may not be reduced by any instrument: the inalienability of the National Archive's holdings under Article 3.3; the National Archivist's independence under Article 4.2; the prohibition on deaccessioning of Vital Records; the prohibition on emergency reclassification of already-public documents; and the 30-year opening rule as the maximum standard Closed Period (it may be shortened but not extended except by the specific extended periods in Article 18.1). Any purported instrument contravening these provisions is void to that extent."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("APPENDIX A","CLASSIFICATION TIER SUMMARY CARD"),

  body("A quick-reference summary for officers. This card summarises the classification system and does not replace the detailed requirements of Part IV and Part V."),
  sp(80,80),
  stdTable([
    ["Tier","Marking (header colour)","Harm Test","Access","Transmission","Review Interval"],
    ["UNCLASSIFIED","Black on white","None — not sensitive","Anyone","No restriction","Not required"],
    ["OFFICIAL","Blue header","Low — embarrassment or minor operational harm","Officers and authorised recipients","Standard official channels","Not required unless sensitivity changes"],
    ["OFFICIAL-SENSITIVE","Dark blue header + sensitivity category","Significant — harm to individuals, operations, or policy","Named officers with need-to-know; access list","Secure channels; not ordinary email","Annually"],
    ["CONFIDENTIAL","Amber header","Serious — significant operational or personal harm","Named individuals only; Originator approval for new recipients","Encrypted only","Annually (mandatory)"],
    ["SECRET","Orange header","Grave — danger to persons, intelligence operations","Cleared individuals (Secret level) with Need-to-Know","Approved encrypted systems only; no unapproved networks","Every 6 months"],
    ["TOP SECRET","Red header","Exceptionally grave — national security, sources, mass casualties","Minimum named individuals; TS clearance + Need-to-Know; ORCON standard","Compartmented approved systems only","Quarterly"],
  ],[1000,2200,2600,2400,1800,1000]),
  sp(80,80),
  note("This card is Unclassified and may be printed and displayed in offices. The full requirements of Part IV and Part V of this Framework govern in all cases."),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("APPENDIX B","ARCHIVAL APPRAISAL DECISION RECORD"),

  body("This form shall be completed by the National Archivist or their delegate for every appraisal decision — whether to select for permanent preservation, extend retention, or authorise destruction."),
  sp(80,80),
  ...["ARCHIVAL APPRAISAL DECISION RECORD","","Accession reference (if already assigned): __________________________________","Originating body: __________________________________________________________","Record series / description: _______________________________________________","____________________________________________________________________________","Date range of records: ______________________________________________________","Format: □ Paper   □ Electronic — format: _______________   □ Mixed","Volume: __________________________________________________________________","","PRE-APPRAISAL VISIT CONDUCTED: □ Yes — date: _____________   □ No — reason: _____________","","APPRAISAL CRITERIA CONSIDERED (tick all that are applicable and note assessment):","□ Constitutional / legal significance: ______________________________________","□ Evidential value — unique evidence of structure / function: _________________","□ Informational value — unique content: ____________________________________","□ Administrative uniqueness — no duplication: ______________________________","□ Significance of originating body: _________________________________________","□ Research potential (current and future): ___________________________________","□ Volume / representativeness (sample selected? Y/N): ________________________","□ Condition: _______________________________________________________________","","ORIGINATING BODY RECOMMENDATION: __________________________________________","","NATIONAL ARCHIVIST'S DECISION:","□ SELECT FOR PERMANENT PRESERVATION","   Reason: _________________________________________________________________","□ EXTEND RETENTION — period: _____________  Review date: ____________________","   Reason: _________________________________________________________________","□ AUTHORISE DESTRUCTION","   Reason: _________________________________________________________________","   Method of destruction: □ Shredding  □ Pulping  □ Secure erasure  □ Other: _","   Destruction authorisation reference: _____________________________________","","Signed: ___________________________  (National Archivist / Delegate)","Date: _____________________________","","Notified to originating body: _______________________________________________","Entered in Archive Catalogue: □ Yes   □ Pending"].map(line=>new Paragraph({children:[new TextRun({text:line,font:"Courier New",size:18,color:TEXT})],spacing:{before:0,after:0},shading:{fill:LGREY,type:ShadingType.CLEAR}})),
  sp(40,80),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("APPENDIX C","TRANSFER LIST TEMPLATE"),

  body("This template shall be completed by the transferring public authority for every transfer of records to the National Archive. A completed Transfer List is required before any Accession will be processed."),
  sp(80,80),
  stdTable([
    ["Item No.","Document / File Reference","Description (sufficient to identify in Catalogue)","Date Range","Format","Volume","Classification on Transfer","Conservation Note"],
    ["001","[Doc Identifier]","[Brief description of content and function]","[From] – [To]","Paper / Electronic / Mixed","[Boxes / MB]","[Tier or Unclassified]","[None / Requires treatment]"],
    ["002","","","","","","",""],
    ["003","","","","","","",""],
    ["[Continue for all items]","","","","","","",""],
  ],[800,1600,2400,1200,1000,800,1400,1800]),
  sp(80,80),
  body([tb("Transfer authority: "),t("(Registrar reference number) _______________________________________________")]),
  body([tb("Originating body: "),t("____________________________________________________________________________")]),
  body([tb("Senior officer authorising transfer: "),t("_______________________________________________")]),
  body([tb("Total items: "),t("__________________   Total physical volume: __________________   Total digital volume: __________________")]),
  body([tb("Classification review completed: "),t("□ Yes — declassification applied to: __________________   □ No — reason: __________________")]),
  body([tb("Transfer date: "),t("_____________________________")]),
  body([tb("Received by National Archive: "),t("_____________________________   Accession number assigned: _____________________________")]),

  // ═══════════════════════════════════════════════════════════════════════════
  pb(),...pH("APPENDIX D","DIGITAL PRESERVATION FORMAT REGISTER — INITIAL LIST"),

  body("The following formats are designated as supported for long-term preservation in the Digital Archive at the date of adoption of this Framework. The National Archivist shall review and update this list annually. Additions and removals shall be notified to all public authorities and published in the Official Gazette."),
  sp(80,80),
  stdTable([
    ["Category","Archival Master Format","Standard / Reference","Access Copy Format","Notes"],
    ["Text documents","PDF/A-3 (ISO 19005-3)","ISO 19005","PDF / HTML","Embed fonts. No external dependencies. Document 00-01-04 document types."],
    ["Plain text","UTF-8 encoded plain text (.txt)","Unicode","—","For unformatted text records."],
    ["Structured data (tabular)","CSV with schema documentation","RFC 4180","XLSX / JSON","Schema documentation mandatory."],
    ["Structured data (hierarchical)","XML with schema (XSD)","W3C","JSON","Schema documentation mandatory."],
    ["Relational databases","SQL export with schema; SIARD format (eCH-0165)","Swiss Federal Archives SIARD","—","Schema and data dictionary required."],
    ["Still images (raster)","TIFF (uncompressed); minimum 400 DPI text, 600 DPI photos","ISO 12234-2","JPEG 2000 / JPEG","No lossy compression for archival master."],
    ["Still images (vector)","SVG (W3C Recommendation)","W3C","PNG","For maps, diagrams, technical drawings."],
    ["Audio","Broadcast WAV (BWF), 48kHz/24-bit","EBU R 98","MP3 / AAC 256kbps","Metadata embedded in BWF format."],
    ["Video","FFV1 (lossless) in Matroska container","IETF / Matroska","H.264 in MP4","Preserve original alongside normalised copy."],
    ["Email","MBOX or EML with full headers","RFC 2822","—","Metadata: sender, recipients, date, threading."],
    ["Web content","WARC (ISO 28500)","ISO 28500","—","For archived web pages."],
    ["Geospatial","GeoTIFF; Shapefile + projection file","OGC","—","Projection/coordinate system documentation mandatory."],
    ["Digitised documents","PDF/A-3 at archival resolution","ISO 19005","—","Retain physical original unless certified otherwise."],
  ],[1400,2400,2000,2000,3200]),
  sp(80,80),
  note("Proprietary formats — Microsoft Office, Apple formats, Adobe formats — are not on the supported list because their long-term readability depends on commercial software that may not be available indefinitely. Documents in these formats shall be normalised to PDF/A-3 on transfer. Where loss of content or functionality would occur through normalisation, the original format shall be preserved alongside the normalised copy, with documentation of the original software environment."),

  // ── ADOPTION BLOCK ──────────────────────────────────────────────────────────
  pb(),...pH("ATTESTATION","ADOPTION AND CERTIFICATION"),
  body("This Archival Policy and Classification Framework was duly adopted by the Founding Privy Council of the Kingdom of Ardtire at a quorate meeting held on the date shown below, on the recommendation of the Lord Chancellor and the Registrar of the Royal Chancery, and by the required Absolute Majority of all members."),
  sp(120,80),
  new Paragraph({children:[t("Adopted at: ________________________________________     Date: _______________________")],spacing:{before:80,after:160}}),
  thin(),sp(120,40),
  new Paragraph({children:[t("Sovereign: ________________________________________     Seal: _______________________")],spacing:{before:80,after:120}}),
  new Paragraph({children:[t("Lord President: ____________________________________     Date: _______________________")],spacing:{before:80,after:120}}),
  new Paragraph({children:[t("Lord Chancellor: ___________________________________     Date: _______________________")],spacing:{before:80,after:120}}),
  new Paragraph({children:[t("Registrar, Royal Chancery: _________________________     Date: _______________________")],spacing:{before:80,after:120}}),
  thin(),sp(120,40),
  new Paragraph({children:[ti("Filed with the Royal Chancery on: ______________________",{font:"Arial",size:18})],alignment:AlignmentType.CENTER,spacing:{before:80,after:60}}),
  new Paragraph({children:[ti("Published in the Official Gazette: ______________________",{font:"Arial",size:18})],alignment:AlignmentType.CENTER,spacing:{before:40,after:60}}),
  new Paragraph({children:[ti("Gazette Reference Number: ______________________",{font:"Arial",size:18})],alignment:AlignmentType.CENTER,spacing:{before:40,after:0}}),
];

const doc=new Document({sections:[{
  headers:{default:hdr},footers:{default:ftr},
  properties:{page:{size:{width:12240,height:15840},margin:{top:1080,right:1080,bottom:1080,left:1080}}},
  children:C
}]});

Packer.toBuffer(doc).then(buf=>{
  fs.writeFileSync("/home/claude/00-03-02_Archival_Policy.docx",buf);
  console.log("Done");
});
