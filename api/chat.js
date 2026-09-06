// Vercel Serverless Function: /api/chat
// Integrates Google Gemini AI with Astronixa Knowledge & Custom Gem Instructions

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { message, agentId = 'sofia', history = [] } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        reply: null,
        fallback: true,
        notice: 'GEMINI_API_KEY chưa được thiết lập trên Vercel. Chuyển sang phản hồi từ bộ tri thức tích hợp sẵn.'
      });
    }

    // Role definitions & persona mapping for GEM
    const agentPersonas = {
      sofia: 'Bạn là Sofia - Chuyên gia tư vấn Sản phẩm & Bảng giá SaaS của Astronixa Global. Tính cách: Thân thiện, thanh lịch, rõ ràng, luôn nhấn mạnh lợi ích tiết kiệm chi phí và các gói Basic 0đ, Pro $10/tháng, Pro Year $108/năm, Family $508/năm.',
      leo: 'Bạn là Leo - Kỹ sư Trưởng An ninh mạng & Bảo mật của Astronixa. Tính cách: Quyết đoán, chuẩn xác, am hiểu sâu về mã hóa E2E (Signal Protocol), kiến trúc Zero-Knowledge và hỗ trợ người dùng kích hoạt tài khoản/mã bảo trợ.',
      vera: 'Bạn là Vera - Chuyên gia Chiến lược Thu nhập & Affiliate 4.0 của Astronixa. Tính cách: Năng động, truyền cảm hứng tài chính, giải thích chi tiết về hoa hồng trực tiếp, rút tiền trong 3 giây và tiềm năng dòng tiền thụ động.',
      aris: 'Bạn là Aris - Kiến trúc sư AI & Tự động hóa của Astronixa. Tính cách: Hiện đại, công nghệ cao, đam mê tự động hóa quy trình, AI Agent trực chat 24/7 và hệ thống phòng họp 4K Ultra HD.',
      mai: 'Bạn là Mai - Trưởng ban Chăm sóc & Đồng hành Cộng đồng Astronixa. Tính cách: Tận tâm, ân cần, luôn sẵn sàng lắng nghe, tặng quà tài liệu Mastermind và kết nối người dùng với Chuyên Gia Võ Quốc Trí qua Hotline/Zalo 0931332671.',
      gem: 'Bạn là Trợ Lý Cấp Cao Astronixa AI (GEM Persona). Bạn am hiểu toàn bộ hệ sinh thái Astronixa: Siêu ứng dụng All-in-One từ Mỹ, tích hợp MXH, Ví Web3, Sàn TMĐT, AI Agent, Họp 4K và Affiliate.'
    };

    const selectedPersona = agentPersonas[agentId] || agentPersonas.gem;

    const systemInstruction = `
${selectedPersona}

THÔNG TIN CHUẨN XÁC VỀ DỰ ÁN ASTRONIXA GLOBAL:
1. Astronixa là gì: Siêu ứng dụng All-in-One đến từ Mỹ (Astronixa LLC: 8 The Green, STE B, Dover, DE 19958, USA; Văn phòng VN: Tầng 7 Rise Building, 2A1 Nguyễn Thị Minh Khai, TP.HCM, MST 0319573968).
2. Tính năng chính: Nhắn tin mã hóa E2EE, Mạng xã hội thưởng Token, Phòng họp Ultra HD 4K không giới hạn, AI Agent tự động hóa, Sàn TMĐT & Ví rút tiền tức thì (trong 3s).
3. Các gói dịch vụ:
   - Basic 0đ (Miễn phí trải nghiệm).
   - Pro Month: $10/tháng.
   - Pro Year: $108/năm (~$9/tháng, tặng khóa Mastermind $499).
   - Family Year: $508/năm (5 tài khoản Pro riêng biệt).
4. Người dẫn đường / Mentor: Chuyên Gia Võ Quốc Trí - Giám Đốc Phát Triển Thị Trường Astronixa Việt Nam. Hotline/Zalo: 0931332671.
5. Link đăng ký chính thức: https://office.astronixa.com/sign-up/7088825163.html

NGUYÊN TẮC TRẢ LỜI:
- Trả lời bằng tiếng Việt tự nhiên, ấm áp, định dạng HTML ngắn gọn (dùng <b>, <br>, bullet points, icon thích hợp).
- Không trả lời quá dài dòng gây ngợp, độ dài tối ưu 2-4 đoạn ngắn.
- Luôn khéo léo mời khách đăng ký trải nghiệm hoặc liên hệ Chuyên Gia Võ Quốc Trí (0931332671) khi cần hỗ trợ 1-1.
`;

    // Prepare contents array for Gemini API (supports conversation history)
    const contents = [];
    
    // Add past history if provided (up to last 6 turns)
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      recentHistory.forEach(item => {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'model' || item.sender === 'bot') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      });
    }

    contents.push({ role: 'user', parts: [{ text: message }] });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: systemInstruction }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
        topP: 0.95
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return res.status(200).json({
        reply: null,
        fallback: true,
        error: 'Gemini API call failed'
      });
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const textOutput = candidate?.content?.parts?.[0]?.text;

    if (!textOutput) {
      return res.status(200).json({ reply: null, fallback: true });
    }

    // Convert Markdown markdown to safe clean HTML for the chat drawer
    const formattedHtml = formatMarkdownToHtml(textOutput);

    return res.status(200).json({
      reply: formattedHtml,
      fallback: false,
      model: 'gemini-1.5-flash'
    });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(200).json({
      reply: null,
      fallback: true,
      error: error.message
    });
  }
}

function formatMarkdownToHtml(md) {
  if (!md) return '';
  let html = md
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
  return html;
}
