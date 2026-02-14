import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

// mainlayout
import Mainlayout from "@/mainlayout/Mainlayout";

// dashboard
import Dashboard from "@/dashboard/Dashboard";
import ResellerDashboard from "@/dashboard/ResellerDashboard";
import AgentDashboard from "@/dashboard/AgentDashboard";
import SalesPersonDashboard from "@/dashboard/SalesPersonDashboard";
import UnknownDashboard from "@/dashboard/UnknownDashboard";

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
import DetailedLogsInsidersDetails from "@/sms/smsReports/components/DetailedLogsInsidersDetails";
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
import WhatsappCalling from "@/whatsapp/WhatsappCalling/WhatsappCalling";
import UserPreferenceReport from "@/whatsapp/userpreferencereport/UserPreferenceReport";

// MMLite
import MmLite from "@/whatsapp/mmlite/MmLite";

// manage funds
import Recharge from "@/managefunds/recharge/Recharge";
import Transactions from "@/managefunds/transactions/Transactions";

// manage contacts
import ManageContacts from "@/managecontacts/ManageContacts";

// profile
import Settings from "@/profile/pages/Settings";
import ProfilePage from "@/profile/pages/Profile";
import LoginIpDetails from "@/profile/pages/LoginIpDetails";
import WhatsappCreateTemplate from "@/whatsapp/whatsappcreatetemplate/WhatsappCreateTemplate";

// sms
import SmsReports from "@/sms/smsReports/SmsReports";
import SendSms from "@/sms/smsSend/SendSms";
import SmsDLTtemplate from "@/sms/smsDlttemplate/SmsDLTtemplate";
import SmsWishManagement from "@/sms/smsWishManagement/SmsWishManagement";
import Smscampaigndetaillogs from "@/sms/smsReports/pages/smscampaigndetaillogs";
import SmsAttachmentdetaillog from "@/sms/smsReports/pages/SmsAttachmentdetaillog";
import SmsDLTtemplatenew from "@/sms/smsDlttemplate/SmsDLTtemplatenew";

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
import RcsForm from "@/rcs/Rcsform/RcsForm";

// Download
import Download from "@/profile/pages/Download";

// Two-Way-SMS
import TwowayMangeKeyword from "@/twowaysms/twowayMangeKeyword/TwowayMangeKeyword";
import TwowayReports from "@/twowaysms/twowayReports/TwowayReports";
import TwowayIntegration from "@/twowaysms/twowayIntegration/TwowayIntegration";

// Cick To Call
import ClickToSetting from "@/clicktwocall/clickToSetting/ClickToSetting";
import ClickToHistory from "@/clicktwocall/clickToHistory/ClickToHistory";

// IBD
import CallHistoryIBD from "@/ibd/ibdCallHistory/CallHIstoryIBD";
import IVRFlowIBD from "@/ibd/ibdIVRFlow/IVRFlowIBD";
import ManageExecutiveIBD from "@/ibd/ibdManageExecutive/ManageExecutiveIBD";
import SettingIBD from "@/ibd/ibdSettings/SettingIBD";

// OBD
import ObdCreateCampaign from "@/obd/obdcreatecampaign/ObdCreateCampaign";
import ObdManageVoiceClips from "@/obd/managevoiceclips/ObdManageVoiceClips";
import ObdIntegration from "@/obd/obdmanageinteration/ObdIntegration";
import ObdCampaignReports from "@/obd/obdManageCampaign/ObdCampaignReports";
import CampaignDetailsReports from "@/obd/obdManageCampaign/components/CampaignDetailReports";

// missed call
import HistoryMissedCall from "@/missedcall/missedCallHistory/HistoryMissedCall";
import MissedCallSettings from "@/missedcall/missedCallSettings/MissedCallSettings";

// App Authenticator
import AppauthenticatorReports from "@/appauthenticator/authenticatorreports/AppauthenticatorReports";
import AuthenticatorSetting from "@/appauthenticator/authenticatorsettings/AuthenticatorSetting";

// Email
// import EmailTemplate from "@/email/emailtemplate/EmailTemplate";
import EmailReport from "@/email/emailreport/EmailReport";
import EmailTemplateLayout from "@/email/emailtemplate/EmailTemplateLayout";
import EmailDashboard from "@/email/emailtemplate/pages/EmailDashboard";
import EmailLibrary from "@/email/emailtemplate/pages/EmailLibrary";
import AddEmailTemplate from "@/email/emailtemplate/pages/AddEmailTemplate";
import EmailSetting from "@/email/emailtemplate/pages/EmailSetting";
import SendEmail from "@/email/SendEmail/SendEmail";
import AddSMTP from "@/email/SMTP/AddSMTP/AddSMTP";
import SendSMTP from "@/email/SMTP/SendSMTP/SendSMTP";
import EmailWhiteList from "@/email/emailWhiteList/EmailWhiteList";

// Number Lookup
import HlrLookup from "@/numberlookup/hlrlookup/HlrLookup";
import HlrLookupReports from "@/numberlookup/hlrlookupreports/HlrLookupReports";

// Callback
import Callback from "@/callback/Callback";
import { AddCallback } from "@/callback/page/addCallback";
import { EditCallback } from "@/callback/page/editCallback";

// Tag Manager
import TagManager from "@/tagmanager/TagManager";

// Not Found Page
import PageNotFound from "@/NotFound/PageNotFound";

//WorkFlow
import { WorkflowDetails } from "@/workflow/details";
import { WorkflowCreate } from "@/workflow/create";
import { UpdateWorkflow } from "@/workflow/edit";

// GPT
import GptConfiguration from "@/gpt/GptConfiguration";

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
import CommerceSetting from "@/commerecemanager/CommerceSetting/CommerceSetting";
import PatientLeads from "@/LeadManager/doctorcrm/pages/PatientLeads";
import LeadDocDashboard from "@/LeadManager/doctorcrm/pages/LeadDocDashboard";
import Doctors from "@/LeadManager/doctorcrm/pages/Doctors";
import AddDoctor from "@/LeadManager/doctorcrm/pages/AddDoctor";
import DoctorsTemplates from "@/LeadManager/doctorcrm/pages/DoctorsTemplates";
import DoctorsSettings from "@/LeadManager/doctorcrm/pages/DoctorsSettings";
import PatientJourneyApp from "@/LeadManager/doctorcrm/pages/PatientJourneyApp";

// CombineLiveChat
import LiveChatDashboard from "@/CombineLiveChats/pages/LiveChatDashboard";
import LiveChatLayout from "@/CombineLiveChats/pages/LiveChatLayout";
import CombineLiveChatSettings from "@/CombineLiveChats/pages/CombineLiveChatSettings";
import Pointingup from "@/CombineLiveChats/components/Settings/Pointingup";
import WhatsappLiveChatSet from "@/whatsapp/whatsappLiveChatSetting/WhatsappLiveChatSet";

// Instagram
import ManageInstaProfile from "@/instagram/Manageprofile/ManageInstaProfile";
import InstaReports from "@/instagram/InstaReports/InstaReports";
import InstaSettings from "@/instagram/settings/InstaSettings";
import CommentModeration from "@/instagram/CommentModeration/CommentModeration";
import Insight from "@/instagram/Insight/Insight";
import InstaCreatePost from "@/instagram/CreatePost/InstaCreatePost";
import PostContainer from "@/Instagram/CreatePost/PostContainer";
import IgMe from "@/instagram/settings/components/IgMe";
import EmbeddedInstagram from "@/instagram/Manageprofile/components/EmbeddedInstagram";
import PostDetailsInsights from "@/Instagram/Insight/PostDetailsInsights";
import AddTemplate from "@/Instagram/InstagramLiveChat/Components/Template/AddTemplate";
import ManageInstaTemplates from "@/Instagram/InstagramLiveChat/Components/Template/ManageInstaTemplates";

// Unsubscribe
import Unsubscribe from "@/whatsapp/unsubscribe/Unsubscribe";

// Block Number
import BlockNumber from "@/BlackList/manageBlockNumber";

// Truecaller
import SendTruecaller from "@/Truecaller/SendTruecaller/SendTruecaller";

// User
import { useUser } from "@/context/auth";

// dummy
import Dummy from "@/dummy/Dummy";
import Arihant from "@/random/arihant";

// Text to pdf converter
import TextToPdfConverter from "@/ConverterUtility/TextToPdfConverter/TextToPdfConverter";
import CreatePdfConverter from "@/ConverterUtility/TextToPdfConverter/CreatePdfConverter";
import WhatsAppBusinessProfile from "@/whatsapp/whatsappManageWaba/WhatsAppBusinessProfile";

// Manage Agent
import ManageAgentAll from "@/ManageAgent/ManageAgentAll";
import AgentMapping from "@/ManageAgent/AgentMapping";


// Chat Bot Section
import ChatBotLayout from "@/CombineChatBots/pages/ChatBotLayout";
import ChatBotSettings from "@/CombineChatBots/pages/ChatBotSettings";

// Commerce  Manager
import CommerceManager from "@/commerecemanager/CommerceManager";
import HomeListing from "@/commerecemanager/HomeListing/HomeListing";
import Vehicle from "@/commerecemanager/Vehicle/Vehicle";
import WhatsAppBootstrap from "@/whatsapp/bootstrap/WhatsAppBootstrap";
import ProductCategories from "@/commerecemanager/productcategories/ProductCategories";
import InventoryManagement from "@/commerecemanager/inventorymanagement/Inventorymanagement";
import OrderMangement from "@/commerecemanager/orderMangement/OrderMangement";

// Extras
import NewWaba from "@/whatsapp/whatsappManageWaba/NewWaba";
import WabaChatSettingNew from "@/dummy/WabaChatSettingNew";
import NewWabaUI from "@/whatsapp/whatsappManageWaba/NewWabaUI";
import SupportJourney from "@/supportticker/SupportJourney";
import { useUserData } from "@/context/UserContext";


const Approutes = () => {
  const { user } = useUser();
  const { userData } = useUserData();

  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        {/* DIRECTUSER dashboard */}
        {user?.role === "DIRECTUSER" && (
          <Route index element={<ResellerDashboard />} />
        )}
        {/* {user?.role === "ADMIN" && (
          <Route index element={<ResellerDashboard />} />
        )} */}

        {/* AGENT dashboard */}
        {user?.role === "AGENT" && (
          <Route index element={<AgentDashboard />} />
        )}

        <Route path="dummydash" element={<Dashboard />} />

        {/* Blacklist - Block Number */}
        <Route path="blockNumber" element={<BlockNumber />} />

        {/* SMS */}
        <Route path="sendsms" element={<SendSms />} />
        <Route path="smsreports" element={<SmsReports />} />
        <Route
          path="smscampaigndetaillogs"
          element={<Smscampaigndetaillogs />}
        />
        <Route
          path="smsAttachmentdetaillog"
          element={<SmsAttachmentdetaillog />}
        />
        <Route path="smsdlttemplates" element={<SmsDLTtemplate />} />
        <Route path="smsdlttemplatesnew" element={<SmsDLTtemplatenew />} />
        <Route path="smswishmanagement" element={<SmsWishManagement />} />

        {/* Two-Way-SMS */}
        <Route path="managekeywords" element={<TwowayMangeKeyword />} />
        <Route path="twowayreports" element={<TwowayReports />} />
        <Route path="twowayintegration" element={<TwowayIntegration />} />
        <Route
          path="smscampaigndetailsreport"
          element={<DetailedLogsInsidersDetails />}
        />

        {/* Truecaller */}
        <Route path="sendtruecallercamp" element={<SendTruecaller />} />

        {/* whatsapp */}
        {/* <Route element={<WhatsAppBootstrap />}> */}
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
        {/* <Route path="wlcsetting" element={<WhatsappLiveChatSet />} /> */}
        <Route path="wmanagewaba" element={<WhatsappManageWaba />} />
        <Route path="newwabaembedded" element={<NewWaba />} />
        <Route path="wmanagewabanew" element={<WhatsAppBusinessProfile />} />
        <Route
          path="wwhatsappconversation"
          element={<WhatsappConversation />}
        />
        <Route
          path="wcampaigndetailsreport"
          element={<CampaignDetailsReport />}
        />
        <Route
          path="smscampaigndetailsreport"
          element={<DetailedLogsInsidersDetails />}
        />
        <Route
          path="wcampaigndetailsreport"
          element={<CampaignDetailsReport />}
        />
        <Route path="wwhatsappmanageagent" element={<ManageAgent />} />
        {/* <Route path="wwhatsappbot" element={<WhatsappBot />} /> */}
        <Route path="createwhatsappbot" element={<CreateWhatsAppBot />} />
        <Route path="apicampaigninfo" element={<ApiCampaignInfo />} />
        <Route path="wwhatsappflows" element={<WhatsappFlows />} />
        <Route path="wflowcreation" element={<FlowCreationPage />} />
        <Route path="wflowedit" element={<EditFlow />} />
        <Route path="wblockuser" element={<BlockUser />} />
        <Route path="wmmlite" element={<MmLite />} />
        <Route path="whatsappcalling" element={<WhatsappCalling />} />
        <Route path="whatsappuserpreference" element={<UserPreferenceReport />} />
        <Route path="commercemanager" element={<CommerceManager />} />
        <Route path="homelisting" element={<HomeListing />} />
        <Route path="vehicle" element={<Vehicle />} />
        <Route path="commerecesetting" element={<CommerceSetting />} />
        <Route path="cmproductcategories" element={<ProductCategories />} />
        <Route path="inventorymanagement" element={<InventoryManagement />} />
        <Route path="orderMangement" element={<OrderMangement />} />
        <Route path="WabaChatSettingNew" element={<WabaChatSettingNew />} />
        <Route path="newwabaui" element={<NewWabaUI />} />
        {/* </Route> */}

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
        <Route path="rcsonboarding" element={<RcsForm />} />

        {/* profile */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="download" element={<Download />} />
        <Route path="loginIpdetails" element={<LoginIpDetails />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />

        {/* manage funds */}
        <Route path="recharge" element={<Recharge />} />
        <Route path="transactions" element={<Transactions />} />

        {/* manage contacts */}
        <Route path="managecontacts" element={<ManageContacts />} />

        {/* Click To Call */}
        <Route path="clicktosettings" element={<ClickToSetting />} />
        <Route path="clicktohistory" element={<ClickToHistory />} />

        {/* IBD */}
        <Route path="ibdcallhistory" element={<CallHistoryIBD />} />
        <Route path="ibdivrflow" element={<IVRFlowIBD />} />
        <Route path="ibdmanageexecutive" element={<ManageExecutiveIBD />} />
        <Route path="ibdsettings" element={<SettingIBD />} />

        {/* OBD */}
        <Route path="obdcreatecampaign" element={<ObdCreateCampaign />} />
        <Route path="obdmanagevoiceclips" element={<ObdManageVoiceClips />} />
        <Route path="obdIntegration" element={<ObdIntegration />} />
        <Route path="obdmanagecampaign" element={<ObdCampaignReports />} />
        <Route
          path="obdCampaignDetailslog"
          element={<CampaignDetailsReports />}
        />

        {/* MissedCall */}
        <Route path="missedcallhistory" element={<HistoryMissedCall />} />
        <Route path="missedcallsettings" element={<MissedCallSettings />} />

        {/* Number Lookup */}
        <Route path="hlrlookup" element={<HlrLookup />} />
        <Route path="lookupreports" element={<HlrLookupReports />} />

        {/* Callback */}
        <Route path="callback" element={<Callback />} />
        <Route path="addcallback" element={<AddCallback />} />
        <Route path="editcallback" element={<EditCallback />} />

        {/* Instagram */}
        <Route path="instareport" element={<InstaReports />} />
        <Route path="manageinstaprofile" element={<ManageInstaProfile />} />
        <Route path="instasettings" element={<InstaSettings />} />
        <Route path="commentmoderation" element={<CommentModeration />} />
        <Route path="insight" element={<Insight />} />
        <Route path="postdetailsinsights" element={<PostDetailsInsights />} />
        <Route path="createpost" element={<InstaCreatePost />} />
        <Route path="postcontainer" element={<PostContainer />} />
        <Route path="instareferral" element={<IgMe />} />
        <Route path="instagramembedded" element={<EmbeddedInstagram />} />
        <Route path="manageinstatemplate" element={<ManageInstaTemplates />} />

        {/* Tag Manager */}
        <Route path="tagmanager" element={<TagManager />} />

        {/* Canned Message Manager */}
        <Route path="cannedmessagemanager" element={<CannedMessage />} />

        {/* Appauthenticator */}
        <Route path="authreports" element={<AppauthenticatorReports />} />
        <Route path="authsettings" element={<AuthenticatorSetting />} />

        {/* Email */}
        {/* <Route path="emailtemplate" element={<EmailTemplate />} /> */}
        <Route path="emailmanagement" element={<EmailTemplateLayout />}>
          <Route index element={<EmailDashboard />} />
          <Route path="emaillibrary" element={<EmailLibrary />} />
          <Route path="emailltemplates" element={<AddEmailTemplate />} />
          <Route path="emaillsettings" element={<EmailSetting />} />
        </Route>
        <Route path="emailreports" element={<EmailReport />} />
        <Route path="sendemail" element={<SendEmail />} />
        <Route path="addsmtp" element={<AddSMTP />} />
        <Route path="sendsmtp" element={<SendSMTP />} />
        <Route path="emailwhitelist" element={<EmailWhiteList />} />


        {/* Workflow */}
        <Route path="workflow" element={<WorkflowDetails />} />
        <Route path="workflow/create" element={<WorkflowCreate />} />
        <Route path="workflow/edit" element={<UpdateWorkflow />} />

        {/* Ai Configuration */}
        <Route path="aiconfiguration" element={<GptConfiguration />} />

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
          <Route path="doctorcrm/dash" element={<LeadDocDashboard />} />
          <Route path="doctorcrm/leads" element={<PatientLeads />} />
          <Route path="doctorcrm/managedoctor" element={<Doctors />} />
          <Route path="doctorcrm/adddoctor" element={<AddDoctor />} />
          <Route path="doctorcrm/settings" element={<DoctorsSettings />} />
          <Route path="doctorcrm/templates" element={<DoctorsTemplates />} />
          <Route path="doctorcrm/journey" element={<PatientJourneyApp />} />
        </Route>

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

        {/* unsubscribe */}
        <Route path="unsubscribe" element={<Unsubscribe />} />

        <Route path="manageallagent" element={<ManageAgentAll />} />
        <Route path="agentmapping" element={<AgentMapping />} />

        {/* Utility Converter */}
        <Route path="texttopdfconverter" element={<TextToPdfConverter />} />
        <Route path="createpdfconverter" element={<CreatePdfConverter />} />

        {/* Ticket Management */}
        <Route path="/support-journey" element={<SupportJourney userData={userData} />} />

      </Route>

      <Route path="dummy" element={<Dummy />} />
      <Route path="arihant" element={<Arihant />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Approutes;
