import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


import { themeColors } from "@/ApiDocs/themeColors";

// ICONS
import CircleIcon from "@mui/icons-material/Circle";

// CONTEXT
import { useTheme } from "@/ApiDocs/context/ThemeContext";

// COMPONENTS
import RequestSample from "@/ApiDocs/components/RequestSample";
import BaseurlComponent from "@/ApiDocs/components/BaseurlComponent";
import Table from "@/ApiDocs/components/Tablenew";
import ResponseComponent from "@/ApiDocs/components/ResponseComponent";
import RequestComponent from "@/ApiDocs/components/RequestComponent";

const GetTemplate = () => {
  const [activeSection, setActiveSection] = useState("get-template-by-name");

  const { isDarkMode } = useTheme();
  const colors = themeColors(isDarkMode);

  const sections = [
    { id: "get-template-by-name", title: "Get Template By Name" },
    { id: "get-templatelist", title: "Get TemplateList" },
    { id: "upload-media", title: "Upload Media" },
    { id: "template-upload-media-file", title: "Template Upload Media File" },
    { id: "downloadAttachmentFile", title: "Download AttachmentFile" },
    { id: "get-usage-report", title: "Get Usage Report" },
  ];

  const [active, setActive] = useState(null);
  const [scroller, setScroller] = useState(0);
  const activeIndex = sections.findIndex((s) => s.id === active);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;

  useEffect(() => {
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

  return (
    <div
      className={`flex w-full rounded-md  ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-[#eeeeee] text-gray-800"
      }`}
    >
      <div className=" p-4 lg:p-6 overflow-y-auto w-4xl mx-auto ">
        <section id="get-template-by-name" className="mb- mt-10">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              Get Template By Name
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/getTemplate"
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
                    Number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Templateid <br />
                  </Table.Cell>
                  <Table.Cell align="center">1286507032xxxxxx</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-medium">Required.</span>
                    <br />
                    <br /> wabaNumber
                  </Table.Cell>
                  <Table.Cell align="center">
                    9175858xxxxx (registered waba account no){" "}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="get-templatelist" className="mb-16 mt-10">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              GetTemplateList
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/getTemplateList"
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
        </section>

        <section id="upload-media" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              Upload Media
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param=" /wrapper/waba/uploadMedia"
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

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Body FormData
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
                    Number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    file <br />
                  </Table.Cell>
                  <Table.Cell align="center">upload file</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="template-upload-media-file" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              Template Upload Media File
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param="/wrapper/waba/uploadTemplateMediaFile"
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

          <div className="flex flex-col justify-center items-center gap-2 popins sm:flex  text-center  mt-10">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins ">
              Body FormData
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
                    Number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br />
                    file <br />
                  </Table.Cell>
                  <Table.Cell align="center">upload file</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="downloadAttachmentFile" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              Download AttachmentFile
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param=" /wrapper/waba/downloadAttachmentFile"
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
                    Number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> Media Id <br />
                  </Table.Cell>
                  <Table.Cell align="center">675570552xxxxxx</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>

        <section id="get-usage-report" className="mb-16">
          <div className="flex flex-col justify-center items-center gap-2 popins  ">
            <h2 className="text-xl md:text-4xl font-medium mb-5  pb-2">
              Get Usage Report
            </h2>
          </div>

          <div className="mt-5 flex flex-col justify-center ">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-medium popins text-center mb-4">
              ENDPOINT
            </h2>
            <BaseurlComponent
              urlPrefix="Base URL"
              requestType="POST"
              param=" /wrapper/waba/getUsageReport"
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
                    Number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> StartDate <br />
                  </Table.Cell>
                  <Table.Cell align="center">2025-05-26</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell align="center" className=" text-orange-500 ">
                    Number
                  </Table.Cell>
                  <Table.Cell align="center">
                    <span className="text-black font-semibold">Required.</span>
                    <br />
                    <br /> EndDate <br />
                  </Table.Cell>
                  <Table.Cell align="center">2025-05-27</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </section>
      </div>

      {/* Mini Map Navigation - Hidden on small screens */}

      <div
        className={`${
          isDarkMode ? "bg-gray-500 text-white" : "bg-[#cecece] text-black"
        } hidden lg:block h-[95%] sticky top-4 p-2 shrink-0 rounded-2xl mr-4 w-70 `}
      >
        {/* Scroll track */}
        <div
          className={`${isDarkMode ? "bg-gray-600" : "bg-gray-200"} 
        w-1 rounded absolute left-3 top-5.5 `}
          style={{
            height: `${sections.length * 32}px`,
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
              // top: `${sections.findIndex((s) => s.id === active) * 36}px`,
                top: `${safeIndex * 36}px`,
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

export default GetTemplate;
