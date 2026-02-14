
export const generatePayload = (
  nodesInputData: Record<string, any>,
  nodes: any[]
) => {
  const workflowValueObject: Record<string, any> = {};
  const typeCounters: Record<string, number> = {};

  nodes.forEach((node, index) => {
    const originalType = node.type;

    if (!typeCounters[originalType]) {
      typeCounters[originalType] = 0;
    }

    const currentIndex = typeCounters[originalType];
    const key = `${originalType}_${index}`;
    typeCounters[originalType]++;

    const nodeInput = nodesInputData[node.id] || {};

    if (index === 0) {
      workflowValueObject[key] = null;
    } else {
      if (originalType === "sms") {
        workflowValueObject[key] = {
          senderId: nodeInput?.sms_sender_id,
          templateId: nodeInput?.sms_template,
          // sms_message: nodeInput?.sms_message,
          isunicode: nodeInput?.isunicode || 0,
          entityId: nodeInput?.entityId,
          variables: nodeInput?.sms_message || "",
          fileInput: nodeInput.fileInput ?? null,
          urlValues: nodeInput.urlValues ?? null,
          urlIndex: -1,
        };
      }
      if (originalType === "whatsapp") {
        workflowValueObject[key] = {
          // wabanumber: nodeInput?.wabanumber,
          // whatsappTemplate: nodeInput?.whatsappTemplate,
          // whatsapp_category: nodeInput?.whatsapp_category,
          // whatsapp_templateType: nodeInput?.whatsapp_templateType,
          variables: nodeInput?.variables || [],
          fileInput: nodeInput?.fileInput || null,
          urlValues: nodeInput?.urlValues || null,
          urlIndex: -1,
          "isunicode": 0,
          "entityId": "0",

        };
      }
      if (originalType === "voice") {
        workflowValueObject[key] = {
          campaignType: nodeInput?.campaignType,
          plan: nodeInput?.plan || "1",
          retryCount: nodeInput?.retryCount || "1",
          obdType: nodeInput?.obdType,
          obdClip: String(nodeInput?.obdClip) || "-1",
          obdText: nodeInput?.obdText || null,
          variables: nodeInput?.variables || null,
          "fileInput": nodeInput?.fileInput || null,
          "urlValues": nodeInput?.urlValues || null,
          "isunicode": null,
          // ...nodeInput,
        };
      }

      if (originalType === "rcs") {
        workflowValueObject[key] = {
          "variables": nodeInput?.variables || {},
          "fileInput": nodeInput?.fileInput || null,
          "urlValues": nodeInput?.urlValues || null,
          "isunicode": 0,
          "entityId": 0,
          "urlIndex": -1
          // ...nodeInput,
        };
      }

    }
  });

  workflowValueObject["apiCount"] = 0;

  return workflowValueObject;
};
