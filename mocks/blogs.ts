/**
 * Blog seed data (15 IoT knowledge articles).
 * Bilingual text mirrors a future localized backend; images come from the asset manifest.
 */
import { IMG } from "@/src/lib/images";
import type { BlogPost } from "@/src/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b-001",
    slug: "mqtt-explained-iot-protocol",
    title: {
      vi: "MQTT giải thích: Giao thức khiến IoT chạy trơn tru",
      en: "MQTT Explained: The Protocol That Keeps IoT Running",
    },
    excerpt: {
      vi: "Vì sao mọi thiết bị IoT đều chọn MQTT thay vì HTTP? Hiểu pub/sub, QoS và topic trong 10 phút.",
      en: "Why does every IoT device choose MQTT over HTTP? Understand pub/sub, QoS and topics in 10 minutes.",
    },
    category: "mqtt",
    cover: IMG.blogMqttNetwork,
    author: "Trần Minh Quang",
    publishedAt: "2026-03-02",
    readingTime: 10,
    featured: true,
    tags: ["MQTT", "protocol", "beginner"],

    content: [
      {
        heading: {
          vi: "MQTT khác HTTP ở đâu?",
          en: "How Is MQTT Different from HTTP?",
        },
        paragraphs: [
          {
            vi: "HTTP là mô hình request-response: client hỏi, server trả lời rồi kết nối kết thúc. Với hàng trăm thiết bị gửi dữ liệu liên tục, mô hình này tốn tài nguyên một cách lãng phí. MQTT dùng mô hình publish-subscribe qua một broker trung tâm: thiết bị gửi dữ liệu lên topic, mọi thiết bị quan tâm sẽ tự nhận được bản cập nhật.",
            en: "HTTP follows a request-response model: the client sends a request, the server responds, and the connection ends. With hundreds of devices sending data continuously, this model wastes resources. MQTT uses a publish-subscribe model through a central broker: devices publish data to topics, and every interested device automatically receives the updates.",
          },
          {
            vi: "Điều này giúp giảm đáng kể băng thông và pin — số đo thực tế cho thấy MQTT tiêu thụ chỉ 1/10 năng lượng so với HTTP polling trong các node cảm biến chạy pin.",
            en: "This significantly reduces bandwidth and battery usage. Real-world measurements show that MQTT can consume only one-tenth the energy of HTTP polling on battery-powered sensor nodes.",
          },
        ],
      },
      {
        heading: {
          vi: "Ba mức QoS và khi nào dùng gì",
          en: "Three QoS Levels and When to Use Them",
        },
        paragraphs: [
          {
            vi: 'QoS 0 là "gửi và quên" — phù hợp số đọc cảm biến liên tục, mất một gói không nghiêm trọng. QoS 1 đảm bảo ít nhất một lần nhận, dùng cho lệnh điều khiển rơ le. QoS 2 đảm bảo chính xác một lần, chỉ dùng khi trùng lặp gây hậu quả nghiêm trọng như đóng van nước.',
            en: 'QoS 0 is "fire and forget" — suitable for continuous sensor readings where losing a packet is not critical. QoS 1 guarantees at-least-once delivery and is suitable for relay control commands. QoS 2 guarantees exactly-once delivery and should only be used when duplicates could have serious consequences, such as closing a water valve.',
          },
          {
            vi: "Một quy tắc thực chiến: đừng nâng QoS lên cao hơn nhu cầu. Mỗi mức QoS tăng thêm 2-4 lần thời gian xác nhận handshake giữa thiết bị và broker.",
            en: "A practical rule: never use a higher QoS level than necessary. Each higher QoS level can add roughly 2-4 times more acknowledgment overhead between the device and broker.",
          },
        ],
      },
      {
        heading: {
          vi: "Thiết kế topic cho dự án thật",
          en: "Designing Topics for Real Projects",
        },
        paragraphs: [
          {
            vi: "Topic chuẩn nên theo cấu trúc phân cấp: home/ground-floor/living-room/temperature. Đừng đặt quá sâu, và tận dụng wildcard: ký tự + khớp một tầng, # khớp nhiều tầng. Thiết kế topic tốt ngay từ đầu giúp hệ thống mở rộng từ 5 lên 50 thiết bị mà không phải viết lại ứng dụng. Hãy thử ngay với Mosquitto broker cài trên Raspberry Pi và bo ESP32 — hướng dẫn chi tiết có trong khóa học MQTT & Home Assistant.",
            en: "A good topic structure should be hierarchical, such as home/ground-floor/living-room/temperature. Avoid excessive depth and take advantage of wildcards: + matches one level, while # matches multiple levels. Designing topics properly from the beginning allows the system to scale from 5 to 50 devices without rewriting the application. Try it with a Mosquitto broker running on a Raspberry Pi and an ESP32 board — detailed instructions are included in the MQTT & Home Assistant course.",
          },
        ],
      },
    ],
  },

  {
    id: "b-002",
    slug: "esp32-deep-sleep-battery",
    title: {
      vi: "Cho ESP32 chạy 1 năm bằng pin: Nghệ thuật Deep Sleep",
      en: "One Year on a Battery: The Art of ESP32 Deep Sleep",
    },
    excerpt: {
      vi: "Hướng dẫn chi tiết đưa dòng tiêu thụ từ 100mA xuống 10µA — từ phần cứng đến firmware.",
      en: "A detailed guide to dropping current draw from 100mA to 10µA — from hardware to firmware.",
    },
    category: "esp32",
    cover: IMG.courseEsp32Bootcamp,
    author: "Lê Quốc Bảo",
    publishedAt: "2026-02-24",
    readingTime: 12,
    featured: true,
    tags: ["ESP32", "power", "battery"],

    content: [
      {
        heading: {
          vi: "Bài toán: node cảm biến chạy pin",
          en: "The Challenge: A Battery-Powered Sensor Node",
        },
        paragraphs: [
          {
            vi: "Một ESP32 hoạt động liên tục tiêu thụ khoảng 100mA — một viên pin 18650 3000mAh chỉ kéo được hơn một ngày. Nhưng node cảm biến thực tế chỉ cần đọc dữ liệu 1 phút/lần. Đây là lúc deep sleep phát huy tác dụng: tắt gần hết các mạch, chỉ giữ RTC chạy với 10µA.",
            en: "An ESP32 running continuously consumes around 100mA, meaning a 3000mAh 18650 battery lasts only a little over a day. But a real sensor node may only need to take a reading once every minute. This is where deep sleep becomes useful: almost all circuits are powered down while the RTC remains active at around 10µA.",
          },
          {
            vi: "Với chu kỳ thức 5 giây / ngủ 55 giây, tuổi thọ pin tăng từ 1 ngày lên hơn 8 tháng. Bài toán trở thành: tối đa hóa thời gian ngủ, rút ngắn thời gian thức.",
            en: "With a 5-second active / 55-second sleep cycle, battery life can increase from about one day to more than eight months. The goal is to maximize sleep time and minimize active time.",
          },
        ],
      },
      {
        heading: {
          vi: "Deep sleep trên ESP32: đúng cách",
          en: "Using ESP32 Deep Sleep Properly",
        },
        paragraphs: [
          {
            vi: "Gọi esp_deep_sleep_start() chỉ là bước cuối. Trước đó, bạn cần tắt peripheral không dùng (WiFi, Bluetooth, ADC), cấu hình chân giữ trạng thái gpio_hold_en cho rơ le không bị sập, và lưu biến vào RTC memory vì RAM thường bị mất khi ngủ.",
            en: "Calling esp_deep_sleep_start() is only the final step. Before that, disable unused peripherals such as Wi-Fi, Bluetooth, and ADC, configure gpio_hold_en when a GPIO state must be preserved, and store important variables in RTC memory because regular RAM is usually lost during deep sleep.",
          },
          {
            vi: "Timer wake là cách đơn giản nhất: esp_sleep_enable_timer_wakeup(60 * 1000000) đánh thức sau 60 giây. Với nút bấm, dùng ext0/ext1 wake — cực kỳ hữu ích cho cảm biến cửa.",
            en: "Timer wake-up is the simplest approach: esp_sleep_enable_timer_wakeup(60 * 1000000) wakes the device after 60 seconds. For buttons or switches, ext0/ext1 wake-up is extremely useful for door sensors.",
          },
        ],
      },
      {
        heading: {
          vi: "Phần cứng cũng phải tối ưu",
          en: "The Hardware Must Be Optimized Too",
        },
        paragraphs: [
          {
            vi: "Nhiều dự án thất bại vì quên phần cứng: LED power của module AMS1117 ăn 5mA ngay cả khi MCU ngủ. Thay bằng LDO tĩnh thấp như HT7333 (4µA), hoặc cắt nguồn ngoại vi bằng MOSFET P-channel. Thử đo bằng đồng hồ vạn năng ở chế độ µA — số dòng khi ngủ là con số quyết định tuổi thọ pin. Đừng quên boot time: ESP32 tốn ~300ms và 40mA mỗi lần thức, nên gộp nhiều việc lại mỗi lần thức thay vì thức nhiều lần ngắn.",
            en: "Many projects fail because the hardware is overlooked: the power LED and AMS1117 regulator on some modules can consume several milliamps even when the MCU is sleeping. Replace them with a low-quiescent-current regulator such as the HT7333, or disconnect external peripherals using a P-channel MOSFET. Measure current with a multimeter in the µA range — sleep current is the number that determines battery life. Also consider boot time: an ESP32 may take around 300ms and tens of milliamps each time it wakes, so group multiple operations into each wake cycle instead of waking up repeatedly for short tasks.",
          },
        ],
      },
    ],
  },

  {
    id: "b-003",
    slug: "smart-home-without-cloud",
    title: {
      vi: "Nhà thông minh không cần cloud: Stack tự vận hành tại nhà",
      en: "Smart Home Without the Cloud: A Self-Hosted Stack",
    },
    excerpt: {
      vi: "Cách xây hệ thống nhà thông minh chạy 100% tại localhost — riêng tư, nhanh và không lo ngừng dịch vụ.",
      en: "How to build a smart home that runs 100% locally — private, fast and immune to service shutdowns.",
    },
    category: "iot-basics",
    cover: IMG.blogSmartHome,
    author: "Nguyễn Hoàng Duy",
    publishedAt: "2026-02-16",
    readingTime: 9,
    tags: ["smart home", "MQTT", "Home Assistant"],

    content: [
      {
        heading: {
          vi: "Vì sao nên bỏ cloud?",
          en: "Why Go Cloudless?",
        },
        paragraphs: [
          {
            vi: "Mỗi thiết bị cloud thêm 2-4 giây độ trễ điều khiển, đòi hỏi Internet hoạt động liên tục, và quan trọng nhất: bạn không kiểm soát dữ liệu. Khi nhà sản xuất đóng server, thiết bị biến thành gạch vụn. Stack local giải quyết cả ba vấn đề với chi phí một Raspberry Pi.",
            en: "Every cloud-connected device can add 2-4 seconds of control latency, requires a constant Internet connection, and most importantly, puts your data outside your control. When a manufacturer shuts down its servers, the device can become useless. A local stack solves all three problems with the cost of a single Raspberry Pi.",
          },
          {
            vi: 'Độ trễ local chỉ 50-100ms — cảm giác "bấm là chạy ngay" mà không hệ thống cloud nào đạt được.',
            en: 'Local latency can be as low as 50-100ms, creating the feeling of "press and it happens immediately" that cloud-dependent systems often cannot match.',
          },
        ],
      },
      {
        heading: {
          vi: "Bộ ba: Mosquitto + Home Assistant + ESPHome",
          en: "The Trio: Mosquitto + Home Assistant + ESPHome",
        },
        paragraphs: [
          {
            vi: "Mosquitto là MQTT broker nhẹ chạy tốt trên Pi. Home Assistant đóng vai trò trung tâm điều khiển với hàng nghìn tích hợp sẵn. ESPHome cho phép bạn cấu hình ESP32 bằng YAML thay vì viết code — cảm biến DHT22 thành entity trong 10 dòng cấu hình.",
            en: "Mosquitto is a lightweight MQTT broker that runs well on a Raspberry Pi. Home Assistant acts as the central controller with thousands of integrations. ESPHome lets you configure ESP32 devices using YAML instead of writing firmware from scratch — a DHT22 sensor can become an entity with around 10 lines of configuration.",
          },
          {
            vi: "Tất cả cài qua Docker Compose, backup bằng chụp nhanh file cấu hình. Khi cần đổi router hay chuyển nhà, khôi phục hệ thống chỉ mất 30 phút.",
            en: "Everything can be installed using Docker Compose, with backups made from configuration files. If you replace your router or move to another home, the entire system can be restored in about 30 minutes.",
          },
        ],
      },
      {
        heading: {
          vi: "Tự động hóa thực dụng trước tiên",
          en: "Start with Practical Automation",
        },
        paragraphs: [
          {
            vi: "Bắt đầu với ba tự động hóa thay đổi cuộc sống: đèn hành lang bật nhẹ khi chuyển động sau 22h, cảnh báo Telegram khi cửa mở lúc vắng nhà, và tự động ngắt bình nóng lạnh khi ra khỏi nhà. Ba kịch bản này đơn giản nhưng khiến cả gia đình nhận ra giá trị của nhà thông minh. Với ESPHome, ngày nay bạn gần như không cần viết code nào — bắt đầu từ một phòng, mở rộng dần theo nhu cầu thực tế.",
            en: "Start with three automations that make a real difference: dim hallway lights when motion is detected after 10 PM, send a Telegram alert when a door opens while nobody is home, and automatically turn off the water heater when everyone leaves. These scenarios are simple but demonstrate the value of smart home technology. With ESPHome, you barely need to write code — start with one room and expand gradually based on real needs.",
          },
        ],
      },
    ],
  },

  {
    id: "b-004",
    slug: "lora-vs-wifi-agriculture",
    title: {
      vi: "LoRa hay Wi-Fi: Chọn kết nối cho cảm biến nông nghiệp",
      en: "LoRa or Wi-Fi: Choosing Connectivity for Agricultural Sensors",
    },
    excerpt: {
      vi: "Bảng so sánh thực chiến từ một dự án 40 node cảm biến trên 5 hecta đất trồng.",
      en: "A practical comparison from a real 40-node project across 5 hectares of farmland.",
    },
    category: "lora",
    cover: IMG.blogLoraField,
    author: "Trần Minh Quang",
    publishedAt: "2026-02-08",
    readingTime: 11,
    tags: ["LoRa", "agriculture", "connectivity"],

    content: [
      {
        heading: {
          vi: "Bối cảnh: 5 hecta không Wi-Fi",
          en: "The Scenario: 5 Hectares Without Wi-Fi",
        },
        paragraphs: [
          {
            vi: "Dự án giám sát độ ẩm đất cho vườn 5 hecta đặt ra câu hỏi kinh điển. Wi-Fi chỉ phủ 30-50m ngoài đồng, cần 20+ access point. LoRa SX1278 truyền 2-4km trong môi trường cây trồng, một gateway đủ cho toàn bộ vùng.",
            en: "A soil-moisture monitoring project across a 5-hectare farm raises a classic connectivity question. Wi-Fi may only cover 30-50m outdoors, requiring more than 20 access points. LoRa using the SX1278 can reach 2-4km in agricultural environments, allowing a single gateway to cover the entire area.",
          },
          {
            vi: "Nhưng LoRa đánh đổi: băng thông chỉ 0.3-27kbps, mỗi gói tối đa 255 byte. Gửi được số đọc cảm biến, không gửi được hình ảnh.",
            en: "But LoRa comes with trade-offs: bandwidth is only around 0.3-27kbps, with a maximum packet size of 255 bytes. It is suitable for sensor readings but not for images.",
          },
        ],
      },
      {
        heading: {
          vi: "Khi nào chọn cái nào",
          en: "When Should You Choose Each One?",
        },
        paragraphs: [
          {
            vi: "Chọn Wi-Fi khi: có sẵn mạng phủ, cần băng thông lớn (camera, OTA firmware), thiết bị gần ổ điện. Chọn LoRa khi: vùng rộng, thiết bị chạy pin nhiều tháng, chỉ gửi dữ liệu nhỏ theo chu kỳ dài.",
            en: "Choose Wi-Fi when you already have coverage, need high bandwidth for cameras or firmware updates, or have devices near power outlets. Choose LoRa when the area is large, devices need to run on batteries for months, and only small amounts of data are sent periodically.",
          },
          {
            vi: "Giải pháp lai cũng rất phổ biến: node LoRa gom dữ liệu từ 10-15 cảm biến rồi gateway chuyển lên MQTT qua Wi-Fi/4G. Kiến trúc này cân bằng giữa khoảng cách và băng thông.",
            en: "Hybrid solutions are also very common: LoRa nodes collect data from 10-15 sensors, while a gateway forwards the data to MQTT through Wi-Fi or 4G. This architecture balances range and bandwidth.",
          },
        ],
      },
      {
        heading: {
          vi: "Kinh nghiệm triển khai thực tế",
          en: "Lessons from Real-World Deployment",
        },
        paragraphs: [
          {
            vi: "Ba bài học xương máu từ dự án: một là antenna quan trọng hơn công suất — antenna 5dBi tăng khoảng cách hơn nhiều so với tăng công suất phát. Hai là thử nghiệm thực địa trước khi mua số lượng lớn, tường và cây chắn tín hiệu khác xa mô phỏng. Ba là luôn cấu hình LWT (Last Will and Testament) để gateway phát hiện node chết. Không có kết nối nào hoàn hảo — hãy để băng thông, khoảng cách và nguồn pin quyết định.",
            en: "Three hard-earned lessons from the project: first, the antenna matters more than transmit power — a 5dBi antenna can improve range much more effectively than simply increasing transmit power. Second, conduct field tests before buying large quantities because walls and vegetation behave very differently from simulations. Third, always configure LWT (Last Will and Testament) so the gateway can detect dead nodes. No connectivity technology is perfect — let bandwidth, range, and battery requirements determine the choice.",
          },
        ],
      },
    ],
  },

  {
    id: "b-005",
    slug: "freertos-task-design-patterns",
    title: {
      vi: "5 mẫu thiết kế Task FreeRTOS dùng đi dùng lại",
      en: "5 FreeRTOS Task Design Patterns You Will Reuse Forever",
    },
    excerpt: {
      vi: "Các pattern thực chiến cho task, queue và timer giúp firmware của bạn sạch và dễ mở rộng.",
      en: "Battle-tested patterns for tasks, queues and timers that keep your firmware clean and scalable.",
    },
    category: "freertos",
    cover: IMG.courseFreeRtos,
    author: "Lê Quốc Bảo",
    publishedAt: "2026-01-28",
    readingTime: 13,
    tags: ["FreeRTOS", "architecture", "C++"],

    content: [
      {
        heading: {
          vi: "Pattern 1: Task cảm biến độc lập",
          en: "Pattern 1: Independent Sensor Tasks",
        },
        paragraphs: [
          {
            vi: "Mỗi loại cảm biến nên có task riêng với chu kỳ riêng. Task DHT22 đọc mỗi 30 giây, task ADC đọc mỗi 1 giây — khi DHT22 treo, ADC vẫn chạy. Truyền dữ liệu qua queue thay vì biến toàn cục để tránh race condition.",
            en: "Each sensor type should have its own task and timing cycle. The DHT22 task can read every 30 seconds while the ADC task reads every second. If the DHT22 task hangs, the ADC task can continue running. Pass data through queues instead of global variables to avoid race conditions.",
          },
          {
            vi: "Quy tắc vàng: task không bao giờ chờ nhau trực tiếp. Giao tiếp qua queue, semaphore hoặc event group — không bao giờ qua biến toàn cục.",
            en: "Golden rule: tasks should never wait for each other directly. Communicate through queues, semaphores, or event groups — never through shared global variables.",
          },
        ],
      },
      {
        heading: {
          vi: "Pattern 2-3: Consumer và Gatekeeper",
          en: "Patterns 2-3: Consumer and Gatekeeper",
        },
        paragraphs: [
          {
            vi: "Pattern Consumer: một task duy nhất nhận từ queue và xử lý (gửi MQTT). Giúp mọi I/O mạng nằm ở một chỗ, dễ quản lý buffer. Pattern Gatekeeper: chỉ một task có quyền ghi UART/display, các task khác gửi yêu cầu qua queue — hết cảnh hai task ghi đè màn hình của nhau.",
            en: "The Consumer pattern uses a single task to receive messages from a queue and process them, such as publishing to MQTT. This keeps network I/O in one place and makes buffer management easier. The Gatekeeper pattern gives only one task permission to write to UART or a display, while other tasks send requests through a queue, preventing multiple tasks from overwriting each other's output.",
          },
          {
            vi: "Gatekeeper đặc biệt hữu ích khi debug: mọi log đi qua một điểm, dễ bật/tắt và định tuyến.",
            en: "Gatekeeper is especially useful for debugging because all logs pass through a single point, making them easier to enable, disable, and route.",
          },
        ],
      },
      {
        heading: {
          vi: "Pattern 4-5: Timer task và Watchdog",
          en: "Patterns 4-5: Timer Task and Watchdog",
        },
        paragraphs: [
          {
            vi: 'Software timer cho việc lặp định kỳ nhẹ (nháy LED status, kiểm tra kết nối) — nhẹ hơn tạo task riêng. Watchdog task giám sát: mọi task phải "nuôi" watchdog định kỳ; task nào treo, hệ thống reset có kiểm soát thay vì chết im lặng. Năm pattern này chiếm 90% thiết kế task trong firmware thực tế — áp dụng từ đầu giúp code mở rộng từ 2 lên 20 task mà vẫn dễ debug.',
            en: 'Software timers are ideal for lightweight periodic operations such as blinking a status LED or checking connectivity, and they are lighter than creating a dedicated task. A watchdog task monitors the system: every important task must periodically "feed" the watchdog. If a task hangs, the system performs a controlled reset instead of silently dying. These five patterns cover a large portion of practical firmware task designs and make it much easier to scale from 2 to 20 tasks while keeping the code debuggable.',
          },
        ],
      },
    ],
  },

  {
    id: "b-006",
    slug: "gpio-interrupts-esp32",
    title: {
      vi: "GPIO Interrupts trên ESP32: Đừng để CPU ngồi chờ",
      en: "GPIO Interrupts on ESP32: Never Make Your CPU Wait",
    },
    excerpt: {
      vi: "Từ polling đến interrupt-driven: viết ISR an toàn và phản hồi nút bấm trong vòng 1ms.",
      en: "From polling to interrupt-driven: writing safe ISRs and responding to buttons within 1ms.",
    },
    category: "esp32",
    cover: IMG.courseEsp32Bootcamp,
    author: "Trần Minh Quang",
    publishedAt: "2026-01-20",
    readingTime: 8,
    tags: ["ESP32", "interrupt", "C++"],

    content: [
      {
        heading: {
          vi: "Polling lãng phí như thế nào?",
          en: "How Wasteful Is Polling?",
        },
        paragraphs: [
          {
            vi: "Vòng loop() đọc nút bấm mỗi 10ms nghĩa là CPU thức 100 lần/giây chỉ để phát hiện... không có gì xảy ra. Trên ESP32 với FreeRTOS, mỗi lần thức tiêu tốn năng lượng và chiếm CPU của task khác. Interrupt giải quyết triệt để: phần cứng tự báo khi chân GPIO thay đổi trạng thái.",
            en: "Reading a button every 10ms in loop() means the CPU wakes up 100 times per second just to discover that nothing happened. On an ESP32 running FreeRTOS, each wake-up consumes energy and takes CPU time away from other tasks. Interrupts solve this by allowing the hardware to notify the CPU whenever the GPIO state changes.",
          },
          {
            vi: "Độ trễ phản hồi giảm từ 10ms xuống dưới 1ms — chênh lệch cảm nhận rõ rệt với nút bấm.",
            en: "Response latency can drop from 10ms to below 1ms, which is clearly noticeable when interacting with a button.",
          },
        ],
      },
      {
        heading: {
          vi: "ISR phải ngắn và an toàn",
          en: "ISRs Must Be Short and Safe",
        },
        paragraphs: [
          {
            vi: "Quy tắc số một của ISR: càng ngắn càng tốt. Không gọi Serial.print, không cấp phát động, không mutex. Chỉ nên làm hai việc: ghi biến volatile hoặc đẩy dữ liệu vào queue bằng xQueueSendFromISR.",
            en: "The number-one rule for an ISR is to keep it as short as possible. Do not call Serial.print, perform dynamic memory allocation, or use mutexes. The ISR should generally only update a volatile variable or push data into a queue using xQueueSendFromISR.",
          },
          {
            vi: "Chống dội (debounce) trong ISR là bẫy kinh điển: nút cơ học dội 5-20ms tạo hàng chục ngắt giả. Giải pháp tốt nhất trên ESP32: dùng GPIO filtering phần cứng hoặc timer one-shot khởi động từ ISR.",
            en: "Debouncing inside an ISR is a classic trap: mechanical buttons can bounce for 5-20ms and generate dozens of false interrupts. On ESP32, a better solution is hardware GPIO filtering or a one-shot timer started by the ISR.",
          },
        ],
      },
      {
        heading: {
          vi: "Từ ISR đến task",
          en: "From ISR to Task",
        },
        paragraphs: [
          {
            vi: 'ISR nên "báo hiệu" và task xử lý nặng sau. Pattern chuẩn: ISR đẩy sự kiện vào queue → task xử lý đọc queue, chống dội, cập nhật UI. Như vậy ISR sống chỉ vài microgiây, còn logic phức tạp nằm trong task có đầy đủ API FreeRTOS. Nắm được ba quy tắc — ISR ngắn, chống dội đúng chỗ, giao tiếp qua queue — bạn xử lý được 95% tình huống GPIO thực tế.',
            en: "The ISR should signal an event and let a task handle the heavier work afterward. The standard pattern is: ISR pushes an event into a queue → task reads the queue, handles debouncing, and updates the UI. The ISR then runs for only a few microseconds while complex logic remains in a task with access to the full FreeRTOS API. Master these three rules — short ISRs, proper debouncing, and queue-based communication — and you can handle most real-world GPIO scenarios.",
          },
        ],
      },
    ],
  },

  {
    id: "b-007",
    slug: "choosing-between-esp32-stm32",
    title: {
      vi: "ESP32 hay STM32: Chọn board cho dự án tiếp theo",
      en: "ESP32 or STM32: Picking the Right Board for Your Next Project",
    },
    excerpt: {
      vi: "So sánh chi tiết từ giá, hệ sinh thái đến năng lực thời gian thực — và khi nào nên dùng cả hai.",
      en: "A detailed comparison of price, ecosystem and real-time capability — and when to use both.",
    },
    category: "iot-basics",
    cover: IMG.courseStm32,
    author: "Lê Quốc Bảo",
    publishedAt: "2026-01-12",
    readingTime: 10,
    tags: ["ESP32", "STM32", "hardware"],

    content: [
      {
        heading: {
          vi: "Hai triết lý khác nhau",
          en: "Two Different Design Philosophies",
        },
        paragraphs: [
          {
            vi: "ESP32 sinh ra để kết nối: Wi-Fi, Bluetooth tích hợp sẵn, giá 3-5 USD, cộng đồng khổng lồ. STM32 sinh ra để điều khiển: ADC 12-bit chất lượng cao, timer nâng cao, thời gian thực cứng, được dùng trong ô tô và y tế. Chọn sai nền tảng ngay từ đầu khiến dự án đi vòng vòng.",
            en: "ESP32 is designed for connectivity: built-in Wi-Fi and Bluetooth, a $3-5 price range, and a huge community. STM32 is designed for control: high-quality 12-bit ADCs, advanced timers, deterministic real-time behavior, and widespread use in automotive and medical applications. Choosing the wrong platform from the beginning can send a project down the wrong path.",
          },
          {
            vi: "Câu hỏi quyết định: sản phẩm của bạn cần Internet hay cần điều khiển chính xác?",
            en: "The key question is: does your product need Internet connectivity or precise hardware control?",
          },
        ],
      },
      {
        heading: {
          vi: "Bảng quyết định nhanh",
          en: "Quick Decision Guide",
        },
        paragraphs: [
          {
            vi: "Chọn ESP32 khi: cần Wi-Fi/BLE, giao diện web, kết nối MQTT, dự án cá nhân hoặc sản phẩm chạy pin. Chọn STM32 khi: cần ADC chính xác, PWM nâng cao cho động cơ, thời gian thực cứng, chứng nhận công nghiệp.",
            en: "Choose ESP32 when you need Wi-Fi/BLE, a web interface, MQTT connectivity, personal projects, or battery-powered products. Choose STM32 when you need precise ADCs, advanced motor PWM, deterministic real-time control, or industrial certification.",
          },
          {
            vi: "Sản phẩm thương mại phức tạp thường dùng cả hai: STM32 điều khiển phần cứng, ESP32 xử lý kết nối, trao đổi qua UART. Kiến trúc này tách biệt rủi ro — firmware kết nối có thể update không ảnh hưởng phần điều khiển.",
            en: "Complex commercial products often use both: STM32 handles hardware control while ESP32 handles connectivity and communicates through UART. This architecture separates risks, allowing connectivity firmware to be updated without affecting the control system.",
          },
        ],
      },
      {
        heading: {
          vi: "Hệ sinh thái và học tập",
          en: "Ecosystem and Learning",
        },
        paragraphs: [
          {
            vi: "ESP32 thắng về tốc độ học: Arduino IDE + PlatformIO + tài liệu phong phú. STM32 thắng về chiều sâu: CubeMX + HAL + datasheet dạy bạn hiểu máy móc thật sự hoạt động ra sao. Nếu mới bắt đầu, học ESP32 trước rồi mở rộng sang STM32 là con đường hiệu quả nhất. Sở hữu một ESP32 và một Nucleo-F411RE (tổng chưa đến 500.000₫) trang bị cho bạn mọi kỹ năng cần thiết.",
            en: "ESP32 wins in learning speed thanks to Arduino IDE, PlatformIO, and abundant documentation. STM32 wins in depth: CubeMX, HAL, and datasheets teach you how the hardware really works. If you are just starting, learning ESP32 first and then expanding to STM32 is an effective path. Owning an ESP32 and a Nucleo-F411RE gives you a solid hardware foundation at a relatively low cost.",
          },
        ],
      },
    ],
  },

  {
    id: "b-008",
    slug: "reading-datasheets-like-pro",
    title: {
      vi: "Đọc datasheet như kỹ sư: Kỹ năng bị bỏ quên của maker",
      en: "Reading Datasheets Like an Engineer: The Skill Makers Skip",
    },
    excerpt: {
      vi: "Không cần đọc hết 40 trang — biết tìm đúng 5 thông tin này sẽ cứu dự án của bạn.",
      en: "You don't need all 40 pages — finding these 5 pieces of information will save your project.",
    },
    category: "embedded-c",
    cover: IMG.courseFreeRtos,
    author: "Nguyễn Hoàng Duy",
    publishedAt: "2026-01-05",
    readingTime: 7,
    tags: ["electronics", "skills"],

    content: [
      {
        heading: {
          vi: "Datasheet không phải để đọc hết",
          en: "You Don't Have to Read the Entire Datasheet",
        },
        paragraphs: [
          {
            vi: "Nhiều người mới nản vì datasheet 40 trang. Kỹ sư thực tế chỉ mở nó như từ điển: tìm đúng mục, lấy thông tin, đóng lại. Bảy mươi phần trăm thời gian chỉ cần đến trang đầu (tổng quan) và trang đặc tính điện (electrical characteristics).",
            en: "Many beginners feel overwhelmed by a 40-page datasheet. Engineers use datasheets more like dictionaries: find the relevant section, get the information, and move on. In many cases, the overview and electrical characteristics sections are enough for most initial decisions.",
          },
          {
            vi: "Kỹ năng tìm kiếm trong datasheet nhanh hơn mọi câu hỏi trên forum — và câu trả lời luôn đáng tin hơn.",
            en: "Being able to search a datasheet is often faster than asking questions on forums, and the answer is usually more reliable.",
          },
        ],
      },
      {
        heading: {
          vi: "5 mục bắt buộc phải kiểm tra",
          en: "5 Things You Must Check",
        },
        paragraphs: [
          {
            vi: "Một: khoảng điện áp hoạt động — cắm 5V vào chip 3.3V là đốt chip ngay lập tức. Hai: dòng tiêu thụ — quyết định thiết kế nguồn. Ba: mức logic I/O — module 3.3V giao tiếp trực tiếp với ESP32 nhưng cần level shifter với Arduino 5V.",
            en: "First: operating voltage range — applying 5V to a 3.3V chip can destroy it. Second: current consumption — this determines the power design. Third: I/O logic levels — a 3.3V module can interface directly with ESP32 but may require a level shifter when connected to a 5V Arduino.",
          },
          {
            vi: 'Bốn: sơ đồ chân và chức năng mỗi chân — các chân không dùng được có thể cần trở kéo. Năm: biểu đồ thời gian (timing) khi giao tiếp SPI/I2C — nguồn gốc của 80% lỗi "code đúng mà không chạy".',
            en: "Fourth: the pinout and function of every pin — unused or special-purpose pins may require pull-up or pull-down resistors. Fifth: timing diagrams for SPI/I2C communication — these are often the source of problems where the code looks correct but the hardware does not work.",
          },
        ],
      },
      {
        heading: {
          vi: "Mẹo đọc hiệu quả",
          en: "Tips for Reading Efficiently",
        },
        paragraphs: [
          {
            vi: 'Tải datasheet vào PDF reader có đánh dấu, dùng màu để ghi chú các mục đã kiểm tra. Với chip phức tạp, đọc thêm phần "Typical Application" cuối datasheet — sơ đồ mạch mẫu do chính nhà sản xuất thiết kế, mượn được nguyên xi cho dự án của bạn. Từng bước luyện thói quen mở datasheet trước khi google — sau một tháng, sự tự tin đọc tài liệu gốc sẽ khác hẳn.',
            en: 'Load the datasheet into a PDF reader with annotations and use colors to mark the sections you have checked. For complex chips, also read the "Typical Application" section near the end — these reference circuits are designed by the manufacturer and can often be adapted directly to your project. Build the habit of opening the datasheet before searching Google, and after a month your confidence in reading primary documentation will improve dramatically.',
          },
        ],
      },
    ],
  },

  {
    id: "b-009",
    slug: "dht22-vs-bme280",
    title: {
      vi: "DHT22 hay BME280: Đo nhiệt độ - độ ẩm đúng cách",
      en: "DHT22 vs BME280: Measuring Temperature & Humidity Right",
    },
    excerpt: {
      vi: "So sánh hai cảm biến phổ biến nhất về độ chính xác, độ bền và giá thành trong 6 tháng đo thực tế.",
      en: "Comparing the two most popular sensors on accuracy, durability and price over 6 months of real data.",
    },
    category: "sensors",
    cover: IMG.productDht22,
    author: "Trần Minh Quang",
    publishedAt: "2025-12-28",
    readingTime: 9,
    tags: ["sensors", "DHT22", "BME280"],

    content: [
      {
        heading: {
          vi: "Thiết lập thí nghiệm",
          en: "Test Setup",
        },
        paragraphs: [
          {
            vi: "Chúng tôi chạy song song 3 DHT22 và 3 BME280 trong cùng điều kiện 6 tháng: trong nhà, ngoài trời có che, và tủ lạnh mini (kiểm tra điểm sương). Số liệu đối chiếu với trạm thời tiết chuẩn gần đó.",
            en: "We ran three DHT22 sensors and three BME280 sensors in parallel for six months under the same conditions: indoors, outdoors under shelter, and inside a mini refrigerator for dew-point testing. The measurements were compared against a nearby reference weather station.",
          },
          {
            vi: "Kết quả tổng thể: BME280 chính xác và bền hơn rõ rệt, nhưng DHT22 vẫn hợp lý với dự án ngân sách.",
            en: "Overall, the BME280 proved noticeably more accurate and durable, while the DHT22 remained a reasonable choice for budget projects.",
          },
        ],
      },
      {
        heading: {
          vi: "Độ chính xác và độ trễ",
          en: "Accuracy and Response Time",
        },
        paragraphs: [
          {
            vi: "BME280 sai số nhiệt độ thực tế ±0.3°C, đo khí áp kèm theo — đáng giá cho trạm thời tiết. DHT22 dao động ±0.8°C và mất 2 giây hoàn thành một lần đọc. Điểm quyết định: DHT22 mất độ chính xác dần trong môi trường ẩm trên 80% RH kéo dài, trong khi BME280 giữ ổn định.",
            en: "The BME280 showed a real-world temperature error of around ±0.3°C and also measures atmospheric pressure, making it valuable for weather stations. The DHT22 showed around ±0.8°C variation and takes about two seconds to complete a reading. A key difference is that the DHT22 can gradually lose accuracy under prolonged exposure to humidity above 80% RH, while the BME280 remains more stable.",
          },
          {
            vi: "Điểm cộng của DHT22: protocol đơn giản, thư viện phổ thông, giá chỉ bằng 1/3. Với ứng dụng nhà thông minh (bật quạt khi nóng), sai số 0.5°C không quan trọng.",
            en: "The DHT22's advantages are its simple protocol, widely available libraries, and roughly one-third the price. For smart home applications such as turning on a fan when the temperature rises, a 0.5°C error may not matter.",
          },
        ],
      },
      {
        heading: {
          vi: "Gợi ý theo mục đích",
          en: "Which One Should You Choose?",
        },
        paragraphs: [
          {
            vi: 'Chọn DHT22 cho: dự án học tập, hệ thống nội thất, ngân sách eo hẹp. Chọn BME280 cho: trạm thời tiết ngoài trời, ứng dụng cần khí áp (dự báo thời tiết local), hệ thống chạy nhiều năm không bảo trì. Không có cảm biến "tốt nhất" — chỉ có cảm biến phù hợp bài toán.',
            en: 'Choose the DHT22 for learning projects, indoor systems, and tight budgets. Choose the BME280 for outdoor weather stations, applications requiring atmospheric pressure such as local weather prediction, and systems expected to run for years with minimal maintenance. There is no single "best" sensor — only the sensor that best fits the problem.',
          },
        ],
      },
    ],
  },

  {
    id: "b-010",
    slug: "esp-now-local-network",
    title: {
      vi: "ESP-NOW: Giao thức kết nối không cần router của ESP32",
      en: "ESP-NOW: ESP32's Router-Free Communication Protocol",
    },
    excerpt: {
      vi: "Độ trễ 4ms, không cần Wi-Fi, kết nối 20+ thiết bị — ESP-NOW là bí mật ít người biết.",
      en: "4ms latency, no Wi-Fi needed, 20+ devices — ESP-NOW is the best-kept ESP32 secret.",
    },
    category: "esp32",
    cover: IMG.blogMqttNetwork,
    author: "Trần Minh Quang",
    publishedAt: "2025-12-15",
    readingTime: 8,
    tags: ["ESP32", "ESP-NOW", "wireless"],

    content: [
      {
        heading: {
          vi: "ESP-NOW là gì?",
          en: "What Is ESP-NOW?",
        },
        paragraphs: [
          {
            vi: "ESP-NOW là giao thức của Espressif cho phép các chip ESP giao tiếp trực tiếp qua MAC address, không cần router hay access point. Không handshake TCP, không DHCP — độ trễ thực đo chỉ 4ms so với 50-100ms qua Wi-Fi thường.",
            en: "ESP-NOW is an Espressif protocol that allows ESP chips to communicate directly through MAC addresses without a router or access point. There is no TCP handshake or DHCP, and measured latency can be around 4ms compared with 50-100ms over conventional Wi-Fi.",
          },
          {
            vi: "Ứng dụng hoàn hảo: điều khiển robot từ xa, cảm biến cửa cảnh báo tức thời, đồng bộ đèn sân khấu — mọi kịch bản cần phản ứng trong vòng 10ms.",
            en: "Ideal applications include remote robot control, instant door sensor alerts, and stage-light synchronization — any scenario requiring a response within around 10ms.",
          },
        ],
      },
      {
        heading: {
          vi: "Kiến trúc mesh đơn giản",
          en: "A Simple Mesh Architecture",
        },
        paragraphs: [
          {
            vi: "Một node đóng vai trò trung tâm (gateway), các node còn lại gửi trực tiếp đến MAC của nó. Gói tin tối đa 250 byte — đủ cho số đọc cảm biến và lệnh điều khiển. Broadcast cho phép gửi đến mọi thiết bị trong khu vực chỉ với một lệnh.",
            en: "One node acts as the central gateway while the other nodes send data directly to its MAC address. Packets can be up to 250 bytes, which is enough for sensor readings and control commands. Broadcasting allows a single command to reach every device in the area.",
          },
          {
            vi: "Kết hợp được với Wi-Fi: ESP32 có thể vừa chạy web server qua Wi-Fi vừa dùng ESP-NOW cho liên lạc nội bộ tốc độ cao. Đây là kiến trúc linh hoạt hiếm giao thức nào có được.",
            en: "ESP-NOW can also be combined with Wi-Fi. An ESP32 can run a web server over Wi-Fi while simultaneously using ESP-NOW for high-speed local communication. This is a remarkably flexible architecture.",
          },
        ],
      },
      {
        heading: {
          vi: "Giới hạn cần biết",
          en: "Limitations You Should Know",
        },
        paragraphs: [
          {
            vi: "Không có mã hóa mặc định — cần bật PMK để bảo mật. Không có cơ chế retry như TCP — ứng dụng phải tự xử lý mất gói (thường bằng ACK tùy chỉnh hoặc gửi lặp). Khoảng cách thực tế 100-200m ngoài trời với antenna thường. ESP-NOW lấp khoảng trống giữa Bluetooth (ngắn, chậm thiết lập) và Wi-Fi (cần router) — cho các hệ thống nội bộ cần độ trễ thấp, nó là lựa chọn nhanh nhất để triển khai.",
            en: "Encryption is not enabled by default, so PMK should be configured for security. ESP-NOW also does not provide TCP-style retries, meaning the application must handle packet loss itself, usually through custom ACKs or repeated transmissions. Typical outdoor range can reach around 100-200m with a standard antenna. ESP-NOW fills the gap between Bluetooth, which has shorter range and connection overhead, and Wi-Fi, which normally requires a router.",
          },
        ],
      },
    ],
  },

  {
    id: "b-011",
    slug: "ota-firmware-updates-esp32",
    title: {
      vi: "OTA cho ESP32: Update firmware không cần cắm dây",
      en: "OTA for ESP32: Updating Firmware Without Wires",
    },
    excerpt: {
      vi: "Cơ chế OTA, phân vùng dual-bank và rollback an toàn — những gì sản phẩm thương mại phải có.",
      en: "OTA mechanics, dual-bank partitions and safe rollback — what commercial products must have.",
    },
    category: "esp32",
    cover: IMG.courseEsp32Bootcamp,
    author: "Lê Quốc Bảo",
    publishedAt: "2025-12-02",
    readingTime: 12,
    tags: ["ESP32", "OTA", "production"],

    content: [
      {
        heading: {
          vi: "Vì sao OTA quyết định sản phẩm",
          en: "Why OTA Matters for Products",
        },
        paragraphs: [
          {
            vi: "100 thiết bị trong thực địa, phát hiện lỗi firmware — không cách nào cắm USB từng cái. OTA (Over-The-Air) biến update firmware thành gửi file như app điện thoại. Đây là ranh giới giữa dự án prototype và sản phẩm thật.",
            en: "Imagine having 100 devices deployed in the field and discovering a firmware bug. Plugging a USB cable into every device is not practical. OTA (Over-The-Air) turns firmware updates into something similar to sending an app update. This is one of the boundaries between a prototype and a real product.",
          },
          {
            vi: "Chi phí thiết kế OTA ngay từ đầu gần như bằng 0; thêm vào sau thường phải đổi lại toàn bộ bảng phân vùng.",
            en: "The cost of designing OTA support from the beginning is almost negligible. Adding it later may require redesigning the entire flash partition layout.",
          },
        ],
      },
      {
        heading: {
          vi: "Dual-bank: mạng an toàn cho update",
          en: "Dual-Bank: A Safety Net for Updates",
        },
        paragraphs: [
          {
            vi: "ESP32 flash 4MB chia thành hai partition app. Firmware mới ghi vào partition rỗi, chỉ khi verify xong mới chuyển boot. Gập giữa chừng? Reboot lại vào bản cũ như chưa có gì xảy ra. Kèm cơ chế rollback: nếu app mới crash 3 lần liên tiếp, bootloader tự quay về bản trước.",
            en: "A 4MB ESP32 flash can be divided into two application partitions. New firmware is written to the inactive partition, and the boot target changes only after verification succeeds. If the update is interrupted, the device can reboot into the previous firmware. With rollback enabled, the bootloader can return to the previous version if the new application repeatedly crashes.",
          },
          {
            vi: 'esp_ota_mark_app_valid_cancel_rollback() gọi sau khi app tự kiểm tra khỏe mạnh (kết nối được MQTT, đọc được cảm biến) là dấu mốc "commit".',
            en: 'Calling esp_ota_mark_app_valid_cancel_rollback() after the application confirms that it is healthy — for example, it can connect to MQTT and read sensors — acts as the "commit" point.',
          },
        ],
      },
      {
        heading: {
          vi: "Giao thức và bảo mật",
          en: "Protocol and Security",
        },
        paragraphs: [
          {
            vi: 'HTTPS là tối thiểu. Sản phẩm nghiêm túc cần ký số firmware (ESP-IDF hỗ trợ secure boot v2) và kiểm tra chữ ký trước khi ghi flash. Kích thước gói OTA nên 1.2-1.8MB cho app ESP32 — hãy thiết kế app gọn ngay từ đầu. OTA không phải tính năng "có thì tốt" — là điều kiện bắt buộc của thiết bị IoT thương mại. Bắt đầu từ dự án nhỏ với ArduinoOTA, nâng cấp dần lên hệ thống ký số khi ra sản phẩm.',
            en: "HTTPS should be considered the minimum. Serious products should digitally sign firmware, use secure boot v2 where appropriate, and verify signatures before writing to flash. Keep ESP32 OTA application images reasonably small by designing the firmware efficiently from the beginning. OTA is not merely a nice-to-have feature — it is a fundamental requirement for commercial IoT products. Start with ArduinoOTA for small projects and gradually move toward signed firmware as the product matures.",
          },
        ],
      },
    ],
  },

  {
    id: "b-012",
    slug: "ble-proximity-esp32",
    title: {
      vi: "Bluetooth Low Energy với ESP32: Từ beacon đến truy vết thiết bị",
      en: "Bluetooth Low Energy with ESP32: From Beacons to Asset Tracking",
    },
    excerpt: {
      vi: "Hiểu GAP, GATT và cách làm tag truy vết với tiêu thụ điện bằng một viên pin cúc áo.",
      en: "Understanding GAP, GATT and building coin-cell asset tags that last for months.",
    },
    category: "ble",
    cover: IMG.productEsp32,
    author: "Nguyễn Hoàng Duy",
    publishedAt: "2025-11-20",
    readingTime: 10,
    tags: ["BLE", "ESP32", "tracking"],

    content: [
      {
        heading: {
          vi: "BLE khác Bluetooth cổ điển ra sao?",
          en: "How Is BLE Different from Classic Bluetooth?",
        },
        paragraphs: [
          {
            vi: "Bluetooth cổ điển truyền dữ liệu liên tục, BLE truyền các gói ngắn giữa các giai đoạn ngủ sâu. Một beacon BLE chỉ phát tín hiệu 100ms mỗi 2 giây, tiêu thụ trung bình dưới 20µA — pin cúc áo CR2032 kéo được hơn một năm.",
            en: "Classic Bluetooth is designed for continuous data transfer, while BLE sends short packets between low-power sleep periods. A BLE beacon may transmit for only 100ms every two seconds and consume less than 20µA on average, allowing a CR2032 coin cell to last for more than a year.",
          },
          {
            vi: "BLE sinh ra cho các thiết bị cảm ứng: tag truy vết, vòng đeo tay, cảm biến cửa, đèn điều khiển từ điện thoại.",
            en: "BLE is designed for low-power connected devices such as tracking tags, wearables, door sensors, and lights controlled from a phone.",
          },
        ],
      },
      {
        heading: {
          vi: "GAP và GATT: hai trụ cột",
          en: "GAP and GATT: The Two Pillars",
        },
        paragraphs: [
          {
            vi: "GAP định nghĩa vai trò: advertiser (quảng cáo sự tồn tại), scanner (nghe), central (kết nối). GATT định nghĩa dữ liệu sau khi kết nối: services chứa characteristics, mỗi characteristic là một giá trị có thể đọc/ghi/notify — giống REST API của thế giới BLE.",
            en: "GAP defines roles such as advertiser, scanner, and central. GATT defines the data exchanged after a connection is established: services contain characteristics, and each characteristic can be read, written, or used for notifications — somewhat like a REST API for the BLE world.",
          },
          {
            vi: "ESP32 hỗ trợ cả hai vai trò. Ví dụ điển hình: ESP32 làm server GATT cung cấp số đọc nhiệt độ qua characteristic notify, điện thoại đăng ký nhận cập nhật mỗi khi giá trị thay đổi.",
            en: "ESP32 supports both roles. A typical example is an ESP32 acting as a GATT server that provides temperature readings through a notify characteristic, while a phone subscribes to receive updates whenever the value changes.",
          },
        ],
      },
      {
        heading: {
          vi: "Dự án thực tế: tag truy vết",
          en: "Real-World Project: An Asset Tracking Tag",
        },
        paragraphs: [
          {
            vi: "Tag truy vết dùng ESP32-C3 với pin cúc áo: phát beacon mỗi 2 giây, gateway ESP32 ở các phòng nghe và ghi nhận RSSI. Tín hiệu mạnh nhất cho biết thiết bị ở phòng nào. Hệ thống này theo dõi 50 thiết bị y tế trong bệnh viện với chi phí phần cứng dưới 1 triệu đồng/gateway. BLE là mảnh ghép hoàn hảo khi Wi-Fi thừa thãi: khoảng cách ngắn, pin kéo dài, điện thoại nào cũng kết nối được.",
            en: "An asset tracking tag can use an ESP32-C3 with a coin cell battery and broadcast a beacon every two seconds. ESP32 gateways installed in different rooms listen for the signal and record RSSI. The strongest signal can indicate which room the asset is in. BLE is ideal when Wi-Fi is unnecessary: short-range communication, long battery life, and compatibility with virtually every modern smartphone.",
          },
        ],
      },
    ],
  },

  {
    id: "b-013",
    slug: "c-part1-pointers-embedded",
    title: {
      vi: "Embedded C phần 1: Con trỏ không đáng sợ",
      en: "Embedded C Part 1: Pointers Are Not Scary",
    },
    excerpt: {
      vi: "Hiểu con trỏ qua ví dụ phần cứng thật — từ thanh ghi GPIO đến buffer giao tiếp UART.",
      en: "Understanding pointers through real hardware examples — from GPIO registers to UART buffers.",
    },
    category: "embedded-c",
    cover: IMG.courseIotBeginners,
    author: "Lê Quốc Bảo",
    publishedAt: "2025-11-08",
    readingTime: 14,
    tags: ["C", "embedded", "fundamentals"],

    content: [
      {
        heading: {
          vi: "Con trỏ chỉ là địa chỉ",
          en: "A Pointer Is Just an Address",
        },
        paragraphs: [
          {
            vi: 'Mọi biến trong RAM đều có địa chỉ. Con trỏ là biến chứa địa chỉ của biến khác — không hề phức tạp hơn "số nhà". Trên vi điều khiển, khái niệm này hiện hữu hơn mọi nơi khác: thanh ghi GPIOA->ODR chính là con trỏ trỏ đến địa chỉ ngoại vi cụ thể.',
            en: 'Every variable in RAM has an address. A pointer is simply a variable that stores the address of another variable — no more complicated than a "house number." On microcontrollers, this concept becomes especially concrete: registers such as GPIOA->ODR ultimately represent access to specific peripheral memory addresses.',
          },
          {
            vi: "volatile uint32_t* led = (uint32_t*)0x40020014; — một dòng này tóm tắt toàn bộ ý nghĩa của con trỏ trong hệ nhúng.",
            en: "volatile uint32_t* led = (uint32_t*)0x40020014; — this single line captures much of what pointers mean in embedded systems.",
          },
        ],
      },
      {
        heading: {
          vi: "Ba use case hàng ngày",
          en: "Three Everyday Use Cases",
        },
        paragraphs: [
          {
            vi: "Một: truy cập thanh ghi phần cứng — toàn bộ HAL của STM32 là các struct pointer trỏ vào vùng nhớ ngoại vi. Hai: truyền buffer lớn — hàm uart_send(uint8_t* data, uint16_t len) nhận con trỏ thay vì copy 1KB dữ liệu vào stack. Ba: callback — con trỏ hàm cho phép driver gọi code của người dùng khi có sự kiện.",
            en: "First: accessing hardware registers — STM32 HAL code relies heavily on structures and pointers that map to peripheral memory. Second: passing large buffers — a function such as uart_send(uint8_t* data, uint16_t len) receives a pointer instead of copying 1KB of data onto the stack. Third: callbacks — function pointers allow drivers to call application code when an event occurs.",
          },
          {
            vi: "const uint8_t* cho dữ liệu chỉ đọc, uint8_t* const cho con trỏ không đổi đích — đọc hiểu ngay được ý định của người viết code.",
            en: "const uint8_t* indicates read-only data, while uint8_t* const indicates a pointer whose target address cannot change. Understanding these forms makes the programmer's intent much clearer.",
          },
        ],
      },
      {
        heading: {
          vi: "Lỗi kinh điển và cách tránh",
          en: "Classic Pointer Bugs and How to Avoid Them",
        },
        paragraphs: [
          {
            vi: 'Dangling pointer: trỏ vào biến local đã hết scope — trình biên dịch cảnh báo nhưng vẫn cho qua, lỗi chỉ hiện khi hardware hành xử lạ. Wild pointer: con trỏ chưa khởi tạo — luôn gán NULL khi khai báo và kiểm tra trước khi dùng. NULL check là thói quen rẻ nhất cứu được nhiều giờ debug nhất. Khi bạn nhìn thấy con trỏ như địa chỉ phần cứng thay vì "thứ phức tạp trong sách C", mọi struct trong HAL và driver trở nên minh bạch hoàn toàn.',
            en: "A dangling pointer points to a local variable whose scope has already ended. The compiler may warn about it, but the bug can appear later as strange hardware behavior. A wild pointer is an uninitialized pointer, so initialize pointers appropriately and validate them before use. These simple habits can save hours of debugging. Once you see pointers as hardware addresses rather than something mysterious from a C textbook, HAL structures and drivers become much easier to understand.",
          },
        ],
      },
    ],
  },

  {
    id: "b-014",
    slug: "wifi-provisioning-iot-products",
    title: {
      vi: "Cấp Wi-Fi cho sản phẩm IoT: Trải nghiệm như sản phẩm thương mại",
      en: "Wi-Fi Provisioning for IoT Products: Commercial-Grade Experience",
    },
    excerpt: {
      vi: "SoftAP, BLE provisioning và SmartConfig — so sánh ba cách đưa credential Wi-Fi vào thiết bị mới.",
      en: "SoftAP, BLE provisioning and SmartConfig — comparing three ways to get Wi-Fi credentials into a new device.",
    },
    category: "wifi",
    cover: IMG.blogSmartHome,
    author: "Nguyễn Hoàng Duy",
    publishedAt: "2025-10-25",
    readingTime: 11,
    tags: ["Wi-Fi", "UX", "production"],

    content: [
      {
        heading: {
          vi: 'Bài toán "thiết lập lần đầu"',
          en: "The First-Time Setup Problem",
        },
        paragraphs: [
          {
            vi: "Sản phẩm IoT thật phải hoạt động ngay khi mở hộp — nhưng nó chưa biết Wi-Fi nhà bạn là gì. Bài toán provisioning quyết định trải nghiệm đầu tiên: làm tệ, khách trả hàng trong 10 phút. Ba cách chính: SoftAP, BLE provisioning và SmartConfig.",
            en: "A real IoT product should work immediately after being taken out of the box, but it does not yet know the customer's Wi-Fi credentials. Provisioning determines the first-time experience. A poor setup experience can frustrate customers within minutes. The three main approaches are SoftAP, BLE provisioning, and SmartConfig.",
          },
          {
            vi: "Quy tắc kinh nghiệm: nếu khách hàng là người dùng phổ thông, đừng bao giờ yêu cầu họ cấu hình file hay mở trình duyệt gõ IP.",
            en: "A practical rule: if your customers are ordinary consumers, never ask them to edit configuration files or open a browser and manually enter an IP address.",
          },
        ],
      },
      {
        heading: {
          vi: "SoftAP: đáng tin nhất",
          en: "SoftAP: The Most Reliable Approach",
        },
        paragraphs: [
          {
            vi: "ESP32 phát access point riêng (tên như SmartIoTVN-Setup), người dùng nối điện thoại vào, mở trang cấu hình, chọn mạng nhà và nhập mật khẩu. Đáng tin 100%, chạy được trên mọi điện thoại. Nhược điểm: người dùng phải rời mạng nhà tạm thời.",
            en: "The ESP32 creates its own access point, such as SmartIoTVN-Setup. The user connects their phone to it, opens the configuration page, selects the home network, and enters the password. It is highly reliable and works across phones. The main drawback is that the user temporarily disconnects from their normal Wi-Fi network.",
          },
          {
            vi: "BLE provisioning mượt hơn: app gọi BLE gửi credential qua GATT characteristic, người dùng không rời mạng. ESP-IDF có sẵn giao thức chuẩn với app ESP Provisioning — lựa chọn tốt cho sản phẩm thương mại.",
            en: "BLE provisioning provides a smoother experience: the app sends Wi-Fi credentials over a GATT characteristic while the phone remains connected to its normal network. ESP-IDF provides a standard provisioning protocol and ESP Provisioning app support, making it a strong choice for commercial products.",
          },
        ],
      },
      {
        heading: {
          vi: "SmartConfig: tiện nhưng rủi ro",
          en: "SmartConfig: Convenient but Risky",
        },
        paragraphs: [
          {
            vi: "SmartConfig (ESP-Touch) gửi credential qua các gói UDP được mã hóa độ dài — điện thoại không cần đổi mạng. Tuy nhiên độ tin cậy phụ thuộc router, khoảng 5-10% thiết bị thất bại. Chỉ dùng làm lựa chọn phụ kèm fallback SoftAP.",
            en: "SmartConfig (ESP-Touch) sends Wi-Fi credentials through specially encoded UDP packets, so the phone does not need to change networks. However, reliability depends on the router, and some deployments may experience failures. It is better used as an optional method with SoftAP as a fallback.",
          },
          {
            vi: "Luôn lưu credential vào NVS (Non-Volatile Storage) và xử lý trường hợp đổi mật khẩu Wi-Fi: thiết bị nên tự trở về chế độ setup khi kết nối thất bại 3 lần. Thiết kế provisioning tử tế ngay từ đầu — đó là ấn tượng đầu tiên của sản phẩm với khách hàng.",
            en: "Always store credentials in NVS (Non-Volatile Storage) and handle Wi-Fi password changes gracefully. The device should return to setup mode after several consecutive connection failures. Designing provisioning properly from the beginning creates a much better first impression of the product.",
          },
        ],
      },
    ],
  },

  {
    id: "b-015",
    slug: "watchdog-timers-reliability",
    title: {
      vi: "Watchdog Timer: Cứu cánh cho thiết bị chạy 24/7",
      en: "Watchdog Timers: The Lifesaver for Always-On Devices",
    },
    excerpt: {
      vi: "Thiết bị của bạn sẽ treo — câu hỏi là nó tự hồi phục hay nằm đó cho đến khi ai đó cắm lại điện.",
      en: "Your device will hang — the question is whether it recovers itself or sits dead until someone power-cycles it.",
    },
    category: "embedded-c",
    cover: IMG.courseFreeRtos,
    author: "Trần Minh Quang",
    publishedAt: "2025-10-12",
    readingTime: 9,
    tags: ["reliability", "FreeRTOS", "production"],

    content: [
      {
        heading: {
          vi: 'Chuyện không ai kể về thiết bị "hoàn hảo"',
          en: 'The Untold Story of the "Perfect" Device',
        },
        paragraphs: [
          {
            vi: "Mã demo chạy hoàn hảo trong phòng. Sau ba tháng tại hiện trường, một node cảm biến đứng im vì memory fragment, một node khác treo vì MQTT broker ngắt kết nối giữa chừng handshake. Thiết bị chạy 24/7 chắc chắn gặp tình huống chưa từng kiểm thử.",
            en: "Demo code can run perfectly in the lab. After three months in the field, one sensor node may stop because of memory fragmentation while another hangs when the MQTT broker disconnects during a handshake. A device running 24/7 will eventually encounter situations that were never tested.",
          },
          {
            vi: 'Watchdog là hợp đồng với phần cứng: "nếu phần mềm không đến định kỳ nuôi ta, ta sẽ reset hệ thống."',
            en: 'A watchdog is a contract with the hardware: "if the software stops checking in, the hardware will reset the system."',
          },
        ],
      },
      {
        heading: {
          vi: "Task Watchdog trên FreeRTOS",
          en: "Task Watchdog on FreeRTOS",
        },
        paragraphs: [
          {
            vi: "ESP-IDF có Task Watchdog Timer (TWDT) tích hợp: đăng ký các task quan trọng, task nào không gọi esp_task_wdt_reset trong khoảng thời gian quy định sẽ ghi log hoặc trigger panic. Với toàn hệ thống, dùng hardware watchdog với timeout khớp chu kỳ hoạt động dài nhất.",
            en: "ESP-IDF includes a Task Watchdog Timer (TWDT). Important tasks can be registered, and a task that fails to call esp_task_wdt_reset within the configured interval can trigger logging or a panic. At the system level, a hardware watchdog can be configured with a timeout longer than the longest expected operating cycle.",
          },
          {
            vi: "Bẫy kinh điển: nuôi watchdog trong timer interrupt — làm watchdog vô hiệu vì interrupt vẫn chạy khi task chính đã chết. Chỉ nuôi watchdog ở task xử lý chính, chứng minh được luồng nghiệp vụ còn sống.",
            en: "A classic trap is feeding the watchdog from a timer interrupt. This can make the watchdog ineffective because the interrupt may continue running even after the main task has died. Feed the watchdog from the main processing task so that the system proves its actual application flow is still alive.",
          },
        ],
      },
      {
        heading: {
          vi: "Thiết kế để hồi phục có ý nghĩa",
          en: "Design for Meaningful Recovery",
        },
        paragraphs: [
          {
            vi: 'Reset mù quáng có thể tệ hơn treo: nếu dữ liệu chưa gửi, hãy flush vào NVS trước. Đếm số lần reset liên tiếp (RTC memory) — reset 3 lần vẫn lỗi thì chuyển chế độ safe mode: tắt tính năng phụ, chỉ giữ kết nối và báo cáo trạng thái lên server. Watchdog biến thiết bị "đôi khi phải cắm lại" thành hệ thống tự trị 99.9% — ba mươi dòng code là đầu tư ROI cao nhất trong mọi firmware sản xuất.',
            en: 'A blind reset can be worse than a hang. If important data has not been sent, flush it to NVS first. Track consecutive resets using RTC memory. If the device fails repeatedly, switch to a safe mode: disable secondary features, keep only essential connectivity, and report the status to the server. A well-designed watchdog can turn a device that "sometimes needs a power cycle" into a largely self-recovering system.',
          },
        ],
      },
    ],
  },

  {
    id: "b-016",
    slug: "iot-dashboard-grafana",
    title: {
      vi: "Dashboard IoT đẹp miễn phí: Grafana + InfluxDB + MQTT",
      en: "Free Beautiful IoT Dashboards: Grafana + InfluxDB + MQTT",
    },
    excerpt: {
      vi: "Stack trực quan hóa dữ liệu cảm biến hoàn chỉnh chạy trên Raspberry Pi — từ broker đến biểu đồ trong 1 giờ.",
      en: "A complete sensor visualization stack on a Raspberry Pi — from broker to charts in one hour.",
    },
    category: "iot-basics",
    cover: IMG.newsAiChip,
    author: "Nguyễn Hoàng Duy",
    publishedAt: "2025-09-30",
    readingTime: 10,
    tags: ["Grafana", "MQTT", "dashboard"],

    content: [
      {
        heading: {
          vi: "Tại sao không tự viết dashboard?",
          en: "Why Not Build the Dashboard Yourself?",
        },
        paragraphs: [
          {
            vi: "Ghi dữ liệu vào file rồi vẽ biểu đồ HTML tự viết hoạt động — cho đến khi có 3 thiết bị, 10 cảm biến và dữ liệu nửa năm. Grafana giải quyết trọn gói: truy vấn theo thời gian, biểu đồ đẹp, cảnh báo, chia sẻ — tất cả miễn phí và chạy tốt trên Raspberry Pi.",
            en: "Writing sensor data to files and building your own HTML charts works until you have three devices, ten sensors, and six months of data. Grafana provides the complete solution: time-based queries, beautiful charts, alerts, and sharing — all available for free and capable of running well on a Raspberry Pi.",
          },
          {
            vi: "Ba thành phần: Telegraf/Mosquitto thu dữ liệu, InfluxDB lưu chuỗi thời gian, Grafana hiển thị.",
            en: "The three main components are Telegraf/Mosquitto for collecting data, InfluxDB for storing time-series data, and Grafana for visualization.",
          },
        ],
      },
      {
        heading: {
          vi: "Cài đặt bằng Docker Compose",
          en: "Install Everything with Docker Compose",
        },
        paragraphs: [
          {
            vi: "Ba service với một file docker-compose.yml: Mosquitto (MQTT broker), InfluxDB (time-series DB), Grafana (dashboard). Telegraf subscribe topic sensors/# và ghi trực tiếp vào InfluxDB — ESP32 chỉ cần publish JSON lên MQTT, mọi thứ phía sau tự động.",
            en: "Three services can be defined in a single docker-compose.yml file: Mosquitto as the MQTT broker, InfluxDB as the time-series database, and Grafana as the dashboard. Telegraf subscribes to sensors/# and writes the data directly into InfluxDB. The ESP32 only needs to publish JSON to MQTT while everything behind it happens automatically.",
          },
          {
            vi: "Chuẩn hóa topic ngay từ đầu: sensors/livingroom/temperature với payload JSON giúp cấu hình Telegraf 5 phút thay vì viết code xử lý mỗi thiết bị một kiểu.",
            en: "Standardize topics from the beginning. A topic such as sensors/livingroom/temperature combined with a consistent JSON payload can reduce Telegraf configuration to minutes instead of requiring custom processing code for every device.",
          },
        ],
      },
      {
        heading: {
          vi: "Dashboard đáng giá",
          en: "A Dashboard That Actually Matters",
        },
        paragraphs: [
          {
            vi: "Ba panel cần thiết: gauge nhiệt độ/độ ẩm hiện tại (đánh giá nhanh), line chart 24 giờ (phát hiện bất thường), stat tile với cảnh báo ngưỡng (đổi màu khi CO2 vượt 1000ppm). Alert rule gửi Telegram khi vượt ngưỡng hoàn tất hệ thống giám sát thực thụ. Grafana + InfluxDB + MQTT là stack chuẩn công nghiệp mà cá nhân cũng chạy được — một giờ cài đặt tiết kiệm hàng tuần tự viết dashboard.",
            en: "Three panels are essential: a current temperature/humidity gauge for quick status checks, a 24-hour line chart for detecting anomalies, and a stat tile with threshold alerts that changes state when CO2 exceeds 1000ppm. A Telegram alert rule completes the monitoring system. Grafana + InfluxDB + MQTT is an industrial-style stack that individuals can run themselves, and an hour of setup can save weeks of dashboard development.",
          },
        ],
      },
    ],
  },
];
