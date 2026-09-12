/**
 * Product seed data (22 items across 8 categories).
 * Bilingual text mirrors a future localized backend; images come from the asset manifest.
 */
import { IMG } from "@/lib/images";
import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "esp32-devkit-v1",
    name: {
      vi: "Bo phát triển ESP32 DevKit V1",
      en: "ESP32 DevKit V1 Development Board",
    },
    shortDescription: {
      vi: "Bo mạch Wi-Fi + Bluetooth với chip ESP32-WROOM-32, 30 chân GPIO, lập trình bằng Arduino IDE hoặc PlatformIO.",
      en: "Wi-Fi + Bluetooth board with ESP32-WROOM-32 chip, 30 GPIO pins, programmable via Arduino IDE or PlatformIO.",
    },
    description: {
      vi: "ESP32 DevKit V1 là lựa chọn phổ biến nhất để bắt đầu với IoT. Chip ESP32-WROOM-32 tích hợp bộ xử lý lõi kép 240MHz, Wi-Fi 802.11 b/g/n và Bluetooth 4.2, đủ sức chạy cả ứng dụng đơn giản lẫn hệ thống FreeRTOS phức tạp. Bo mạch hỗ trợ chế độ deep sleep giảm dòng xuống chỉ vài µA, lý tưởng cho các dự án pin dài hạn như trạm thời tiết hay cảm biến nông nghiệp.",
      en: "The ESP32 DevKit V1 is the most popular way to start with IoT. Its ESP32-WROOM-32 chip integrates a 240MHz dual-core processor, Wi-Fi 802.11 b/g/n and Bluetooth 4.2, powerful enough for everything from simple apps to complex FreeRTOS systems. Deep sleep mode drops current to just a few µA, ideal for battery-powered projects like weather stations or agricultural sensors.",
    },
    category: "esp32",
    price: 189,
    salePrice: 159,
    image: IMG.productEsp32,
    gallery: [IMG.productEsp32, IMG.courseEsp32Bootcamp, IMG.courseFreeRtos],
    rating: 4.8,
    reviewCount: 214,
    stock: 45,
    brand: "Espressif",
    specs: [
      {
        label: { vi: "Chip", en: "Chip" },
        value: {
          vi: "ESP32-WROOM-32 lõi kép 240MHz",
          en: "ESP32-WROOM-32 dual-core 240MHz",
        },
      },
      {
        label: { vi: "Kết nối", en: "Connectivity" },
        value: {
          vi: "Wi-Fi 802.11 b/g/n, Bluetooth 4.2",
          en: "Wi-Fi 802.11 b/g/n, Bluetooth 4.2",
        },
      },
      { label: { vi: "Flash", en: "Flash" }, value: { vi: "4MB", en: "4MB" } },
      {
        label: { vi: "GPIO", en: "GPIO" },
        value: { vi: "30 chân", en: "30 pins" },
      },
      {
        label: { vi: "Điện áp", en: "Operating voltage" },
        value: {
          vi: "3.3V (nguồn 5V qua micro-USB)",
          en: "3.3V (5V via micro-USB)",
        },
      },
    ],
    featured: true,
    createdAt: "2025-11-02",
  },
  {
    id: "p-002",
    slug: "arduino-uno-r3",
    name: {
      vi: "Bo Arduino Uno R3 (bản tương thích)",
      en: "Arduino Uno R3 (compatible)",
    },
    shortDescription: {
      vi: "Bo mạch ATmega328P kinh điển cho người mới học điện tử và lập trình nhúng.",
      en: "Classic ATmega328P board, perfect for learning electronics and embedded programming.",
    },
    description: {
      vi: "Arduino Uno R3 với chip ATmega328P là điểm khởi đầu quen thuộc của hàng triệu maker. Với 14 chân digital I/O, 6 kênh ADC 10-bit và hệ sinh thái shield khổng lồ, Uno vẫn là công cụ giảng dạy điện tử tốt nhất. Bo mạch tương thích hoàn toàn với Arduino IDE và hỗ trợ nạp code qua cáp USB chuẩn.",
      en: "The Arduino Uno R3 with ATmega328P chip has been the starting point for millions of makers. With 14 digital I/O pins, 6 channels of 10-bit ADC and a huge shield ecosystem, the Uno remains the best tool for teaching electronics. Fully compatible with the Arduino IDE and programmed over standard USB.",
    },
    category: "arduino",
    price: 135,
    image: IMG.productArduinoUno,
    gallery: [IMG.productArduinoUno, IMG.courseIotBeginners],
    rating: 4.7,
    reviewCount: 186,
    stock: 62,
    brand: "Arduino",
    specs: [
      {
        label: { vi: "Chip", en: "Chip" },
        value: { vi: "ATmega328P 16MHz", en: "ATmega328P 16MHz" },
      },
      {
        label: { vi: "Flash", en: "Flash" },
        value: { vi: "32KB", en: "32KB" },
      },
      {
        label: { vi: "I/O", en: "I/O" },
        value: { vi: "14 digital, 6 analog", en: "14 digital, 6 analog" },
      },
      {
        label: { vi: "Điện áp", en: "Operating voltage" },
        value: { vi: "5V", en: "5V" },
      },
    ],
    createdAt: "2025-10-18",
  },
  {
    id: "p-003",
    slug: "stm32-nucleo-f411re",
    name: { vi: "Bo STM32 Nucleo-F411RE", en: "STM32 Nucleo-F411RE Board" },
    shortDescription: {
      vi: "Nucleo-F411RE với MCU ARM Cortex-M4 100MHz, mbed-enabled, tích hợp ST-LINK debugger.",
      en: "Nucleo-F411RE with 100MHz ARM Cortex-M4 MCU, mbed-enabled, with onboard ST-LINK debugger.",
    },
    description: {
      vi: "Nucleo-F411RE là cánh cửa chuyên nghiệp vào thế giới STM32. MCU STM32F411RE ARM Cortex-M4 với FPU, 512KB flash và 128KB RAM đủ sức chạy FreeRTOS, DSP và các hệ thống điều khiển thời gian thực. Bo mạch tích hợp ST-LINK/V2-1 để nạp và debug trực tiếp, tương thích Arduino Uno R3 shield và chân Morpho mở rộng.",
      en: "The Nucleo-F411RE is the professional gateway into the STM32 world. Its STM32F411RE ARM Cortex-M4 MCU with FPU, 512KB flash and 128KB RAM can run FreeRTOS, DSP and real-time control systems. Onboard ST-LINK/V2-1 lets you flash and debug directly, with Arduino Uno R3 shield compatibility and extended Morpho headers.",
    },
    category: "stm32",
    price: 329,
    salePrice: 289,
    image: IMG.productStm32Nucleo,
    gallery: [IMG.productStm32Nucleo, IMG.courseStm32],
    rating: 4.9,
    reviewCount: 97,
    stock: 28,
    brand: "STMicroelectronics",
    specs: [
      {
        label: { vi: "MCU", en: "MCU" },
        value: {
          vi: "STM32F411RE Cortex-M4 100MHz",
          en: "STM32F411RE Cortex-M4 100MHz",
        },
      },
      {
        label: { vi: "Flash / RAM", en: "Flash / RAM" },
        value: { vi: "512KB / 128KB", en: "512KB / 128KB" },
      },
      {
        label: { vi: "Debugger", en: "Debugger" },
        value: { vi: "ST-LINK/V2-1 tích hợp", en: "Onboard ST-LINK/V2-1" },
      },
    ],
    createdAt: "2025-12-05",
  },
  {
    id: "p-004",
    slug: "dht22-temperature-humidity-sensor",
    name: {
      vi: "Cảm biến nhiệt độ & độ ẩm DHT22",
      en: "DHT22 Temperature & Humidity Sensor",
    },
    shortDescription: {
      vi: "Cảm biến kỹ thuật số độ chính xác cao, đo -40…80°C và 0–100% RH, giao thức 1-wire.",
      en: "High-accuracy digital sensor measuring -40…80°C and 0–100% RH over a 1-wire protocol.",
    },
    description: {
      vi: "DHT22 (AM2302) là bản nâng cấp của DHT11 với độ chính xác ±0.5°C và ±2–5% RH, phù hợp cho trạm thời tiết, nhà thông minh và giám sát nông nghiệp. Cảm biến trả dữ liệu kỹ thuật số qua giao thức 1-wire đơn giản, có sẵn thư viện cho Arduino và ESP32. Nên có trở kéo 10kΩ cho dây dài hơn 1m.",
      en: "The DHT22 (AM2302) upgrades the DHT11 with ±0.5°C and ±2–5% RH accuracy, suited for weather stations, smart homes and agriculture monitoring. It outputs digital data over a simple 1-wire protocol with ready-made libraries for Arduino and ESP32. A 10kΩ pull-up resistor is recommended for wires longer than 1m.",
    },
    category: "sensors",
    price: 75,
    image: IMG.productDht22,
    gallery: [IMG.productDht22, IMG.projectWeatherStation],
    rating: 4.6,
    reviewCount: 342,
    stock: 120,
    brand: "Aosong",
    specs: [
      {
        label: { vi: "Khoảng đo nhiệt độ", en: "Temperature range" },
        value: { vi: "-40…80°C (±0.5°C)", en: "-40…80°C (±0.5°C)" },
      },
      {
        label: { vi: "Khoảng đo độ ẩm", en: "Humidity range" },
        value: { vi: "0–100% RH (±2–5%)", en: "0–100% RH (±2–5%)" },
      },
      {
        label: { vi: "Điện áp", en: "Operating voltage" },
        value: { vi: "3.3–6V DC", en: "3.3–6V DC" },
      },
    ],
    createdAt: "2025-09-12",
  },
  {
    id: "p-005",
    slug: "4-channel-relay-module-5v",
    name: {
      vi: "Module rơ le 4 kênh 5V cách quang",
      en: "4-Channel 5V Relay Module (optocoupler)",
    },
    shortDescription: {
      vi: "Điều khiển 4 thiết bị 220V/10A cách ly quang học, tương thích ESP32/Arduino.",
      en: "Control 4 devices at 220V/10A with optical isolation, compatible with ESP32/Arduino.",
    },
    description: {
      vi: "Module rơ le 4 kênh với cách ly quang học giúp điều khiển thiết bị điện 220V an toàn từ vi điều khiển. Mỗi kênh chịu được tải 10A/250VAC, có LED báo trạng thái và đầu vào kích mức thấp (active low). Đây là linh kiện cốt lõi trong các dự án nhà thông minh: điều khiển đèn, quạt, bơm nước.",
      en: "This 4-channel relay module with optical isolation lets a microcontroller safely switch 220V appliances. Each channel handles 10A/250VAC loads, has a status LED and active-low trigger input. It is the core component of smart home projects: lights, fans and pumps.",
    },
    category: "modules",
    price: 65,
    image: IMG.productRelayModule,
    gallery: [IMG.productRelayModule, IMG.blogSmartHome],
    rating: 4.5,
    reviewCount: 158,
    stock: 88,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Số kênh", en: "Channels" },
        value: { vi: "4 kênh", en: "4 channels" },
      },
      {
        label: { vi: "Tải cực đại", en: "Max load" },
        value: {
          vi: "10A/250VAC, 10A/30VDC mỗi kênh",
          en: "10A/250VAC, 10A/30VDC per channel",
        },
      },
      {
        label: { vi: "Cách ly", en: "Isolation" },
        value: {
          vi: "Optocoupler 5V trigger (active low)",
          en: "Optocoupler 5V trigger (active low)",
        },
      },
    ],
    createdAt: "2025-08-20",
  },
  {
    id: "p-006",
    slug: "iot-starter-kit-esp32",
    name: { vi: "Bộ kit IoT khởi đầu với ESP32", en: "ESP32 IoT Starter Kit" },
    shortDescription: {
      vi: "Kit học IoT trọn bộ: ESP32, 15+ cảm biến, breadboard, dây cắm và tài liệu 10 dự án.",
      en: "Complete IoT learning kit: ESP32, 15+ sensors, breadboard, jumper wires and a 10-project guide.",
    },
    description: {
      vi: 'Bộ kit được thiết kế đi kèm khóa học "IoT for Beginners": ESP32 DevKit, DHT22, rơ le, OLED SSD1306, cảm biến chuyển động PIR, đèn LED, trở, breadboard, dây cắm và nguồn. Tài liệu hướng dẫn 10 dự án từ nháy LED đến hệ thống nhà thông minh gửi dữ liệu MQTT — mọi thứ bạn cần cho 2–3 tháng học.',
      en: 'This kit pairs with the "IoT for Beginners" course: ESP32 DevKit, DHT22, relay, SSD1306 OLED, PIR motion sensor, LEDs, resistors, breadboard, jumpers and power supply. The included guide walks through 10 projects from blinking an LED to a smart home system publishing MQTT data — everything you need for 2–3 months of learning.',
    },
    category: "kits",
    price: 899,
    salePrice: 749,
    image: IMG.productSensorKit,
    gallery: [IMG.productSensorKit, IMG.courseIotBeginners, IMG.productEsp32],
    rating: 4.9,
    reviewCount: 76,
    stock: 35,
    brand: "SmartIoTVN",
    specs: [
      {
        label: { vi: "Thành phần", en: "Contents" },
        value: {
          vi: "ESP32 + 15 linh kiện cảm biến/module",
          en: "ESP32 + 15 sensor/module parts",
        },
      },
      {
        label: { vi: "Dự án mẫu", en: "Sample projects" },
        value: { vi: "10 dự án có tài liệu", en: "10 documented projects" },
      },
    ],
    featured: true,
    createdAt: "2026-01-08",
  },
  {
    id: "p-007",
    slug: "esp32-s3-devkitc-1",
    name: { vi: "Bo ESP32-S3 DevKitC-1", en: "ESP32-S3 DevKitC-1 Board" },
    shortDescription: {
      vi: "ESP32-S3 lõi kép 240MHz với hướng dẫn AI và bộ tăng tốc vector, RAM mở rộng 8MB.",
      en: "Dual-core 240MHz ESP32-S3 with AI instructions and vector acceleration, 8MB extended RAM.",
    },
    description: {
      vi: "ESP32-S3 DevKitC-1 là thế hệ mới nhất dành cho ứng dụng AI biên: bộ tăng tốc vector cho xử lý tín hiệu, nhận diện hình ảnh và giọng nói ngay trên chip. Với 8MB PSRAM và 16MB flash, bo mạch chạy tốt TinyML, ESP-WHO và camera OV2640 — phù hợp các dự án camera IP, trợ lý giọng nói.",
      en: "The ESP32-S3 DevKitC-1 is the latest generation for edge AI: vector instructions accelerate signal, image and voice processing on-chip. With 8MB PSRAM and 16MB flash, the board runs TinyML, ESP-WHO and OV2640 cameras well — ideal for IP camera and voice assistant projects.",
    },
    category: "esp32",
    price: 385,
    image: IMG.productEsp32,
    gallery: [IMG.productEsp32, IMG.newsAiChip],
    rating: 4.8,
    reviewCount: 54,
    stock: 19,
    brand: "Espressif",
    specs: [
      {
        label: { vi: "Chip", en: "Chip" },
        value: {
          vi: "ESP32-S3 lõi kép 240MHz + vector",
          en: "ESP32-S3 dual-core 240MHz + vector",
        },
      },
      {
        label: { vi: "PSRAM / Flash", en: "PSRAM / Flash" },
        value: { vi: "8MB / 16MB", en: "8MB / 16MB" },
      },
    ],
    createdAt: "2026-02-14",
  },
  {
    id: "p-008",
    slug: "esp8266-nodemcu-v3",
    name: { vi: "Bo NodeMCU ESP8266 V3", en: "NodeMCU ESP8266 V3 Board" },
    shortDescription: {
      vi: "Bo Wi-Fi giá rẻ với chip CP2102, lập trình Lua hoặc Arduino, hoàn hảo cho cảm biến giá thành thấp.",
      en: "Budget Wi-Fi board with CP2102 chip, Lua or Arduino programmable, perfect for low-cost sensors.",
    },
    description: {
      vi: "NodeMCU ESP8266 V3 vẫn là lựa chọn hiệu quả về chi phí cho các node cảm biến Wi-Fi đơn giản: gửi nhiệt độ, độ ẩm, trạng thái cửa lên MQTT broker với giá thấp hơn ESP32. Chip CP2102 USB-UART chính hãng giúp nạp code ổn định, chân breadboard-friendly.",
      en: "NodeMCU ESP8266 V3 remains the cost-effective choice for simple Wi-Fi sensor nodes: pushing temperature, humidity or door status to an MQTT broker at a lower price than ESP32. The genuine CP2102 USB-UART chip ensures stable flashing, and the pin layout is breadboard-friendly.",
    },
    category: "esp32",
    price: 89,
    image: IMG.productEsp32,
    gallery: [IMG.productEsp32],
    rating: 4.4,
    reviewCount: 231,
    stock: 150,
    brand: "Espressif",
    specs: [
      {
        label: { vi: "Chip", en: "Chip" },
        value: { vi: "ESP8266EX 80MHz", en: "ESP8266EX 80MHz" },
      },
      {
        label: { vi: "Kết nối", en: "Connectivity" },
        value: { vi: "Wi-Fi 802.11 b/g/n", en: "Wi-Fi 802.11 b/g/n" },
      },
    ],
    createdAt: "2025-07-30",
  },
  {
    id: "p-009",
    slug: "mega-2560-r3",
    name: { vi: "Bo Arduino Mega 2560 R3", en: "Arduino Mega 2560 R3 Board" },
    shortDescription: {
      vi: "54 chân digital I/O, 16 kênh analog cho các dự án cần nhiều cổng: 3D printer, robot, tự động hóa.",
      en: "54 digital I/O pins, 16 analog channels for port-heavy projects: 3D printers, robots, automation.",
    },
    description: {
      vi: "Arduino Mega 2560 với ATmega2560 mang lại 54 chân digital I/O, 16 kênh analog và 4 UART phần cứng — lựa chọn lý tưởng cho máy in 3D, robot đa động cơ hoặc hệ thống tự động hóa nhà xưởng cần điều khiển nhiều rơ le cùng lúc.",
      en: "The Arduino Mega 2560 with ATmega2560 provides 54 digital I/O pins, 16 analog channels and 4 hardware UARTs — ideal for 3D printers, multi-motor robots or factory automation needing many relays at once.",
    },
    category: "arduino",
    price: 319,
    image: IMG.productArduinoUno,
    gallery: [IMG.productArduinoUno],
    rating: 4.7,
    reviewCount: 88,
    stock: 22,
    brand: "Arduino",
    specs: [
      {
        label: { vi: "Chip", en: "Chip" },
        value: { vi: "ATmega2560 16MHz", en: "ATmega2560 16MHz" },
      },
      {
        label: { vi: "I/O", en: "I/O" },
        value: {
          vi: "54 digital, 16 analog, 4 UART",
          en: "54 digital, 16 analog, 4 UART",
        },
      },
    ],
    createdAt: "2025-09-01",
  },
  {
    id: "p-010",
    slug: "ssd1306-oled-096-i2c",
    name: {
      vi: 'Màn hình OLED SSD1306 0.96" I2C',
      en: 'SSD1306 OLED Display 0.96" I2C',
    },
    shortDescription: {
      vi: "Màn OLED trắng 128x64 giao tiếp I2C chỉ 2 dây, hiển thị số đọc cảm biến và menu.",
      en: "128x64 white OLED over I2C with just 2 wires — display sensor readings and menus.",
    },
    description: {
      vi: "Màn OLED SSD1306 0.96 inch độ tương phản cao, tiêu thụ điện năng thấp, giao tiếp I2C chỉ cần 2 chân SDA/SCL. Hoàn hảo để hiển thị số đọc cảm biến, trạng thái kết nối WiFi/MQTT hoặc làm giao diện menu cho dự án nhúng.",
      en: "The 0.96-inch SSD1306 OLED offers high contrast, low power and I2C communication needing only SDA/SCL. Perfect for showing sensor readings, Wi-Fi/MQTT status or building embedded menu interfaces.",
    },
    category: "modules",
    price: 45,
    image: IMG.productRelayModule,
    gallery: [IMG.productRelayModule],
    rating: 4.6,
    reviewCount: 275,
    stock: 200,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Độ phân giải", en: "Resolution" },
        value: { vi: "128x64 px", en: "128x64 px" },
      },
      {
        label: { vi: "Giao tiếp", en: "Interface" },
        value: { vi: "I2C (0x3C)", en: "I2C (0x3C)" },
      },
    ],
    createdAt: "2025-06-22",
  },
  {
    id: "p-011",
    slug: "soil-moisture-capacitive-v2",
    name: {
      vi: "Cảm biến độ ẩm đất dung học V2",
      en: "Capacitive Soil Moisture Sensor V2",
    },
    shortDescription: {
      vi: "Cảm biến dung học chống ăn mòn, bền hơn 10 lần cảm biến trở kháng, cho hệ thống tưới tự động.",
      en: "Corrosion-resistant capacitive sensor, 10x more durable than resistive ones, for automatic watering.",
    },
    description: {
      vi: "Cảm biến độ ẩm đất dung học (capacitive) V2 không tiếp xúc trực tiếp với điện cực nên không bị ăn mòn như cảm biến trở kháng. Đầu ra analog 0–3V đọc dễ dàng qua ADC, được dùng trong các dự án tưới cây tự động và giám sát nông nghiệp chính xác.",
      en: "The V2 capacitive soil moisture sensor never exposes electrodes to soil, so it resists corrosion unlike resistive variants. Its 0–3V analog output reads easily through ADC, making it the go-to sensor for automatic plant watering and precision agriculture projects.",
    },
    category: "sensors",
    price: 39,
    image: IMG.productDht22,
    gallery: [IMG.productDht22, IMG.projectSmartGreenhouse],
    rating: 4.7,
    reviewCount: 189,
    stock: 145,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Đầu ra", en: "Output" },
        value: { vi: "Analog 0–3.0V", en: "Analog 0–3.0V" },
      },
      {
        label: { vi: "Điện áp", en: "Operating voltage" },
        value: { vi: "3.3–5.5V", en: "3.3–5.5V" },
      },
    ],
    createdAt: "2025-11-11",
  },
  {
    id: "p-012",
    slug: "lora-sx1278-433mhz-module",
    name: { vi: "Module LoRa SX1278 433MHz", en: "LoRa SX1278 433MHz Module" },
    shortDescription: {
      vi: "Truyền xa 5–10km dòng điện thấp, dành cho cảm biến nông nghiệp không có Wi-Fi.",
      en: "5–10km low-power radio for agricultural sensing where Wi-Fi cannot reach.",
    },
    description: {
      vi: "Module LoRa SX1278 433MHz cho khoảng cách truyền 5–10km trong môi trường mở với dòng tiêu thụ chỉ vài mA. Đây là giải pháp phổ biến nhất cho mạng cảm biến nông nghiệp, trạm thủy văn ở vùng sâu — nơi Wi-Fi và 4G không phủ sóng.",
      en: "The SX1278 433MHz LoRa module reaches 5–10km line-of-sight while drawing only a few mA. It is the standard choice for agricultural sensor networks and hydrology stations in remote areas without Wi-Fi or 4G coverage.",
    },
    category: "modules",
    price: 119,
    image: IMG.productRelayModule,
    gallery: [IMG.productRelayModule, IMG.blogLoraField],
    rating: 4.5,
    reviewCount: 112,
    stock: 64,
    brand: "Semtech",
    specs: [
      {
        label: { vi: "Tần số", en: "Frequency" },
        value: { vi: "433MHz ISM", en: "433MHz ISM" },
      },
      {
        label: { vi: "Khoảng cách", en: "Range" },
        value: { vi: "5–10km (môi trường mở)", en: "5–10km (line-of-sight)" },
      },
    ],
    createdAt: "2025-10-02",
  },
  {
    id: "p-013",
    slug: "pir-motion-sensor-hc-sr501",
    name: {
      vi: "Cảm biến chuyển động PIR HC-SR501",
      en: "PIR Motion Sensor HC-SR501",
    },
    shortDescription: {
      vi: "Phát hiện chuyển động người trong 7m, chỉnh độ nhạy và thời trễ bằng biến trở.",
      en: "Detects human motion within 7m; adjustable sensitivity and delay via potentiometers.",
    },
    description: {
      vi: "HC-SR501 là cảm biến PIR phổ biến nhất cho hệ thống chống trộm và tự động bật đèn. Phạm vi phát hiện 7m/110°, hai biến trở chỉnh độ nhạy và thời gian giữ tín hiệu 5s–300s, tiêu thụ chỉ 65µA khi chờ.",
      en: "HC-SR501 is the most popular PIR sensor for alarms and auto-lighting. Detection range is 7m at 110°, with two potentiometers to set sensitivity and hold time (5s–300s). Idle draw is just 65µA.",
    },
    category: "sensors",
    price: 29,
    image: IMG.productDht22,
    gallery: [IMG.productDht22],
    rating: 4.4,
    reviewCount: 320,
    stock: 210,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Phạm vi", en: "Range" },
        value: { vi: "7m / 110°", en: "7m / 110°" },
      },
      {
        label: { vi: "Điện áp", en: "Operating voltage" },
        value: { vi: "4.5–20V", en: "4.5–20V" },
      },
    ],
    createdAt: "2025-05-19",
  },
  {
    id: "p-014",
    slug: "smart-home-kit-esp32-relay",
    name: {
      vi: "Bộ kit nhà thông minh ESP32 + 8 rơ le",
      en: "ESP32 Smart Home Kit with 8 Relays",
    },
    shortDescription: {
      vi: "Kit điều khiển nhà thông minh 8 kênh với vỏ in 3D, hỗ trợ MQTT và điều khiển qua app.",
      en: "8-channel smart home control kit with 3D-printed case, MQTT and app control support.",
    },
    description: {
      vi: "Bộ kit nhà thông minh gồm ESP32, module 8 rơ le cách quang, nguồn 5V và vỏ in 3D hoàn chỉnh. Firmware mẫu kết nối MQTT với Home Assistant, hỗ trợ điều khiển từ app và lịch hẹn giờ — biến căn hộ thường thành nhà thông minh trong một buổi tối.",
      en: "This smart home kit includes an ESP32, 8-channel optocoupler relay board, 5V PSU and a complete 3D-printed case. The sample firmware connects to MQTT with Home Assistant, supports app control and scheduling — turning a regular apartment smart in one evening.",
    },
    category: "smart-home",
    price: 1250,
    salePrice: 1090,
    image: IMG.productSensorKit,
    gallery: [IMG.productSensorKit, IMG.productRelayModule, IMG.blogSmartHome],
    rating: 4.8,
    reviewCount: 41,
    stock: 15,
    brand: "SmartIoTVN",
    specs: [
      {
        label: { vi: "Kênh điều khiển", en: "Control channels" },
        value: { vi: "8 rơ le 10A cách quang", en: "8 optocoupler 10A relays" },
      },
      {
        label: { vi: "Tích hợp", en: "Integration" },
        value: { vi: "MQTT / Home Assistant", en: "MQTT / Home Assistant" },
      },
    ],
    featured: true,
    createdAt: "2026-01-25",
  },
  {
    id: "p-015",
    slug: "breadboard-830-jumper-kit",
    name: {
      vi: "Bộ breadboard 830 điểm + 65 dây cắm",
      en: "830-Point Breadboard + 65 Jumper Kit",
    },
    shortDescription: {
      vi: "Breadboard MB-102 830 điểm kèm dây cắm đực-đực, đực-cái cho thử nghiệm mạch nhanh.",
      en: "MB-102 830-point breadboard with male-male and male-female jumpers for fast prototyping.",
    },
    description: {
      vi: "Bộ breadboard MB-102 830 điểm với ray nguồn đôi kèm 65 dây cắm là dụng cụ không thể thiếu trên mọi bàn làm việc điện tử. Điện cực nickel-plated tiếp xúc chắc chắn, chịu được hàng nghìn lần cắm rút.",
      en: "The MB-102 830-point breadboard with dual power rails and 65 jumpers is a workbench essential. Nickel-plated clips hold firmly through thousands of insert cycles.",
    },
    category: "components",
    price: 55,
    image: IMG.productSensorKit,
    gallery: [IMG.productSensorKit],
    rating: 4.6,
    reviewCount: 268,
    stock: 180,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Số điểm", en: "Points" },
        value: { vi: "830", en: "830" },
      },
      {
        label: { vi: "Dây cắm", en: "Jumpers" },
        value: { vi: "65 dây", en: "65 wires" },
      },
    ],
    createdAt: "2025-04-15",
  },
  {
    id: "p-016",
    slug: "esp32-cam-ov2640",
    name: {
      vi: "Bộ ESP32-CAM + camera OV2640",
      en: "ESP32-CAM with OV2640 Camera",
    },
    shortDescription: {
      vi: "Module camera Wi-Fi nhỏ nhất với khe thẻ SD, livestream và nhận diện khuôn mặt tại biên.",
      en: "Tiny Wi-Fi camera module with SD slot for on-edge streaming and face detection.",
    },
    description: {
      vi: "ESP32-CAM kết hợp ESP32-S với camera OV2640 2MP và khe microSD — module nhỏ nhất để làm camera IP giá rẻ, camera chuông cửa, hay máy đếm người. Firmware mẫu hỗ trợ livestream qua web và nhận diện khuôn mặt ngay trên chip.",
      en: "ESP32-CAM pairs an ESP32-S with a 2MP OV2640 camera and microSD slot — the smallest module for budget IP cameras, doorbells or people counters. Sample firmware supports web streaming and on-chip face detection.",
    },
    category: "modules",
    price: 165,
    salePrice: 145,
    image: IMG.productEsp32,
    gallery: [IMG.productEsp32, IMG.newsAiChip],
    rating: 4.3,
    reviewCount: 197,
    stock: 52,
    brand: "Ai-Thinker",
    specs: [
      {
        label: { vi: "Camera", en: "Camera" },
        value: { vi: "OV2640 2MP", en: "OV2640 2MP" },
      },
      {
        label: { vi: "Lưu trữ", en: "Storage" },
        value: { vi: "Khe microSD tối đa 4GB", en: "microSD slot up to 4GB" },
      },
    ],
    createdAt: "2025-12-19",
  },
  {
    id: "p-017",
    slug: "water-level-sensor-float",
    name: { vi: "Cảm biến mực nước phao cơ", en: "Float Water Level Sensor" },
    shortDescription: {
      vi: "Công tắc phao từ tính tin cậy cho bồn nước, bơm tự động và cảnh báo tràn.",
      en: "Reliable magnetic float switch for tanks, automatic pumps and overflow alerts.",
    },
    description: {
      vi: "Công tắc phao cơ học với nam châm bên trong hoạt động tin cậy hàng năm trời trong bồn nước. Đầu ra đóng/ngắt đơn giản giúp cài đặt bơm tự động hoặc cảnh báo tràn mà không cần ADC hay hiệu chuẩn.",
      en: "This mechanical float switch with an internal magnet runs reliably for years inside water tanks. Its simple on/off output makes automatic pumping or overflow alerts easy — no ADC or calibration needed.",
    },
    category: "sensors",
    price: 35,
    image: IMG.productDht22,
    gallery: [IMG.productDht22],
    rating: 4.5,
    reviewCount: 96,
    stock: 95,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Đầu ra", en: "Output" },
        value: { vi: "Công tắc ON/OFF", en: "ON/OFF switch" },
      },
      {
        label: { vi: "Điện áp", en: "Max voltage" },
        value: { vi: "250VAC / 0.5A", en: "250VAC / 0.5A" },
      },
    ],
    createdAt: "2025-08-08",
  },
  {
    id: "p-018",
    slug: "mini-dc-water-pump-5v",
    name: { vi: "Bơm nước mini DC 5V", en: "Mini 5V DC Water Pump" },
    shortDescription: {
      vi: "Bơm chìm 5V lưu lượng 1.5–2L/phút cho hệ thống tưới cây tự động nhỏ gọn.",
      en: "5V submersible pump, 1.5–2L/min flow, for compact automatic plant watering.",
    },
    description: {
      vi: "Bơm nước mini DC 5V không chổi than, hoạt động êm, lưu lượng 1.5–2L/phút — lựa chọn tiêu chuẩn cho dự án tưới cây tự động với ESP32 kết hợp rơ le hoặc MOSFET. Kích thước nhỏ gọn đặt được trong thùng nước mini.",
      en: "This brushless 5V DC mini pump runs quietly at 1.5–2L/min — the standard choice for ESP32 plant-watering projects driven by a relay or MOSFET. Compact enough to fit inside a mini reservoir.",
    },
    category: "components",
    price: 49,
    image: IMG.productRelayModule,
    gallery: [IMG.productRelayModule, IMG.projectSmartGreenhouse],
    rating: 4.4,
    reviewCount: 143,
    stock: 130,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Lưu lượng", en: "Flow rate" },
        value: { vi: "1.5–2L/phút", en: "1.5–2L/min" },
      },
      {
        label: { vi: "Điện áp", en: "Operating voltage" },
        value: { vi: "5V DC (tối đa 6V)", en: "5V DC (max 6V)" },
      },
    ],
    createdAt: "2025-07-11",
  },
  {
    id: "p-019",
    slug: "mh-z19b-co2-sensor",
    name: { vi: "Cảm biến CO2 MH-Z19B NDIR", en: "MH-Z19B NDIR CO2 Sensor" },
    shortDescription: {
      vi: "Đo CO2 chính xác 0–5000ppm bằng công nghệ NDIR, dùng cho phòng học, văn phòng thông minh.",
      en: "Accurate 0–5000ppm CO2 measurement via NDIR, for smart classrooms and offices.",
    },
    description: {
      vi: "MH-Z19B dùng công nghệ NDIR (hồng ngoại không tán xạ) đo CO2 chính xác ±50ppm trong khoảng 0–5000ppm. Đây là cảm biến chuẩn cho hệ thống theo dõi chất lượng không khí, tự động bật quạt thông gió khi nồng độ CO2 vượt 1000ppm.",
      en: "MH-Z19B uses NDIR (non-dispersive infrared) for ±50ppm accurate CO2 readings from 0–5000ppm. The standard sensor for air quality monitoring that auto-triggers ventilation above 1000ppm.",
    },
    category: "sensors",
    price: 449,
    image: IMG.productDht22,
    gallery: [IMG.productDht22],
    rating: 4.8,
    reviewCount: 67,
    stock: 24,
    brand: "Winsen",
    specs: [
      {
        label: { vi: "Khoảng đo", en: "Range" },
        value: { vi: "0–5000ppm (±50ppm)", en: "0–5000ppm (±50ppm)" },
      },
      {
        label: { vi: "Giao tiếp", en: "Interface" },
        value: { vi: "UART / PWM", en: "UART / PWM" },
      },
    ],
    createdAt: "2026-01-15",
  },
  {
    id: "p-020",
    slug: "smart-plug-16a-esp-home",
    name: {
      vi: "Ổ cắm thông minh 16A đo điện năng",
      en: "16A Smart Plug with Power Metering",
    },
    shortDescription: {
      vi: "Ổ cắm Wi-Fi 16A tích hợp chip đo điện năng HLW8012, flash được ESPHome/Tasmota.",
      en: "16A Wi-Fi plug with HLW8012 power metering chip, flashable with ESPHome/Tasmota.",
    },
    description: {
      vi: "Ổ cắm thông minh 16A với chip đo điện năng HLW8012 cho phép theo dõi công suất tiêu thụ theo thời gian thực và điều khiển qua MQTT. Chip ESP8266 bên trong có thể flash ESPHome hoặc Tasmota để tích hợp Home Assistant không cần cloud.",
      en: "This 16A smart plug carries an HLW8012 metering chip for real-time power monitoring and MQTT control. The onboard ESP8266 can be flashed with ESPHome or Tasmota for cloud-free Home Assistant integration.",
    },
    category: "smart-home",
    price: 249,
    salePrice: 199,
    image: IMG.productRelayModule,
    gallery: [IMG.productRelayModule, IMG.blogSmartHome],
    rating: 4.6,
    reviewCount: 154,
    stock: 73,
    brand: "SmartIoTVN",
    specs: [
      {
        label: { vi: "Tải cực đại", en: "Max load" },
        value: { vi: "16A / 3520W", en: "16A / 3520W" },
      },
      {
        label: { vi: "Đo điện năng", en: "Metering" },
        value: {
          vi: "HLW8012 (công suất, điện áp, dòng)",
          en: "HLW8012 (power, voltage, current)",
        },
      },
    ],
    createdAt: "2026-02-02",
  },
  {
    id: "p-021",
    slug: "resistor-capacitor-basic-pack",
    name: {
      vi: "Trở + tụ cơ bản 200 linh kiện",
      en: "Basic Resistor + Capacitor Pack (200 pcs)",
    },
    shortDescription: {
      vi: "Bộ linh kiện thụ động cơ bản: 20 giá trị trở phổ biến và 8 giá trị tụ điện.",
      en: "Passive essentials: 20 common resistor values and 8 capacitor values.",
    },
    description: {
      vi: "Bộ 200 linh kiện thụ động gồm trở 1/4W từ 10Ω đến 1MΩ và tụ gốm/điện phân phổ biến — trang bị đầy đủ cho mọi bài tập điện tử cơ bản và thử nghiệm mạch trên breadboard.",
      en: "A 200-piece passive pack with 1/4W resistors from 10Ω to 1MΩ plus common ceramic and electrolytic capacitors — fully stocked for basic electronics exercises and breadboard experiments.",
    },
    category: "components",
    price: 85,
    image: IMG.productSensorKit,
    gallery: [IMG.productSensorKit],
    rating: 4.5,
    reviewCount: 84,
    stock: 160,
    brand: "Generic",
    specs: [
      {
        label: { vi: "Số lượng", en: "Quantity" },
        value: { vi: "200 linh kiện", en: "200 components" },
      },
    ],
    createdAt: "2025-03-28",
  },
  {
    id: "p-022",
    slug: "touch-switch-glass-2-gang",
    name: {
      vi: "Công tắc cảm ứng kính 2 nút",
      en: "2-Gang Glass Touch Switch",
    },
    shortDescription: {
      vi: "Công tắc kính cường lực cảm ứng 2 nút, tích hợp ESP8266, chuyển đổi với MQTT.",
      en: "Tempered-glass 2-gang touch switch with ESP8266 inside, MQTT switchable.",
    },
    description: {
      vi: "Công tắc cảm ứng mặt kính cường lực sang trọng với 2 nút điều khiển, tích hợp sẵn ESP8266 và chip đo điện năng. Firmware mặc định chuyển tín hiệu qua MQTT, tương thích Home Assistant và app điều khiển riêng.",
      en: "An elegant tempered-glass 2-gang touch switch with onboard ESP8266 and power metering. Default firmware bridges to MQTT, compatible with Home Assistant and a dedicated control app.",
    },
    category: "smart-home",
    price: 385,
    image: IMG.productRelayModule,
    gallery: [IMG.productRelayModule],
    rating: 4.7,
    reviewCount: 58,
    stock: 40,
    brand: "Sonoff",
    specs: [
      {
        label: { vi: "Số nút", en: "Gangs" },
        value: { vi: "2 nút cảm ứng", en: "2 touch buttons" },
      },
      {
        label: { vi: "Tích hợp", en: "Integration" },
        value: { vi: "MQTT / eWeLink", en: "MQTT / eWeLink" },
      },
    ],
    createdAt: "2025-11-28",
  },
];
