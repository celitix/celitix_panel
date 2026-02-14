/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * All rights reserved.
 * @flow
 */

'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

let access_token = 'EAALo5s4G0EMBQoNJMYEnZAmcof6efdlTjlPiuiBwmP7zvunIGHVnzIJIrK7lHZConbTcHObXdCJPa8Q65KL1jP524wKP6Cb41uhek3TgwbjbHtTwhLCPgKw1eWGvFyD3jtTTpiGnXreOuYOt7Vnu0Sm7KJ6BkXRBEDQa99L9U1YbRCiOB6tNoTDB2rgwbqEzGi';
let app_id = '819027950096451';
let ad_account_id = 'act_715466377972371';
let campaign_name = '';

const api = bizSdk.FacebookAdsApi.init(access_token);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};

let fields, params;

void async function() {
  try {
    // Create an ad campaign with objective OUTCOME_TRAFFIC
    fields = [
    ];
    params = {
      'name': campaign_name,
      'objective': 'OUTCOME_TRAFFIC',
      'status': 'PAUSED',
      'special_ad_categories': [],
    };
    let campaign = await (new AdAccount(account_id)).createCampaign(
      fields,
      params
    );
    let campaign_id = campaign.id;

    console.log('Your created campaign is with campaign_id:' + campaign_id);

  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}();