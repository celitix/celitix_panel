export const mapApiToPreviewState = (api) => {
  if (!api || !api.components) return null;

  const header = api.components.find((c) => c.type === "HEADER");
  const body = api.components.find((c) => c.type === "BODY");
  const footer = api.components.find((c) => c.type === "FOOTER");
  const buttonsComp = api.components.find((c) => c.type === "BUTTONS");
  const carousel = api.components.find((c) => c.type === "CAROUSEL");
  const offer = api.components.find((c) => c.type === "LIMITED_TIME_OFFER");

  // 🔹 Detect template type
  let templateType = "text";

  if (carousel) templateType = "carousel";
  else if (offer) templateType = "limited_time_offer";
  else if (header?.format) templateType = header.format.toLowerCase();

  // 🔹 Header media (image / video / document)
  let headerMedia = null;
  let headerText = "";
  let headerLocation = null;

  if (header) {
    if (["IMAGE", "VIDEO", "DOCUMENT"].includes(header.format)) {
      headerMedia = {
        type: header.format.toLowerCase(),
        link: header.example?.header_handle?.[0] || null,
      };
    }

    if (header.format === "TEXT") {
      headerText = header.text || "";
    }

    if (header.format === "LOCATION") {
      headerLocation = header.example?.location || null;
    }
  }

  // 🔹 Global buttons
  const globalButtons = buttonsComp?.buttons || [];

  // 🔹 Carousel cards
  const carouselCards =
    carousel?.cards?.map((card) => {
      const h = card.components.find((c) => c.type === "HEADER");
      const b = card.components.find((c) => c.type === "BODY");
      const btns = card.components.find((c) => c.type === "BUTTONS");

      return {
        media: h?.example?.header_handle?.[0] || null,
        mediaType: h?.format?.toLowerCase() || null, // image | video
        body: b?.text || "",
        buttons: btns?.buttons || [],
      };
    }) || [];

  return {
    templateType, // text | image | video | document | carousel | limited_time_offer
    headerMedia, // single header media
    tempJsonBody: body?.text || "",
    tempFooter: footer?.text || "",
    buttons: globalButtons, // global buttons
    isEnabled: offer?.is_enabled || false,
    offerDetails: offer?.offer_details || "",
    carouselCards, // carousel cards
  };
};

export const formatPreview = (text) => {
  if (!text) return "";

  let html = text;

  // Escape html
  html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Bold *text*
  html = html.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  // Italic _text_
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Strike ~text~
  html = html.replace(/~(.*?)~/g, "<del>$1</del>");

  // Numbered list
  html = html.replace(/^\d+\.\s(.+)/gm, "<li>$1</li>");

  // Bullet list
  html = html.replace(/^[-•]\s(.+)/gm, "<li>$1</li>");

  // Wrap lists
  if (html.includes("<li>")) {
    html = `<ul style="padding-left:16px">${html}</ul>`;
  }

  // Line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
};
