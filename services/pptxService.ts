
import pptxgen from "pptxgenjs";
import { ExtractionResult, QuestionType } from "../types";

const stripQuestionPrefix = (text: string): string => {
  if (!text) return "";
  return text.trim().replace(/^(Câu|Bài|C\^au)\s+\d+[\s.:-]*\s*/i, '').trim();
};

const calculateFontSize = (text: string): number => {
  const len = text.length;
  if (len < 120) return 20;
  if (len < 250) return 17;
  return 14;
};

export const generatePptx = async (data: ExtractionResult) => {
  const pres = new pptxgen();
  
  // Bảng màu cho Slide (Màu Xanh Bảng)
  const COLORS = {
    BG: "1A4417",       // Deep Green (Màu bảng)
    NEON_BLUE: "38BDF8",
    NEON_PURPLE: "A855F7",
    NEON_PINK: "F472B6",
    WHITE: "FFFFFF",
    SUBTLE_TEXT: "94A3B8",
    DARK_CARD: "0D250C", // Xanh đậm hơn cho thẻ nội dung
    SUCCESS_NEON: "22C55E"
  };

  // Cập nhật font chữ sang Arial theo yêu cầu
  const FONT_PRIMARY = "Arial";
  const FONT_BOLD = "Arial";

  pres.layout = "LAYOUT_16x9";

  // Slide Tiêu đề
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: COLORS.BG };
  titleSlide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: COLORS.NEON_BLUE } });
  titleSlide.addText(data.title.toUpperCase(), {
    x: 0.5, y: 1.8, w: 9, h: 1.5, fontSize: 44, color: COLORS.WHITE, bold: true, align: "center", fontFace: FONT_BOLD
  });
  titleSlide.addShape(pres.ShapeType.rect, { x: 3.5, y: 3.3, w: 3, h: 0.05, fill: { color: COLORS.NEON_PINK } });
  titleSlide.addText("BIÊN SOẠN: THẦY NGUYỄN VĂN HÀ", {
    x: 0.5, y: 3.5, w: 9, h: 0.5, fontSize: 18, color: COLORS.NEON_BLUE, bold: true, align: "center", fontFace: FONT_BOLD
  });

  // Slides Nội dung
  data.slides.forEach((item, slideIdx) => {
    const slide = pres.addSlide();
    slide.background = { color: COLORS.BG };
    const cleanedQuestion = stripQuestionPrefix(item.question);
    const qFontSize = calculateFontSize(cleanedQuestion);

    slide.addShape(pres.ShapeType.rect, { x: 0.1, y: 0, w: 0.05, h: '100%', fill: { color: COLORS.NEON_PURPLE } });
    slide.addText(`${slideIdx + 1}`, { x: 0.3, y: 0.2, w: 0.8, h: 0.8, fontSize: 36, color: COLORS.NEON_PINK, bold: true, align: "center", fontFace: FONT_BOLD });
    slide.addText("CÂU HỎI", { x: 0.3, y: 0.8, w: 0.8, h: 0.2, fontSize: 10, color: COLORS.SUBTLE_TEXT, bold: true, align: "center", fontFace: FONT_BOLD });

    slide.addText(cleanedQuestion, {
      x: 1.3, y: 0.4, w: 8.2, h: 1.8, fontSize: qFontSize, color: COLORS.WHITE, fontFace: FONT_PRIMARY, valign: "top", breakLine: true, bold: true
    });

    const OPTIONS_Y = 2.8;

    if (item.type === QuestionType.MULTIPLE_CHOICE && item.options) {
      item.options.forEach((opt, idx) => {
        const xPos = idx % 2 === 0 ? 1.3 : 5.6;
        const yPos = OPTIONS_Y + (Math.floor(idx / 2) * 0.9);
        slide.addShape(pres.ShapeType.roundRect, { x: xPos, y: yPos, w: 4.1, h: 0.75, fill: { color: COLORS.DARK_CARD }, line: { color: COLORS.NEON_PURPLE, width: 1 }, radius: 0.05 });
        slide.addText(opt.label, { x: xPos + 0.1, y: yPos + 0.1, w: 0.4, h: 0.5, fontSize: 22, color: COLORS.NEON_BLUE, fontFace: FONT_BOLD, valign: "middle", bold: true, align: 'center', rect: { fill: COLORS.BG, radius: 0.5 } });
        
        if (opt.isCorrect) {
          slide.addShape(pres.ShapeType.roundRect, { x: xPos, y: yPos, w: 4.1, h: 0.75, fill: { color: COLORS.SUCCESS_NEON, transparency: 80 }, line: { color: COLORS.SUCCESS_NEON, width: 3 }, radius: 0.05, animate: { type: 'appear' } });
          slide.addText(opt.text, { x: xPos + 0.6, y: yPos, w: 3.3, h: 0.75, fontSize: 17, color: COLORS.WHITE, fontFace: FONT_PRIMARY, valign: "middle", animate: { type: 'appear' } });
          slide.addText("✦", { x: xPos + 3.7, y: yPos, w: 0.4, h: 0.75, fontSize: 20, color: COLORS.SUCCESS_NEON, bold: true, align: 'center', valign: 'middle', animate: { type: 'appear' } });
        } else {
          slide.addText(opt.text, { x: xPos + 0.6, y: yPos, w: 3.3, h: 0.75, fontSize: 17, color: COLORS.WHITE, fontFace: FONT_PRIMARY, valign: "middle" });
        }
      });
    } else if (item.type === QuestionType.TRUE_FALSE && item.trueFalseParts) {
      item.trueFalseParts.forEach((part, idx) => {
        const yPos = OPTIONS_Y + (idx * 0.65);
        slide.addShape(pres.ShapeType.rect, { x: 1.3, y: yPos, w: 7.2, h: 0.5, fill: { color: COLORS.DARK_CARD }, line: { color: COLORS.NEON_PURPLE, width: 1 } });
        slide.addText(`${part.label}. ${part.text}`, { x: 1.4, y: yPos, w: 7, h: 0.5, fontSize: 15, color: COLORS.WHITE, fontFace: FONT_PRIMARY, valign: "middle" });
        slide.addText(part.isCorrect ? "ĐÚNG ✔" : "SAI ✘", { x: 8.6, y: yPos, w: 1.1, h: 0.5, fontSize: 11, color: COLORS.WHITE, bold: true, align: "center", valign: "middle", rect: { fill: part.isCorrect ? COLORS.SUCCESS_NEON : COLORS.NEON_PINK, radius: 0.05 }, animate: { type: 'appear' } });
      });
    } else if (item.type === QuestionType.SHORT_ANSWER) {
      slide.addText(
        [
          { text: "ĐÁP SỐ: ", options: { color: COLORS.NEON_BLUE, bold: true, fontSize: 32 } },
          { text: item.shortAnswer || "---", options: { color: COLORS.WHITE, bold: true, fontSize: 32 } }
        ],
        { 
          x: 1.0, 
          y: 3.0, 
          w: 8.0, 
          h: 1.0, 
          fontFace: FONT_PRIMARY, 
          align: 'center', 
          valign: 'middle',
          animate: { type: 'appear' } 
        }
      );
    }

    slide.addText("HỆ THỐNG GIÁO DỤC HIỆN ĐẠI | BIÊN SOẠN: THẦY NGUYỄN VĂN HÀ", {
      x: 0, y: 5.3, w: '100%', h: 0.3, fontSize: 9, color: COLORS.SUBTLE_TEXT, align: "center", fontFace: FONT_BOLD, bold: true
    });
  });

  return pres.writeFile({ fileName: `${data.title.replace(/\s+/g, '_')}_Interactive.pptx` });
};