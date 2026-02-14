import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ICONS
import CircleIcon from "@mui/icons-material/Circle";

// CONTEXT
import { useTheme } from "../context/ThemeContext";
import { themeColors } from "../themeColors";

// COMPONENTS
import RequestSample from "@/ApiDocs/components/RequestSample";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
import Table from "@/ApiDocs/components/Tablenew";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";
import RequestComponent from "@/ApiDocs/components/RequestComponent";

const InstaApiDocsSetting = () => {
  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "create-ice-breaker", title: "Create Ice Breaker" },
    { id: "get-ice-breaker", title: "Get Ice Breaker " },
    { id: "delete-ice-breaker", title: "Delete Ice Breaker" },
    { id: "create-persistent-menu", title: "Create Persistent Menu" },
    { id: "get-persistent-menu", title: "Get Persistent Menu" },
  ];

  const [active, setActive] = useState(null);
  const [scroller, setScroller] = useState(0);

  //   ========================================= MINI SCROLLBAR FUNCTION STARTS HERE ===================================================================
  useEffect(() => {
    // IntersectionObserver for highlighting active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
  //   ========================================= MINI SCROLLBAR FUNCTION ENDS HERE ===================================================================

  const createIcebreakerRequest = [
    {
      id: 1,
      //   title: "Without Variable",
      requestPrefix: `[
      {
        "question": "What are your store hours?",
        "payload": "STORE_HOURS"
      },
      {
        "question": "Do you offer free shipping?",
        "payload": "SHIPPING_INFO"
      },
      {
        "question": "Show me new arrivals",
        "payload": "NEW_PRODUCTS"
      },
      {
        "question": "How can I track my order?",
        "payload": "ORDER_TRACKING"
      }
    ]`,
    },
  ];

  const createIcebreakercURL = `
          curl --location 'base_url/wrapper/instagram/ice-breaker?instaUserId=178XXXXXXXXXXXXXXX&key=b42XXXXXXXXX' \
               --header 'Content-Type: application/json' \
               --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJhZ2VudFR5cGUiOjAsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiZGV0YWlscyI6eyJicm93c2VyRGV0YWlsIjoiUG9zdG1hblJ1bnRpbWUvNy41MS4wIiwiY2lsZW50SXAiOiIwOjA6MDowOjA6MDowOjEifSwicGFyZW50VXNlciI6MCwic3ViIjoiMjkwNyIsImlhdCI6MTc2NTk3Mzg1MSwiZXhwIjoxNzY1OTc3NDUxfQ.pII6aihe-tVVZLIYbcc6xrmNRBavvAeGo2vdLiySbvf9U1_wTzZqD6iL1KnAEKYNa6v3-lqXD4KYsnLnXt5FUg' \
               --header 'Cookie: JSESSIONID=F67AE5BE1EFF4893083B5FF094418BD6' \
    `;

  const getIcebreakerRequest = [
    {
      id: 1,
      //   title: "Without Variable",
      requestPrefix: `[
     {
        "question": "What are your store hours?",
        "payload": "STORE_HOURS"
    },
    {
        "question": "Do you offer free shipping?",
        "payload": "SHIPPING_INFO"
    },
    {
        "question": "Show me new arrivals",
        "payload": "NEW_PRODUCTS"
    },
    {
        "question": "How can I track my order?",
        "payload": "ORDER_TRACKING"
    }
    ]`,
    },
  ];

  const getIcebreakercURL = `
    curl --location --request GET
       'base_url/wrapper/instagram/ice-breaker?instaUserId=178XXXXXXXXXXXXXXX&key=b42XXXXXXXXX' \
        --header 'Content-Type: application/json' \
        --header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJhZ2VudFR5cGUiOjAsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiZGV0YWlscyI6eyJicm93c2VyRGV0YWlsIjoiUG9zdG1hblJ1bnRpbWUvNy41MS4wIiwiY2lsZW50SXAiOiIwOjA6MDowOjA6MDowOjEifSwicGFyZW50VXNlciI6MCwic3ViIjoiMjkwNyIsImlhdCI6MTc2NTk3Mzg1MSwiZXhwIjoxNzY1OTc3NDUxfQ.pII6aihe-tVVZLIYbcc6xrmNRBavvAeGo2vdLiySbvf9U1_wTzZqD6iL1KnAEKYNa6v3-lqXD4KYsnLnXt5FUg' \
        --header 'Cookie: JSESSIONID=F67AE5BE1EFF4893083B5FF094418BD6' \
 `;

  const deleteIcebreakerRequest = [
    {
      id: 1,

      requestPrefix: `[
    {
        "question": "What are your store hours?",
        "payload": "STORE_HOURS"
    },
    {
        "question": "Do you offer free shipping?",
        "payload": "SHIPPING_INFO"
    },
    {
        "question": "Show me new arrivals",
        "payload": "NEW_PRODUCTS"
    },
    {
        "question": "How can I track my order?",
        "payload": "ORDER_TRACKING"
    }
    ]`,
    },
  ];

  const deleteIcebreakercURL = `
 curl --location --request DELETE 'base_url/wrapper/instagram/ice-breaker?instaUserId=178XXXXXXXXXXXXXXX&key=b42XXXXXXXXX' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJhZ2VudFR5cGUiOjAsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiZGV0YWlscyI6eyJicm93c2VyRGV0YWlsIjoiUG9zdG1hblJ1bnRpbWUvNy41MS4wIiwiY2lsZW50SXAiOiIwOjA6MDowOjA6MDowOjEifSwicGFyZW50VXNlciI6MCwic3ViIjoiMjkwNyIsImlhdCI6MTc2NTk3Mzg1MSwiZXhwIjoxNzY1OTc3NDUxfQ.pII6aihe-tVVZLIYbcc6xrmNRBavvAeGo2vdLiySbvf9U1_wTzZqD6iL1KnAEKYNa6v3-lqXD4KYsnLnXt5FUg' \
--header 'Cookie: JSESSIONID=F67AE5BE1EFF4893083B5FF094418BD6' \
`;

  const createPersistentMenuRequest = [
    {
      id: 1,

      requestPrefix: `[
   {
        "type": "postback",
        "title": "View Catalog",
        "payload": "VIEW_CATALOG"
    },
    {
        "type": "postback",
        "title": "Track My Order",
        "payload": "TRACK_ORDER"
    },
    {
        "type": "postback",
        "title": "Contact Support",
        "payload": "CONTACT_SUPPORT"
    },
    {
        "type": "web_url",
        "title": "Visit Our Website",
        "url": "https://www.myshop1.com"
        
    }
    ]`,
    },
  ];

  const createPersistentMenucURL = `
curl --location 'base_url/wrapper/instagram/persistent-menu?instaUserId=178XXXXXXXXXXXXXXX&key=b42XXXXXXXXX' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJhZ2VudFR5cGUiOjAsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiZGV0YWlscyI6eyJicm93c2VyRGV0YWlsIjoiUG9zdG1hblJ1bnRpbWUvNy41MS4wIiwiY2lsZW50SXAiOiIwOjA6MDowOjA6MDowOjEifSwicGFyZW50VXNlciI6MCwic3ViIjoiMjkwNyIsImlhdCI6MTc2NjAzNDQ2NiwiZXhwIjoxNzY2MDM4MDY2fQ.vlxY9qBW6AyweoCTrR5zyz2n066XhG4Nt5Qz0puo3pq4FcjzvXVoNpyOE5SfmLo7vCYJl3P-677_IPku6GcHFg' \
--header 'Cookie: JSESSIONID=53501C79EBECF6BD609706C2829A407C' \

`;

  const getPersistentMenuRequest = [
    {
      id: 1,

      requestPrefix: `[
       {
        "question": "What are your store hours?",
        "payload": "STORE_HOURS"
    },
    {
        "question": "Do you offer free shipping?",
        "payload": "SHIPPING_INFO"
    },
    {
        "question": "Show me new arrivals",
        "payload": "NEW_PRODUCTS"
    },
    {
        "question": "How can I track my order?",
        "payload": "ORDER_TRACKING"
    }
    ]`,
    },
  ];

  const getPersisitentMenucURL = `
     curl --location --request GET 'base_url/wrapper/instagram/persistent-menu?instaUserId=178XXXXXXXXXXXXXXX&key=b42XXXXXXXXX' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJhZ2VudFR5cGUiOjAsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiZGV0YWlscyI6eyJicm93c2VyRGV0YWlsIjoiUG9zdG1hblJ1bnRpbWUvNy41MS4wIiwiY2lsZW50SXAiOiIwOjA6MDowOjA6MDowOjEifSwicGFyZW50VXNlciI6MCwic3ViIjoiMjkwNyIsImlhdCI6MTc2NTk3Mzg1MSwiZXhwIjoxNzY1OTc3NDUxfQ.pII6aihe-tVVZLIYbcc6xrmNRBavvAeGo2vdLiySbvf9U1_wTzZqD6iL1KnAEKYNa6v3-lqXD4KYsnLnXt5FUg' \
--header 'Cookie: JSESSIONID=F67AE5BE1EFF4893083B5FF094418BD6' \
`;

  return (
    <div
      className={`flex w-[100%]   ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="create-ice-breaker" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Create Ice Breaker
            </h2>
          </div>
          <div className=" flex flex-col  justify-center md:text-start w-xs md:w-2xl lg:w-3xl mx-auto sm:text-center mt-2">
            <div>
              <h3 className="font-semibold">Create Icebreaker</h3>

              <p className="mt-4">
                Icebreakers help you start conversations naturally and make the
                first interaction engaging for users. Choose a suitable
                icebreaker type based on how you want to greet, guide, or assist
                your customers. Icebreakers improve response rates and create a
                better first impression.
              </p>

              <ul className="space-y-2 p-4">
                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-500"
                    style={{ fontSize: "0.4rem" }}
                  />
                  GREETING MESSAGE
                </li>

                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-500"
                    style={{ fontSize: "0.4rem" }}
                  />
                  QUICK QUESTIONS
                </li>

                <li className="relative pl-6">
                  <CircleIcon
                    className="absolute left-0 top-1.5 text-gray-500"
                    style={{ fontSize: "0.4rem" }}
                  />
                  SUGGESTED REPLIES
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/instagram/ice-breaker"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto ">
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
                    <div className="text-center"> Type </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center"> Description </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Example </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> instaUserId. <br />
                  </Table.Cell>
                  <Table.Cell align="center">Enter UserId </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <span> key </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
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

          <div className="mt-5 flex justify-center items-center mx-auto ">
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

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className=" w-3xl mx-auto  mt-10">
              <RequestSample
                tabsContent={createIcebreakerRequest}
                curlBase={createIcebreakercURL}
              />
            </div>
          </div>
        </section>

        <section id="get-ice-breaker" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Get Ice Breaker
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="GET"
              param="/wrapper/instagram/ice-breaker"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto ">
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
                    <div className="text-center"> Type </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center"> Description </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Example </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> instaUserId. <br />
                  </Table.Cell>
                  <Table.Cell align="center">Enter UserId </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <span> key </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="delete-ice-breaker" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Delete Ice Breaker
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="DELETE"
              param="/wrapper/instagram/ice-breaker"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto ">
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
                    <div className="text-center"> Type </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center"> Description </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Example </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> instaUserId. <br />
                  </Table.Cell>
                  <Table.Cell align="center">Enter UserId </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <span> key </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="create-persistent-menu" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Create Persistent Menu
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/instagram/persistent-menu"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto ">
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
                    <div className="text-center"> Type </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center"> Description </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Example </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> instaUserId. <br />
                  </Table.Cell>
                  <Table.Cell align="center">Enter UserId </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <span> key </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Example Request
            </h2>
            <div className=" w-3xl mx-auto  mt-10">
              <RequestSample
                tabsContent={createPersistentMenuRequest}
                curlBase={createPersistentMenucURL}
              />
            </div>
          </div>
        </section>

        <section id="get-persistent-menu" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-3xl lg:text-3xl font-medium ">
              Get Persistent Menu
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="GET"
              param="/wrapper/instagram/persistent-menu"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10 ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins sm:text-center">
              HEADERS
            </h2>
          </div>

          <div className="mt-5 flex justify-center items-center mx-auto ">
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
                    <div className="text-center"> Type </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-96">
                    <div className="text-center"> Description </div>
                  </Table.HeaderCell>
                  <Table.HeaderCell align="center" className="min-w-52">
                    <div className="text-center"> Example </div>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>

              <Table.Body>
                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    String
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> instaUserId. <br />
                  </Table.Cell>
                  <Table.Cell align="center">Enter UserId </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Enum
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <span> key </span>
                  </Table.Cell>
                  <Table.Cell align="center">
                    API Key <br />
                    <span className="text-gray-400">
                      Enter Your API key (Available in your portal)
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>
      </div>

      {/* ==============================================MINI SCROLLBAR======================================================================= */}
      <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block h-[95%] sticky top-4 p-2 shrink-0 rounded-2xl mr-4 w-70 `}
      >
        {/* Scroll track */}
        <div
          className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"} 
      w-1 rounded absolute left-3 top-5.5  `}
          style={{
            height: `${sections.length * 30}px`,
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
              top: `${sections.findIndex((s) => s.id === active) * 37}px`,
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

export default InstaApiDocsSetting;
