import { NextRequest, NextResponse } from "next/server";

// System prompt để train chatbot về dịch vụ in 3D
const SYSTEM_PROMPT = `Bạn là trợ lý AI thông minh của Print3D.vn - nền tảng dịch vụ in 3D chuyên nghiệp hàng đầu Việt Nam.

## THÔNG TIN VỀ DỊCH VỤ:

### Bảng giá vật liệu:
- PLA: 300.000đ - 500.000đ/kg (phổ biến nhất, dễ in, thân thiện môi trường, màu sắc đa dạng)
- ABS: 400.000đ - 600.000đ/kg (bền chắc, chịu nhiệt tốt, cần môi trường in kín)
- PETG: 450.000đ - 650.000đ/kg (cân bằng giữa PLA và ABS, trong suốt được, chịu hóa chất)
- Resin: 800.000đ - 1.500.000đ/lít (chi tiết cực cao, bề mặt mịn, dùng cho figure/trang sức)
- Nylon: 900.000đ - 1.200.000đ/kg (cực bền, chịu mài mòn, dùng cho linh kiện cơ khí)

### Công nghệ in:
- FDM (Fused Deposition Modeling): In từng lớp nhựa, phổ biến, giá rẻ
- SLA (Stereolithography): In resin bằng UV, chi tiết cao, bề mặt mịn
- SLS (Selective Laser Sintering): In bột, không cần support, bền chắc

### Định dạng file hỗ trợ:
- STL (phổ biến nhất)
- OBJ (có texture)
- 3MF (hiện đại, nhiều thông tin)
- STEP (file CAD)
- Kích thước tối đa: 100MB

### Thời gian và vận chuyển:
- Thời gian in: 1-7 ngày tùy độ phức tạp
- Giao hàng nội thành: 25.000đ - 35.000đ (2-3 ngày)
- Giao hàng liên tỉnh: 40.000đ - 80.000đ (3-5 ngày)
- Miễn phí vận chuyển cho đơn từ 500.000đ

### Liên hệ:
- Hotline: 1900 xxxx (8:00-18:00, T2-T7)
- Email: support@print3d.vn
- Website: print3d.vn

## QUY TẮC TRẢ LỜI:
1. Luôn trả lời bằng tiếng Việt
2. Thân thiện, chuyên nghiệp, ngắn gọn
3. Sử dụng emoji phù hợp để tạo sự thân thiện
4. Khi được hỏi về giá, luôn đề cập đến việc upload file để báo giá chính xác
5. Khi không biết câu trả lời, hướng dẫn khách liên hệ hotline
6. Gợi ý các câu hỏi tiếp theo để hỗ trợ khách hàng tốt hơn
7. Nếu khách hỏi về vấn đề kỹ thuật phức tạp, khuyên họ liên hệ trực tiếp
8. Trả lời ngắn gọn, không quá 200 từ`;

// Interface cho message
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Fallback responses khi API fail - Rule-based chatbot
const RULE_BASED_RESPONSES: Record<string, { patterns: RegExp[]; response: string }> = {
  greeting: {
    patterns: [/xin chào/i, /hello/i, /hi\b/i, /chào/i, /hey/i, /alo/i],
    response: `Xin chào! 👋 Tôi là trợ lý của Print3D.vn. Tôi có thể giúp bạn:
• Báo giá dịch vụ in 3D
• Tư vấn vật liệu phù hợp  
• Hướng dẫn đặt hàng
• Thông tin vận chuyển

Bạn cần hỗ trợ gì ạ?`,
  },
  
  price: {
    patterns: [/giá/i, /bao nhiêu/i, /chi phí/i, /báo giá/i, /phí/i, /tiền/i, /cost/i, /price/i],
    response: `💰 **Bảng giá vật liệu in 3D:**

• **PLA**: 300.000đ - 500.000đ/kg (phổ biến, dễ in)
• **ABS**: 400.000đ - 600.000đ/kg (bền, chịu nhiệt)
• **PETG**: 450.000đ - 650.000đ/kg (trong suốt được)
• **Resin**: 800.000đ - 1.500.000đ/lít (chi tiết cao)
• **Nylon**: 900.000đ - 1.200.000đ/kg (cực bền)

📤 Upload file STL để nhận báo giá chính xác nhé!`,
  },

  material: {
    patterns: [/vật liệu/i, /chất liệu/i, /pla/i, /abs/i, /resin/i, /petg/i, /nylon/i, /nhựa/i, /material/i],
    response: `🎨 **Tư vấn vật liệu in 3D:**

• **PLA**: Thân thiện môi trường, màu đẹp, dễ in → Đồ trang trí, prototype
• **ABS**: Bền, chịu nhiệt tốt → Vỏ thiết bị, linh kiện
• **PETG**: Trong suốt, chịu nước → Chai lọ, hộp đựng
• **Resin**: Chi tiết cực cao → Figure, trang sức, mô hình
• **Nylon**: Cực bền, dẻo dai → Linh kiện cơ khí, bánh răng

Bạn muốn in gì? Tôi sẽ tư vấn vật liệu phù hợp! 😊`,
  },

  time: {
    patterns: [/thời gian/i, /bao lâu/i, /mấy ngày/i, /khi nào/i, /nhanh/i, /gấp/i, /urgent/i, /deadline/i],
    response: `⏱️ **Thời gian in 3D:**

• Sản phẩm nhỏ/đơn giản: 1-2 ngày
• Sản phẩm vừa: 3-4 ngày
• Sản phẩm phức tạp/lớn: 5-7 ngày

🚀 **Dịch vụ in gấp**: +30% phí, hoàn thành trong 24-48h

Thời gian cụ thể phụ thuộc vào kích thước và độ phức tạp của mô hình.`,
  },

  shipping: {
    patterns: [/vận chuyển/i, /giao hàng/i, /ship/i, /delivery/i, /phí ship/i, /freeship/i],
    response: `🚚 **Thông tin vận chuyển:**

• **Nội thành**: 25.000đ - 35.000đ (2-3 ngày)
• **Liên tỉnh**: 40.000đ - 80.000đ (3-5 ngày)
• **Miễn phí** cho đơn từ 500.000đ ✨

Chúng tôi hỗ trợ giao hàng toàn quốc qua GHTK, GHN, ViettelPost!`,
  },

  file: {
    patterns: [/file/i, /upload/i, /tải lên/i, /định dạng/i, /format/i, /stl/i, /obj/i],
    response: `📁 **Hướng dẫn upload file:**

**Định dạng hỗ trợ:**
• STL (phổ biến nhất)
• OBJ, 3MF, STEP
• Tối đa: 100MB

**Cách upload:**
1. Truy cập trang "Báo giá"
2. Kéo thả file vào vùng upload
3. Chọn vật liệu và số lượng
4. Nhận báo giá tự động!

Bạn có thể thiết kế bằng Tinkercad, Blender, Fusion 360... 🎨`,
  },

  order: {
    patterns: [/đặt hàng/i, /order/i, /mua/i, /thanh toán/i, /payment/i, /đặt in/i],
    response: `🛒 **Cách đặt hàng in 3D:**

1️⃣ Upload file 3D (STL, OBJ...)
2️⃣ Chọn vật liệu, màu sắc, số lượng
3️⃣ Xác nhận báo giá
4️⃣ Thanh toán (COD, chuyển khoản, Momo, VNPay)
5️⃣ Nhận hàng trong 3-7 ngày

💳 Hỗ trợ thanh toán khi nhận hàng (COD)!`,
  },

  contact: {
    patterns: [/liên hệ/i, /hotline/i, /số điện thoại/i, /email/i, /hỗ trợ/i, /contact/i, /tư vấn/i],
    response: `📞 **Thông tin liên hệ Print3D.vn:**

• **Hotline**: 1900 xxxx (8:00-18:00, T2-T7)
• **Email**: support@print3d.vn
• **Zalo**: 0xxx.xxx.xxx
• **Website**: print3d.vn

Đội ngũ chúng tôi luôn sẵn sàng hỗ trợ bạn! 💪`,
  },

  refund: {
    patterns: [/đổi trả/i, /hoàn tiền/i, /bảo hành/i, /refund/i, /warranty/i, /lỗi/i, /hỏng/i],
    response: `🔄 **Chính sách đổi trả & bảo hành:**

✅ **Đổi trả miễn phí** nếu sản phẩm lỗi do Print3D
✅ **Bảo hành 7 ngày** cho lỗi kỹ thuật
✅ **Hoàn tiền 100%** nếu không thể in được

⚠️ Không áp dụng với:
• Lỗi do file thiết kế của khách
• Sản phẩm đã qua sử dụng

Liên hệ hotline 1900 xxxx để được hỗ trợ!`,
  },

  technology: {
    patterns: [/fdm/i, /sla/i, /sls/i, /công nghệ/i, /technology/i, /kỹ thuật in/i],
    response: `⚙️ **Công nghệ in 3D tại Print3D:**

• **FDM**: In lớp nhựa, giá rẻ, phổ biến → Prototype, đồ dùng
• **SLA**: In resin UV, chi tiết cao, mịn → Figure, trang sức
• **SLS**: In bột laser, không cần support → Linh kiện phức tạp

Mỗi công nghệ phù hợp với mục đích khác nhau. Bạn muốn in gì? 🤔`,
  },

  thanks: {
    patterns: [/cảm ơn/i, /thank/i, /thanks/i, /tks/i, /cam on/i],
    response: `Không có gì ạ! 😊 Rất vui được hỗ trợ bạn.

Nếu có thắc mắc gì thêm, đừng ngại hỏi nhé! Chúc bạn có sản phẩm in 3D ưng ý! 🎉`,
  },

  bye: {
    patterns: [/tạm biệt/i, /bye/i, /goodbye/i, /bái/i],
    response: `Tạm biệt bạn! 👋 

Cảm ơn đã quan tâm đến dịch vụ của Print3D.vn. Hẹn gặp lại! 🌟`,
  },
};

const DEFAULT_FALLBACK = `Cảm ơn bạn đã liên hệ! 🙏 Hiện tại hệ thống đang bận, bạn có thể:
• Gọi hotline: 1900 xxxx
• Email: support@print3d.vn
• Hoặc thử lại sau ít phút

Xin lỗi vì sự bất tiện này!`;

// Detect intent cho fallback - trả về response phù hợp
function getRuleBasedResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [, rule] of Object.entries(RULE_BASED_RESPONSES)) {
    if (rule.patterns.some(pattern => pattern.test(lowerMessage))) {
      return rule.response;
    }
  }
  
  return DEFAULT_FALLBACK;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = (await request.json()) as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Nếu không có API key, dùng rule-based fallback
    if (!apiKey) {
      console.warn("GEMINI_API_KEY not found, using rule-based responses");
      return NextResponse.json({
        response: getRuleBasedResponse(message),
        fallback: true,
      });
    }

    // Chuẩn bị conversation history cho Gemini
    const contents = [
      // System instruction
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Tôi hiểu rồi. Tôi là trợ lý AI của Print3D.vn và sẽ hỗ trợ khách hàng về dịch vụ in 3D theo các thông tin và quy tắc đã được cung cấp.",
          },
        ],
      },
      // Previous conversation history
      ...history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      // Current message
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);

      // Fallback khi API lỗi - dùng rule-based
      return NextResponse.json({
        response: getRuleBasedResponse(message),
        fallback: true,
      });
    }

    const data = await response.json();

    // Extract response text
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      getRuleBasedResponse(message);

    return NextResponse.json({
      response: aiResponse,
      fallback: false,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Fallback khi có lỗi - dùng default response
    return NextResponse.json({
      response: DEFAULT_FALLBACK,
      fallback: true,
      error: "Internal server error",
    });
  }
}
