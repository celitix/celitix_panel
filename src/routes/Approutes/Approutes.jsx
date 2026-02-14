import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// mainlayout
import Mainlayout from "@/mainlayout/Mainlayout";

// dashboard
import AgentDashboard from "@/dashboard/AgentDashboard";
import AdminDashboard from "@/dashboard/AdminDashboard";
import UserDashboard from "@/dashboard/UserDashboard";

// canned message
import CannedMessage from "@/cannedmessage/CannedMessage";

// Whatsapp
import WabaDashboard from "@/whatsapp/WabaDashboard/WabaDashboard";
import ManageTemplate from "@/whatsapp/managetemplate/Managetemplate";
import WhatsappLaunchCampaign from "@/whatsapp/whatsappLaunchCampaign/WhatsappLaunchCampaign";
import WhatsappLiveChat from "@/whatsapp/livechat/WhatsappLiveChat";
import WhatsappManageCampaign from "@/whatsapp/whatsappManageCampaign/WhatsappManageCampaign";
import WhatsappManageOptin from "@/whatsapp/whatsappManageOptin/WhatsappManageOptin";
import WhatsappChatWidget from "@/whatsapp/WhatsappChatWidget/WhatsappChatWidget";
import WhatsappQrCode from "@/whatsapp/whatsappQrcode/WhatsappQrCode";
import WhatsappLiveChatSettings from "@/whatsapp/whatsappLiveChatSetting/WhatsappLiveChatSettings";
import WhatsappManageWaba from "@/whatsapp/whatsappManageWaba/WhatsappManageWaba";
import WhatsappConversation from "@/whatsapp/whatsappConversation/WhatsappConversation";
import CampaignDetailsReport from "@/whatsapp/whatsappManageCampaign/CampaignDetailsReport";
import ManageAgent from "@/whatsapp/manageagent/ManageAgent";
import WhatsappBot from "@/whatsapp/WhatsappBot/WhatsappBot";
import CreateWhatsAppBot from "@/whatsapp/WhatsappBot/component/createBot";
import { ApiCampaignInfo } from "@/whatsapp/whatsappManageCampaign/components/page/ApiCampaignInfo";
import WhatsappFlows from "@/whatsapp/whatsappFlows/Pages/WhatsappFlows";
import FlowCreationPage from "@/whatsapp/whatsappFlows/Pages/FlowCreationPage";
import { BlockUser } from "@/whatsapp/blockUser";
import { EditFlow } from "@/whatsapp/whatsappFlows/Pages/FlowEditPage";
import { EditTemplate } from "@/whatsapp/managetemplate/edit";
import FlowsDetailsReport from "@/whatsapp/whatsappManageCampaign/components/page/FlowsDetailsReport";
import CreateWhatsappTemplateAdmin from "@/admin/createWhatsappTemplate/CreateWhatsappTemplateAdmin";
import ManageWabaAdmin from "@/admin/managewaba/ManageWabaAdmin";
import WhatsappCreateTemplate from "@/whatsapp/whatsappcreatetemplate/WhatsappCreateTemplate";
import MmLite from "@/whatsapp/mmlite/MmLite";
import UserPreferenceReport from "@/whatsapp/userpreferencereport/UserPreferenceReport";
import WabaTempLibrary from "@/whatsapp/library/WabaTempLibrary";

// CombineLiveChat
import LiveChatDashboard from "@/CombineLiveChats/pages/LiveChatDashboard";
import LiveChatLayout from "@/CombineLiveChats/pages/LiveChatLayout";
import CombineLiveChatSettings from "@/CombineLiveChats/pages/CombineLiveChatSettings";
import Pointingup from "@/CombineLiveChats/components/Settings/Pointingup";

// Chat Bot Section
import ChatBotLayout from "@/CombineChatBots/pages/ChatBotLayout";
import ChatBotSettings from "@/CombineChatBots/pages/ChatBotSettings";

// manage funds
import Recharge from "@/managefunds/recharge/Recharge";
import Transactions from "@/managefunds/transactions/Transactions";
import TransactionsUser from "@/managefunds/user-transaction.jsx/Transactions";

// manage contacts
import ManageContacts from "@/managecontacts/ManageContacts";

//WorkFlow
import { WorkflowDetails } from "@/workflow/details";
import { WorkflowCreate } from "@/workflow/create";
import { UpdateWorkflow } from "@/workflow/edit";

// profile
import Settings from "@/profile/pages/Settings";
import ProfilePage from "@/profile/pages/Profile";
import LoginIpDetails from "@/profile/pages/LoginIpDetails";

// Manage User
import AddUser from "@/admin/manageUser/pages/AddUser";
import ManageUser from "@/admin/manageUser/ManageUser";
import ManageSales from "@/admin/manageSales";

// Account Manager
import AccountManager from "@/admin/accountManager/AccountManager";

// Manage DLT Template
import ManageDltTemplate from "@/admin/manageDltTemplate/ManageDltTemplate";

// Manage Voice Clips
import ManageVoiceClips from "@/admin/manageVoiceClips/ManageVoiceClips";

// Manage Blacklist
import Blacklist from "@/admin/blacklist/blacklist";

// Manage Plans
import ManagePlan from "@/admin/managePlan/ManagePlan";

// Manage Prefix
import ManagePrefix from "@/admin/managePrefix/managePrefix";

// Manage Routing
import ManageRouting from "@/admin/manageRouting/ManageRouting";
import AddRouting from "@/admin/manageRouting/pages/AddRouting";
import EditRouting from "@/admin/manageRouting/pages/EditRouting";

// manage SMPP
import AddService from "@/admin/manageSMPP.jsx/pages/AddService";
import ManageSMPP from "@/admin/manageSMPP.jsx/ManageSMPP";
import SMPPErrorCode from "@/admin/smmpErrorCode/SMPPErrorCode";

// Manage Operator
import AddOperator from "@/admin/managePrefix/pages/AddOperator";

// Manage Notifications
import ManageNotifications from "@/admin/manageNotifications.jsx/manageNotifications";
import { AddNotification } from "@/admin/manageNotifications.jsx/pages/addNotification";

// Livemonitoring
import GraphMain from "@/admin/graphMain/GraphMain";
import GraphUserWise from "@/admin/graphUserWise/GraphUserWise";
import GraphSms from "@/admin/graphMain/GraphSms";
import GraphWhatsapp from "@/admin/graphMain/GraphWhatsapp";
import GraphRcs from "@/admin/graphMain/GraphRcs";

// Self Recharge
import SelfRecharge from "@/SelfRecharge/SelfRecharge";

// LeadManager
import LeadManager from "@/LeadManager/LeadManager";
import Analytics from "@/LeadManager/pages/Analytics";
import LeadDash from "@/LeadManager/pages/leaddash/LeadDash";
import LeadSettings from "@/LeadManager/pages/LeadSettings";
import LeadReports from "@/LeadManager/pages/LeadReports";
import LeadTags from "@/LeadManager/pages/LeadTags";
import LeadMain from "@/LeadManager/pages/LeadMain";
import LeadForms from "@/LeadManager/pages/LeadForms";
import Details from "@/LeadManager/pages/details/Details";
import LeadSource from "@/LeadManager/LeadSource/LeadSource";
import ConfigureTemplateLeadSource from "@/LeadManager/LeadSource/ConfigureTemplateLeadSource";

// sms
import SmsReports from "@/sms/smsReports/SmsReports";
import SendSms from "@/sms/smsSend/SendSms";
import SmsDLTtemplate from "@/sms/smsDlttemplate/SmsDLTtemplate";
import SmsWishManagement from "@/sms/smsWishManagement/SmsWishManagement";
import Smscampaigndetaillogs from "@/sms/smsReports/pages/smscampaigndetaillogs";
import SmsAttachmentdetaillog from "@/sms/smsReports/pages/SmsAttachmentdetaillog";
import DetailedLogsInsidersDetails from "@/sms/smsReports/components/DetailedLogsInsidersDetails";
import SMPPSummary from "@/admin/SMPPsummary/SmppSummary";
import SMPPMissingErrorCode from "@/admin/SMPPMissingErrorCade/SMPPMissingErrorCode";

// RCS
import SendRcs from "@/rcs/SendRcs/SendRcs";
import ManageTemplateRcs from "@/rcs/manageTemplate/ManageTemplateRcs";
import SuggestionReportRcs from "@/rcs/suggestionReport/SuggestionReportRcs";
import DeliveryreportRcs from "@/rcs/deliveryReport/DeliveryreportRcs";
import ManageBotRcs from "@/rcs/manageBot/ManageBotRcs";
import AddTemplateRcs from "@/rcs/manageTemplate/pages/AddTemplateRcs";
import RcsLiveChat from "@/rcs/rcslivechat/RcsLiveChat";
import CampaignDeliveryReportDetails from "@/rcs/deliveryReport/components/CampaignDeliveryReportDetails";
import Bot from "@/rcs/Bot/Bot";
import CreateRcsBot from "@/rcs/Bot/component/createBot";

// Callback
import Callback from "@/callback/Callback";
import { AddCallback } from "@/callback/page/addCallback";
import { EditCallback } from "@/callback/page/editCallback";

// Download
import Download from "@/profile/pages/Download";

// OBD
import ObdCreateCampaign from "@/obd/obdcreatecampaign/ObdCreateCampaign";
import ObdManageVoiceClips from "@/obd/managevoiceclips/ObdManageVoiceClips";
import ObdIntegration from "@/obd/obdmanageinteration/ObdIntegration";
import ObdCampaignReports from "@/obd/obdManageCampaign/ObdCampaignReports";
import CampaignDetailsReports from "@/obd/obdManageCampaign/components/CampaignDetailReports";

// Email
import EmailReport from "@/email/emailreport/EmailReport";
import EmailTemplateLayout from "@/email/emailtemplate/EmailTemplateLayout";
import EmailDashboard from "@/email/emailtemplate/pages/EmailDashboard";
import EmailLibrary from "@/email/emailtemplate/pages/EmailLibrary";
import EmailTemplate from "@/email/emailtemplate/pages/AddEmailTemplate";
import EmailSetting from "@/email/emailtemplate/pages/EmailSetting";
import EmailLibraryAdmin from "@/email/manageLibrary/EmailLibraryAdmin";
import EmailWhiteList from "@/email/emailWhiteList/EmailWhiteList";
import SendEmail from "@/email/sendemail/SendEmail";

// Hlr Lookup
import HlrLookup from "@/HlrLookup/hlrlookup/HlrLookup";
import LookupReport from "@/HlrLookup/LookupReport/LookupReport";

// Dr Analysis report
import DrAnalysis from "@/drAnalysis";

// Block Number
import BlockNumber from "@/BlackList/manageBlockNumber";

// Blacklist
import BlackList from "@/BlackList/BlackList";

// Not Found Page
import PageNotFound from "@/NotFound/PageNotFound";

// SMTP
import AddSMTP from "@/admin/SMTP/AddSMTP/AddSMTP";
import SendSMTP from "@/admin/SMTP/SendSMTP/SendSMTP";

// User
import { useUser } from "@/context/auth";

// Tools
import JsonToolsPage from "@/Tools/Json/JsonToolsPage";
import SummaryUtilityReport from "@/sms/smsReports/SummaryUtility/SummaryUtilityReport";
import RestartEnginesPanel from "@/admin/ServerRestart/RestartEnginesPanel";
import AssignUserInsta from "@/admin/InstaAdmin/AssignUserInsta/AssignUserInsta";

// Text to pdf converter
import TextToPdfConverter from "@/ConverterUtility/TextToPdfConverter/TextToPdfConverter";
import CreatePdfConverter from "@/ConverterUtility/TextToPdfConverter/CreatePdfConverter";

// AI CONFIGURATION
import UserPricing from "@/AIConfiguration/UserPricing/UserPricing";

// Agents & Agent Mapping
import ManageAgentAll from "@/ManageAgent/ManageAgentAll";

// Comerce Manager
import CommerceManager from "@/commerecemanager/CommerceManager";
import Inventorymanagement from "@/commerecemanager/inventorymanagement/Inventorymanagement";
import OrderMangement from "@/commerecemanager/orderMangement/OrderMangement";
import ManageInstaUsers from "@/admin/InstaAdmin/ManageInstaUsers/ManageInstaUsers";

import AddEmailTemplate from "@/email/emailtemplate/pages/AddEmailTemplate";
import ManagePlanConfiguration from "@/Managerouting/ManagePlanConfiguration";
import Managesmpperrorcode from "@/managesmpperrorcode/Managesmpperrorcode";
import ManageOperatorMain from "@/manageoperator/ManageOperatorMain";
import CreateOperator from "@/manageoperator/CreateOperator";
import ManaegeUtilitReport from "@/manageoperator/ManaegeUtilitReport";

const Approutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        {/* dashboard */}
        {/* <Route index element={<Dashboard />} /> */}
        {/* AGENT dashboard */}
        {user?.role === "AGENT" && <Route index element={<AgentDashboard />} />}
        {user?.role === "ADMIN" && <Route index element={<AdminDashboard />} />}

        <Route path="userdash" element={<UserDashboard />} />

        {/* Manage User */}
        <Route path="manageuser" element={<ManageUser />} />
        <Route path="managesalesperson" element={<ManageSales />} />
        <Route path="manageadduser" element={<AddUser />} />
        <Route path="addsalesuser" element={<AddUser />} />

        {/* Manage DLT Temlate */}
        <Route path="managedlttemplate" element={<ManageDltTemplate />} />

        {/* Manage Voice clips */}
        <Route path="managevoiceclips" element={<ManageVoiceClips />} />

        {/* Manage Plans */}
        <Route path="manageplan" element={<ManagePlan />} />

        <Route path="accountmanager" element={<AccountManager />} />

        {/* Live monitoring */}
        <Route path="graphmain" element={<GraphMain />} />
        <Route path="graphsms" element={<GraphSms />} />
        <Route path="graphwhatsapp" element={<GraphWhatsapp />} />
        <Route path="graphrcs" element={<GraphRcs />} />
        <Route path="graphuserwise" element={<GraphUserWise />} />

        {/* Manage SMPP */}
        <Route path="manageSMPP" element={<ManageSMPP />} />
        <Route path="SMPPerrorcode" element={<SMPPErrorCode />} />
        <Route path="addservice" element={<AddService />} />
        <Route path="smppsummary" element={<SMPPSummary />} />
        <Route path="smppmissingerrorcode" element={<SMPPMissingErrorCode />} />

        {/* Manage routing */}
        <Route path="managerouting" element={<ManageRouting />} />
        <Route path="addrouting" element={<AddRouting />} />
        <Route path="editrouting" element={<EditRouting />} />

        {/* manage prefix */}
        <Route path="manageprefix" element={<ManagePrefix />} />

        {/* Manage blacklist */}
        <Route path="blacklist" element={<Blacklist />} />

        {/* Manage Blackist */}
        <Route path="blacklistManager" element={<BlackList />} />

        {/* manage operator */}
        <Route path="addoperator" element={<AddOperator />} />

        {/* SMS */}
        <Route path="sendsms" element={<SendSms />} />
        <Route path="smsreports" element={<SmsReports />} />
        <Route path="summaryutilityreport" element={<SummaryUtilityReport />} />
        <Route
          path="smscampaigndetaillogs"
          element={<Smscampaigndetaillogs />}
        />
        <Route
          path="smsAttachmentdetaillog"
          element={<SmsAttachmentdetaillog />}
        />
        <Route
          path="smscampaigndetailsreport"
          element={<DetailedLogsInsidersDetails />}
        />
        <Route path="smsdlttemplates" element={<SmsDLTtemplate />} />
        <Route path="smswishmanagement" element={<SmsWishManagement />} />

        {/* whatsapp */}
        <Route path="wabadashboard" element={<WabaDashboard />} />
        <Route path="managetemplate" element={<ManageTemplate />} />
        <Route path="createtemplate" element={<WhatsappCreateTemplate />} />
        <Route path="edit-template" element={<EditTemplate />} />
        <Route path="wlaunchcampaign" element={<WhatsappLaunchCampaign />} />
        <Route path="wlivechat" element={<WhatsappLiveChat />} />
        <Route path="wmanagecampaign" element={<WhatsappManageCampaign />} />
        <Route path="wflowsdetailsreport" element={<FlowsDetailsReport />} />
        <Route path="wmanageoptin" element={<WhatsappManageOptin />} />
        <Route path="wchatwidget" element={<WhatsappChatWidget />} />
        <Route path="wqrcode" element={<WhatsappQrCode />} />
        <Route path="wlcsetting" element={<WhatsappLiveChatSettings />} />
        <Route path="wmanagewaba" element={<WhatsappManageWaba />} />
        <Route
          path="wwhatsappconversation"
          element={<WhatsappConversation />}
        />
        <Route
          path="wcampaigndetailsreport"
          element={<CampaignDetailsReport />}
        />
        <Route path="apicampaigninfo" element={<ApiCampaignInfo />} />
        <Route
          path="createwhatsapptemplateadmin"
          element={<CreateWhatsappTemplateAdmin />}
        />
        <Route path="wwhatsappmanageagent" element={<ManageAgent />} />
        <Route path="wwhatsappbot" element={<WhatsappBot />} />
        <Route path="createwhatsappbot" element={<CreateWhatsAppBot />} />
        <Route path="managewabaadmin" element={<ManageWabaAdmin />} />
        <Route path="wwhatsappflows" element={<WhatsappFlows />} />
        <Route path="wflowcreation" element={<FlowCreationPage />} />
        <Route path="wflowedit" element={<EditFlow />} />
        <Route path="wblockuser" element={<BlockUser />} />
        <Route path="wmmlite" element={<MmLite />} />
        <Route
          path="whatsappuserpreference"
          element={<UserPreferenceReport />}
        />
        <Route path="commercemanager" element={<CommerceManager />} />
        <Route path="inventorymanagement" element={<Inventorymanagement />} />
        <Route path="orderMangement" element={<OrderMangement />} />
        <Route path="wabamanagetemplatelibrary" element={<WabaTempLibrary />} />

        {/* Manage Notifications */}
        {/* <Route path="/notification">
          <Route index element={<ManageNotifications />} />
          <Route path="add" element={<AddNotification />} />
        </Route> */}

        {/* Callback */}
        <Route path="callback" element={<Callback />} />
        <Route path="addcallback" element={<AddCallback />} />
        <Route path="editcallback" element={<EditCallback />} />

        {/* Manage Notifications */}
        <Route path="notification" element={<ManageNotifications />} />
        <Route path="manage-notification" element={<AddNotification />} />

        {/* Canned Message Manager */}
        <Route path="cannedmessagemanager" element={<CannedMessage />} />

        {/* RCS */}
        <Route path="sendrcs" element={<SendRcs />} />
        <Route path="rcsmanagetemplate" element={<ManageTemplateRcs />} />
        <Route path="rcsaddtemplatercs" element={<AddTemplateRcs />} />
        <Route path="rcssuggestionreport" element={<SuggestionReportRcs />} />
        <Route path="rcsdeliveryreport" element={<DeliveryreportRcs />} />
        <Route
          path="rcsdeliverycampaigndetails"
          element={<CampaignDeliveryReportDetails />}
        />
        <Route path="rcsmanagebot" element={<ManageBotRcs />} />
        <Route path="rcslivechats" element={<RcsLiveChat />} />
        <Route path="rcsbot" element={<Bot />} />
        <Route path="rcs/create-bot" element={<CreateRcsBot />} />

        {/* profile */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="download" element={<Download />} />
        <Route path="loginIpdetails" element={<LoginIpDetails />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />

        {/* manage contacts */}
        <Route path="managecontacts" element={<ManageContacts />} />

        {/* manage funds */}
        <Route path="recharge" element={<Recharge />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="/user/transactions" element={<TransactionsUser />} />

        {/* Workflow */}
        <Route path="workflow" element={<WorkflowDetails />} />
        <Route path="workflow/create" element={<WorkflowCreate />} />
        <Route path="workflow/edit" element={<UpdateWorkflow />} />

        {/* OBD */}
        <Route path="obdcreatecampaign" element={<ObdCreateCampaign />} />
        <Route path="obdmanagevoiceclips" element={<ObdManageVoiceClips />} />
        <Route path="obdIntegration" element={<ObdIntegration />} />
        <Route path="/obdmanagecampaign" element={<ObdCampaignReports />} />
        <Route
          path="/obdCampaignDetailslog"
          element={<CampaignDetailsReports />}
        />

        {/* Email */}
        <Route path="emailreports" element={<EmailReport />} />
        <Route path="sendemail" element={<SendEmail />} />
        <Route path="emailwhitelist" element={<EmailWhiteList />} />
        <Route path="managelibrary" element={<EmailLibraryAdmin />} />
        <Route path="emailmanagement" element={<EmailTemplateLayout />}>
          <Route index element={<EmailDashboard />} />
          <Route path="emaillibrary" element={<EmailLibrary />} />
          {/* <Route path="emailltemplates" element={<EmailTemplate />} /> */}
          <Route path="emailltemplates" element={<AddEmailTemplate />} />

          <Route path="emaillsettings" element={<EmailSetting />} />
        </Route>

        <Route path="addsmtp" element={<AddSMTP />} />
        <Route path="sendsmtp" element={<SendSMTP />} />

        {/* InstaAdmin */}
        <Route path="assignuserinsta" element={<AssignUserInsta />} />
        <Route path="manageinstausers" element={<ManageInstaUsers />} />

        {/* self recharge */}
        <Route path="selfrecharge" element={<SelfRecharge />} />

        {/* Lead Manager */}
        <Route path="leadmanagement" element={<LeadManager />}>
          <Route path="leaddash" element={<LeadDash />} />
          <Route path="leadanalytics" element={<Analytics />} />
          <Route path="leadforms" element={<LeadForms />} />
          <Route path="leadsettings" element={<LeadSettings />} />
          <Route path="leadreports" element={<LeadReports />} />
          <Route path="leadtags" element={<LeadTags />} />
          <Route path="leadmain" element={<LeadMain />} />
          <Route path="leaddash/details" element={<Details />} />
        </Route>
        <Route path="leadsourcemanager" element={<LeadSource />} />
        <Route path="configuretemplateleadsource" element={<ConfigureTemplateLeadSource />} />


        {/* Combine Live Chat */}
        <Route path="liveChatMain" element={<LiveChatLayout />}>
          {/* <Route index element={<LiveChatDashboard />} /> */}
          <Route index element={<Navigate to="wlivechat" replace />} />
          <Route path=":channel" element={<Outlet />} />
        </Route>

        {/* Combine Chat Bots */}
        <Route path="ChatBotMain" element={<ChatBotLayout />}>
          <Route index element={<Navigate to="wwhatsappbot" replace />} />
          <Route path=":channel" element={<Outlet />} />
        </Route>
        <Route path="ChatBotSettings" element={<ChatBotSettings />} />

        {/* Combine Live Chat setting */}
        <Route
          path="combineLiveChatSettings"
          element={<CombineLiveChatSettings />}
        >
          {/* <Route index element={<Pointingup />} /> */}
          <Route index element={<Navigate to="wlcsetting" replace />} />
          <Route path=":channel" element={<Outlet />} />
        </Route>

        <Route path="/restartengine" element={<RestartEnginesPanel />} />

        {/* HLR Lookup */}
        <Route path="/hlrlookup" element={<HlrLookup />} />
        <Route path="/lookupreports" element={<LookupReport />} />

        {/* Dr Analysis report */}
        <Route path="/drAnalysis" element={<DrAnalysis />} />

        {/* Block Number */}
        <Route path="blockNumber" element={<BlockNumber />} />

        {/* Tools */}
        <Route path="jsontoolpage" element={<JsonToolsPage />} />

        {/* Utility Converter */}
        <Route path="texttopdfconverter" element={<TextToPdfConverter />} />
        <Route path="createpdfconverter" element={<CreatePdfConverter />} />

        {/* AI CONFIGURATION */}
        <Route path="userPricingAI" element={<UserPricing />} />


        <Route path="manageallagent" element={<ManageAgentAll />} />
        <Route path="planconfigurations" element={<ManagePlanConfiguration />} />
        <Route path="managesmpperrorcode" element={<Managesmpperrorcode />} />
        <Route path="manageoperatormain" element={<ManageOperatorMain />} />
        <Route path="createoperator" element={<CreateOperator />} />
        <Route path="manageutilityreport" element={<ManaegeUtilitReport />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Approutes;
