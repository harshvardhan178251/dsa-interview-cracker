---
title: IBPS PO — Computer Aptitude and Digital Banking
order: 4
summary: The section that used to be standalone and is now hiding inside Reasoning and General Awareness — fundamentals, OS, MS Office, networking, and the digital payment rails.
---

# IBPS PO — Computer Aptitude and Digital Banking

**Prelims:** not asked directly.
**Mains:** folded into **Reasoning** and into **General / Economy / Banking Awareness
(including Digital & Financial Awareness)**.
**Level:** basic → intermediate

Computer Aptitude used to be its own Mains section. It no longer is — the content was
distributed into the Reasoning and General Awareness sections. **Do not skip it.** It is
now hiding in two places, and it is among the most predictable marks in the paper.

---

## Where the questions come from

| Area | What gets asked | Typical marks |
|---|---|---|
| Fundamentals | Generations, hardware, memory, input/output devices | 2–4 |
| Operating systems | Functions, types, memory management, file systems | 2–3 |
| MS Office | Word, Excel, PowerPoint — specific features and shortcuts | 2–3 |
| Networking & internet | LAN/WAN, protocols, IP, DNS, browsers | 2–3 |
| DBMS | Keys, normalisation, SQL basics | 1–2 |
| Digital banking | UPI, NEFT, RTGS, IMPS, cards, cyber fraud | 2–3 |

---

## Layer 1 — computer fundamentals

### Generations

| Gen | Technology | Typical device |
|---|---|---|
| 1st | Vacuum tubes | ENIAC |
| 2nd | Transistors | UNIVAC |
| 3rd | Integrated circuits | IBM 1401 |
| 4th | **Microprocessors** | PC |
| 5th | **AI / ULSI** | — |

**4th generation = microprocessors. 5th = artificial intelligence.** That is the question.

### Hardware

- **Input**: keyboard, mouse, scanner, microphone, OCR
- **Output**: monitor, printer, speaker, projector
- **Both**: touch screen, touchscreen kiosk, VR headset
- **Secondary storage**: hard disk, SSD, USB, optical disc, memory card
- **Primary storage**: RAM (volatile) and ROM (non-volatile)

### Memory hierarchy (fastest and smallest → slowest and largest)

```
Registers → Cache → Primary memory (RAM) → Secondary memory (disk/SSD)
```

| Memory | Volatile? | Speed | Cost |
|---|---|---|---|
| **Register** | Yes | Fastest | Highest |
| **Cache (SRAM)** | Yes | Very fast | High |
| **RAM (DRAM)** | Yes | Fast | Medium |
| **ROM** | No | Slow | Low |
| **Hard disk / SSD** | No | Slowest | Lowest |

**The exam question:** *Which memory is volatile?* → **RAM**. *Which is non-volatile?* →
ROM, disk.

### Important distinctions

| A | B | The difference |
|---|---|---|
| **Hardware** | Software | The physical parts vs the programs |
| **System software** | Application software | OS, drivers vs Word, Excel |
| **Compiler** | Interpreter | Translates the whole program vs line by line |
| **RAM** | ROM | Volatile vs non-volatile |
| **CPU** | ALU | The whole processor vs the arithmetic unit |
| **Bit** | Byte | 1 bit vs 8 bits |

---

## Layer 2 — operating systems

**What an OS does:** process management, memory management, file management, device
management, security, and providing a user interface.

**Memory management techniques:**

| Technique | Idea | Best for |
|---|---|---|
| **Contiguous allocation** | One block for the whole process | Simple, but fragmented |
| **Paging** | Split memory into fixed-size **pages**; RAM into **frames** | Almost every modern OS |
| **Segmentation** | Split by logical units (code, data, stack) | Programmer's view |
| **Virtual memory** | Disk acts as an extension of RAM | Running large programs |

**Paging facts to memorise:**
- Page size is usually **4 KB**.
- A **page fault** occurs when a page is not in memory — the OS loads it from disk.
- **Thrashing** is when a process spends more time paging than executing.

**Other OS terms:**
- **Multitasking**: several programs at once (time-sharing on one CPU).
- **Multiprocessing**: several CPUs.
- **Multithreading**: several threads inside one program.
- **Boot**: loading the OS from disk into memory.
- **File system**: FAT32 (older, 4 GB limit), NTFS (Windows), ext4 (Linux).

---

## Layer 3 — MS Office

**This is free marks if you actually use the software.** Every question is about a
feature you can check in five seconds.

### Word

| Feature | Shortcut |
|---|---|
| Bold / Italic / Underline | Ctrl+B / Ctrl+I / Ctrl+U |
| Copy / Cut / Paste | Ctrl+C / Ctrl+X / Ctrl+V |
| Undo / Redo | Ctrl+Z / Ctrl+Y |
| Find / Replace | Ctrl+F / Ctrl+H |
| Save / Print | Ctrl+S / Ctrl+P |
| Align left / centre / right | Ctrl+L / Ctrl+E / Ctrl+R |
| Line spacing | Ctrl+1 / Ctrl+2 / Ctrl+5 |
| Insert a footnote | Ctrl+Alt+F |
| Track changes | Ctrl+Shift+C |
| Switch case | Shift+F3 |
| Word count | Ctrl+Shift+G |

**Formatting facts:** font size 1–1638 pt; the default is 11 pt (Calibri in modern Word).
"Ctrl+Shift+> increases the font size."

### Excel

| Function | Does |
|---|---|
| `=SUM(A1:A10)` | Adds a range |
| `=AVERAGE(A1:A10)` | Mean |
| `=COUNT(A1:A10)` | Counts numbers |
| `=COUNTA(A1:A10)` | Counts non-empty cells |
| `=MAX` / `=MIN` | Largest / smallest |
| `=IF(cond, a, b)` | Conditional |
| `=VLOOKUP(key, range, col, FALSE)` | Exact-match lookup |
| `=SUMIF(range, crit, sumrange)` | Conditional sum |
| `=ROUND(x, n)` | Rounds to n decimals |
| `=ABS` / `=INT` / `=MOD` | Absolute, integer part, remainder |

**Shortcut facts:**
- `=A1` is **relative**; `$A$1` is **absolute**; `$A1` fixes the column only.
- Copy a formula down the sheet and relative references move, absolute ones do not.
- AutoSum is **Alt+ =**.
- Fill down is **Ctrl+D**.
- **Conditional formatting** changes cell appearance based on a rule.
- **Data validation** restricts what can be typed into a cell.
- **Freeze panes** keeps headers visible while scrolling.

**The classic exam question:** *"Which of the following is not a function of Excel?"* —
`SUMIF` is a function; **Format Cells is a dialog box, not a function**.

### PowerPoint

- New slide: **Ctrl+M**.
- Start from scratch: **Ctrl+Alt+N**.
- **Slide show from the beginning**: F5; from the current slide: Shift+F5.
- **Slide sorter** view shows all slides as thumbnails.

---

## Layer 4 — networking and the internet

### Types of network

| Type | Full form | Range | Example |
|---|---|---|---|
| **PAN** | Personal Area Network | ~10 m | Bluetooth |
| **LAN** | Local Area Network | Building/campus | Office, college |
| **MAN** | Metropolitan Area Network | City | City-wide network |
| **WAN** | Wide Area Network | Country/global | **The Internet** |
| **VPN** | Virtual Private Network | — | Encrypted tunnel over a public network |

### Devices

| Device | Job |
|---|---|
| **Router** | Connects different networks, forwards packets |
| **Switch** | Connects devices **within** a LAN, forwards frames by MAC |
| **Hub** | Broadcasts to all ports (obsolete) |
| **Modem** | Converts digital ↔ analogue for a telephone line |
| **Repeater** | Regenerates a weak signal |
| **Bridge** | Connects two LAN segments |
| **Gateway** | Connects a LAN to a different protocol/system |
| **Firewall** | Filters traffic by rules |

**Router vs switch** is the classic question: a switch works at layer 2 using **MAC
addresses**; a router works at layer 3 using **IP addresses**.

### The OSI and TCP/IP models

**OSI (7 layers):** Physical → Data Link → Network → Transport → Session → Presentation
→ Application

**TCP/IP (4 layers):** Network Access → Internet → Transport → Application

**The layers people actually ask about:**

| Layer | Protocol | Unit |
|---|---|---|
| Application | HTTP, HTTPS, SMTP, FTP, DNS, DHCP | Data |
| Transport | TCP, UDP | Segment / Datagram |
| Network | IP, ICMP, ARP | Packet |
| Data Link | Ethernet, PPP | Frame |
| Physical | Cable, radio | Bits |

- **TCP** — connection-oriented, reliable, ordered, slower (3-way handshake, 4-way
  teardown).
- **UDP** — connectionless, no guarantee of delivery or order, faster, used for live
  video, gaming, DNS lookups.

### IP addressing

- **IPv4**: 32 bits, written as four octets, e.g. `192.168.1.1`.
- **IPv6**: 128 bits.
- **Private ranges** (not routable on the public internet):
  - `10.0.0.0 – 10.255.255.255` (Class A)
  - `172.16.0.0 – 172.31.255.255` (Class B)
  - `192.168.0.0 – 192.168.255.255` (Class C)
- **127.0.0.1** is the loopback address ("localhost").
- **0.0.0.0** means "any address" when binding a server.

### DNS and the web

- **DNS** translates a domain name into an IP address.
- **DNS uses UDP** on port 53 (TCP for large transfers / zone transfers).
- **HTTP** on port 80, **HTTPS** on port 443 (HTTP + TLS).
- **FTP** on ports 20/21, **Telnet** 23, **SSH** 22, **SMTP** 25, **POP3** 110,
  **IMAP** 143.

### Other exam staples

- **Web browser**: Chrome, Firefox, Edge, Safari, Opera.
- **Search engine**: Google, Bing, DuckDuckGo.
- **WWW** was proposed by **Tim Berners-Lee** at CERN. **HTML, HTTP and URL** too.
- **JavaScript** was created by **Brendan Eich** at Netscape in 1995.
- **Cache** stores recently visited pages to speed up loading.
- **Cookies** store small pieces of data on the client.
- **Firewall** filters inbound/outbound traffic.

---

## Layer 5 — DBMS, briefly

| Concept | What to know |
|---|---|
| **Primary key** | Uniquely identifies a row; never null |
| **Foreign key** | References a primary key in another table |
| **Candidate key** | Any column (or set) that could be a primary key |
| **Normalisation** | 1NF → 2NF → 3NF removes redundancy |
| **1NF** | Atomic values, no repeating groups |
| **2NF** | No partial dependency on a composite key |
| **3NF** | No transitive dependency |
| **DDL** | Data Definition Language — `CREATE`, `ALTER`, `DROP` |
| **DML** | Data Manipulation Language — `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** | Data Control Language — `GRANT`, `REVOKE` |
| **ACID** | Atomicity, Consistency, Isolation, Durability |
| **SQL vs NoSQL** | Relational/structured vs flexible, schema-less |

**The exam question:** *"Which of these is a DDL command?"* → `CREATE`.

---

## Layer 6 — digital banking (the new high-yield area)

This is the "Digital / Financial Awareness" that is now folded into General Awareness. It
is **very predictable** and almost free marks if you read the RBI circulars.

### The payment rails

| Rail | Settlement | Use |
|---|---|---|
| **NEFT** (National Electronic Funds Transfer) | **Half-hourly** batches | Retail transfers, up to ₹1 lakh per transaction |
| **RTGS** (Real Time Gross Settlement) | **Real time, 24×7** | Large value (₹2 lakh+), typically for institutional transfers |
| **IMPS** (Immediate Payment Service) | **Immediate, 24×7** | Retail instant transfers via mobile |
| **UPI** (Unified Payments Interface) | **Instant, 24×7** | The most-used retail rail in India |
| **NEFT / RTGS / IMPS** | — | All run on **RBI's National Electronic Funds Transfer system** |
| **CTS** (Cheque Truncation System) | — | Cheques cleared electronically by **next working day** |

**UPI facts worth memorising:**
- UPI is operated by **NPCI** (National Payments Corporation of India).
- **IMPS is operated by NPCI too**; **NEFT and RTGS are operated by RBI**.
- UPI was launched in **2016**.
- UPI transactions are **free** for most retail users (zero MDR was pushed by NPCI).
- UPI allows a maximum of **₹1 lakh per transaction** (raised from ₹1 lakh; the earlier
  cap was ₹1 lakh for credit transactions).

**Other digital banking terms:**
- **Mobile banking (M-Banking)** — apps like SBI Buddy, iSafe, BHIM.
- **Payment gateway** — PayU, Paytm, CCAvenue, RazorPay, BillDesk.
- **DigiLocker** — Government of India's digital wallet for documents.
- **UPI 123Pay**, **RuPay** (NPCI's card network), **RuBiz** (trade finance).
- **FAST** (Fast Advanced Settlement Transfer), **CTS 2010**.
- **NACH** (National Automated Clearing House) — salary and mandate payments.
- **PFMS** (Public Financial Management System) — government payments.
- **Account aggregator** (Fintech Regulatory Authority of India) — consent-based sharing of
  financial data.

### Cards

| Card | Network | Purpose |
|---|---|---|
| **Debit** | RuPay / Visa / Mastercard | Linked to your account; spends your money |
| **Credit** | Visa / Mastercard / RuPay | The bank lends you; you pay interest on the outstanding |
| **Prepaid** | RuPay / Visa | You load money in advance |
| **Charge card** | Visa | No interest, full balance repaid monthly |

**Credit card cycle:** the issuer gives you a float interest-free period (usually ~45–50
days) between the transaction and the payment due date. If you pay the full statement,
interest is zero. **Interest is charged only on the unpaid balance** (not on the total
statement). That is why paying the minimum is expensive.

**The "minimum due" trap:** paying only the minimum keeps you in a revolving balance and
you pay interest on the rest.

### Cyber fraud (asked regularly)

| Fraud | What it is | Guard |
|---|---|---|
| **Phishing** | Fake message luring you to a fake site | Never click links in unexpected messages |
| **Vishing** | Voice-based fraud over a call | Banks never ask for OTP over a call |
| **Smishing** | SMS-based fraud | Same rule |
| **OTP fraud** | You are tricked into sharing an OTP | **No bank ever asks for your OTP.** Ever. |
| **SIM swap** | Your number is moved to another SIM | This is why OTP + PIN matters |
| **Card cloning** | Skimming card data | Shield the keypad; use a virtual card |
| **Fake customer service** | "Call this number to block your card" | Call the number on your card |
| **UPI mandate fraud** | A scammer registers a mandate on your account | Check your auto-debit list monthly |

**The single most important line for the exam:** *no bank ever asks for your OTP, PIN,
CVV or full card number over a call, SMS or email.*

---

## Exam traps by topic

| Topic | Trap |
|---|---|
| Generations | 5th generation is AI, not "nanotechnology" |
| Volatility | ROM and hard disk are non-volatile; RAM and cache are volatile |
| Paging | Page = fixed size (4 KB), segment = logical unit |
| Word shortcut | Ctrl+Shift+C is track changes, not copy |
| Excel reference | `=SUM` is relative, `$A$1` is absolute |
| Excel functions | Format Cells is a dialog, not a function |
| Router vs switch | Router = IP (layer 3), switch = MAC (layer 2) |
| Protocol ports | HTTPS 443, SSH 22, SMTP 25, DNS 53 |
| Private IPs | 10.x, 172.16–31.x, 192.168.x — none are routable publicly |
| TCP vs UDP | TCP is reliable and connection-oriented; UDP is not |
| NEFT vs RTGS | NEFT is half-hourly; RTGS is real time for large value |
| Digital payments | UPI and IMPS run on NPCI; NEFT and RTGS run on RBI |
| Credit card interest | Charged on the unpaid balance only |

---

## Practice plan

| Weeks | What to do |
|---|---|
| 1 | Fundamentals, memory, generations. Write the memory hierarchy from memory. |
| 2 | OS concepts, paging, virtual memory. |
| 3 | MS Office — open Word and Excel and *verify* every shortcut yourself. |
| 4 | Networking, OSI model, ports, IP addressing. |
| 5 | DBMS basics, digital payments, cards, cyber fraud. |
| 6+ | A weekly current-affairs tracker entry on every RBI circular or digital-banking launch. |

**The fastest way to score here is to actually use the software.** Open Word and Excel
for twenty minutes a week and check the shortcuts. That knowledge is worth more than
three days of reading.
