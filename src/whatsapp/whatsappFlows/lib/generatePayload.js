import { convertNodeToMarkdown } from "../components/Editor";
export const generatePayload = (data) => {
  const payload = {
    version: "7.0",
    screens: [],
  };

  const typeCounters = {
    heading: 0,
    subheading: 0,
    textbody: 0,
    textcaption: 0,
    textInput: 0,
    textArea: 0,
    email: 0,
    phone: 0,
    dropDown: 0,
    radioButton: 0,
    checkBox: 0,
    footer: 0,
    document: 0,
    media: 0,
    image: 0,
    date: 0,
    calendar: 0,
    chipSelector: 0,
    optin: 0,
    embaddedLink: 0,
    imageCarousel: 0,
    richText: 0,
    switch: 0,
  };

  const numberToWord = (num) => {
    const words = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
    ];
    return words[num] || String(num);
  };

  data.forEach((screenData, index) => {
    const screenId = screenData.id;

    const layout = {
      type: "SingleColumnLayout",
      children: [],
    };

    screenData?.payload?.forEach((pay) => {
      // const type = pay.type;
      // typeCounters[type] = (typeCounters[type] || 0) + 1;
      // const name = `${String(type)}_${String(typeCounters[type])}`;
      // console.log(typeof name)

      const type = pay.type;
      let visible = pay.visible;
      if (visible === "true") visible = true;
      if (visible === "false") visible = false;

      typeCounters[type] = (typeCounters[type] || 0) + 1;
      const countWord = numberToWord(typeCounters[type]);

      // const name = `${type}_${countWord}`;
      const name = pay.name || `${type}_fallback`;

      let component = { type };

      if (type === "heading") {
        component = {
          type: "TextHeading",
          text: pay.text,
          // visible,
        };
      }

      if (type === "subheading") {
        component = {
          type: "TextSubheading",
          text: pay.text,
          // visible,
        };
      }

      if (type === "textbody") {
        component = {
          type: "TextBody",
          text: pay.text,
          // visible,
        };
      }

      if (type === "textcaption") {
        component = {
          type: "TextCaption",
          text: pay.text,
          // visible,
        };
      }

      if (type === "textInput") {
        component = {
          name,
          type: "TextInput",
          label: pay.label,
          required: pay.required ?? true,
          // name:pay.name,
          "error-message": pay["error-message"] || "",
          "helper-text": pay["helper-text"],
          "min-chars": parseInt(pay["min-chars"]) || undefined,
          "max-chars": parseInt(pay["max-chars"]) || undefined,
          // visible,
        };
      }

      if (type === "textArea") {
        component = {
          name,
          type: "TextArea",
          label: pay.label,
          required: pay.required ?? true,
          "helper-text": pay["helper-text"],
          "error-message": pay["error-message"],
          // visible,
        };
      }

      if (type === "richText") {
        let lines = [];

        if (Array.isArray(pay.text) && pay.text.length > 0) {
          lines = pay.text;
        } else if (pay.content) {
          try {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = pay.content;

            // lines = Array.from(tempDiv.childNodes)
            //   .map(convertNodeToMarkdown)
            //   .flat()
            //   // .map((line) => (typeof line === "string" ? line : String(line)))
            //   // .map((line) => line);
            //   .filter((line) => line.trim() !== "");

            //           lines = Array.from(tempDiv.childNodes)
            // .map(convertNodeToMarkdown)
            // .flat()
            // .map(line => (typeof line === "string" ? line : String(line)))
            // .filter(line => line.trim() !== "");

            lines = Array.from(tempDiv.childNodes)
              .map(convertNodeToMarkdown)
              .flat()
              .map((line) => String(line).trim())
              .filter((line) => line !== "");
          } catch (error) {
            console.error("Error parsing HTML content:", error);
            lines = ["No content available"];
          }
        }

        component = {
          type: "RichText",
          text: lines,
          // visible,
        };
      }

      if (type === "dropDown") {
        component = {
          name,
          type: "Dropdown",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          // "error-message": pay.error_message || "",
          // "data-source": (pay["data-source"] || []).map((opt) => ({
          //   id: String(opt.id || ""),
          //   title: opt.title || "",
          //   description: opt.description || "",
          //   metadata: opt.metadata || "",
          //   image: opt.image || "",
          // })),
          // visible,
          "data-source": (pay["data-source"] || []).map((opt) => {
            const cleanedOpt = {
              id: String(opt.id || ""),
              title: opt.title || "",
            };
            // ONLY add these keys if they are NOT empty strings
            if (opt.description && opt.description.trim() !== "")
              cleanedOpt.description = opt.description;
            if (opt.metadata && opt.metadata.trim() !== "")
              cleanedOpt.metadata = opt.metadata;
            if (opt.image && opt.image.trim() !== "")
              cleanedOpt.image = opt.image;

            return cleanedOpt;
          }),
          // visible:
          //   typeof pay.visible === "string" &&
          //   (pay.visible === "true" || pay.visible === "false")
          //     ? pay.visible === "true"
          //     : pay.visible,
        };
      }

      if (type === "radioButton") {
        component = {
          name,
          type: "RadioButtonsGroup",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          // "error-message": pay.error_message || "",
          // "data-source": (pay["data-source"] || []).map((opt) => ({
          //   id: String(opt.id || ""),
          //   title: opt.title || "",
          //   description: opt.description || "",
          //   metadata: opt.metadata || "",
          //   image: opt.image || "",
          // })),
          // visible,
          "data-source": (pay["data-source"] || []).map((opt) => {
            const cleanedOpt = {
              id: String(opt.id || ""),
              title: opt.title || "",
            };
            // ONLY add these keys if they are NOT empty strings
            if (opt.description && opt.description.trim() !== "")
              cleanedOpt.description = opt.description;
            if (opt.metadata && opt.metadata.trim() !== "")
              cleanedOpt.metadata = opt.metadata;
            if (opt.image && opt.image.trim() !== "")
              cleanedOpt.image = opt.image;

            return cleanedOpt;
          }),
          // visible:
          //   typeof pay.visible === "string" &&
          //   (pay.visible === "true" || pay.visible === "false")
          //     ? pay.visible === "true"
          //     : pay.visible,
        };
      }

      if (type === "checkBox") {
        component = {
          name,
          type: "CheckboxGroup",
          label: pay.label || "Select an option",
          required: pay.required ?? true,
          // "error-message": pay.error_message || "",
          // "data-source": (pay["data-source"] || []).map((opt) => ({
          //   id: String(opt.id || ""),
          //   title: opt.title || "",
          //   description: opt.description || "",
          //   metadata: opt.metadata || "",
          //   image: opt.image || "",
          // })),
          // visible,
          "data-source": (pay["data-source"] || []).map((opt) => {
            const cleanedOpt = {
              id: String(opt.id || ""),
              title: opt.title || "",
            };
            // ONLY add these keys if they are NOT empty strings
            if (opt.description && opt.description.trim() !== "")
              cleanedOpt.description = opt.description;
            if (opt.metadata && opt.metadata.trim() !== "")
              cleanedOpt.metadata = opt.metadata;
            if (opt.image && opt.image.trim() !== "")
              cleanedOpt.image = opt.image;

            return cleanedOpt;
          }),
          // visible:
          //   typeof pay.visible === "string" &&
          //   (pay.visible === "true" || pay.visible === "false")
          //     ? pay.visible === "true"
          //     : pay.visible,
        };
      }

      if (type === "chipSelector") {
        component = {
          name,
          type: "ChipsSelector",
          label: pay.label,
          description: pay.description,
          "max-selected-items": parseInt(pay["max-selected-items"]) || 2,
          required: pay.required ?? true,
          "data-source": (pay["data-source"] || []).map((opt) => ({
            id: String(opt.id || ""),
            title: opt.title || "",
          })),
          // visible,
        };
      }

      if (type === "image") {
        component = {
          // name,
          type: "Image",
          src: pay.src,
          // width: pay.width,
          // // height: pay.height,
          "scale-type": pay["scale-type"],
          "aspect-ratio": parseInt(pay["aspect-ratio"]),
          "alt-text": pay["alt-text"],
          // visible,
        };
      }

      if (type === "document") {
        component = {
          name,
          type: "DocumentPicker",
          label: pay.label || "Select an Document",
          description: pay.description || "",
          "min-uploaded-documents": parseInt(
            pay["min-uploaded-documents"] ?? 0,
            10,
          ),
          "max-uploaded-documents": parseInt(
            pay["max-uploaded-documents"] ?? 0,
            10,
          ),
          // visible,
        };
      }

      if (type === "media") {
        component = {
          name,
          type: "PhotoPicker",
          label: pay.label || "Select an Photo",
          description: pay.description,
          "min-uploaded-photos": parseInt(pay["min-uploaded-photos"] ?? 0, 10),
          "max-uploaded-photos": parseInt(pay["max-uploaded-photos"] ?? 0, 10),
          // visible,
        };
      }

      // if (type === "switch") {
      //   component = {
      //     type: "Switch",
      //     value:`${data.component?.textInput.name}`,
      //     cases: pay.cases,
      //   };
      // }

      if (type === "switch") {
        // Look for the last component already pushed to layout that has a name
        let valueName = "";
        for (let i = layout.children.length - 1; i >= 0; i--) {
          const prev = layout.children[i];
          if (prev.name) {
            valueName = prev.name;
            break;
          }
        }

        component = {
          type: "Switch",
          value: valueName ? `\${form.${valueName}}` : "", // ✅ dynamic format required by schema
          cases: pay.cases,
          // visible,
        };
      }

      if (type === "imageCarousel") {
        component = {
          type: "ImageCarousel",
          "scale-type": String(pay["scale-type"] || "contain"),
          //  "aspect-ratio": String(pay["aspect-ratio"] || "4:3"),
          images: [
            {
              src: pay["image-1"]?.src || "",
              "alt-text": pay["image-1"]?.["alt-text"] || "",
            },
            {
              src: pay["image-2"]?.src || "",
              "alt-text": pay["image-2"]?.["alt-text"] || "",
            },
            {
              src: pay["image-3"]?.src || "",
              "alt-text": pay["image-3"]?.["alt-text"] || "",
            },
          ],
          // visible,
        };
      }

      if (type === "date") {
        component = {
          name,
          type: "DatePicker",
          label: pay.label,
          "min-date": pay["min-date"],
          "max-date": pay["max-date"],
          "unavailable-dates": pay["unavailable-dates"],
          // "unavailable-dates": Array.isArray(pay["unavailable-dates"])
          //   ? pay["unavailable-dates"].filter(Boolean)
          //   : [],
          "helper-text": pay["helper-text"],
          // "error-message":  pay.error_message,
          // visible,
        };
      }

      if (type === "calendar") {
        component = {
          name,
          type: "CalendarPicker",
          mode: pay.mode || "single",
          "min-date": pay["min-date"],
          "max-date": pay["max-date"],
          "unavailable-dates": pay["unavailable-dates"],
          // visible,
        };

        if (pay.mode === "range") {
          component.label = {
            "start-date": pay.label?.["start-date"] || "",
            "end-date": pay.label?.["end-date"] || "",
            // visible,
          };
          component["helper-text"] = {
            "start-date": pay["helper-text"]?.["start-date"] || "",
            "end-date": pay["helper-text"]?.["end-date"] || "",
            // visible,
          };
          component.required = {
            "start-date": pay.required?.["start-date"] ?? true,
            "end-date": pay.required?.["end-date"] ?? false,
            // visible,
          };
        } else {
          component.label = pay.label || "";
          component["helper-text"] = pay["helper-text"] || "";
          component.required = pay.required ?? false;
          // visible;
        }
      }

      if (type === "optin") {
        const optActionName = pay["on-click-action"] || "";
        const nextScreenId = data[index + 1]?.id || null;

        component = {
          name,
          type: "OptIn",
          label: pay.label,
          required: true,
          "on-click-action": {
            name: optActionName,
            ...(index !== data.length - 1 && {
              next: {
                type: "screen",
                name: nextScreenId,
              },
            }),
            ...(optActionName === "open_url" && {
              url: pay.url, // take url from payload
            }),
          },
          // visible,
        };
      }

      if (pay.type === "If") {
        console.log("pay", pay);

        component = {
          type: "If",
          condition: pay.condition,
          then: [
            {
              type: pay.then?.[0]?.type,
              text: "It is a cat",
            },
          ],
          else: [
            {
              type: pay.else?.[0]?.type,
              text: "It is not a cat",
            },
          ],
          // required: true,
          // visible,
        };
      }

      if (type === "embeddedlink") {
        const onClickActionName = pay["on-click-action"] || "";
        const nextScreenId = data[index + 1]?.id || null;

        component = {
          type: "EmbeddedLink",
          text: pay?.text,
          "on-click-action": {
            name: onClickActionName,
            ...(index !== data.length - 1 && {
              next: {
                type: "screen",
                name: nextScreenId,
              },
            }),
            ...(onClickActionName === "open_url" && {
              url: pay.url, // take url from payload
            }),
          },
          // visible,
        };
      }

      if (type === "footerbutton") {
        const footerData = pay.footer?.footer_1 || {};
        const onClickActionName = footerData.on_click_action || "complete";
        const nextScreenId = data[index + 1]?.id || null;

        // Collect all form fields
        const collectFields = (children, format, scrId = null) => {
          const fields = {};
          children.forEach((child) => {
            if (
              [
                "TextInput",
                "TextArea",
                "Dropdown",
                "CheckboxGroup",
                "RadioButtonsGroup",
                "PhotoPicker",
                "DatePicker",
                "CalendarPicker",
                "ChipsSelector",
                "DocumentPicker",
              ].includes(child.type)
            ) {
              if (format === "current") {
                fields[child.name] = `\${form.${child.name}}`;
              } else if (format === "previous") {
                fields[child.name] = `\${screen.${scrId}.form.${child.name}}`;
              }
            }
          });
          return fields;
        };

        if (onClickActionName === "complete") {
          let payloadObj = {};

          if (data.length === 1) {
            // ✅ Only one screen → use current form fields
            payloadObj = collectFields(layout.children, "current");
          } else {
            for (let i = 0; i < index; i++) {
              const prevScreen = data[i];
              const prevLayout = payload.screens[i]?.layout?.children || [];
              Object.assign(
                payloadObj,
                collectFields(prevLayout, "previous", prevScreen.id),
              );
            }
            // Current screen
            Object.assign(
              payloadObj,
              collectFields(layout.children, "current"),
            );
          }

          component = {
            type: "Footer",
            label: footerData.label || "submit",
            "center-caption": footerData.center_caption || "",
            "on-click-action": {
              name: "complete",
              payload: payloadObj,
            },
          };
        } else if (onClickActionName === "navigate") {
          component = {
            type: "Footer",
            label: footerData.label || "continue",
            "center-caption": footerData.center_caption || "",
            "on-click-action": {
              name: "navigate",
              ...(index !== data.length - 1 && {
                next: {
                  type: "screen",
                  name: nextScreenId,
                },
              }),
            },
          };
        }
      }

      layout.children.push(component);
    });

    const item = data[index];

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    payload.screens.push({
      // data: {},
      id: capitalize(screenId),
      title: screenData.title || `Screen ${index + 1}`,
      layout,
      // terminal: index === data.length - 1,
      ...(index === data.length - 1 ? { terminal: true } : ""),
    });
  });

  return payload;
};
// neww generatepayload ends here
