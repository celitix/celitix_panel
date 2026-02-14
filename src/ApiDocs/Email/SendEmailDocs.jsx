import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ICONS
import CircleIcon from "@mui/icons-material/Circle";

// CONTEXT
import { themeColors } from "@/ApiDocs/themeColors";
import { useTheme } from "@/ApiDocs/context/ThemeContext";

// COMPONENTS
import RequestSample from "@/ApiDocs/components/RequestSample";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
import Table from "@/ApiDocs/components/Tablenew";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";
import RequestComponent from "@/ApiDocs/components/RequestComponent";

const SendEmailDocs = () => {
  const [activeSection, setActiveSection] = useState("single-email");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "single-email", title: "Single Email " },
    { id: "multiple-email", title: "Multiple Email" },
  ];

  const [active, setActive] = useState(null);
  const [scroller, setScroller] = useState(0);
  const activeIndex = sections.findIndex((s) => s.id === active);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;


  useEffect(() => {
    if (!sections.length) return;
    setActive((prev) => prev || sections[0].id);
    let initialLoad = true;
    // IntersectionObserver for highlighting active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (initialLoad) return;
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    setTimeout(() => {
      initialLoad = false;
    }, 250);

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    // Scroll listener for smooth progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScroller(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const requestDataSingleEmail = [
    {
      id: 0,
      // title: "With Variable",
      requestPrefix: `{
        "subject": "Email Update Email",
        "fromEmail": "mobicomm@dovesoft.ltd",
        "fromName": "deep",
        "toEmail": "sindrathsirohi@gmail.com",
        "cc": "abc@gmail.com",
        "bodyHtml": "Amrit",
        "attachmentName": "test.jpg",
        "attachment": "/9j/4R2CRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAA...."
      }`,
    },
  ];

  const requestDataMultipleEmail = [
    {
      id: 0,
      title: "With Variable",
      requestPrefix: `{
        "templateId": 34,
        "subject": "Happy New Year",
        "fromEmail": "mobicomm@dovesoft.ltd",
        "fromName": "John Sir",
        "replyEmail": "reply@example.com",
        "list": [
          {
            "toEmail": "sindrathsirohi@gmail.com",
            "varList": {
                "var1": "value",
                "var2": "value"
            }
          },
          {
            "toEmail": "amritkp2113@gmail.com",
               "varList": {
                "var1": "value",
                "var2": "value"
            }
          }
        ]
      }`,
    },
    {
      id: 1,
      title: "Without Variable",
      requestPrefix: `{
        "templateId": 34,
        "subject": "Happy New Year",
        "fromEmail": "mobicomm@dovesoft.ltd",
        "fromName": "John Sir",
        "replyEmail": "reply@example.com",
        "list": [
          {
            "toEmail": "sindrathsirohi@gmail.com"
          },
          {
            "toEmail": "amritkp2113@gmail.com"
          }
        ]
      }`,
    },
  ];

  const singleEmailcURL = `
  curl --location 'Base_URL/api/email/sendEmail' \
  --header 'Content-Type: application/json' \
  --header 'key: Enter Your API key (Available in your portal)' \
  --header 'wabaNumber: Registered_WABA_Number without + sign
    (91XXXXXXXXXX)  ' \
   `;

  const multipleEmailcURL = `
  curl --location 'Base_URL/api/email/sendEmailOnTamplate' \
  --header 'Content-Type: application/json' \
  --header 'key: Enter Your API key (Available in your portal)' \
  --header 'wabaNumber: Registered_WABA_Number without + sign
    (91XXXXXXXXXX)  ' \
   `;

  const TextTemplatejsonBodyData = {
    messaging_product: "whatsapp",
    contacts: [
      {
        input: "91XXXXXXXXXX",
        wa_id: "91XXXXXXXXXX",
      },
    ],
    messages: [
      {
        id: "wamid.HBgMOTE3NDkxMDc5MjA4FQIAERgSOTJBNTYwQzcyMTBCN0JCRjZFAA==",
        message_status: "accepted",
      },
    ],
  };

  const TextTemplateResponseBodyheaders = [
    { key: "Content-Type", value: "text/plain;charset=UTF-8" },
    { key: "Content-Encoding", value: "gzip" },
    { key: "Content-Length", value: "184" },
    { key: "Date", value: "Mon, 25 Aug 2025 06:46:55 GMT" },
    {
      key: "Cache-Control",
      value: "no-cache, no-store, max-age=0, must-revalidate",
    },
  ];

  return (
    <div
      className={`flex w-[100%] rounded-md  ${isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
        }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="single-email" className="mb-16 mt-10">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              Email Business API Document
            </h2>
          </div>

          <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center mt-10">
            Single Email
          </h2>
          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/api/email/sendEmail"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Type</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-42">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-85">
                    <div className="text-center">Example</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    subject
                  </Table.Cell>
                  <Table.Cell align="center">Email Update Email</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br />
                    fromEmail
                  </Table.Cell>
                  <Table.Cell align="center">mobicomm@dovesoft.ltd</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Optional.</span>
                    <br />
                    <br />
                    fromName
                  </Table.Cell>
                  <Table.Cell align="center">deep</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br />
                    toEmail
                  </Table.Cell>
                  <Table.Cell align="center">
                    sindrathsirohi@gmail.com
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br />
                    cc
                  </Table.Cell>
                  <Table.Cell align="center">abc@gmail.com</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br />
                    bodyHtml
                  </Table.Cell>
                  <Table.Cell align="center">Amrit</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br />
                    attachmentName
                  </Table.Cell>
                  <Table.Cell align="center">test.jpg</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br />
                    attachment
                  </Table.Cell>
                  <Table.Cell align="center">
                    <div
                      className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap mx-auto px-2"
                      title="/9j/4R2CRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAA...."
                    >
                      /9j/4R2CRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAA....
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Template Variables
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              <RequestSample
                tabsContent={requestDataSingleEmail}
                curlBase={singleEmailcURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full ">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseBodyheaders}
              />
            </div>
          </div>
        </section>

        <section id="multiple-email" className="mb-16">
          <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center mt-10">
            Multiple Email
          </h2>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/api/email/sendEmailOnTamplate"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center">Name</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Value </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    Content-type
                  </Table.Cell>
                  <Table.Cell align="center">application/json</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    key
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500">
                    wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    wabaNumber <br />
                    <span className="text-gray-400">
                      Registered_WABA_Number without + sign (91XXXXXXXXXX)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex my-4 mt-10">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium text-center">
              Common HTTP Response Codes
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Code</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    403
                  </Table.Cell>
                  <Table.Cell align="center">Forbidden</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    500
                  </Table.Cell>
                  <Table.Cell align="center">Internal server error</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    200 or 202
                  </Table.Cell>
                  <Table.Cell align="center" className=" text-green-600">
                    OK
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    405
                  </Table.Cell>
                  <Table.Cell align="center">Method not allowed</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    401
                  </Table.Cell>
                  <Table.Cell align="center">Unauthorized</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    429
                  </Table.Cell>
                  <Table.Cell align="center">Too many requests</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Request Parameter
            </h2>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              With Variable
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Type</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-42">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-85">
                    <div className="text-center">Example</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    templateId
                  </Table.Cell>
                  <Table.Cell align="center">34</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    subject
                  </Table.Cell>
                  <Table.Cell align="center">Happy New Year</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    fromEmail
                  </Table.Cell>
                  <Table.Cell align="center">mobicomm@dovesoft.ltd</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    fromName
                  </Table.Cell>
                  <Table.Cell align="center">John Sir</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    replyEmail
                  </Table.Cell>
                  <Table.Cell align="center">reply@example.com</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    array
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    list
                  </Table.Cell>
                  <Table.Cell align="center">
                    <div className="text-center">
                      <div>
                        <strong>toEmail:</strong> sindrathsirohi@gmail.com
                        <br />
                        <strong>varList:</strong>{" "}
                        {"{ var1: 'value', var2: 'value' }"}
                      </div>
                      <hr className="my-2 border-gray-300" />
                      <div>
                        <strong>toEmail:</strong> amritkp2113@gmail.com
                        <br />
                        <strong>varList:</strong>{" "}
                        {"{ var1: 'value', var2: 'value' }"}
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Without Variable
            </h2>
          </div>
          <div className="mt-5 flex justify-center items-center">
            <Table zebra bordered stickyHeader scrollButtons devVisible>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell align="center" className="min-w-40">
                    <div className="text-center">Type</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-42">
                    <div className="text-center">Description</div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-85">
                    <div className="text-center">Example</div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    templateId
                  </Table.Cell>
                  <Table.Cell align="center">34</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    subject
                  </Table.Cell>
                  <Table.Cell align="center">Happy New Year</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    fromEmail
                  </Table.Cell>
                  <Table.Cell align="center">mobicomm@dovesoft.ltd</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    fromName
                  </Table.Cell>
                  <Table.Cell align="center">John Sir</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    string
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    replyEmail
                  </Table.Cell>
                  <Table.Cell align="center">reply@example.com</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className="text-orange-500">
                    array
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    list
                  </Table.Cell>
                  <Table.Cell align="center">
                    <div className="text-center">
                      <div>
                        <strong>toEmail:</strong> sindrathsirohi@gmail.com
                      </div>
                      <hr className="my-2 border-gray-300" />
                      <div>
                        <strong>toEmail:</strong> amritkp2113@gmail.com
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Template Variables
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className="w-full mt-10">
              <RequestSample
                tabsContent={requestDataMultipleEmail}
                curlBase={multipleEmailcURL}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Response
            </h2>
            <div className="w-full ">
              <ResponseComponent
                jsonData={TextTemplatejsonBodyData}
                headers={TextTemplateResponseBodyheaders}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}

      <div
        className={`${isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
          } hidden lg:block h-[95%] sticky top-4 p-2 shrink-0 rounded-2xl mr-4 w-70 `}
      >
        {/* Scroll track */}
        <div
          className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"} 
        w-1 rounded absolute left-3 top-6 `}
          style={{
            height: `${sections.length * 18}px`,
          }}
        >
          {/* Moving scroll indicator */}
          <div
            className={`
        ${isDarkMode ? "bg-white" : "bg-black"} 
        w-1 rounded absolute transition-all duration-300
        ${active ? "bg-black" : ""}
        `}
            style={{
              height: "20px",
              top: `${sections.findIndex((s) => s.id === active) * 22}px`,
            }}
          />
        </div>
        <ul className="relative ml-6">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm 
          ${active === s.id ? "text-black font-semibold" : ""}
        `}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SendEmailDocs;
