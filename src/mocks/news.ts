/**
 * News seed data (10 technology/IoT news articles).
 * Bilingual text mirrors a future localized backend; images come from the asset manifest.
 */
import { IMG } from "@/lib/images";
import type { NewsArticle } from "@/types";

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "n-001",
    slug: "esp32-c6-matter-support-2026",
    title: {
      vi: "ESP32-C6 nhận hỗ trợ Matter 1.4 chính thức từ Espressif",
      en: "Espressif Ships Official Matter 1.4 Support for ESP32-C6",
    },
    excerpt: {
      vi: "Bản ESP-IDF 5.3 mang chuẩn nhà thông minh Matter 1.4 ổn định đến ESP32-C6, mở đường cho thiết bị tương tác đa hệ sinh thái.",
      en: "ESP-IDF 5.3 brings stable Matter 1.4 smart home support to ESP32-C6, unlocking cross-ecosystem devices.",
    },
    category: "esp32",
    image: IMG.productEsp32,
    source: "Espressif Developer Blog",
    publishedAt: "2026-03-05",
    readingTime: 4,

    content: [
      {
        heading: {
          vi: "Chuẩn Matter đến nền tảng giá rẻ",
          en: "Matter Comes to an Affordable Platform",
        },
        paragraphs: [
          {
            vi: "Espressif công bố ESP-IDF 5.3 với Matter 1.4 ổn định cho dòng ESP32-C6, bao gồm Wi-Fi 6 và Thread kết hợp. Thiết bị dựa trên ESP32-C6 giờ đây hoạt động trực tiếp với Apple Home, Google Home và Amazon Alexa mà không cần bridge.",
            en: "Espressif has announced ESP-IDF 5.3 with stable Matter 1.4 support for the ESP32-C6, combining Wi-Fi 6 and Thread. Devices based on the ESP32-C6 can now work directly with Apple Home, Google Home, and Amazon Alexa without requiring a bridge.",
          },
          {
            vi: "Giá module C6 chỉ từ 3 USD — thấp nhất trong các nền tảng Matter được chứng nhận hiện nay.",
            en: "C6 modules start at just $3, making them one of the most affordable certified Matter platforms available today.",
          },
        ],
      },
      {
        heading: {
          vi: "Ý nghĩa cho maker Việt Nam",
          en: "What This Means for Vietnamese Makers",
        },
        paragraphs: [
          {
            vi: "Với cập nhật này, dự án nhà thông minh tự làm có thể đạt chuẩn tương thích ngành như thiết bị thương mại. Espressif đồng thời phát hành bộ công cụ chứng nhận đơn giản hóa cho nhà phát triển nhỏ.",
            en: "With this update, DIY smart home projects can achieve industry-level compatibility standards similar to commercial devices. Espressif has also released simplified certification tools for smaller developers.",
          },
          {
            vi: "Cửa hàng SmartIoTVN dự kiến nhập ESP32-C6 DevKit trong tháng này.",
            en: "SmartIoTVN is expected to stock the ESP32-C6 DevKit this month.",
          },
        ],
      },
      {
        heading: {
          vi: "Nhìn xa hơn",
          en: "Looking Ahead",
        },
        paragraphs: [
          {
            vi: "Thread kết hợp Wi-Fi 6 trên cùng một chip là xu hướng 2026 của nhà thông minh. Sự hỗ trợ chính thức của Espressif rút ngắn đáng kể khoảng cách giữa chuẩn quốc tế và cộng đồng maker.",
            en: "Combining Thread and Wi-Fi 6 on the same chip is a major smart home trend in 2026. Espressif's official support significantly narrows the gap between international standards and the maker community.",
          },
        ],
      },
    ],
  },

  {
    id: "n-002",
    slug: "tinyml-on-mcu-2026-trend",
    title: {
      vi: "TinyML 2026: Nhận diện hình ảnh chạy trên MCU 240MHz thành hiện thực",
      en: "TinyML 2026: Image Recognition on 240MHz MCUs Becomes Reality",
    },
    excerpt: {
      vi: "Các framework TinyML mới giúp model nhận diện 8 lớp chạy hoàn toàn trên ESP32-S3 không cần đám mây.",
      en: "New TinyML frameworks run 8-class recognition models entirely on ESP32-S3 without any cloud.",
    },
    category: "ai-iot",
    image: IMG.newsAiChip,
    source: "Edge AI Report",
    publishedAt: "2026-02-27",
    readingTime: 5,

    content: [
      {
        heading: {
          vi: "AI biên bắt kịp phần cứng giá rẻ",
          en: "Edge AI Catches Up with Affordable Hardware",
        },
        paragraphs: [
          {
            vi: "Benchmark tháng 2/2026 cho thấy ESP-DL của Espressif chạy model MobileNetV2 8 lớp với 15fps trên ESP32-S3 240MHz — đủ cho đếm người, phân loại rác, nhận diện khuôn mặt cơ bản không cần Internet.",
            en: "February 2026 benchmarks show that Espressif's ESP-DL can run an 8-class MobileNetV2 model at 15fps on a 240MHz ESP32-S3, enough for people counting, waste classification, and basic face recognition without Internet access.",
          },
          {
            vi: "Tiêu thụ điện năng chỉ 0.4W so với 15-30W của hệ thống GPU tương đương.",
            en: "Power consumption is only 0.4W compared with 15-30W for comparable GPU-based systems.",
          },
        ],
      },
      {
        heading: {
          vi: "Tác động đến thiết kế sản phẩm",
          en: "Impact on Product Design",
        },
        paragraphs: [
          {
            vi: "Nhà phát triển có thể loại bỏ chi phí cloud và độ trễ mạng khỏi luồng nhận diện. Quyền riêng tư tăng vì hình ảnh không bao giờ rời khỏi thiết bị — yếu tố quyết định cho sản phẩm camera gia đình.",
            en: "Developers can eliminate cloud costs and network latency from the recognition pipeline. Privacy is also improved because images never leave the device, which is critical for home camera products.",
          },
          {
            vi: "Khóa học ESP32 Bootcamp của SmartIoTVN sẽ bổ sung chương TinyML trong quý tới.",
            en: "SmartIoTVN's ESP32 Bootcamp will add a TinyML module next quarter.",
          },
        ],
      },
      {
        heading: {
          vi: "Đáng theo dõi",
          en: "Worth Watching",
        },
        paragraphs: [
          {
            vi: "Cuộc đua giữa các framework TinyML (ESP-DL, TFLite Micro, CMSIS-NN) đang đẩy ranh giới của phần cứng dưới 5 USD nhanh hơn mọi dự đoán.",
            en: "The competition among TinyML frameworks such as ESP-DL, TFLite Micro, and CMSIS-NN is pushing the capabilities of sub-$5 hardware faster than expected.",
          },
        ],
      },
    ],
  },

  {
    id: "n-003",
    slug: "raspberry-pi-pico-2-w-launch",
    title: {
      vi: "Raspberry Pi Pico 2 W ra mắt với chip RP2350 và không dây",
      en: "Raspberry Pi Pico 2 W Launches with RP2350 and Wireless",
    },
    excerpt: {
      vi: "Bản W mới nhất mang Wi-Fi và Bluetooth 5.2 đến dòng Pico với giá 7 USD, cạnh tranh trực tiếp ESP32.",
      en: "The new W variant brings Wi-Fi and Bluetooth 5.2 to the Pico line at $7, competing directly with ESP32.",
    },
    category: "products",
    image: IMG.productArduinoUno,
    source: "Raspberry Pi Foundation",
    publishedAt: "2026-02-20",
    readingTime: 4,

    content: [
      {
        heading: {
          vi: "RP2350 cuối cùng cũng có không dây",
          en: "RP2350 Finally Gets Wireless",
        },
        paragraphs: [
          {
            vi: "Raspberry Pi công bố Pico 2 W: chip RP2350 lõi kép 150MHz kết hợp module không dây CYW43439 hỗ trợ Wi-Fi 802.11n và Bluetooth 5.2. Giá công bố 7 USD cho bản 4MB flash.",
            en: "Raspberry Pi has announced the Pico 2 W, featuring the dual-core 150MHz RP2350 paired with a CYW43439 wireless module supporting Wi-Fi 802.11n and Bluetooth 5.2. The announced price is $7 for the 4MB flash version.",
          },
          {
            vi: "Thị trường MCU không dây dưới 10 USD đã có thêm đối thủ trọng yếu.",
            en: "The sub-$10 wireless MCU market now has another major competitor.",
          },
        ],
      },
      {
        heading: {
          vi: "So sánh nhanh với ESP32-S3",
          en: "Quick Comparison with ESP32-S3",
        },
        paragraphs: [
          {
            vi: "Pico 2 W thắng về cộng đồng giáo dục và MicroPython; ESP32-S3 vẫn giữ ưu thế hệ sinh thái MQTT/Matter và mức tiêu thụ deep sleep. Lựa chọn phụ thuộc bài toán: học tập vs sản phẩm kết nối.",
            en: "The Pico 2 W has an advantage in education and MicroPython, while the ESP32-S3 maintains strengths in the MQTT/Matter ecosystem and deep-sleep power consumption. The choice depends on the use case: learning versus connected products.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "Sự cạnh tranh này là tin tốt cho maker: giá giảm, chất lượng tăng, mọi nền tảng đều buộc phải hỗ trợ tốt hơn.",
            en: "This competition is good news for makers: prices decrease, quality improves, and every platform is pushed to provide better support.",
          },
        ],
      },
    ],
  },

  {
    id: "n-004",
    slug: "vietnam-iot-agriculture-fund",
    title: {
      vi: "Chương trình 500 tỷ đồng hỗ trợ IoT nông nghiệp cho hợp tác xã",
      en: "500 Billion VND Program Brings IoT Agriculture to Cooperatives",
    },
    excerpt: {
      vi: "Bộ NN&PTNT triển khai giai đoạn 2 chương trình chuyển đổi số, ưu tiên cảm biến và tưới tự động.",
      en: "The Ministry of Agriculture launches phase 2 of its digital program, prioritizing sensors and automated irrigation.",
    },
    category: "iot",
    image: IMG.projectSmartGreenhouse,
    source: "Báo Nông nghiệp Việt Nam",
    publishedAt: "2026-02-15",
    readingTime: 5,

    content: [
      {
        heading: {
          vi: "Quy mô chương trình",
          en: "Program Scale",
        },
        paragraphs: [
          {
            vi: "Giai đoạn 2 (2026-2028) phân bổ 500 tỷ đồng hỗ trợ hợp tác xã lắp đặt hệ thống cảm biến độ ẩm đất, trạm thời tiết vi mô và tưới tiêu tự động. Mỗi đơn vị nhận hỗ trợ đến 70% chi phí thiết bị.",
            en: "Phase 2 (2026-2028) allocates 500 billion VND to support cooperatives in installing soil moisture sensors, micro-weather stations, and automated irrigation systems. Each organization can receive support covering up to 70% of equipment costs.",
          },
          {
            vi: "Các mô hình cây trồng ưu tiên: rau màu cao điểm, cây ăn quả miền Đông Nam Bộ và lúa ĐBSCL.",
            en: "Priority crops include high-value vegetables, fruit trees in southeastern Vietnam, and rice in the Mekong Delta.",
          },
        ],
      },
      {
        heading: {
          vi: "Cơ hội cho doanh nghiệp IoT trong nước",
          en: "Opportunities for Local IoT Companies",
        },
        paragraphs: [
          {
            vi: "Yêu cầu thiết bị phải có API mở và lưu trữ dữ liệu tại Việt Nam — điều kiện mà các giải pháp self-hosted như MQTT + Grafana hoàn toàn đáp ứng. SmartIoTVN đã phối hợp ba hợp tác xã thí điểm tại Tiền Giang từ tháng 11/2025.",
            en: "Devices are required to provide open APIs and store data in Vietnam, requirements that self-hosted solutions such as MQTT + Grafana can meet. SmartIoTVN has been working with three pilot cooperatives in Tien Giang since November 2025.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "Nông nghiệp IoT chuyển từ thí điểm sang quy mô lớn — thời điểm tốt để kỹ sư nhúng Việt chuẩn bị giải pháp thực địa.",
            en: "IoT agriculture is moving from pilot projects to large-scale deployment — making this a good time for Vietnamese embedded engineers to prepare real-world solutions.",
          },
        ],
      },
    ],
  },

  {
    id: "n-005",
    slug: "esp32-h2-thread-matter",
    title: {
      vi: "ESP32-H2 định vị lại làm bridge Thread-Zigbee giá rẻ",
      en: "ESP32-H2 Repositioned as the Budget Thread-Zigbee Bridge",
    },
    excerpt: {
      vi: "Chip 802.15.4 của Espressif trở thành lựa chọn phổ biến cho border router và bridge nhà thông minh.",
      en: "Espressif's 802.15.4 chip is becoming a popular choice for smart home border routers and bridges.",
    },
    category: "esp32",
    image: IMG.heroSmartCity,
    source: "Espressif Developer Blog",
    publishedAt: "2026-02-08",
    readingTime: 4,

    content: [
      {
        heading: {
          vi: "Một chip, hai chuẩn mesh",
          en: "One Chip, Two Mesh Standards",
        },
        paragraphs: [
          {
            vi: "ESP32-H2 hỗ trợ đồng thời Thread và Zigbee, biến bo mạch 4 USD thành bridge kết nối hàng trăm thiết bị 802.15.4 với mạng Ethernet/Wi-Fi gia đình. Các dự án Home Assistant ZBT-1 thay thế bắt đầu chọn H2 làm nền tảng.",
            en: "The ESP32-H2 supports both Thread and Zigbee, turning a $4 board into a bridge capable of connecting hundreds of 802.15.4 devices to a home's Ethernet/Wi-Fi network. Projects looking for alternatives to Home Assistant ZBT-1 are beginning to choose H2 as their platform.",
          },
          {
            vi: "Dòng chỉ tiêu khi radio hoạt động ~19mA, dùng được cho thiết bị chạy pin với chu kỳ ngủ hợp lý.",
            en: "Radio operating current is around 19mA, making it suitable for battery-powered devices with an appropriate sleep cycle.",
          },
        ],
      },
      {
        heading: {
          vi: "Kịch bản thực tế",
          en: "Real-World Scenario",
        },
        paragraphs: [
          {
            vi: "Kết hợp H2 (bridge) + C6 (thiết bị cuối) + S3 (AI biên) là bộ ba đầy đủ cho nhà thông minh 2026 của Espressif, phủ từ radio mesh đến xử lý biên.",
            en: "Combining H2 as the bridge, C6 as the end device, and S3 for edge AI creates a complete Espressif smart home stack for 2026, covering everything from mesh radio to edge processing.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "Hệ sinh thái Espressif ngày càng khép kín về chức năng mà vẫn giữ mức giá maker — lợi thế cạnh tranh khó thay thế.",
            en: "Espressif's ecosystem is becoming increasingly complete while maintaining maker-friendly pricing — a difficult competitive advantage to replace.",
          },
        ],
      },
    ],
  },

  {
    id: "n-006",
    slug: "matter-1.4-what-changes",
    title: {
      vi: "Matter 1.4 công bố: Chế độ đa quản trị và cải tiến camera",
      en: "Matter 1.4 Announced: Multi-Admin Modes and Camera Improvements",
    },
    excerpt: {
      vi: "Bản cập nhật chuẩn nhà thông minh mở rộng hỗ trợ camera, cảm biến nước và quản trị đa nền tảng.",
      en: "The smart home standard update expands camera support, water sensors, and multi-admin management.",
    },
    category: "technology",
    image: IMG.blogSmartHome,
    source: "CSA Connector",
    publishedAt: "2026-01-30",
    readingTime: 5,

    content: [
      {
        heading: {
          vi: "Điểm mới nổi bật",
          en: "Key Highlights",
        },
        paragraphs: [
          {
            vi: "Matter 1.4 chuẩn hóa hỗ trợ camera an ninh, cảm biến nước rò rỉ và thiết bị quản lý năng lượng. Chế độ multi-admin được cải tiến giúp thiết bị hoạt động song song trên nhiều nền tảng điều khiển mà không cần thiết lập lại.",
            en: "Matter 1.4 standardizes support for security cameras, water leak sensors, and energy management devices. Improved multi-admin functionality allows devices to operate across multiple control platforms without requiring reconfiguration.",
          },
          {
            vi: "Lịch trình chuyển giao thiết bị cho các OEM bắt đầu từ Q2/2026.",
            en: "The device transition schedule for OEMs begins in Q2 2026.",
          },
        ],
      },
      {
        heading: {
          vi: "Với hệ sinh thái ESP32",
          en: "Within the ESP32 Ecosystem",
        },
        paragraphs: [
          {
            vi: "Espressif cam kết SDK Matter cập nhật trong vòng 60 ngày sau mỗi bản chuẩn mới — cộng đồng ESP32 thường là một trong những nền tảng đầu tiên dùng thử.",
            en: "Espressif commits to updating its Matter SDK within 60 days of each new standard release, with the ESP32 community often being among the first platforms to try the new features.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "Matter đang trưởng thành nhanh: từ ánh đèn ban đầu đến camera và năng lượng — phạm vi nhà thông minh mở rộng đáng kể.",
            en: "Matter is maturing rapidly, expanding from its initial focus on lighting to cameras and energy management, significantly broadening the scope of smart homes.",
          },
        ],
      },
    ],
  },

  {
    id: "n-007",
    slug: "stm32-n6-ai-mcu",
    title: {
      vi: "STM32N6 ra mắt: MCU STM32 đầu tiên với NPU tích hợp",
      en: "STM32N6 Arrives: First STM32 MCU with an Integrated NPU",
    },
    excerpt: {
      vi: "STMicroelectronics mở bán STM32N6 với NPU 600 GOPS, đưa thị giác máy học sâu vào MCU giá dưới 15 USD.",
      en: "STMicroelectronics ships STM32N6 with a 600-GOPS NPU, bringing deep-learning vision to sub-$15 MCUs.",
    },
    category: "technology",
    image: IMG.courseStm32,
    source: "STMicroelectronics News",
    publishedAt: "2026-01-22",
    readingTime: 4,

    content: [
      {
        heading: {
          vi: "NPU trong phân khúc MCU",
          en: "NPU Enters the MCU Segment",
        },
        paragraphs: [
          {
            vi: "STM32N6 tích hợp Neural-ART NPU với hiệu năng 600 GOPS, gấp 300 lần dòng STM32 cũ. ST kèm theo bộ công cụ STM32ModelZoo cho huấn luyện và tối ưu model trực tiếp trên chip.",
            en: "The STM32N6 integrates the Neural-ART NPU with 600 GOPS of performance, up to 300 times the performance of older STM32 families. ST also provides the STM32ModelZoo toolkit for training and optimizing models for the chip.",
          },
          {
            vi: "Giá tham khảo từ 12-15 USD cho dòng N6 cơ bản.",
            en: "Reference pricing starts at $12-15 for the entry-level N6 series.",
          },
        ],
      },
      {
        heading: {
          vi: "Ứng dụng thực tế",
          en: "Real-World Applications",
        },
        paragraphs: [
          {
            vi: "Ứng dụng điển hình: phát hiện lỗi sản phẩm trên băng chuyền, nhận diện người ở cửa, phân loại tại chỗ không cần gửi ảnh lên server. Thách thức lớn nhất hiện là tối ưu bộ nhớ — model phải nén trong vài MB SRAM.",
            en: "Typical applications include detecting product defects on production lines, recognizing people at entrances, and performing on-device classification without sending images to a server. The biggest challenge is currently memory optimization, as models must fit within a few megabytes of SRAM.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "STM32N6 mở phân khúc thị giác AI giá rẻ mà trước đây chỉ GPU mới làm được — tin lớn cho ngành công nghiệp Việt Nam đang chuyển đổi số.",
            en: "The STM32N6 opens up an affordable AI vision segment that previously required GPUs, marking an important development for Vietnam's digital transformation efforts.",
          },
        ],
      },
    ],
  },

  {
    id: "n-008",
    slug: "esp32-price-drop-2026",
    title: {
      vi: "Giá module ESP32 giảm 15% sau khi nhà máy mới đi vào hoạt động",
      en: "ESP32 Module Prices Drop 15% as New Fab Comes Online",
    },
    excerpt: {
      vi: "Nguồn cung ổn định hơn đẩy giá module ESP32 về mức thấp lịch sử, lợi thế cho nhà sản xuất thiết bị Việt Nam.",
      en: "A steadier supply pushes ESP32 module prices to record lows, benefiting Vietnamese device manufacturers.",
    },
    category: "products",
    image: IMG.productEsp32,
    source: "Tin thị trường linh kiện",
    publishedAt: "2026-01-15",
    readingTime: 3,

    content: [
      {
        heading: {
          vi: "Giá về mức thấp lịch sử",
          en: "Prices Reach Historic Lows",
        },
        paragraphs: [
          {
            vi: "Giá module ESP32-WROOM-32 tại thị trường Việt Nam giảm từ ~45.000₫ xuống ~38.000₫/module với đơn hàng trên 1.000 chiếc sau khi nguồn cung toàn cầu ổn định trở lại.",
            en: "ESP32-WROOM-32 module prices in Vietnam have fallen from around 45,000 VND to around 38,000 VND per module for orders of more than 1,000 units as global supply stabilizes.",
          },
          {
            vi: "Đây là mức thấp nhất kể từ khủng hoảng chip 2021-2022.",
            en: "This is the lowest price level since the 2021-2022 chip shortage.",
          },
        ],
      },
      {
        heading: {
          vi: "Cơ hội cho thiết bị Made-in-Vietnam",
          en: "Opportunities for Made-in-Vietnam Devices",
        },
        paragraphs: [
          {
            vi: "Chi phí BOM giảm trực tiếp đến giá thành sản phẩm cuối: ổ cắm thông minh, công tắc cảm ứng, bộ điều nhiệt giá rẻ hơn 20-40 nghìn đồng — ngưỡng quan trọng của phân khúc đại chúng.",
            en: "Lower BOM costs directly reduce final product prices: smart plugs, touch switches, and thermostats can become 20,000-40,000 VND cheaper, an important threshold for mass-market products.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "Thời điểm tốt để lên kế hoạch sản xuất hoặc nhập lượng linh kiện dự trữ cho dự án cộng đồng.",
            en: "This is a good time to plan production or stock up on components for community projects.",
          },
        ],
      },
    ],
  },

  {
    id: "n-009",
    slug: "ai-iot-edge-analytics-2026",
    title: {
      vi: "AI + IoT: Phân tích tại biên trở thành tiêu chuẩn mới của nhà máy",
      en: "AI + IoT: Edge Analytics Becomes the New Factory Standard",
    },
    excerpt: {
      vi: "Khảo sát 500 nhà máy cho thấy 62% đã chuyển phân tích dữ liệu từ cloud về thiết bị biên.",
      en: "A survey of 500 factories shows 62% moved analytics from cloud to edge devices.",
    },
    category: "ai-iot",
    image: IMG.newsAiChip,
    source: "Industry IoT Report",
    publishedAt: "2026-01-08",
    readingTime: 6,

    content: [
      {
        heading: {
          vi: "Xu hướng dịch chuyển về biên",
          en: "The Shift Toward the Edge",
        },
        paragraphs: [
          {
            vi: "Lý do hàng đầu: chi phí băng thông và độ trễ quyết định. Phân tích rung động bơm tại chỗ giảm 90% dữ liệu truyền; cảnh báo dừng máy ngay lập tức thay vì chờ vòng quay cloud.",
            en: "The main drivers are bandwidth costs and latency requirements. Analyzing pump vibration locally can reduce transmitted data by 90%, while machine shutdown alerts can be triggered immediately instead of waiting for a cloud round trip.",
          },
          {
            vi: "62% nhà máy khảo sát đã triển khai ít nhất một ứng dụng AI biên trong sản xuất.",
            en: "62% of the surveyed factories have deployed at least one edge AI application in production.",
          },
        ],
      },
      {
        heading: {
          vi: "Thách thức kỹ năng",
          en: "The Skills Challenge",
        },
        paragraphs: [
          {
            vi: "Nhu cầu kỹ sư vừa hiểu cả ML lẫn hệ nhúng tăng mạnh — đúng lĩnh vực mà khóa học FreeRTOS và ESP32 Bootcamp của SmartIoTVN hướng đến. Kiến thức nền: tối ưu model, quản lý bộ nhớ, RTOS.",
            en: "Demand is growing for engineers who understand both ML and embedded systems, exactly the area targeted by SmartIoTVN's FreeRTOS and ESP32 Bootcamp courses. Core skills include model optimization, memory management, and RTOS.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "Edge analytics không thay thế cloud — hai tầng kết hợp thành kiến trúc chuẩn 2026: biên quyết đoán, cloud đào sâu.",
            en: "Edge analytics does not replace the cloud. The two layers work together as the standard architecture for 2026: decisive processing at the edge and deeper analysis in the cloud.",
          },
        ],
      },
    ],
  },

  {
    id: "n-010",
    slug: "thread-momentum-vietnam-2026",
    title: {
      vi: "Thread tiếp cận momentum tại Việt Nam qua các dự án chung cư thông minh",
      en: "Thread Gains Momentum in Vietnam Through Smart Apartment Projects",
    },
    excerpt: {
      vi: "Các chủ đầu tư bắt đầu thử nghiệm Thread cho hệ thống thiết bị trong chung cư — tín hiệu cho hệ sinh thái Matter.",
      en: "Developers begin piloting Thread for apartment device networks — a signal for the Matter ecosystem.",
    },
    category: "iot",
    image: IMG.heroSmartCity,
    source: "Tạp chí Xây dựng số",
    publishedAt: "2025-12-28",
    readingTime: 4,

    content: [
      {
        heading: {
          vi: "Thread trong bất động sản Việt",
          en: "Thread in Vietnamese Real Estate",
        },
        paragraphs: [
          {
            vi: "Hai dự án chung cư tại TP.HCM và Hà Nội triển khai thí điểm Thread cho khóa điện tử và cảm biến chung. Lợi thế: mạng mesh tự phục hồi, không dead spot, thiết bị của nhiều hãng dùng chung mạng.",
            en: "Two apartment projects in Ho Chi Minh City and Hanoi are piloting Thread for electronic locks and shared sensors. Benefits include self-healing mesh networking, fewer dead spots, and the ability for devices from multiple manufacturers to share the same network.",
          },
          {
            vi: "Chi phí lắp đặt giảm 18% so với giải pháp proprietary do giảm wiring và hub trung gian.",
            en: "Installation costs are 18% lower than proprietary solutions because less wiring and fewer intermediate hubs are required.",
          },
        ],
      },
      {
        heading: {
          vi: "Vật cản còn lại",
          en: "Remaining Obstacles",
        },
        paragraphs: [
          {
            vi: "Thiết bị Thread giá thành vẫn cao hơn Wi-Fi 20-30%, và đội ngũ vận hành tòa nhà cần đào tạo về IP-based network. Hai năm tới là giai đoạn chuyển tiếp.",
            en: "Thread devices are still 20-30% more expensive than Wi-Fi devices, and building operators need training in IP-based networking. The next two years will be a transition period.",
          },
        ],
      },
      {
        heading: {
          vi: "Kết luận",
          en: "Conclusion",
        },
        paragraphs: [
          {
            vi: "Với maker Việt, thời điểm bắt đầu học Thread/Matter là bây giờ — chuẩn này sẽ phổ biến trong 2-3 năm tới.",
            en: "For Vietnamese makers, now is a good time to start learning Thread and Matter — these standards are likely to become increasingly common over the next 2-3 years.",
          },
        ],
      },
    ],
  },
];
