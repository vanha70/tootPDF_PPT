
import { GoogleGenAI, Type } from "@google/genai";
import { ExtractionResult } from "../types";

// Fixed: Correctly initialize GoogleGenAI with named apiKey parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractContentFromDocument = async (base64Data: string, mimeType: string): Promise<ExtractionResult> => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    Bạn là chuyên gia trích xuất dữ liệu học liệu chính xác 100%.
    
    RÀNG BUỘC NGHIÊM NGẶT:
    1. KHÔNG BỎ SÓT: Trích xuất TOÀN BỘ các câu hỏi có trong tài liệu. Nếu tài liệu có 50 câu, phải trả về đúng 50 câu. Tuyệt đối không được tóm tắt hoặc lược bỏ.
    2. GIỮ NGUYÊN NỘI DUNG: Không thay đổi nội dung câu hỏi. Giữ đúng ngữ pháp và ý nghĩa gốc của giáo viên.
    3. NHẬN DIỆN ĐÁP ÁN: Tìm đáp án đúng dựa trên mọi dấu hiệu (gạch chân, in đậm, màu sắc, hoặc ký hiệu [x]) trong file gốc.
    4. CÔNG THỨC UNICODE: Chuyển toàn bộ công thức hóa học/toán học sang Unicode chuẩn (ví dụ: CH₃-C≡CH, √x, ∫, ∆...).
    5. LÀM SẠCH: Xóa bỏ các ký tự rác, các đường kẻ ngang thừa, hoặc các dấu gạch chân (_) không cần thiết trong văn bản.
    6. PHÂN LOẠI: 
       - Trắc nghiệm (multiple_choice)
       - Đúng/Sai (true_false)
       - Trả lời ngắn/Tự luận (short_answer)
    
    TRẢ VỀ: Chỉ JSON theo đúng schema.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: "Hãy trích xuất TOÀN BỘ câu hỏi trong file này. Đảm bảo số lượng slide tạo ra khớp hoàn toàn với số lượng câu hỏi trong file nguồn. Không bỏ sót bất kỳ câu nào."
          }
        ]
      }
    ],
    config: {
      systemInstruction,
      temperature: 0.1,
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          slides: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      text: { type: Type.STRING },
                      isCorrect: { type: Type.BOOLEAN }
                    }
                  }
                },
                trueFalseParts: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      text: { type: Type.STRING },
                      isCorrect: { type: Type.BOOLEAN }
                    }
                  }
                },
                shortAnswer: { type: Type.STRING }
              },
              required: ['id', 'type', 'question']
            }
          }
        },
        required: ['title', 'slides']
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("AI không phản hồi.");
    return JSON.parse(text.trim()) as ExtractionResult;
  } catch (error) {
    console.error("Lỗi xử lý AI:", error);
    throw new Error("Lỗi hệ thống khi phân tích tài liệu.");
  }
};

// Fixed: Implementation for AITutor.tsx
export const getGeminiTutorResponse = async (input: string, history: any[]): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: history,
    config: {
      systemInstruction: 'You are a helpful and expert AI Chemistry Tutor. Explain concepts clearly, provide examples, and encourage the student.',
    },
  });
  
  const response = await chat.sendMessage({ message: input });
  return response.text || "";
};

// Fixed: Implementation for EquationBalancer.tsx
export const balanceEquation = async (equation: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Balance this chemical equation: ${equation}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          balanced: { type: Type.STRING, description: 'The balanced chemical equation.' },
          explanation: { type: Type.STRING, description: 'Step-by-step logic for balancing.' }
        },
        required: ['balanced', 'explanation']
      }
    }
  });
  
  const text = response.text;
  return JSON.parse(text?.trim() || '{}');
};

// Fixed: Implementation for ChemistryQuiz.tsx
export const generateQuiz = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a 5-question multiple choice quiz on the chemistry topic: ${topic}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ['question', 'options', 'correctIndex', 'explanation']
        }
      }
    }
  });
  
  const text = response.text;
  return JSON.parse(text?.trim() || '[]');
};
