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
      // workflowValueObject[key] = {
      //   variables: nodeInput.variables || nodeInput?.sms_message || [],
      //   fileInput: nodeInput.fileInput ?? null,
      //   urlValues: nodeInput.urlValues ?? null,
      //   isunicode: nodeInput?.isunicode || 0,
      //   entityId: nodeInput?.entityId,
      //   urlIndex: -1,
      //   wabanumber: nodeInput?.wabanumber ?? null,
      //   whatsappTemplate: nodeInput?.whatsappTemplate ?? null,
      //   whatsapp_category: nodeInput?.whatsapp_category ?? null,
      //   whatsapp_templateType: nodeInput?.whatsapp_templateType ?? null,
      //   rcs_agent: nodeInput?.rcs_agent ?? null,
      //   rcs_template: nodeInput?.rcs_template ?? null,
      //   campaignType: nodeInput?.campaignType ?? null,
      //   plan: nodeInput?.plan ?? null,
      //   retryCount: nodeInput?.retryCount ?? null,
      //   obdType: nodeInput?.obdType ?? null,
      //   obdClip: nodeInput?.obdClip ?? null,
      //   obdText: nodeInput?.obdText ?? null,
      //   senderId: nodeInput?.sms_sender_id,
      //   templateId: nodeInput?.sms_template,
      //   //     variables: nodeInput?.variables,
      //   // ...nodeInput,
      // };
      // if (originalType === "whatsapp") {
      //   workflowValueObject[key] = {
      //     // variables: nodeInput.variables || [],
      //     // fileInput: nodeInput.fileInput ?? null,
      //     // urlValues: nodeInput.urlValues ?? null,
      //     // isunicode: 0,
      //     // entityId: 0,
      //     // urlIndex: -1,
      //     // ...nodeInput,
      //     wabanumber: nodeInput?.wabanumber,
      //     whatsappTemplate: nodeInput?.whatsappTemplate,
      //     whatsapp_category: nodeInput?.whatsapp_category,
      //     whatsapp_templateType: nodeInput?.whatsapp_templateType,
      //     variables: nodeInput?.variables,
      //     fileInput: nodeInput?.fileInput,
      //     urlValues: nodeInput?.urlValues,
      //     urlIndex: nodeInput?.urlIndex,
      //   };
      // }
      // if (originalType === "rcs") {
      //   workflowValueObject[key] = {
      //     rcs_agent: nodeInput?.rcs_agent,
      //     rcs_template: nodeInput?.rcs_template,
      //     variables: nodeInput?.variables,
      //     category: nodeInput?.category,
      //   };
      // }
      // if (originalType === "sms") {
      //   workflowValueObject[key] = {
      //     senderId: nodeInput?.sms_sender_id,
      //     templateId: nodeInput?.sms_template,
      //     // sms_message: nodeInput?.sms_message,
      //     isunicode: nodeInput?.isunicode || 0,
      //     entityId: nodeInput?.entityId,
      //     variables: nodeInput?.sms_message || "",
      //     fileInput: nodeInput.fileInput ?? null,
      //     urlValues: nodeInput.urlValues ?? null,
      //     urlIndex: -1,
      //   };
      // }
      // if (originalType === "voice") {
      //   workflowValueObject[key] = {
      //     campaignType: nodeInput?.campaignType,
      //     plan: nodeInput?.plan,
      //     retryCount: nodeInput?.retryCount,
      //     obdType: nodeInput?.obdType,
      //     obdClip: nodeInput?.obdClip,
      //     obdText: nodeInput?.obdText,
      //     // ...nodeInput,
      //   };
      // }

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
          obdClip: nodeInput?.obdClip || "-1",
          obdText: nodeInput?.obdText,
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
