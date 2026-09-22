import type { Profile } from "./types";

export type ResumePdfLabels = {
  objective: string;
  experience: string;
  education: string;
  courses: string;
  languages: string;
  skills: string;
};

type Template = "classico" | "contemporaneo";

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 16;
const BOTTOM = 18;

function safeText(value: string) {
  return value
    .replaceAll("\u2022", "-")
    .replaceAll("\u2013", "-")
    .replaceAll("\u2014", "-")
    .replaceAll("\u201C", '"')
    .replaceAll("\u201D", '"')
    .replaceAll("\u2018", "'")
    .replaceAll("\u2019", "'")
    .replaceAll("\u2026", "...")
    .replaceAll("\u00A0", " ");
}

export function resumeFilename(name: string) {
  const folded = (name.trim() || "Curriculo")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `Curriculo-${folded || "Novo-Capitulo"}.pdf`;
}

function linesOf(description: string) {
  return description
    .split(/\n+/)
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}

export async function buildResumePdfBlob(input: {
  profile: Profile;
  objective: string;
  template: Template;
  labels: ResumePdfLabels;
}) {
  const { jsPDF } = await import("jspdf");
  const classic = input.template === "classico";
  const font = classic ? "times" : "helvetica";
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = PAGE_W - MARGIN * 2;
  let y = MARGIN;

  const name = safeText(input.profile.name.trim() || "Curriculo");
  doc.setProperties({
    title: `Curriculo - ${name}`,
    author: name,
    subject: "Curriculo",
    creator: "Novo Capitulo",
  });

  function newPage() {
    doc.addPage();
    y = MARGIN;
    if (!classic) {
      doc.setFillColor(196, 92, 62);
      doc.rect(0, 0, 4, PAGE_H, "F");
    }
  }

  function ensure(need: number) {
    if (y + need > PAGE_H - BOTTOM) newPage();
  }

  function textBlock(
    value: string,
    size: number,
    style: "normal" | "bold" | "italic",
    color: [number, number, number],
    gap: number,
    align: "left" | "center" = "left",
  ) {
    const content = safeText(value).trim();
    if (!content) return;
    doc.setFont(font, style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(content, width) as string[];
    const lineH = size * 0.46;
    for (const line of lines) {
      ensure(lineH + 1);
      doc.text(line, align === "center" ? PAGE_W / 2 : MARGIN, y, align === "center" ? { align: "center" } : undefined);
      y += lineH;
    }
    y += gap;
  }

  function sectionTitle(title: string) {
    ensure(14);
    y += 2;
    doc.setFont(font, "bold");
    doc.setFontSize(11);
    doc.setTextColor(196, 92, 62);
    doc.text(safeText(title).toUpperCase(), MARGIN, y);
    y += 1.6;
    doc.setDrawColor(196, 92, 62);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 5;
    doc.setTextColor(34, 34, 34);
  }

  if (!classic) {
    doc.setFillColor(196, 92, 62);
    doc.rect(0, 0, 4, PAGE_H, "F");
  }

  doc.setFont(font, "bold");
  doc.setFontSize(classic ? 20 : 22);
  doc.setTextColor(34, 34, 34);
  const nameLines = doc.splitTextToSize(name, width) as string[];
  for (const line of nameLines) {
    doc.text(line, classic ? PAGE_W / 2 : MARGIN, y, classic ? { align: "center" } : undefined);
    y += 8;
  }

  const contact = [input.profile.city, input.profile.phone, input.profile.email, input.profile.linkedin].filter(Boolean).join("  |  ");
  textBlock(contact, 10, "normal", [60, 60, 60], 2, classic ? "center" : "left");

  if (classic) {
    doc.setDrawColor(34, 34, 34);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 6;
  } else {
    y += 2;
  }

  if (input.objective.trim()) {
    sectionTitle(input.labels.objective);
    textBlock(input.objective, 11, "normal", [34, 34, 34], 1);
  }

  if (input.profile.experience.length) {
    sectionTitle(input.labels.experience);
    for (const item of input.profile.experience) {
      const heading = [item.role, item.company].filter(Boolean).join(" — ");
      ensure(12);
      doc.setFont(font, "bold");
      doc.setFontSize(12);
      doc.setTextColor(34, 34, 34);
      const head = safeText(heading || "Experiencia");
      const headLines = doc.splitTextToSize(head, item.period ? width - 42 : width) as string[];
      doc.text(headLines, MARGIN, y);
      if (item.period) {
        doc.setFont(font, "normal");
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(safeText(item.period), PAGE_W - MARGIN, y, { align: "right" });
      }
      y += Math.max(6, headLines.length * 5.2);
      for (const bullet of linesOf(item.description)) {
        textBlock(`- ${bullet}`, 11, "normal", [34, 34, 34], 0.4);
      }
      y += 2;
    }
  }

  if (input.profile.education.length) {
    sectionTitle(input.labels.education);
    for (const item of input.profile.education) {
      const line = [item.course, item.level ? `(${item.level})` : "", item.school ? `— ${item.school}` : "", item.year ? `, ${item.year}` : ""]
        .filter(Boolean)
        .join(" ");
      textBlock(line, 11, "normal", [34, 34, 34], 1);
    }
  }

  if (input.profile.courses.length) {
    sectionTitle(input.labels.courses);
    for (const item of input.profile.courses) {
      const line = [item.name, item.provider ? `— ${item.provider}` : "", item.year ? `(${item.year})` : ""].filter(Boolean).join(" ");
      textBlock(`- ${line}`, 11, "normal", [34, 34, 34], 0.6);
    }
  }

  if (input.profile.languages.length) {
    sectionTitle(input.labels.languages);
    textBlock(input.profile.languages.map((item) => `${item.name} (${item.level})`).join("  |  "), 11, "normal", [34, 34, 34], 1);
  }

  if (input.profile.skills.length) {
    sectionTitle(input.labels.skills);
    textBlock(input.profile.skills.join("  |  "), 11, "normal", [34, 34, 34], 1);
  }

  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setFont(font, "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`${page} / ${pages}`, PAGE_W - MARGIN, PAGE_H - 8, { align: "right" });
  }

  return doc.output("blob");
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function sharePdfFile(blob: Blob, filename: string, title: string) {
  const file = new File([blob], filename, { type: "application/pdf" });
  if (typeof navigator.share !== "function" || typeof navigator.canShare !== "function" || !navigator.canShare({ files: [file] })) {
    return "unsupported" as const;
  }
  try {
    await navigator.share({ files: [file], title, text: title });
    return "shared" as const;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return "cancelled" as const;
    throw error;
  }
}
