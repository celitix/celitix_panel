import React from "react";
import Slider from "react-slick";

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ICONS
import { FaReply } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

const getBtnIcon = (type) => {
    switch (type) {
        case "PHONE_NUMBER":
            return <BsTelephoneFill className="mr-2" />;
        case "QUICK_REPLY":
            return <FaReply className="mr-2" />;
        default:
            return <FaExternalLinkAlt className="mr-2" />;
    }
};

const getBtnCss = (type) => {
    switch (type) {
        case "PHONE_NUMBER":
            return "bg-white text-[#128c7e]";
        case "QUICK_REPLY":
            return "bg-white text-[#128c7e]";
        case "FLOW":
            return "bg-white text-[#128c7e]";
        default:
            return "bg-white text-[#128c7e]";
    }
};

const getBtnTitle = (type, phone, url, text) => {
    switch (type) {
        case "PHONE_NUMBER":
            return `Contact us: ${phone}`;
        case "QUICK_REPLY":
            return `View more: ${text}`;
        default:
            return `Visit us: ${url}`;
    }
};

const CarouselPreviewDashbaord = ({ carouselData }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="w-full ">
            {carouselData?.cards?.length > 0 ? (
                <Slider {...settings}>
                    {carouselData.cards.map((card, cardIndex) => {
                        const headerComponent = card.components.find(
                            (comp) => comp.type === "HEADER"
                        );
                        const bodyComponent = card.components.find(
                            (comp) => comp.type === "BODY"
                        );
                        const buttonComponent = card.components.find(
                            (comp) => comp.type === "BUTTONS"
                        );
                        const mediaUrl = headerComponent?.example?.header_handle[0];

                        return (
                            <div
                                key={cardIndex}
                                className="p-2 bg-white border border-gray-200 shadow-md rounded-xl"
                            >
                                <div className="mb-4 text-sm text-gray-800 whitespace-pre-wrap">
                                    {bodyComponent?.text}
                                </div>
                                {headerComponent?.format === "IMAGE" && (
                                    <img
                                        src={mediaUrl}
                                        alt="Card Media"
                                        className="object-contain w-full mb-4 rounded-md h-60 border"
                                    />
                                )}

                                {headerComponent?.format === "VIDEO" && (
                                    <video
                                        controls
                                        className="object-contain w-full mb-4 rounded-md h-60"
                                    >
                                        <source src={mediaUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {buttonComponent?.buttons?.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        {buttonComponent.buttons.map((btn, btnIdx) => (
                                            <button
                                                key={btnIdx}
                                                title={getBtnTitle(
                                                    btn.type,
                                                    btn.phone_number,
                                                    btn.url,
                                                    btn.text
                                                )}
                                                className={`flex items-center justify-center border-b-2 border-[#128c7e] px-4 py-2 text-xs shadow-sm cursor-pointer rounded-xl w-full sm:w-auto ${getBtnCss(
                                                    btn.type
                                                )}`}
                                                onClick={() => {
                                                    if (btn.type === "PHONE_NUMBER") {
                                                        window.location.href = `tel:${btn.phone_number}`;
                                                    } else if (btn.type === "URL") {
                                                        window.open(btn.url, "_blank");
                                                    }
                                                }}
                                            >
                                                {getBtnIcon(btn.type)}
                                                {btn.text}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </Slider>
            ) : (
                <p className="text-sm text-center text-gray-500">
                    No cards found in carousel.
                </p>
            )}
        </div>
    );
};

export default CarouselPreviewDashbaord;